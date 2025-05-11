import { createContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
// import { products } from "../assets/asset";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { getProducts } from "../Backend/AdminLogic";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₦";
  const delivery_fee = 3000;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setProducts(productsFromDB);
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

  const addToCart = async (itemId, size) => {
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
  };

  const getCartCount = () => {
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
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);
  };

  // I helped you update the getCartAmount function, there was a mistake before

  const getCartAmount = () => {
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
  };

  // const value ={
  //     products,
  //     currency,
  //     delivery_fee,
  //     search,
  //     setSearch,
  //     showSearch,
  //     setShowSearch,
  //     cartItems,
  //     addToCart,
  //     getCartCount,
  //     updateQuantity,
  //     getCartAmount,
  //     navigate,

  // }

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
      addToCart,
      getCartCount,
      getCartAmount,
      updateQuantity,
      navigate,
    }),
    [
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
      addToCart,
      getCartCount,
      getCartAmount,
      navigate,
      updateQuantity,
    ]
  );

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
