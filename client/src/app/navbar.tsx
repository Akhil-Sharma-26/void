"use client";
import React from "react";
import Image from "next/image";
import "./globals.css";
import { Button } from "@mui/material";
export default function Navbar() {
    // const [loggedInUser,setloggedInUser] = React.useState(()=>{loggedInUser(false)});
    return (
    <div className="">
      <nav className="text-black items-center font-mont text-2xl" id="navbar">
        <div className="items-start">
          <Image
            src="/next.svg"
            alt="logo"
            width={100}
            height={20}
            className="ml-16 invert"
          />
        </div>
        <div className="flex mr-16 items-end justify-between w-1/4">
          <Button className="" href="/">
            Home
          </Button>
          <Button href="/feed" className="">
            Feed
          </Button>
          <Button href="/signup">New</Button>
          {/* <Button href="/profile">{ ?   "Profile" : "Signup"}</Button> */}
          <Button href="/profile">Profile</Button>
        </div>
      </nav>
    </div>
  );
}
