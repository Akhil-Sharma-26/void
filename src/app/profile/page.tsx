"use client";
// import "./globals.css";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
// import { toast } from "react-hot-toast";
import { ToastContainer, toast } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";  
export default function ProfilePage(){
    const router=useRouter();
    const logout=async()=>{
        try {
            toast.loading("Logging out");
            axios.get('/api/users/logout');
            console.log('logged out');
            toast.success(`User logged out`);
            router.push('/login');
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }
    // console.log("Hello profile");
    const [data,setdata]=React.useState("");
    const getUserDetails = async()=>{
        // console.log("Hello profile 2");
        toast.loading("Fetching user details");
        const res=await axios.get('/api/users/me');
        console.log(res.data);
        setdata(res.data.data.username);
    }
    // ! use the useEffect hook to transfer the user to his own personal page whenever he lands on `/profile` page
    React.useEffect(()=>{
        getUserDetails();
        router.push(`/profile/${data}`);
    },[data])
    return(
        <>
        <ToastContainer/>
        <nav><button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="button" onClick={logout}>
            <div className="logout">
            Logout
            </div>
        </button></nav>
        
        <div className='items-center  flex flex-col justify-center min-h-screen py-2'>
        <h2>{data==='hello'?"Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <button className="bg-purple-700 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded border-black" onClick={getUserDetails}>
            User Detail
        </button>
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
        </div>
        </>
    )
}