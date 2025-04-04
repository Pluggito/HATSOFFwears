import { createContext, useState, useEffect } from "react";
import { products } from "../assets/asset";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";


 export const ShopContext = createContext();

 const ShopContextProvider = (props) =>{

    const currency = '₦';
    const delivery_fee = 3000;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : {};
    });
    const navigate = useNavigate();


    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = async (itemId,size) =>{

        if (!size) {
            toast.error("Select Product Size")
            return;           
        }

        else if (size){
            toast.success("Added to cart");
          }
        
        let cartData = structuredClone(cartItems); 

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
                
            }            

            else{
                cartData[itemId][size] = 1;
            }
        }

        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData)

    }

    const getCartCount = () => {

        let totalCount = 0;

        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                    
                } catch (error) {
                    
                }
            }
        }

        return totalCount;
    }
    

    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems);
        
        cartData[itemId][size] = quantity;

        setCartItems(cartData)
    }

    // I helped you update the getCartAmount function, there was a mistake before

    const getCartAmount = () =>{


        let totalAmount = 0;

        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
    
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

    }


    const value ={
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate

    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
 }


 export default ShopContextProvider;