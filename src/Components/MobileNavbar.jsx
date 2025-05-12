import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

import PropTypes from "prop-types";

const MobileNavbar = ({ visible, setVisible }) => {
  return (
    <div
      className={`fixed top-0 right-0 bottom-0 overflow-x-hidden overflow-y-auto bg-white transition-all duration-300 z-50 ${
        visible ? "w-full" : "w-0"
      }`}
    >
      <div className="flex flex-col text-gray-600">
        <div
          onClick={() => setVisible(false)}
          className="flex itmes-center gap-4 p-3 cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="text-[20px] mt-[4px] mr-[-5px]"
          />
          <p>Back</p>
        </div>

        <NavLink
          onClick={() => setVisible(false)}
          to="/"
          className="py-2 pl-6 border"
        >
          HOME
        </NavLink>
        <NavLink
          onClick={() => setVisible(false)}
          to="/collections"
          className="py-2 pl-6 border"
        >
          COLLECTIONS
        </NavLink>
        <NavLink
          onClick={() => setVisible(false)}
          to="/about"
          className="py-2 pl-6 border"
        >
          ABOUT
        </NavLink>
        <NavLink
          onClick={() => setVisible(false)}
          to="/contact"
          className="py-2 pl-6 border"
        >
          CONTACT
        </NavLink>
      </div>
    </div>
  );
};

MobileNavbar.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default MobileNavbar;
