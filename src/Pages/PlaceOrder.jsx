import { useContext, useState, useEffect } from "react";
import CartTotal from "../Components/CartTotal";
import Title from "../Components/Title";
import { ShopContext } from "../Context/ShopContext";
import { handlePlaceOrder } from "../Backend/OrderLogic";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../Components/ui/dialog";
import { Button } from "../Components/ui/button";
import { PaystackButton } from "react-paystack";

const PlaceOrder = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [coupon, setCoupon] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const {
    cartItems,
    getCartAmount,
    delivery_fee,
    products,
    setCartItems,
    setTotalAmount,
  } = useContext(ShopContext);

  const Amount = getCartAmount() + delivery_fee;

  // APPLY COUPON DISCOUNT
  let finalAmount = Amount;
  if (coupon.trim().toUpperCase() === "1YEAR19") {
    finalAmount = Amount * 0.85;
  }

  useEffect(() => {
    setTotalAmount(finalAmount);
  }, [coupon, Amount]);

  const handleCoupon = () => {
    if (coupon.trim().toUpperCase() === "1YEAR19") {
      toast.success("15% off coupon applied!");
    } else {
      toast.error("Invalid coupon code");
    }
  };

  const userDetails = { firstName, lastName, email, phone, address };

  // VALIDATION
  const isFormValid = firstName && lastName && email && phone && address;

  // SUCCESS CALLBACK
  const handlePaymentSuccess = async (response) => {
    toast.loading("Processing order...");
    await handlePlaceOrder(
      cartItems,
      userDetails,
      response.reference,
      products,
      setCartItems
    );
    toast.dismiss();
    toast.success("Payment Successful!");

    localStorage.removeItem("cartItems");
    navigate("/order-summary");
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <input
          type="email"
          placeholder="Email address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone number"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* COUPON */}
        <Dialog>
          <DialogTrigger asChild>
            <p className="cursor-pointer">Have a coupon code?</p>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogTitle>Enter Coupon Code</DialogTitle>
            <DialogHeader>
              <input
                placeholder="Coupon code"
                className="border p-2 rounded"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" onClick={handleCoupon}>
                  Apply
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* PAYSTACK BUTTON */}
        <div className="w-full text-end mt-4">
          {isFormValid ? (
            <div className="bg-black text-white px-16 py-3 text-sm rounded">
              <PaystackButton
                email={email}
                amount={finalAmount * 100}
                publicKey="pk_test_5c6400f1abdd229c8ae188982a022e37cee354d5"
                text="PLACE ORDER"
                onSuccess={handlePaymentSuccess}
                onClose={() => toast.error("Payment cancelled or closed.")}
                className="w-full"
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setError("Please fill in all fields")}
              className="bg-black text-white px-16 py-3 text-sm opacity-50 cursor-not-allowed"
            >
              PLACE ORDER
            </button>
          )}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="mt-8">
        <CartTotal />
      </div>
    </div>
  );
};

export default PlaceOrder;
