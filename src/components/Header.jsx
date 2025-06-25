import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { MdShoppingCart } from "react-icons/md";
import { logout } from "../store/authSlice";
import CartPopup from "../components/CartPopup";
import { getDataFromLocalStorage } from "../store/cartSlice";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [cartPopupOpen, setCartPopupOpen] = useState(false);
  const dropdownTimeout = useRef(null);
  const cartPopupRef = useRef(null);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = useSelector((state) => state.count);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleProfileClick = () => navigate("/profile");

  const handleProfileEnter = () => {
    clearTimeout(dropdownTimeout.current);
    setProfileDropdown(true);
  };
useEffect(() => {
  dispatch(getDataFromLocalStorage());
}, [dispatch]);

  const handleProfileLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setProfileDropdown(false);
    }, 250);
  };

  const toggleDropdownClick = () => {
    setProfileDropdown((prev) => !prev);
  };

  const toggleCartPopup = () => {
    setCartPopupOpen((prev) => !prev);
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-12 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="hover:text-gray-600 font-semibold text-[#0e3477]"
            >
              Home
            </Link>
            <Link
              to="/services"
              className="hover:text-gray-600 font-semibold text-[#0e3477]"
            >
              Services
            </Link>
            <Link
              to="/about"
              className="hover:text-gray-600 font-semibold text-[#0e3477]"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-gray-600 font-semibold text-[#0e3477]"
            >
              Contact
            </Link>
            <Link
              to="/blog"
              className="hover:text-gray-600 font-semibold text-[#0e3477]"
            >
              Blog
            </Link>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative" ref={cartPopupRef}>
              <button
                type="button"
                className="relative flex items-center gap-2 text-gray-600 font-semibold hover:text-[#0e3477] focus:outline-none"
                onClick={toggleCartPopup}
              >
                <MdShoppingCart className="text-2xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] px-1.5 py-[1px] rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
              <CartPopup
                isOpen={cartPopupOpen}
                onClose={() => setCartPopupOpen(false)}
              />
            </div>
            {!isLoggedIn ? (
              <Link
                to="/auth"
                className="text-gray-600 font-semibold hover:text-[#0e3477]"
              >
                Login/Signup
              </Link>
            ) : (
              <>
                {user?.role === "admin" ? (
                  <Link
                    to="/admin"
                    className="text-gray-600 font-semibold hover:text-[#0e3477]"
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <div
                    className="relative"
                    onMouseEnter={handleProfileEnter}
                    onMouseLeave={handleProfileLeave}
                  >
                    <button
                      onClick={handleProfileClick}
                      className="flex items-center focus:outline-none"
                      title="Profile"
                    >
                      <FaUserCircle className="text-2xl text-[#0e3477] hover:text-[#0d2f6c] transition duration-300" />
                    </button>
                    {profileDropdown && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-md z-50 transition-all duration-300 ease-in-out">
                        <button
                          onClick={handleLogout}
                          className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-[#f3f4f6] hover:text-red-600 transition duration-300"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-[#0e3477] focus:outline-none"
            >
              {isOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiOutlineMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4 border-t pt-4">
            <Link
              to="/"
              className="block text-gray-600 font-semibold hover:text-[#0e3477]"
            >
              Home
            </Link>
            <Link
              to="/services"
              className="block text-gray-600 font-semibold hover:text-[#0e3477]"
            >
              Services
            </Link>
            <Link
              to="/about"
              className="block text-gray-600 font-semibold hover:text-[#0e3477]"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block text-gray-600 font-semibold hover:text-[#0e3477]"
            >
              Contact
            </Link>
            <Link
              to="/blog"
              className="block text-gray-600 font-semibold hover:text-[#0e3477]"
            >
              Blog
            </Link>
            <div className="pt-2 space-y-1">
              <div className="relative" ref={cartPopupRef}>
                <button
                  type="button"
                  className="flex items-center gap-2 text-gray-600 font-semibold hover:text-[#0e3477] focus:outline-none"
                  onClick={toggleCartPopup}
                >
                  <MdShoppingCart className="text-2xl" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] px-1.5 py-[1px] rounded-full">
                      {cartCount}
                    </span>
                  )}
                </button>
                <CartPopup
                  isOpen={cartPopupOpen}
                  onClose={() => setCartPopupOpen(false)}
                />
              </div>
              {!isLoggedIn ? (
                <Link
                  to="/auth"
                  className="block text-gray-600 font-semibold hover:text-[#0e3477]"
                >
                  Login/Signup
                </Link>
              ) : (
                <>
                  {user?.role === "admin" ? (
                    <Link
                      to="/admin"
                      className="block text-gray-600 font-semibold hover:text-[#0e3477]"
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    <div className="relative">
                      <button
                        onClick={() => {
                          handleProfileClick();
                          toggleDropdownClick();
                        }}
                        className="flex items-center gap-2 text-gray-600 font-semibold hover:text-[#0e3477]"
                      >
                        <FaUserCircle className="text-xl" /> Profile
                      </button>
                      {profileDropdown && (
                        <div className="mt-2 w-full bg-white border border-gray-200 rounded-md shadow-md z-50">
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#f3f4f6] hover:text-red-600"
                          >
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
