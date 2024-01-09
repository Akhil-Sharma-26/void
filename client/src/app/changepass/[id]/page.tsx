"use client"
import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";  
import "react-toastify/dist/ReactToastify.css"; 
// import { get } from "http";
// import { getDatafromToken } from "@/helpers/getDatafromToken";
import { useRouter } from "next/navigation";
export default function Change(){
    const router=useRouter();
    const [password, setpassword] = React.useState("");
    const [confirmpassword, setconfirmpassword] = React.useState("");
    const [token,settoken]=React.useState("");
    const [done,setdone]=React.useState(false);
    function warn(){
        toast.warning("Please make sure that both the passwords are same");
    }
    // async function gettoken(){
    //     const res= await axios.get('/api/users/me');
    //     console.log(res.data.data.token);
    //     settoken(res.data.data.token);
    // }
    React.useEffect(()=>{
        const token=window.location.search.split("=")[1];
        settoken(token);
        console.log(token);
    },[])

    const changepass = async () => {
        try {
            toast.loading("Changing password");
            const res = await axios.post("/api/users/changepass", { token:token, newpass : password });
            console.log(res.data);
            toast.dismiss();
            toast.success("Password changed successfully");
            setdone(true);
            router.push("/profile");
        } catch (error: any) {
            console.log(error.response.data);
            toast.error(error.response.data);
        }
    }
    return (
        <>
            <ToastContainer />
            <div className="flex flex-col items-center justify-center min-h-screen py-2  content-evenly bg-gradient-to-tr bg-zinc-800 text-white">
                    <h1 className="text-4xl font-mono p-5 font-bold ">Change Password</h1>
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
                        <button className="p-2 m-2 bg-red-600 text-white rounded-md " onClick={warn}>Change password</button>
                    )}
                </div>
        </>
    )
}