import React, { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

export default function Navbar() {
    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
      };
    
  return (
    <div className="rounded-div flex items-center justify-between font-bold  h-20 ">
      <Link to="/">
        <h1 className="text-2xl" >Crypto</h1>
      </Link>
      {/* Toggle BTN */}
      <div className="hidden md:block">
        <ThemeToggle />
      </div>

      <div className="hidden md:block">
        <Link to="/signin" className="p-4 hover:text-accent duration-200">Sign In</Link>
        <Link to="/signup" className="bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl ">Sign Up</Link>
      </div>

      {/* Mobile menu icon */}
      <div onClick={handleNav} className="block md:hidden cursor-pointer z-10">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          nav
            ? "md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10"
            : "fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-300"
        }
      >
        <ul className="w-full ml-[30px] mb-16 ">
          <li>
            <Link to="/" className=''>Home</Link>
          </li>
          <li>
            <Link to="/" className=' '>Account</Link>
          </li>
          <li className='mt-2 mr-0'>
            <ThemeToggle />
          </li>
        </ul>
        <div className='flex flex-col w-full p-4'>
          <Link to="/signin"               
          className='w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl'
          >
            <button>Sign In</button>
          </Link>
          <Link to="/signup" 
          className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'>
            <button>Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
