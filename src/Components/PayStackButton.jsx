import React from "react";
import { PaystackButton } from 'react-paystack';

const PaystackPayButton = ({ email, amount, onSuccess }) => {
  const publicKey = "pk_test_5c6400f1abdd229c8ae188982a022e37cee354d5"; // Replace with your Paystack public key

  const componentProps = {
    email,
    amount: amount * 100, // Paystack works with kobo (multiply by 100)
    currency: "NGN",
    publicKey,
    text: "Pay Now",
    onSuccess: (response) => {
      console.log(response);
      onSuccess(response); // You can update order status here
    },
    onClose: () => alert("Transaction was not completed"),
  };

  return (
    <div>
      <PaystackButton {...componentProps} />
    </div>
  );
};

export default PaystackPayButton;
