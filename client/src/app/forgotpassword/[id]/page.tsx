"use client"
import axios from "axios";
import Link from "next/link";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ForgotPassword({ params }: any) {
    const [token, settoken] = React.useState("");
    const [verified, setverified] = React.useState(false);
    const [password, setpassword] = React.useState("");
    const [confirmpassword, setconfirmpassword] = React.useState("");
    const isVerified = async () => {
        try {
            const res = await axios.post("/api/users/verifyusertoken", { token });
            console.log(res.data);
            setverified(true);
        } catch (error: any) {
            console.log(error.response.data);
        }
    }
    console.log(params.id);
    React.useEffect(() => {
        const urltoken = window.location.search.split("=")[1];
        settoken(urltoken || "");
    }, []);
    React.useEffect(() => {
        if (token.length > 0) {
            isVerified();
        }
        else{
            console.log("No token");
        }
    }, [token]);
    const changepass = async () => {
        try {
            const res = await axios.post("/api/users/forgotpassword", { token:token, newpass : password });
            console.log(res.data);
            toast.success("Password changed successfully");

        } catch (error: any) {
            console.log(error.response.data);
            toast.error(error.response.data);
        }
    }
    return (<>
        <ToastContainer />
        {verified ? (
            <div className="flex flex-col items-center justify-center min-h-screen py-2  content-evenly bg-gradient-to-tr bg-zinc-800 ">
                <h1 className="text-4xl font-mono p-5 font-bold ">Forgot Password</h1>
                <hr />
                <div>
                <p className="text-xl font-mono pb-5">Enter the new password</p>
                </div>
                <label htmlFor="password" className="font-bold font-mono"
                >New Password</label>
                <input className="p-2 text-black " type="password" id="New Password" placeholder="New Passoword" value={password} 
                onChange={(e) => setpassword(e.target.value)}/>
                <label htmlFor="password" className="font-bold font-mono ">Confirm Password</label>
                <input className="p-2 text-black " type="password" id="Confirm Password" placeholder="Confirm Password" value={confirmpassword}
                onChange={(e)=> setconfirmpassword(e.target.value)}/>
                {password===confirmpassword ?(
                    <button className="p-2 m-2 bg-green-500 text-white rounded-md" onClick={changepass}>Change password</button>
                ):(
                    <button className="p-2 m-2 bg-red-600 text-white rounded-md" disabled>Change password</button>
                )}
                
            </div>) : (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-5xl">
                    Your Token has Expired... Try again
                </h1>
                <Link
                    href="/forgotpassword"
                    className="bg-green-500 
                    hover:bg-green-700
                    text-white
                    font-bold
                    py-2
                    px-4
                    rounded
                    " 
                >
                    Click here to Try Again!!!
                </Link>
            </div>)}

    </>);
}