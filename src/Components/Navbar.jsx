import { assets } from "../assets/asset";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Menu, Sun, Moon } from "lucide-react";
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

  const { setShowSearch, getCartCount, theme, toggleTheme } = useContext(ShopContext);
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
      <div className="sticky top-0 z-50 flex items-center justify-between font-medium py-4 bg-background/80 backdrop-blur-md border-b border-border/40 transition-colors duration-300">
        <Link to="/">
          <img src={assets.logo_icon1} className="w-20 h-20 dark:invert" alt="Hats Off Logo" />
        </Link>

        <ul className="hidden sm:flex gap-5 text-sm text-muted-foreground">
          <NavLink to="/" className="flex flex-col items-center gap-1 hover:text-foreground transition-colors">
            <p>HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-foreground hidden" />
          </NavLink>
          <NavLink
            to="/collections"
            className="flex flex-col items-center gap-1 hover:text-foreground transition-colors"
          >
            <p>COLLECTIONS</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-foreground hidden" />
          </NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-1 hover:text-foreground transition-colors">
            <p>ABOUT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-foreground hidden" />
          </NavLink>
          <NavLink to="/contact" className="flex flex-col items-center gap-1 hover:text-foreground transition-colors">
            <p>CONTACT</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-foreground hidden" />
          </NavLink>
        </ul>

        <div className="flex items-center gap-6">
          {/* Light/Dark Mode Switcher */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-accent text-foreground transition-colors duration-200"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-[20px] cursor-pointer hover:text-foreground/80 transition-colors"
            onClick={() => setShowSearch(true)}
          />

          <div onClick={handleCartNavigation} className="relative cursor-pointer hover:text-foreground/80 transition-colors">
            <FontAwesomeIcon icon={faCartPlus} className="text-[20px]" />
            <p className="absolute left-[15px] top-[-7px] w-4 text-center leading-4 bg-foreground text-background aspect-square rounded-full text-[8px] font-bold">
              {getCartCount()}
            </p>
          </div>

          <Menu
            className="sm:hidden cursor-pointer hover:text-foreground/80 transition-colors"
            onClick={() => setVisible(true)}
          />
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
