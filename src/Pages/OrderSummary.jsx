import { Link } from "react-router-dom";

const OrderSummary = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-background text-foreground py-10">
      <h2 className="text-3xl font-extrabold text-green-500 mb-4 tracking-tight">
        Order Placed Successfully
      </h2>
      <p className="text-muted-foreground mb-8 text-center max-w-sm leading-relaxed">
        You have been sent an email confirmation with your order details and receipt.
      </p>
      <Link to={"/"} className="bg-foreground text-background hover:bg-foreground/90 px-8 py-3 rounded-lg text-sm font-bold tracking-wider transition-colors">
        RETURN TO HOME
      </Link>
    </div>
  );
};

export default OrderSummary;
