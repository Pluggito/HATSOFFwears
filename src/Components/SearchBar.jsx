import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="border-t boder-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border  border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="text-[20px] cursor-pointer"
        />
      </div>
      <FontAwesomeIcon
        onClick={() => setShowSearch(false)}
        icon={faXmark}
        className="text-[20px] cursor-pointer"
      />
    </div>
  ) : null;
};

export default SearchBar;
