import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CartTotal from "../Components/CartTotal";
import { toast } from "sonner";
import { getProductEffectivePrice } from "../lib/productPricing";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, loading, error } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    const tempData = [];
    for (const id in cartItems) for (const size in cartItems[id]) if (cartItems[id][size] > 0) tempData.push({ id, size, quantity: cartItems[id][size] });
    setCartData(tempData);
  }, [cartItems]);

  if (loading) return <p className="text-center py-10 text-muted-foreground">Loading Cart</p>;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;
  const handleDelete = (id, size) => { updateQuantity(id, size, 0); toast.success("Item removed from cart"); };

  return (
    <div className="border-t border-border/40 pt-14 text-foreground">
      <div className="text-2xl mb-6"><Title text1="YOUR" text2="CART" /></div>
      <div className="flex flex-col gap-1">
        {cartData.map((item, index) => {
          const product = products.find((entry) => entry.id === item.id);
          if (!product) return null;
          const originalPrice = Number(product.price ?? 0);
          const salePrice = getProductEffectivePrice(product);
          const hasDiscount = salePrice < originalPrice;
          return <div key={`${item.id}-${item.size}-${index}`} className="py-6 border-b border-border/40 text-foreground grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
            <div className="flex items-start gap-6"><img className="w-16 sm:w-20 rounded-lg border border-border/40 object-cover aspect-square bg-muted" src={product.imgUrls?.[0] || product.imgUrl} alt={product.name} /><div><p className="text-sm sm:text-lg font-bold">{product.name}</p><div className="flex items-center gap-3 mt-2 text-sm"><p className="font-semibold">{currency}{salePrice.toLocaleString()}</p>{hasDiscount && <p className="text-muted-foreground line-through">{currency}{originalPrice.toLocaleString()}</p>}<p className="px-2.5 py-0.5 border border-border/60 bg-muted text-xs font-semibold rounded">Size: {item.size}</p></div></div></div>
            <input className="border border-border bg-card text-foreground rounded-lg max-w-14 sm:max-w-20 px-2 py-1.5 text-center" type="number" min={1} value={item.quantity} onChange={(e) => { const quantity = Number(e.target.value); if (quantity >= 0) updateQuantity(item.id, item.size, quantity); }} />
            <button onClick={() => handleDelete(item.id, item.size)} className="p-2 rounded-full hover:bg-muted text-red-500 flex items-center justify-center cursor-pointer" aria-label="Remove item"><FontAwesomeIcon icon={faTrash} className="text-[18px]" /></button>
          </div>;
        })}
      </div>
      <div className="flex justify-end my-20"><div className="w-full sm:w-[450px]"><CartTotal /><div className="w-full text-end"><button className="bg-foreground text-background hover:bg-foreground/90 text-sm font-bold my-8 px-8 py-3.5 rounded-lg tracking-wider" onClick={() => navigate("/placeorder")}>PROCEED TO CHECKOUT</button></div></div></div>
    </div>
  );
};
export default Cart;
