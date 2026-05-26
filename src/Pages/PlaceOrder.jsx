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
    <div className="flex flex-col sm:flex-row justify-between gap-10 pt-5 sm:pt-14 min-h-[80vh] border-t border-border/40 text-foreground">
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-5 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First name"
            className="border border-border bg-card text-foreground rounded-lg py-2.5 px-4 w-full focus:outline-none focus:ring-1 focus:ring-border transition-colors text-sm placeholder:text-muted-foreground"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last name"
            className="border border-border bg-card text-foreground rounded-lg py-2.5 px-4 w-full focus:outline-none focus:ring-1 focus:ring-border transition-colors text-sm placeholder:text-muted-foreground"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <input
          type="email"
          placeholder="Email address"
          className="border border-border bg-card text-foreground rounded-lg py-2.5 px-4 w-full focus:outline-none focus:ring-1 focus:ring-border transition-colors text-sm placeholder:text-muted-foreground"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Address"
          className="border border-border bg-card text-foreground rounded-lg py-2.5 px-4 w-full focus:outline-none focus:ring-1 focus:ring-border transition-colors text-sm placeholder:text-muted-foreground"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone number"
          className="border border-border bg-card text-foreground rounded-lg py-2.5 px-4 w-full focus:outline-none focus:ring-1 focus:ring-border transition-colors text-sm placeholder:text-muted-foreground"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* COUPON */}
        <Dialog>
          <DialogTrigger asChild>
            <p className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mt-2">
              Have a coupon code?
            </p>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px] bg-card text-foreground border border-border">
            <DialogTitle className="text-lg font-bold text-foreground">Enter Coupon Code</DialogTitle>
            <DialogHeader className="mt-2">
              <input
                placeholder="Coupon code"
                className="border border-border bg-background text-foreground p-2.5 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-border"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
            </DialogHeader>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline" onClick={handleCoupon} className="cursor-pointer">
                  Apply
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* PAYSTACK BUTTON */}
        <div className="w-full text-end mt-4">
          {isFormValid ? (
            <div className="bg-foreground text-background hover:bg-foreground/90 transition-colors py-3.5 text-sm font-bold tracking-wider rounded-lg flex items-center justify-center cursor-pointer">
              <PaystackButton
                email={email}
                amount={Math.round(finalAmount * 100)}
                publicKey="pk_live_193256cd7c094ab828222c22c0cf8f82add8984e"
                text="PLACE ORDER"
                onSuccess={handlePaymentSuccess}
                onClose={() => toast.error("Payment cancelled or closed.")}
                className="w-full h-full cursor-pointer"
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setError("Please fill in all fields")}
              className="bg-foreground text-background py-3.5 text-sm font-bold tracking-wider rounded-lg w-full opacity-50 cursor-not-allowed"
            >
              PLACE ORDER
            </button>
          )}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="mt-8 sm:mt-0 flex-1 sm:max-w-[450px]">
        <CartTotal />
      </div>
    </div>
  );
};

export default PlaceOrder;
