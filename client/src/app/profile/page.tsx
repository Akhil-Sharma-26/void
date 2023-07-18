"use client";
// import "./globals.css";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
export default function ProfilePage(){
    const logout=async()=>{
        try {
            axios.get('/api/users/logout');
            toast.success(`User logged out`);
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }
    return(
        <>
        
        <nav><button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>
            <div className="logout">
            Logout
            </div>
        </button></nav>
        <div className='items-center  flex flex-col justify-center min-h-screen py-2'>
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
        </div>
        </>
    )
}