import { useFlutterwave } from "flutterwave-react-v3";
import { handlePlaceOrder } from "./OrderLogic";
import { toast } from "sonner";

const paymentLogic = (userDetails, amount, cartItems, navigate,products,setCartItems) => {
    const config = {
        public_key: "FLWPUBK_TEST-d94776c57970d805d8371952a814636c-X",
        tx_ref: Date.now(),
        amount: amount,
        currency: "NGN",
        payment_options: "card,mobilemoney,ussd",
        customer: {
            email: userDetails.email,
            phone_number: userDetails.phone,
            name: `${userDetails.firstName} ${userDetails.lastName}`,
        },
        customizations: {
            title: "HatsOff Store",
            description: "Payment for items in cart",
            logo: "https://salescabal.s3.eu-west-3.amazonaws.com/stores/208793/hatsoff.jpeg?t=1746971899511",
        },
    };

    const handleFlutterPayment = useFlutterwave(config);

    handleFlutterPayment({
        callback: async (response) => {
            if (response.status !== "completed") {
                toast.error("Payment Failed Try Again");
            } else {
                const trans_id = response.transaction_id;
                await handlePlaceOrder(cartItems, userDetails, trans_id, products,setCartItems);
                navigate('/order-summary');
                toast.success("Payment successful");
            }
        },
        onClose: () => {},
    });
};

export const handlePayment = (userDetails, amount, cartItems, navigate, products, setCartItems) => {
    paymentLogic(userDetails, amount, cartItems, navigate, products, setCartItems);
};
