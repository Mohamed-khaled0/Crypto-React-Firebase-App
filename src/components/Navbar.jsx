import React, { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { AiOutlineClose, AiOutlineMenu, AiOutlineHome, AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";

export default function Navbar() {
  const [nav, setNav] = useState(false);
  const { user, logout } = UserAuth();

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setNav(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-primary/80 backdrop-blur-md border-b border-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
            <div className="w-8 h-8 bg-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">₿</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient bg-clip-text text-transparent">
              Crypto Tracker
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-accent transition-colors duration-200"
            >
              <AiOutlineHome size={20} />
              <span>Home</span>
            </Link>
            
            <ThemeToggle />
            
            {user?.email ? (
              <>
                <Link 
                  to="/account" 
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-accent transition-colors duration-200"
                >
                  <AiOutlineUser size={20} />
                  <span>Account</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-red-500 transition-colors duration-200"
                >
                  <AiOutlineLogout size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/signin" 
                  className="text-gray-700 dark:text-gray-300 hover:text-accent transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary px-6 py-2"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={handleNav}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-secondary transition-colors duration-200"
            >
              {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-transform duration-300 ease-in-out ${
          nav ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="fixed inset-0 bg-black/50" onClick={handleNav}></div>
        <div className="fixed right-0 top-0 h-full w-80 bg-primary border-l border-secondary/20 shadow-2xl">
          <div className="flex flex-col h-full">
            {/* Mobile menu header */}
            <div className="flex items-center justify-between p-6 border-b border-secondary/20">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                onClick={handleNav}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-secondary transition-colors duration-200"
              >
                <AiOutlineClose size={24} />
              </button>
            </div>

            {/* Mobile menu items */}
            <div className="flex-1 px-6 py-4 space-y-4">
              <Link
                onClick={handleNav}
                to="/"
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-secondary transition-colors duration-200"
              >
                <AiOutlineHome size={20} />
                <span>Home</span>
              </Link>

              {user?.email ? (
                <>
                  <Link
                    onClick={handleNav}
                    to="/account"
                    className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-secondary transition-colors duration-200"
                  >
                    <AiOutlineUser size={20} />
                    <span>Account</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-red-500/10 hover:text-red-500 transition-colors duration-200 w-full text-left"
                  >
                    <AiOutlineLogout size={20} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="space-y-3">
                  <Link
                    onClick={handleNav}
                    to="/signin"
                    className="block w-full p-3 text-center bg-secondary text-primary rounded-lg hover:bg-secondary/80 transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    onClick={handleNav}
                    to="/signup"
                    className="block w-full p-3 text-center btn-primary"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              <div className="pt-4 border-t border-secondary/20">
                <ThemeToggle />
              </div>
            </div>

            {/* User info */}
            {user?.email && (
              <div className="p-6 border-t border-secondary/20">
                <p className="text-sm text-gray-600 dark:text-gray-400">Signed in as</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user.email}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
