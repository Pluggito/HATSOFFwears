import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import { useState, useEffect } from "react";
import ProductsItem from "../Components/ProductsItem";

const ShopNow = () => {
  const { products, loading, error } = useContext(ShopContext);
  const [newProducts, setNewProducts] = useState([]);


   useEffect(() => {
      // runs when products has loaded
      if (products.length === 0) return;

      const newProduct = products
        .filter((item) => item.collection === "New")
        .slice(0, 5);
      setNewProducts(newProduct);
    }, [products]);

  if (loading) return <p>Loading products…</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"NEW"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700">
          Discover our latest arrivals featuring trendy designs and premium
          quality. Each piece is carefully curated to keep you stylish and
          comfortable.
        </p>
      </div>
      {/*Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6">
        {newProducts.map((item, index) => (
          <ProductsItem
            key={index}
            id={item.id}
            image={item.imgUrl}
            name={item.name}
            price={item.price}
            availability={item.availability}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopNow;
