"use client";
import Link from "next/link";
import React ,{useEffect} from "react";
// import Router from "next/router"; wrong
import { useRouter } from "next/navigation";
import axios from "axios";
// import { toast } from "react-hot-toast";
// import {connect} from '@/db/dbConfig';

import { ToastContainer, toast } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";  
export default function SignupPage() {
  // connect();
    const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  // const [buttonDisabled,set] = React.useEffect(false);
  const [buttonDisabled, setbuttonDisabled] =React.useState(false);
  const [loading,setloading]= React.useState(false);
  const onSignup = async () => {
    // As this method is going to talk to database, it is async;
    try {
      setloading(true);
      const response = await axios.post("/api/users/signup",user);
      console.log("Signup siccess",response.data);
      toast.success("Signup success");
      router.push("/login");
    } catch (error:any) {
      console.log("Signup failed",error.message);
      toast.error("Error in sign-up",error.message);
    }
    finally{
      setloading(false); // after some time, loading has to go away
    }
    // use React Toast to customize
  };
  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0 && user.password.length>7){
      setbuttonDisabled(false);

    }
    else{
      setbuttonDisabled(true);
    }
  },[user]);
  return (
    <>
    <ToastContainer/>
    <div className="flex flex-col items-center justify-center min-h-screen py-2 p-3 content-evenly ">
      <h1>{loading ? "Processing" : "SignUp"}</h1>
      <hr />
      <label htmlFor="username" className="font-bold">
        username
      </label>
      <input
        className="p-2 m-2 text-black"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email" className="font-bold">
        email
      </label>
      <input
        className="p-2 m-2 text-black"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password" className="font-bold">
        password
      </label>
      <input
        className="p-2 m-2 text-black"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button onClick={onSignup} className="border">{buttonDisabled ? "No signup" : "SignUp"} </button>
      Already have an account?
      <Link href="/login">click here</Link>
    </div>
    </>
  );
}
