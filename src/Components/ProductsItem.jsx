import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";
//import { ShoppingBag } from "lucide-react"
import PropTypes from "prop-types";

export default function ProductsItem({ id, image, name, price }) {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md flex flex-col h-full"
      to={`/product/${id}`}
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          className="h-full w-full object-cover transition-all group-hover:scale-105"
          src={image}
          alt={name || "Product"}
        />
      </div>

      <div className="p-3 flex flex-col flex-grow">
        <h3 className="font-semibold text-base">{name}</h3>
          <div className="mt-auto pt-1 flex items-center justify-between">
          <span className="font-medium text-lg">
            {currency}
            {price.toLocaleString()}
          </span>
        </div>        
      </div>
    </Link>
  );
}

ProductsItem.propTypes = {
  id: PropTypes.string.isRequired,
  // image: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  availability: PropTypes.string,
};
