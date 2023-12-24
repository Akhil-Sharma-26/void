import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function forgotPassword() {
    return (<>
    <ToastContainer />
    <div className="flex flex-col items-center justify-center min-h-screen py-2  content-evenly bg-gradient-to-tr bg-zinc-800 ">
        <h1 className="text-4xl font-mono p-5 font-bold ">Forgot Password</h1>
        <hr />
        <div>
            <p className="text-xl font-mono pb-5">Enter the new password</p>
        </div>
        <label htmlFor="password" className="font-bold font-mono ">New Password</label>
        <input className="p-2 text-black " type="password" id="New Password" placeholder="New Passoword"/>
        <label htmlFor="password" className="font-bold font-mono ">Confirm Password</label>
        <input className="p-2 text-black " type="password" id="Confirm Password" placeholder="Confirm Password"/>
        <button className="p-2 m-2 bg-green-500 text-white rounded-md">Change password</button>
    </div>
    </>);
}