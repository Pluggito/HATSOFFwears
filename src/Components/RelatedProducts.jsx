import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";
import ProductsItem from "./ProductsItem";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();

      const normalize = (val) => {
        if (!val) return "";
        if (Array.isArray(val)) return String(val[0]).trim().toLowerCase();
        return String(val).trim().toLowerCase();
      };

      if (category) {
        const targetCategory = normalize(category);
        productsCopy = productsCopy.filter(
          (item) => normalize(item.category) === targetCategory
        );
      }
      
      const targetSub = normalize(subCategory);
      if (targetSub) {
        const refinedCopy = productsCopy.filter(
          (item) =>
            normalize(item.subCategory) === targetSub ||
            normalize(item.type) === targetSub
        );
        // Fallback to broader category if subCategory is too strict
        if (refinedCopy.length > 0) {
          productsCopy = refinedCopy;
        }
      }

      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => (
          <ProductsItem
            key={index}
            id={item.id}
            name={item.name}
            price={item.price}
            image={item.imgUrls?.[0] || item.imgUrl}
            originalPrice={item.originalPrice}
            discountPercentage={item.discountPercentage}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
