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
      prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val]
    );
  };

  const toggleSubCategory = (e) => {
    const val = e.target.value;
    setSubCategory((prev) =>
      prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val]
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
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* FILTERS */}
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter((s) => !s)}
        >
          FILTERS
          <FontAwesomeIcon
            icon={faCaretDown}
            className={`text-[20px] sm:hidden ${
              showFilter ? "rotate-180" : ""
            }`}
          />
        </p>

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["T-shirt", "Accessories", "Jeans"].map((cat) => (
              <label key={cat} className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={cat}
                  checked={category.includes(cat)}
                  onChange={toggleCategory}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <div
          className={`border border-gray-300 pl-5 py-3 my-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Jeka", "Nee-Classics", "Nee-Caps", "NC-Tee"].map((sub) => (
              <label key={sub} className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={sub}
                  checked={subCategory.includes(sub)}
                  onChange={toggleSubCategory}
                />
                {sub}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />

          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
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
                image={item.imgUrl}
                name={item.name}
                price={item.price}
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
  );
};

export default Collections;
