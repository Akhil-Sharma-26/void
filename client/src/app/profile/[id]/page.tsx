"use client";
import axios from "axios";
import React from "react";
export default function UserProfile({ params }: any) {
  // console.log(params.id.username);
  /// NOTE: fetching the user details from the server and display them here
  const [loggedInusername, setloggedInusername] = React.useState("");
  React.useEffect(() => {
    const fetchedusername = async () => {
      try{
      const res = await axios.get("/api/users/me");
      setloggedInusername(res.data.data.username);
    }
    catch(err){
      console.log(err);
    }
    };
    fetchedusername();
  }, []);
  return (
    <div className="items-center  flex flex-col min-h-screen py-2 justify-center">
      <p className="text-xl">
        Hello 
        <span className="p-2 rounded bg-purple-500">{loggedInusername}</span>
      </p>
    </div>
  );
}
