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
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-border flex flex-col h-full"
      to={`/product/${id}`}
    >
      <div className="aspect-square overflow-hidden bg-muted relative">
        <img
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          src={image}
          alt={name || "Product"}
          loading="lazy"
        />
        {/* Refreshed Minimalist Discount Pill */}
        {discountPercentage && (
          <span className="absolute top-3 left-3 bg-red-500/95 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full tracking-wider uppercase z-10">
            {discountPercentage}% OFF
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-base text-foreground tracking-tight group-hover:text-foreground/80 transition-colors duration-200">
          {name}
        </h3>
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="flex flex-col">
            {originalPrice && (
              <span className="text-muted-foreground text-xs line-through tracking-wide">
                {currency}
                {originalPrice.toLocaleString()}
              </span>
            )}
            <span className="font-bold text-lg text-foreground tracking-tight mt-0.5">
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
