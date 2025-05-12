import { assets } from "../assets/asset";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Menu } from "lucide-react";
import PropTypes from "prop-types";
import Loader from "../Pages/Loader";

const Navbar = ({ setVisible, loading, setLoading = () => {} }) => {
  const navigate = useNavigate();

  const handleCartNavigation = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/cart");
      setLoading(false);
    }, 5000);
  };

  const { setShowSearch, getCartCount } = useContext(ShopContext);
  const location = useLocation();
  const hideNavbarRoutes = ["/admin", "/dashboard", "/orders"];

  const dynamicHideRoutes = [/^\/order-items\/[^/]+$/];

  const shouldHideNavbar =
    hideNavbarRoutes.includes(location.pathname) ||
    dynamicHideRoutes.some((regex) => regex.test(location.pathname));

  if (shouldHideNavbar) return null;

  return (
    <>
      {loading && <Loader />}
      <div className="flex items-center justify-between  font-medium">
        <Link to="/">
          <img src={assets.logo_icon1} className="w-20 h-20" alt="" />
        </Link>

        <ul className="hidden sm:flex gap-5 text-sm text-gray-600">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] bq-gray-700 " />
          </NavLink>
          <NavLink
            to="/collections"
            className="flex flex-col items-center gap-1"
          >
            <p>COLLECTIONS</p>
            <hr
              className="w-2/4 border-none h-[1.5px] bq-gray-700 
                hidden"
            />
          </NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
            <hr
              className="w-2/4 border-none h-[1.5px] bq-gray-700 
                hidden"
            />
          </NavLink>
          <NavLink to="contact" className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
            <hr
              className="w-2/4 border-none h-[1.5px] bq-gray-700 
                hidden"
            />
          </NavLink>
        </ul>

        <div className="flex items-center gap-6">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-[20px]"
            onClick={() => setShowSearch(true)}
          />

          <div onClick={handleCartNavigation} className="relative">
            <FontAwesomeIcon icon={faCartPlus} className="text-[20px]" />
            <p className="absolute left-[15px] top-[-7px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </div>

          <Menu
            className="sm:hidden cursor-pointer"
            onClick={() => setVisible(true)}
          />

          {/* Sidebar Menu for Small Screen */}
        </div>
      </div>
    </>
  );
};
Navbar.propTypes = {
  setVisible: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func,
};

export default Navbar;
