"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@mui/material";
import Navbar_mobile from "../components/Navbar_mobile";
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const showMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    }

    return (
    <div className="">
      <nav className="text-black items-center font-mont text-2xl" id="navbar">
        <div className="items-start">
          <Image
            src="/vercel.svg"
            alt="logo"
            width={100}
            height={20}
            className="ml-16 invert"
          />
        </div>
        
        <div className={`md:flex md:mr-16 md:items-end md:justify-between md:w-1/4 ${isMenuOpen ? <Navbar_mobile/> : 'hidden'} md:block`}>
          <Button className="" href="/">
            Home
          </Button>
          <Button href="/feed" className="">
            Feed
          </Button>
          <Button href="/signup">New</Button>
          <Button href="/profile">Profile</Button>
        </div>
        <Button type="button" className="items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden block" aria-controls="navbar-hamburger" aria-expanded="false" href="#" onClick={showMenu}>
        <span className="sr-only">Open main menu</span>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
      </svg>
    </Button>
      </nav>
    </div>
  );
}