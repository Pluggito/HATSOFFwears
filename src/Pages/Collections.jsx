import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Title from "../Components/Title";
import ProductsItem from "../Components/ProductsItem";

const Collections = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  // UI state
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  // Derived state
  const [filterProducts, setFilterProducts] = useState([]);

  console.log(products)

  // 1) Apply filters & search whenever inputs change
  useEffect(() => {
    // Don’t attempt to filter until products have loaded
    if (products.length === 0) {
      setFilterProducts([]);
      return;
    }

    let result = [...products];

    // Text search
    if (showSearch && search.trim()) {
      const term = search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(term));
    }

    // Category filter
    if (category.length > 0) {
      result = result.filter((p) => category.includes(p.category));
    }

    // Sub-category filter
    if (subCategory.length > 0) {
      result = result.filter((p) => subCategory.includes(p.subCategory));
    }

    // Sorting
    if (sortType === "low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }
    // (if “relevant”, leave in original order)

    setFilterProducts(result);
  }, [products, search, showSearch, category, subCategory, sortType]);

  // 2) Handlers for toggling
  const toggleCategory = (e) => {
    const val = e.target.value;
    setCategory((prev) =>
      prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val],
    );
  };

  const toggleSubCategory = (e) => {
    const val = e.target.value;
    setSubCategory((prev) =>
      prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val],
    );
  };

  // 3) Loading or empty states
  if (products.length === 0) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl">Loading Collections…</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-border/40">
      {/* FILTERS */}
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2 font-bold tracking-tight text-foreground"
          onClick={() => setShowFilter((s) => !s)}
        >
          FILTERS
          <FontAwesomeIcon
            icon={faCaretDown}
            className={`text-[20px] sm:hidden transition-transform duration-200 ${
              showFilter ? "rotate-180" : ""
            }`}
          />
        </p>

        <div
          className={`bg-card/50 backdrop-blur-md border border-border/60 pl-5 py-4 mt-6 rounded-2xl ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-xs font-semibold tracking-wider text-foreground uppercase">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            {["T-shirt", "Cap", "Jeans", "Polo", "Hood", "Jersey"].map((cat) => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer hover:text-foreground transition-colors duration-200">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border text-foreground focus:ring-ring bg-background cursor-pointer"
                  value={cat}
                  checked={category.includes(cat)}
                  onChange={toggleCategory}
                />
                {cat}
              </label>
            ))}
          </div>
        {/* <div className="bg-card/50 backdrop-blur-md border border-border/60 pl-5 py-4 my-6 rounded-2xl sm:block hidden">
          <p className="mb-3 text-xs font-semibold tracking-wider text-foreground uppercase">TYPE</p>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            {["Jeka", "Nee-Classics", "Nee-Caps", "NC-Tee"].map((sub) => (
              <label key={sub} className="flex items-center gap-3 cursor-pointer hover:text-foreground transition-colors duration-200">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border text-foreground focus:ring-ring bg-background cursor-pointer"
                  value={sub}
                  checked={subCategory.includes(sub)}
                  onChange={toggleSubCategory}
                />
                {sub}
              </label>
            ))}
          </div>
        </div> */}
      </div>

      {/* PRODUCTS */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />

          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border border-border bg-card text-foreground text-sm px-3 py-2 rounded-lg cursor-pointer focus:outline-none focus:ring-1 focus:ring-border transition-colors"
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {filterProducts.length > 0 ? (
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          
            {filterProducts.map((item) => (
              <ProductsItem
                key={item.id}
                id={item.id}
                image={item.imgUrls?.[0] || item.imgUrl || ""}
                name={item.name}
                price={item.price}
                originalPrice={item.originalPrice}
                discountPercentage={item.discountPercentage}
              />
            ))}
          </div>
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found
          </p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Collections;
