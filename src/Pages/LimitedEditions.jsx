import Title from "../Components/Title";
import ProductsItem from "../Components/ProductsItem";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";

const LimitedEditions = () => {
  const { products } = useContext(ShopContext);
  const [limitedEditions, setLimittedEditions] = useState([]);

  useEffect(() => {
    // runs when products has loaded
    if (products.length === 0) return;

    const limitedEdition = products.filter((item) => item.collection === "Limited").slice(0, 12);

    setLimittedEditions(limitedEdition);
  }, [products]);

  // Loading 
  if (products.length === 0) {
    return (
      <div className="my-10 text-center">
        <h2 className="text-xl">Loading......</h2>
      </div>
    );
  }

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"LIMITED"} text2={"EDITIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700">
          Elevate your look with our signature collection of premium headwear.
          Each piece is crafted with attention to detail and style.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {limitedEditions.map((item, index) => (
          <ProductsItem
            key={index}
            id={item.id}
            name={item.name}
            image={item.imgUrl}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LimitedEditions;
