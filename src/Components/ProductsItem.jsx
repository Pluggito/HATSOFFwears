import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getProductEffectivePrice } from "../lib/productPricing";

export default function ProductsItem({ id, image, name, price, availability }) {
  const { currency, products } = useContext(ShopContext);
  const product = products.find((item) => item.id === id) || { price };
  const salePrice = getProductEffectivePrice(product);
  const hasDiscount = salePrice < Number(price || 0);

  return (
    <Link className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-border flex flex-col h-full" to={`/product/${id}`}>
      <div className="aspect-square overflow-hidden bg-muted relative">
        <img className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" src={image} alt={name || "Product"} loading="lazy" />
        {(availability === "Out of Stock" || availability === "Sold out") && <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full tracking-wider uppercase z-10">{availability === "Sold out" ? "Sold out" : "Out of Stock"}</span>}
        {hasDiscount && <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full tracking-wider uppercase z-10">Sale</span>}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-base text-foreground tracking-tight group-hover:text-foreground/80 transition-colors duration-200">{name}</h3>
        <div className="mt-auto pt-2 flex flex-col">
          <span className="font-bold text-lg text-foreground tracking-tight">{currency}{salePrice.toLocaleString()}</span>
          {hasDiscount && <span className="text-sm text-muted-foreground line-through">{currency}{Number(price || 0).toLocaleString()}</span>}
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
  availability: PropTypes.string,
};
