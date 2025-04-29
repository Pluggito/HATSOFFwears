import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";


export default function ProductsItem ({id,image,name,price}){
    const {currency} = useContext(ShopContext);


    return(
        <Link  className="text-gray cursor-pointer rounded-sm shadow-xs p-2" to={`/product/${id}`}>
        
        <div className="overflow-hidden ">
        <img 
            className='hover:scale-110 transition ease-in-out' 
            src={Array.isArray(image) ? image[0] : image} 
            alt={name || "Product"}
        />
        </div>
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">{currency}{price}</p>
        </Link>

    )
}