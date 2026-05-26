import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CartTotal from "../Components/CartTotal";
import { toast } from "sonner";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    navigate,
    loading,
    error,
  } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  if (products.length === 0) {
    return <div className="p-10 text-center text-muted-foreground">Loading your cart…</div>;
  }

  const handleDelete = (id, size) => {
    updateQuantity(id, size, 0);
    toast.success("Item removed from cart");
  };

  if (loading) return <p className="text-center py-10 text-muted-foreground">Loading Cart</p>;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;

  return (
    <div className="border-t border-border/40 pt-14 text-foreground">
      <div className="text-2xl mb-6">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div className="flex flex-col gap-1">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product.id === item.id
          );

          if (!productData) return null;

          return (
            <div
              key={index}
              className="py-6 border-b border-border/40 text-foreground grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 transition-colors"
            >
              <div className="flex items-start gap-6">
                <img 
                  className="w-16 sm:w-20 rounded-lg border border-border/40 object-cover aspect-square bg-muted" 
                  src={productData.imgUrls?.[0] || productData.imgUrl} 
                  alt={productData.name} 
                />
                <div>
                  <p className="text-sm sm:text-lg font-bold tracking-tight text-foreground">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <p className="font-semibold text-foreground">
                      {currency}
                      {Number(productData.price).toLocaleString()}
                    </p>
                    <p className="px-2.5 py-0.5 border border-border/60 bg-muted text-foreground text-xs font-semibold rounded">
                      Size: {item.size}
                    </p>
                  </div>
                </div>
              </div>

              <input
                className="border border-border bg-card text-foreground rounded-lg max-w-14 sm:max-w-20 px-2 py-1.5 text-center focus:outline-none focus:ring-1 focus:ring-border"
                type="number"
                min={1}
                defaultValue={item.quantity}
                onChange={(e) =>
                  e.target.value === " " || e.target.value === "0"
                    ? null
                    : updateQuantity(item.id, item.size, Number(e.target.value))
                }
              />
              <button 
                onClick={() => handleDelete(item.id, item.size)}
                className="p-2 rounded-full hover:bg-muted text-red-500 hover:text-red-600 transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Remove item"
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-[18px]"
                />
              </button>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              className="bg-foreground text-background hover:bg-foreground/90 transition-colors text-sm font-bold my-8 px-8 py-3.5 rounded-lg tracking-wider cursor-pointer"
              onClick={() => navigate("/placeorder")}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
