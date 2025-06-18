import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Compass, Heart } from "lucide-react";
import BizvilityLogo from "../imgs/bizvility-dark-logo.png";
import SearchForm from "./SearchForm";

const Navbar = ({ scrolled, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/signup";
  const authLink = location.pathname === "/signin" ? "/signup" : "/signin";
  const authText = location.pathname === "/signin" ? "Sign Up" : "Sign In";
  const isHome = location.pathname === "/";
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  // console.log(localStorage);
  user = localStorage.token;
  console.log(user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    // Optionally call API to log out on server
    navigate("/signin");
    console.log(localStorage);
    window.location.reload(); // reset app state
  };
  useEffect(() => {
    const onClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <header
      className={`
    fixed top-0 w-full z-50 transition-all duration-300
    flex items-center justify-between 
    ${scrolled ? "bg-white shadow-md h-22 " : "bg-transparent pt-4 h-15"}
  `}
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={BizvilityLogo}
              width={100}
              className="sm:w-[126px]"
              alt="Bizvility Logo"
            />
          </Link>

          {/* Desktop Navigation */}

          <nav className="items-center hidden space-x-8 lg:flex">
            {!isHome && <SearchForm />}
            <Link
              to="/"
              className="mr-2 font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              Home
            </Link>
            <Link
              to="/categories"
              className="font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              Categories
            </Link>
            <Link
              to="/locations"
              className="font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              Locations
            </Link>
            <Link
              to="/about"
              className="font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="items-center hidden space-x-4 lg:flex">
            <button className="flex items-center space-x-1 text-gray-700 transition-colors hover:text-blue-600">
              <Heart className="w-5 h-5" />
              <span>Saved</span>
            </button>
            <Link
              to="/list-business"
              className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
            >
              List Business
            </Link>
            <div ref={menuRef} className="relative">
              {user ? (
                <>
                  <img
                    src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=740"
                    alt={user.name}
                    className="w-12 h-12 rounded-full cursor-pointer"
                    onClick={() => setOpen((o) => !o)}
                  />

                  {open && (
                    <div
                      className={`
                absolute right-0 mt-2 w-48 rounded-md
                bg-white/30 backdrop-blur-sm
                border border-white/40 shadow-lg
              `}
                    >
                      <button className="w-full px-4 py-2 text-left hover:bg-white/20">
                        My Dashboard
                      </button>
                      <button className="w-full px-4 py-2 text-left hover:bg-white/20">
                        Edit Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left hover:bg-white/20"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to="/signin"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="text-gray-700 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute left-0 z-40 w-full px-4 pb-4 transition-all duration-300 bg-white shadow-md top-full lg:hidden">
            <nav className="flex flex-col space-y-4">
              {!isHome && <SearchForm />}
              <Link
                to="/"
                className="font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                Home
              </Link>
              <Link
                to="/categories"
                className="font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                Categories
              </Link>
              <Link
                to="/locations"
                className="font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                Locations
              </Link>
              <Link
                to="/about"
                className="font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                Contact
              </Link>
              <button className="flex items-center space-x-1 text-gray-700 transition-colors hover:text-blue-600">
                <Heart className="w-5 h-5" />
                <span>Saved</span>
              </button>
              <div className="flex items-center pt-2 space-x-2">
                <Link
                  to="/list-business"
                  className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  List Business
                </Link>
                <div className="relative" ref={menuRef}>
                  {user ? (
                    <>
                      <img
                        src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=740"
                        alt={user.name}
                        className="w-10 h-10 rounded-full cursor-pointer"
                        onClick={() => setOpen((o) => !o)}
                      />

                      {open && (
                        <div
                          className={`
                absolute right-0 mt-2 w-48 rounded-md
                bg-white/30 backdrop-blur-sm
                border border-white/40 shadow-lg
              `}
                        >
                          <button className="w-full px-4 py-2 text-left hover:bg-white/20">
                            My Dashboard
                          </button>
                          <button className="w-full px-4 py-2 text-left hover:bg-white/20">
                            Edit Profile
                          </button>
                          <button
                            onClick={handleLogout}
                            className="w-full px-4 py-2 text-left hover:bg-white/20"
                          >
                            Logout
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to="/signin"
                      className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 md:hidden"
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
