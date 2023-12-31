"use client";
import axios from "axios";
import Link from "next/link";
import React from "react";  
import { ToastContainer, toast } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";  
export default function VerifyEmailPage(){
    const [token,settoken]=React.useState("");
    const [verified,setverified]=React.useState(false);
    const [error,seterror]=React.useState(false);
    const verifyUserEmail=async()=>{
        try {
            toast.loading("Verifying email");
            await axios.post('/api/users/email',{token});
            toast.success("Email verified. Enjoy your stay!");
            setverified(true);
        } catch (error: any) {
            seterror(true);
            console.log(error.response.data);
        }
    }
    React.useEffect(()=>{
        const urltoken=window.location.search.split("=")[1];
        settoken(urltoken || "");
    },[]);
    React.useEffect(()=>{
        if(token.length>0){
            verifyUserEmail();
        }
    },[token]);
    return(
        <>
        <ToastContainer/>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-5xl">Verifing your email. Please wait...</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token? `${token}`:"no token"}</h2>
            {verified &&(<div>
                <h2 className="text-2xl">Email Verified</h2>
                <Link href="/" className="bg-green-500">Home Page</Link>
            </div>)}
            {error &&(<div>
                <h2 className="text-2xl bg-red-600 text-black">error</h2>
                <Link href="/login">Login</Link>
            </div>)}
        </div>
        </>
    )
}