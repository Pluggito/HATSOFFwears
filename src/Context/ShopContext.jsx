import { createContext, useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../Backend/AdminLogic";
import { getProductEffectivePrice } from "../lib/productPricing";

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
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme((prev) => (prev === "dark" ? "light" : "dark")), []);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProducts(await getProducts());
      } catch (err) {
        setError(err.message || "Failed to fetch");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => localStorage.setItem("cartItems", JSON.stringify(cartItems)), [cartItems]);

  const getProductPrice = useCallback((product) => getProductEffectivePrice(product), []);

  const addToCart = useCallback((itemId, size) => {
    const product = products.find((item) => item.id === itemId);
    if (["Out of Stock", "Sold out"].includes(product?.availability)) {
      toast.error("This product is unavailable");
      return;
    }
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    setCartItems((current) => ({
      ...current,
      [itemId]: { ...(current[itemId] || {}), [size]: (current[itemId]?.[size] || 0) + 1 },
    }));
    toast.success("Added to cart");
  }, [products]);

  const getCartCount = useCallback(() => Object.values(cartItems).reduce(
    (count, sizes) => count + Object.values(sizes).reduce((sum, quantity) => sum + (Number(quantity) > 0 ? Number(quantity) : 0), 0), 0,
  ), [cartItems]);

  const updateQuantity = useCallback((itemId, size, quantity) => {
    setCartItems((current) => ({
      ...current,
      [itemId]: { ...(current[itemId] || {}), [size]: quantity },
    }));
  }, []);

  const getCartAmount = useCallback(() => Object.entries(cartItems).reduce((total, [productId, sizes]) => {
    const product = products.find((item) => item.id === productId);
    if (!product) return total;
    const price = getProductEffectivePrice(product);
    return total + Object.values(sizes).reduce((sum, quantity) => sum + (Number(quantity) > 0 ? price * Number(quantity) : 0), 0);
  }, 0), [cartItems, products]);

  const value = useMemo(() => ({
    products, currency, delivery_fee, search, loading, error, setSearch, showSearch,
    setShowSearch, cartItems, totalAmount, addToCart, getCartCount, getCartAmount,
    getProductPrice, updateQuantity, navigate, setCartItems, setTotalAmount, theme, toggleTheme,
  }), [products, currency, delivery_fee, search, loading, error, totalAmount, showSearch,
    cartItems, addToCart, getCartCount, getCartAmount, getProductPrice, navigate,
    updateQuantity, theme, toggleTheme]);

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

ShopContextProvider.propTypes = { children: PropTypes.node.isRequired };

export default ShopContextProvider;
