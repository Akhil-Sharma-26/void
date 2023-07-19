"use client";
// import "./globals.css";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
export default function ProfilePage(){
    const router=useRouter();
    const logout=async()=>{
        try {
            axios.get('/api/users/logout');
            console.log('logged out');
            toast.success(`User logged out`);
            router.push('/login');
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }
    return(
        <>
        
        <nav><button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="button" onClick={logout}>
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