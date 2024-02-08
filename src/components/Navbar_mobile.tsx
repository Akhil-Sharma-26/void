"use client"
import React from "react";
import Image from "next/image";
import { Button } from "@mui/material";

export default function MobileNavbar() {
    return (
        <>
            <div className="flex mr-16 items-end justify-between w-1/4 bg-black h-full flex-col">
                <Button className="" href="/">
                            Home
                </Button>
                <li>
                    <ul>
                        

                    </ul>
                    <ul>
                        <Button href="/feed" className="">
                            Feed
                        </Button>
                    </ul>
                    <ul>
                        <Button href="/signup">New</Button>
                    </ul>
                    <ul>
                        <Button href="/profile">Profile</Button>
                    </ul>
                </li>

            </div>
        </>
    )


}