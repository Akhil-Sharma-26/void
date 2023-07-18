import React from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import "./feed.css";
export default function feed() {
  return (
    <div className="overflow-scroll">
      <nav className="text-black items-center font-mont text-2xl" id="navbar">
        <div className="items-start">
          <Image src="/next.svg" alt="logo" width={100} height={20} className="ml-16"/>
        </div>
        <div className="flex mr-16 items-end justify-between w-1/4">
          <div className="">
            Hello
          </div>
          <div>
            Hey
          </div>
          <div>
            World
          </div>
          <div>
            hehe
          </div>
        </div>
        
      </nav>
      <div className="" id="body">
        Hello
      </div>
      
    </div>
  );
}
