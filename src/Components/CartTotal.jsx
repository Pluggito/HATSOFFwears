import { useContext } from "react"
import { ShopContext } from "../Context/ShopContext"
import Title from "./Title";


const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  const cartAmount = getCartAmount();
  const totalAmount = cartAmount === 0 ? 0 : cartAmount + delivery_fee;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={'CART'} text2={'TOTAL'} />
      </div>

      <div className="flex flex-col gap-2 mt- text-sm">
        <div className="flex justify-between">
          <p>SubTotal</p>
          <p>{currency} {cartAmount.toLocaleString()}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Delivery Fee</p>
          <p>{currency} {delivery_fee.toLocaleString()}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>{currency} {totalAmount.toLocaleString()}</b>
        </div>
      </div>
    </div>
  );
}


export default CartTotal
