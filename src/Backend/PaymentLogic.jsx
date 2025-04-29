{/*import { useFlutterwave } from "flutterwave-react-v3";
import { handlePlaceOrder } from "./OrderLogic";

const paymentLogic = (userDetails, amount, cartItems, navigate) => {
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
            logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
        },
    };

    const handleFlutterPayment = useFlutterwave(config);

    handleFlutterPayment({
        callback: async (response) => {
            if (response.status !== "completed") {
                console.log("Payment Failed Try Again");
            } else {
                const trans_id = response.transaction_id;
                await handlePlaceOrder(cartItems, userDetails, trans_id);
                navigate('/order-summary');
                console.log("Payment successful");
            }
        },
        onClose: () => {},
    });
};

export const handlePayment = (userDetails, amount, cartItems, navigate) => {
    paymentLogic(userDetails, amount, cartItems, navigate);
}; */}
