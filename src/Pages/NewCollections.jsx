import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import { useState, useEffect } from "react";
import ProductsItem from "../Components/ProductsItem";

const NewCollections = () => {
  const { products } = useContext(ShopContext);
  const [newCollections, setNewCollections] = useState([]);

  useEffect(() => {
    // runs when products has loaded
    if (products.length === 0) return;

    const newCollection = products
      .filter((item) => item.collection === "New")
      .slice(0, 2);
    setNewCollections(newCollection);
  }, [products]);

  if (products.length === 0) {
    return (
      <div className="my-10 text-center">
        <h2 className="text-xl">Loading Collections…</h2>
      </div>
    );
  }
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"SHOP EASE,"} text2={" SHOP COMFORT"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700">
          Discover our latest arrivals featuring trendy designs and premium
          quality. Each piece is carefully curated to keep you stylish and
          comfortable.
        </p>
      </div>
      {/*Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6">
        {newCollections.map((item, index) => (
          <ProductsItem
            key={index}
            id={item.id}
            image={item.imgUrl}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
