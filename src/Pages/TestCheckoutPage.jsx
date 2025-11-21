import PaystackPayButton from "../Components/PayStackButton";


export default function Checkout() {
  const handleSuccess = (response) => {
    alert("Payment successful! Ref: " + response.reference);
    // TODO: Send reference to backend for verification
  };

  return (
    <div>
      <h2>Checkout</h2>
      <PaystackPayButton 
        email="customer@example.com"
        amount={2000}   // ₦2000
        onSuccess={handleSuccess}
      />
    </div>
  );
}
