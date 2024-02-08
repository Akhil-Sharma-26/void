"use client";
import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function InitPage (){
    // const router = useRouter();
    const [Email, setemail] = React.useState("")
    const [userID,setuserID]=React.useState("");

    const getUserDetails = async()=>{
        // console.log("Hello profile 2");
        try {
            console.log(Email)
            toast.loading("Fetching user details. Please wait. Don't click the button again.");
            toast.dismiss();
            const res = await axios.post('/api/users/getuserid',{email:Email});
            console.log("Hello profile 3")
            toast.info("User details fetched successfully.");
            console.log(res.data);
            console.log(res.data.data._id);
            if(res) {
              setuserID(res.data.data._id);
              return res.data.data._id;
            }
            return null
        }
        catch (error:any) {
            toast.error( error.response.data.error);
            console.log("Error in fetching user details", error);
            // console.log(error);
        }
    }
    const sendemail = async () => {
        try {
          const userID = await getUserDetails(); 
          if(!userID){
            toast.error("Email not found. You entered the wrong email!");
            return;
        } 
          // if (!userID) {
          //   toast.error("Check your email. If it is correct, click once again.");
          //   return;
          // }
          toast.loading("Sending email.");
          toast.warning("Please wait for 5 seconds before clicking the button again. If it shows error 500, then wait for 1 minute before clicking the button again. If it still shows error 500, then contact the admin.");
          let response = await axios.post("/api/users/sendemail", {email : Email,emailType: "FORGOTPASS", userID: userID});
          toast.dismiss();
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
        <div className="flex flex-col items-center justify-center min-h-screen py-2  content-evenly bg-gradient-to-tr bg-zinc-800 text-white ">
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