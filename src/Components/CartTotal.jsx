import { useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount, setTotalAmount, totalAmount } = useContext(ShopContext);

  const cartAmount = getCartAmount();
  const tAmount = cartAmount === 0 ? 0 : cartAmount + delivery_fee

  useEffect(() => {
    setTotalAmount(cartAmount + delivery_fee);
  }, [cartAmount, delivery_fee]);
  return (
    <div className="w-full text-foreground">
      <div className="text-2xl mb-4">
        <Title text1={"CART"} text2={"TOTAL"} />
      </div>

      <div className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between">
          <p className="text-muted-foreground">Subtotal</p>
          <p className="font-semibold">
            {currency} {cartAmount.toLocaleString()}.00
          </p>
        </div>
        <hr className="border-border/40" />
        <div className="flex justify-between">
          <p className="text-muted-foreground">Delivery Fee</p>
          <p className="font-semibold">
            {currency} {delivery_fee.toLocaleString()}.00
          </p>
        </div>
        <hr className="border-border/40" />
        <div className="flex justify-between items-center pt-1">
          <b className="text-base text-foreground uppercase tracking-wider">Total</b>
          <b className="text-lg text-foreground font-bold">
            {currency} {totalAmount.toLocaleString()}
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
