import { createContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
// import { products } from "../assets/asset";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { getProducts } from "../Backend/AdminLogic";
import { useCallback } from "react";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₦";
  const delivery_fee = 6000;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });
  const navigate = useNavigate();

  // Fetch Products once when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsFromDB = await getProducts();

        // 🏷️ APPLY 15% DISCOUNT LOGIC
        const DISCOUNT_EXPIRY = new Date("2026-02-14T23:59:59"); // Expiry Date
        const currentDate = new Date();

        if (currentDate <= DISCOUNT_EXPIRY) {
          const discountedProducts = productsFromDB.map((product) => {
            const originalPrice = product.price;
            const discountAmount = originalPrice * 0.15;
            const newPrice = originalPrice - discountAmount;

            return {
              ...product,
              originalPrice: originalPrice, // Store original price
              price: newPrice, // Update to discounted price
              discountPercentage: 15, // Store discount info
            };
          });
          setProducts(discountedProducts);
        } else {
          setProducts(productsFromDB);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // run only once

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback(
    async (itemId, size) => {
      if (!size) {
        toast.error("Select Product Size");
        return;
      } else if (size) {
        toast.success("Added to cart");
      }

      let cartData = structuredClone(cartItems);

      if (cartData[itemId]) {
        if (cartData[itemId][size]) {
          cartData[itemId][size] += 1;
        } else {
          cartData[itemId][size] = 1;
        }
      } else {
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
      }

      setCartItems(cartData);
    },
    [cartItems],
  );

  const getCartCount = useCallback(() => {
    let totalCount = 0;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.error("Error calculating cart count:", error);
        }
      }
    }

    return totalCount;
  }, [cartItems]);

  const updateQuantity = useCallback(
    async (itemId, size, quantity) => {
      let cartData = structuredClone(cartItems);

      cartData[itemId][size] = quantity;
      setCartItems(cartData);
    },
    [cartItems],
  );

  // I helped you update the getCartAmount function, there was a mistake before

  const getCartAmount = useCallback(() => {
    let totalAmount = 0;

    for (const items in cartItems) {
      let itemInfo = products.find((product) => product.id === items);

      if (!itemInfo) continue; // Ensure product exists

      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.error("Error calculating total amount:", error);
        }
      }
    }

    return totalAmount;
  }, [cartItems, products]);

  const value = useMemo(
    () => ({
      products,
      currency,
      delivery_fee,
      search,
      loading,
      error,
      setSearch,
      showSearch,
      setShowSearch,
      cartItems,
      totalAmount,
      addToCart,
      getCartCount,
      getCartAmount,
      updateQuantity,
      navigate,
      setCartItems,
      setTotalAmount,
    }),
    [
      products,
      currency,
      delivery_fee,
      search,
      loading,
      error,
      totalAmount,
      setSearch,
      showSearch,
      setShowSearch,
      cartItems,
      addToCart,
      getCartCount,
      getCartAmount,
      navigate,
      updateQuantity,
      setCartItems,
      setTotalAmount,
    ],
  );

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
