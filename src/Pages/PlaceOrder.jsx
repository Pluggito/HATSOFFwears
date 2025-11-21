import { useContext, useState } from "react";
import CartTotal from "../Components/CartTotal";
import Title from "../Components/Title";
import { ShopContext } from "../Context/ShopContext";
import { usePaystackPayment } from "react-paystack";
import { handlePlaceOrder } from "../Backend/OrderLogic";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "../Components/ui/dialog"
import { Button } from "../Components/ui/button"

const PlaceOrder = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [coupon, setCoupon] = useState("")
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

  const userDetails = {
    firstName,
    lastName,
    email,
    phone,
    address,
  };

  let finalAmount = Amount;
  if (coupon === '1YEAR19') {
    finalAmount = Amount * 0.85; // 15% off
    setTotalAmount(finalAmount)
  } else if (coupon.trim()) {
    // toast.error("Invalid coupon code");
  }
  // PAYSTACK CONFIG
  const paystackConfig = {
    publicKey: "pk_live_193256cd7c094ab828222c22c0cf8f82add8984e", // CHANGE THIS
    email: email,
    amount: finalAmount * 100, // In Kobo
    currency: "NGN",
  };



  const initializePayment = usePaystackPayment(paystackConfig);

  // HANDLE FORM SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phone || !address) {
      setError("Please fill in all fields");
      setTimeout(() => setError(""), 3000);
      return;
    }

    // TRIGGER PAYSTACK POPUP
    initializePayment(
      async (response) => {
        // SUCCESS CALLBACK
        const reference = response.reference;

        toast.loading("Processing order...");

        await handlePlaceOrder(
          cartItems,
          userDetails,
          reference,
          products,
          setCartItems
        );

        toast.dismiss();
        toast.success("Payment Successful!");

        navigate("/order-summary");
        localStorage.removeItem("cartItems");
      },
      () => toast.error("Payment cancelled or closed.")
    );
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">

      {/*-----Left Side-------- */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full sm:max-w-[480px]"
      >
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <input
            type="text"
            placeholder="Last name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>

        <input
          type="email"
          placeholder="Email address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <input
          type="text"
          placeholder="Address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />

        <input
          type="tel"
          placeholder="Phone number"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />

        <Dialog>
          <DialogTrigger asChild >
            <p className="cursor-pointer">Have a coupon code?</p>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogTitle>
              Enter Coupon Code
            </DialogTitle>
            <DialogHeader>
              <div className="grid gap-3">
                <input id="name-1" name="name" defaultValue="Coupon code"
                  className="border-b-rose-100"
                  onChange={(e) => setCoupon(e.target.value)}
                  value={coupon} />
              </div>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Enter</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>

        </Dialog>


        <div className="w-full text-end mt-4">
          <button
            type="submit"
            className="bg-black text-white px-16 py-3 text-sm"
          >
            PLACE ORDER
          </button>
        </div>
      </form>

      {/*---------Right Side -------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
      </div>

    </div>
  );
};

export default PlaceOrder;
