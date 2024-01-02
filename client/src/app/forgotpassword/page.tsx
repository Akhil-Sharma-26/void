"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function initPage (){
    const router = useRouter();
    const [Email, setemail] = React.useState("")
    const [buttonDisabled,setbuttonDisabled]=React.useState(false);
    const [loading,setloading]=React.useState(false);
    const [userID,setuserID]=React.useState("");

    const getUserDetails = async()=>{
        // console.log("Hello profile 2");
        try {
            console.log(Email)
            const res = await axios.post('/api/users/getuserid',{email:Email});
            console.log("Hello profile 3")
            console.log(res.data);
            setuserID(res.data.data._id);
        }
        catch (error:any) {
            toast.error(error.message==400 ? "User not found" : error.message );
            console.log(error);
        }
    }
    const sendemail = async () => {
        try {
          getUserDetails();
          let response = await axios.post("/api/users/sendemail", {email : Email,emailType: "FORGOTPASS", userID: userID});
          console.log("Email sent", response.data);
          toast.success("Email sent successfully. Please Check your Mail box. Also check your spam folder. Follow the steps in the email to reset your password.");
        } catch (error: any) {
          console.log("forgot password failed lol;", error.message);
          toast.error(error.message);
        }
      }
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
          value={Email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="email"
        />
        <button className="p-2 m-2 bg-green-500 text-white rounded-md" onClick={sendemail} >Send Email</button>
        </div>
        </>
    )
}