"use client"
import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css"; 
import { get } from "http";
// import { getDatafromToken } from "@/helpers/getDatafromToken";
export default function Change(){
    const [password, setpassword] = React.useState("");
    const [confirmpassword, setconfirmpassword] = React.useState("");
    const [token,settoken]=React.useState("");
    function warn(){
        toast.warning("Please make sure that both the passwords are same");
    }
    async function gettoken(){
        const res= await axios.get('/api/users/me');
        console.log(res.data.data.token);
        settoken(res.data.data.token);
    }
    React.useEffect(()=>{
        gettoken();
    },[])
    // React.useEffect(()=>{
    //     console.log(token);
    // },[token])
    const changepass = async () => {
        try {
            toast.loading("Changing password");
            const res = await axios.post("/api/users/forgotpassword", { token:token, newpass : password });
            console.log(res.data);
            toast.dismiss();
            toast.success("Password changed successfully");
            // setfpass(true);
    
        } catch (error: any) {
            console.log(error.response.data);
            toast.error(error.response.data);
        }
    }
    return (
        <>
            <ToastContainer />
            <div className="flex flex-col items-center justify-center min-h-screen py-2  content-evenly bg-gradient-to-tr bg-zinc-800 text-white">
                <h1>
                    You are not Logged in.
                    Loggin first to change your password.
                    OR 
                    if you have forgotten your password, then click on the forgot password button in login page.    
                </h1>        
            </div>
        </>
    )
}