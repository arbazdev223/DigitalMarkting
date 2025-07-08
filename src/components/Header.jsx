import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { MdShoppingCart } from "react-icons/md";
import { getInitials, logout } from "../store/authSlice";
import CartPopup from "../components/CartPopup";
import {
  getDataFromLocalStorage,
  selectCartTotalQuantity,
} from "../store/cartSlice";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [cartPopupOpen, setCartPopupOpen] = useState(false);
  const dropdownTimeout = useRef(null);
  const cartPopupRef = useRef(null);
  const cartPopupTimeout = useRef(null);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

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

  const handleCartMouseEnter = () => {
    clearTimeout(cartPopupTimeout.current);
    setCartPopupOpen(true);
  };
  const handleCartMouseLeave = () => {
    cartPopupTimeout.current = setTimeout(() => setCartPopupOpen(false), 200);
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
              className="hover:text-gray-600 font-semibold text-primary"
            >
              Home
            </Link>
            <Link
              to="/services"
              className="hover:text-gray-600 font-semibold text-primary"
            >
              Services
            </Link>
            <Link
              to="/about"
              className="hover:text-gray-600 font-semibold text-primary"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-gray-600 font-semibold text-primary"
            >
              Contact
            </Link>
            <Link
              to="/blog"
              className="hover:text-gray-600 font-semibold text-primary"
            >
              Blog
            </Link>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <div
              className="relative"
              ref={cartPopupRef}
              onMouseEnter={handleCartMouseEnter}
              onMouseLeave={handleCartMouseLeave}
            >
              <button
                type="button"
                className="relative flex items-center gap-2 text-gray-600 font-semibold hover:text-primary focus:outline-none"
              >
                <MdShoppingCart className="text-2xl" />
                {cartTotalQuantity > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] px-1.5 py-[1px] rounded-full">
                    {cartTotalQuantity}
                  </span>
                )}
              </button>
              <CartPopup
                isOpen={cartPopupOpen}
                onClose={() => setCartPopupOpen(false)}
                cartItems={cart}
              />
            </div>
            {!isLoggedIn ? (
              <Link
                to="/auth"
                className="text-gray-600 font-semibold hover:text-primary"
              >
                Login/Signup
              </Link>
            ) : (
              <>
                {user?.role === "admin" ? (
                  <Link
                    to="/admin"
                    className="text-gray-600 font-semibold hover:text-primary"
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
                      {user?.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt="Profile"
                          className="w-6 h-6 rounded-full object-cover border border-gray-300"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold border border-gray-300">
                          {getInitials(user?.name)}
                        </div>
                      )}
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
              className="text-gray-600 hover:text-primary focus:outline-none"
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
          <div className="md:hidden   mt-2 h-[calc(100vh-4rem)] space-y-2 pb-4 border-t pt-4">
            <Link
              to="/"
              className="block text-gray-600 font-semibold hover:text-primary"  onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/services"
              className="block text-gray-600 font-semibold hover:text-primary"  onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/about"
              className="block text-gray-600 font-semibold hover:text-primary"  onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block text-gray-600 font-semibold hover:text-primary" onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/blog"
              className="block text-gray-600 font-semibold hover:text-primary"  onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <div className="pt-2 space-y-1">
              <div
                className="relative"
                ref={cartPopupRef}
                onMouseEnter={handleCartMouseEnter}
                onMouseLeave={handleCartMouseLeave}
              >
                <button
                  type="button"  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-gray-600 font-semibold hover:text-primary focus:outline-none"
                >
                  <MdShoppingCart className="text-2xl" />
                  {cartTotalQuantity > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] px-1.5 py-[1px] rounded-full">
                      {cartTotalQuantity}
                    </span>
                  )}
                </button>
                <CartPopup
                  isOpen={cartPopupOpen}
                  onClose={() => setCartPopupOpen(false)}
                  cartItems={cart}
                />
              </div>
              {!isLoggedIn ? (
                <Link
                  to="/auth"
                  className="block text-gray-600 font-semibold hover:text-primary"  onClick={() => setIsOpen(false)}
                >
                  Login/Signup
                </Link>
              ) : (
                <>
                  {user?.role === "admin" ? (
                    <Link
                      to="/admin"
                      className="block text-gray-600 font-semibold hover:text-primary"
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
                        className="flex items-center gap-2 text-gray-600 font-semibold hover:text-primary"
                      >
                        {user?.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt="Profile"
                            className="w-6 h-6 rounded-full object-cover border border-gray-300"  onClick={() => setIsOpen(false)}
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold border border-gray-300"  onClick={() => setIsOpen(false)}>
                            {getInitials(user?.name)}
                          </div>
                        )}
                        Profile
                      </button>
                      {profileDropdown && (
                        <div className="mt-2 w-full bg-white border border-gray-200 rounded-md shadow-md z-50"  onClick={() => setIsOpen(false)}>
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
