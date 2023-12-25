"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function initPage(){
    return (
        <>
        <ToastContainer/>
        <div className="flex flex-col items-center justify-center min-h-screen py-2  content-evenly bg-gradient-to-tr bg-zinc-800 ">
        <h1 className="text-4xl font-mono p-5 font-bold " >Forgot Password</h1>
        <hr />
        <div>
            <p className="text-xl font-mono pb-5">Enter your email address and we will send you a link to reset your password.</p>
        </div>
        <label htmlFor="email" className="font-bold font-mono ">E-mail</label>
        <input
          className="p-2 text-black "
          type="email"
          id="email"
          // value={user.email}
          // onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <button className="p-2 m-2 bg-green-500 text-white rounded-md" >Send Email</button>
        </div>
        </>
    )
}