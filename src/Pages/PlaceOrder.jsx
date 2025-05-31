import { useContext, useState } from "react";
import CartTotal from "../Components/CartTotal";
import Title from "../Components/Title";
import { ShopContext } from "../Context/ShopContext";
import { useFlutterwave } from "flutterwave-react-v3";
import { handlePlaceOrder } from "../Backend/OrderLogic";
import { toast } from "sonner";

const PlaceOrder = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const {
    cartItems,
    getCartAmount,
    delivery_fee,
    navigate,
    products,
    setCartItems,
  } = useContext(ShopContext);

  const Amount = getCartAmount() + delivery_fee;

  const userDetails = {
    firstName,
    lastName,
    email,
    phone,
    address,
  };

  const config = {
    public_key: "FLWPUBK_TEST-d94776c57970d805d8371952a814636c-X",
    tx_ref: Date.now().toString(),
    amount: Amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email,
      phone_number: phone,
      name: `${firstName} ${lastName}`,
    },
    customizations: {
      title: "HatsOff Store",
      description: "Payment for items in cart",
      logo: "https://salescabal.s3.eu-west-3.amazonaws.com/stores/208793/hatsoff.jpeg?t=1746971899511",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phone || !address) {
      setError("Please fill in all fields");
      setTimeout(() => setError(""), 3000);
      return;
    }

    handleFlutterPayment({
      callback: async (response) => {
        if (response.status !== "completed") {
          toast.error("Payment Failed. Try Again");
        } else {
          const trans_id = response.transaction_id;
          await handlePlaceOrder(cartItems, userDetails, trans_id, products, setCartItems);
          navigate("/order-summary");
          toast.success("Payment Successful");
        }
      },
      onClose: () => {},
    });

    localStorage.removeItem("cartItems");
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
            required
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <input
            type="text"
            placeholder="Last name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>
        <input
          type="email"
          placeholder="Email address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="text"
          placeholder="Address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          required
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
        <input
          type="tel"
          placeholder="Phone number"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          required
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />

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
