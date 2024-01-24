"use client";
import Link from "next/link";
import React from "react";
import { ToastContainer, toast } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css";  
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    // username: "",
  });
  const [buttonDisabled,setbuttonDisabled]=React.useState(false);
  const [loading,setloading]=React.useState(false);
  function warn(){
    toast.warning("Please make sure that both the fields are filled");
  }
  const onLogin = async () => {
    // As this method is going to talk to database, it is async
    try {
      setloading(true);
      toast.loading("Logging in. Please wait!");
      let response=await axios.post("/api/users/login",user);
      console.log("Login success",response.data);
      toast.success("login success");
      router.push("/profile");
    } catch (error:any) {
      console.log("Login failed lol;",error.message);
      toast.error(error.message);
    }
    finally {
      setloading(false);}
  };
  React.useEffect(() => {
    if(user.email.length > 0 && user.password.length > 7) {
      setbuttonDisabled(false);
    }
    else{
      setbuttonDisabled(true);
    }
  },[user]);
  return (
    <>
    <ToastContainer/>
    <div className="flex flex-col items-center justify-center min-h-screen py-2 p-3 content-evenly bg-gradient-to-tr bg-zinc-800 text-white">
      <h1 className="text-4xl font-mono p-5 font-bold " >{loading ? "Loading" : "Login"}</h1>
      <hr />
      <label htmlFor="email" className="font-bold font-mono ">E-mail</label>
      <input
        className="p-2 text-black "
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password" className="font-bold pt-5 font-mono ">Password</label>
      <input
        className="p-2 text-black"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      {buttonDisabled ? (<button 
        onClick={warn}
        className="bg-red-500 mt-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounded "
        >
        Login
      </button>) : (
        <button 
        onClick={onLogin}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
        >
        Login
      </button>
      )}
      <div className="pt-5  font-mono">
      Don&apos;t have an account?
      </div>
      <Link href="/signup" className=" underline font-mono font-extrabold">Click Here</Link>
      <div>
      <Link href="/forgotpassword" className=" underline font-mono font-extrabold">Forgot Password?</Link>
      </div>
    </div>
    </>
  );
}
