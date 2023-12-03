"use client";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";
export default function UserProfile({ params }: any) {
  // console.log(params.id.username);
  /// NOTE: fetching the user details from the server and display them here
  const [loggedInusername, setloggedInusername] = React.useState("");
  const [loggedInemail, setloggedInemail] = React.useState("");
  React.useEffect(() => {
    const fetchedusername = async () => {
      try{
      const res = await axios.get("/api/users/me");
      setloggedInusername(res.data.data.username);
      setloggedInemail(res.data.data.email);
    }
    catch(err){
      console.log(err);
    }
    };
    fetchedusername();
  }, []);
  const router = useRouter();
  const logout=async()=>{
    try {
        axios.get('/api/users/logout');
        console.log('logged out');
        // toast.success(`User logged out`);
        router.push('/login');
    } catch (error:any) {
        console.log(error.message);
        // toast.error(error.message);
    }
}
  return (
    <div className="items-center  flex flex-col min-h-screen py-2 justify-center">
      <p className="text-xl">
        Hello 
        <span className="p-2 rounded bg-purple-500">{loggedInusername}</span>
        <span className="p-2 rounded bg-blue-500">{loggedInemail}</span>
      </p>
      <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="button" onClick={logout}>
            <div className="logout">
            Logout
            </div>
        </button>
    </div>
  );
}
