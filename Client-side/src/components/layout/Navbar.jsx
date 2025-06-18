import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Compass, Heart } from "lucide-react";
import BizvilityLogo from "../imgs/bizvility-dark-logo.png";
import SearchForm from "./SearchForm";

const Navbar = ({ scrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/signup";
  const authLink = location.pathname === "/signin" ? "/signup" : "/signin";
  const authText = location.pathname === "/signin" ? "Sign Up" : "Sign In";
  const isHome = location.pathname === "/";
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
            {!isAuthPage && (
              <Link
                to={authLink}
                className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
              >
                {authText}
              </Link>
            )}
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
              <div className="flex items-center pt-2 space-x-2">
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
                {!isAuthPage && (
                  <Link
                    to={authLink}
                    className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    {authText}
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
