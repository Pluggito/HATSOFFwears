import { Link } from "react-router";

const OrderSummary = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        Order Placed Successfully
      </h2>
      <p className="text-gray-700 mb-6">
        You have been sent an email for your receipt
      </p>
      <Link to={"/"} className="text-blue-500 hover:underline">
        Home
      </Link>
    </div>
  );
};

export default OrderSummary;
