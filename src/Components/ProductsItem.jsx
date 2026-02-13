import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";
//import { ShoppingBag } from "lucide-react"
import PropTypes from "prop-types";

export default function ProductsItem({
  id,
  image,
  name,
  price,
  originalPrice,
  discountPercentage,
}) {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md flex flex-col h-full"
      to={`/product/${id}`}
    >
      <div className="aspect-square overflow-hidden bg-gray-100 relative">
        <img
          className="h-full w-full object-cover transition-all group-hover:scale-105"
          src={image}
          alt={name || "Product"}
          loading="lazy"
        />
        {/* Discount Tag */}
        {discountPercentage && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discountPercentage}% OFF
          </span>
        )}
      </div>

      <div className="p-3 flex flex-col flex-grow">
        <h3 className="font-semibold text-base">{name}</h3>
        <div className="mt-auto pt-1 flex items-center justify-between">
          <div className="flex flex-col">
            {originalPrice && (
              <span className="text-gray-500 text-sm line-through">
                {currency}
                {originalPrice.toLocaleString()}
              </span>
            )}
            <span className="font-medium text-lg text-red-600">
              {currency}
              {price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

ProductsItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  originalPrice: PropTypes.number,
  discountPercentage: PropTypes.number,
  availability: PropTypes.string,
};
