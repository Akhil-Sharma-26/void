"use client"
import React from "react"
import Image from "next/image";
import './globals.css';
import { Button } from "@mui/material";
export default function Navbar() {
    return (
      <div className="overflow-scroll">
        <nav className="text-black items-center font-mont text-2xl" id="navbar">
          <div className="items-start">
            <Image src="/next.svg" alt="logo" width={100} height={20} className="ml-16"/>
          </div>
          <div className="flex mr-16 items-end justify-between w-1/4">
            <Button  className="" href="/">
              Home
            </Button>
            <Button href="/" className="">
              Hey
            </Button>
            <Button href="/">
              World
            </Button>
            <Button href="/">
              hehe
            </Button>
          </div>
          
        </nav>
        </div>
        )}