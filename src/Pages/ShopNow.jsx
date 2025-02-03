import { useContext } from "react"
import { ShopContext } from "../Context/ShopContext"
import Title from "../Components/Title";
import { useState, useEffect } from "react";
import ProductsItem from "../Components/ProductsItem";


const ShopNow = () => {

const { products } = useContext(ShopContext);
const [newProduct, setNewProduct] = useState([])

useEffect(()=> {

    setNewProduct(products.slice(0,2));
},[])


  return (
    <div className="my-10">
         <div className="text-center py-8 text-3xl">
                <Title text1={'NEW'} text2={'COLLECTIONS'}/>
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700">
                    Discover our latest arrivals featuring trendy designs and premium quality. 
                    Each piece is carefully curated to keep you stylish and comfortable.
                </p>
            </div>
             {/*Rendering Products */}
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6">
                {
                    newProduct.map((item,index)=>(
                        <ProductsItem key={index} id={item._id} image={item.image} name={item.name} 
                        price={item.price}/>
                    ))
                }
            </div>

    </div>
  )
}

export default ShopNow