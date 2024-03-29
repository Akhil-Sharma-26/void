"use client";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
// import { toast } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// const router=useRouter();
export default function UserProfile({ params }: any) {
  // console.log(params.id.username);
  /// NOTE: fetching the user details from the server and display them here
  const [loggedInusername, setloggedInusername] = React.useState("");
  const [loggedInemail, setloggedInemail] = React.useState("");
  const [loggedUserID, setUserID] = React.useState("");
  const [isEmailSent, setIsEmailSent] = React.useState(false);
  const [isEmailVerified, setIsEmailVerified] = React.useState(false);
  React.useEffect(() => {
    const fetchedusername = async () => {
      try {
        // toast.loading("Fetching user details");
        const res = await axios.get("/api/users/me");
        setloggedInusername(res.data.data.username);
        setloggedInemail(res.data.data.email);
        setUserID(res.data.data._id);
        setIsEmailVerified(res.data.data.isVerified);
      }
      catch (err) {
        console.log(err);
      }
    };
    fetchedusername();
  }, []);
  const router = useRouter();
  const logout = async () => {
    try {
      toast.loading("Logging out");
      axios.get('/api/users/logout');
      console.log('logged out');
      toast.success(`User logged out`);
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }
  const sendemail = async () => {
    if (!isEmailSent) {
      try {
        toast.loading("Sending email. Please don't click the button again.");
        let result = await axios.post("/api/users/sendemail", { email: loggedInemail, emailType: "VERIFY", userID: loggedUserID });
        console.log(result);
        toast.dismiss();
        if (result.data.success) {
          toast.success("Email sent successfully. Please Check your Mail box. Also check your spam folder.");
          setIsEmailSent(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const changePassword = async()=>{
    try {
      router.push(`/changepass/lol?token=${loggedUserID}`);
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }
  return (
    <>
      <ToastContainer />
      <div className="items-center flex flex-col min-h-screen py-2 justify-center">
        <p className="text-xl flex flex-col justify-center items-center ">
          Hey There! 
          <br />
          You are logged in as:
          <span className="p-2 rounded bg-purple-500 pb">{loggedInusername}</span>
          <br />
          Your email is:
          <span className="p-2 rounded bg-blue-500">{loggedInemail}</span>
        </p>
        <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="button" onClick={logout}>
          <div className="logout">
            Logout
          </div>
        </button>

        {!isEmailVerified ? (
          <button className="bg-purple-500 mt-4 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" id="button" onClick={sendemail}>
            <div className="logout">
              Verify Email!!
            </div>
          </button>
        ) : (
          <div className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" id="button" >
            <div className="logout">
              Your email has already been verified!!!
            </div>
          </div>
        )}
        <button className="bg-orange-500 mt-4 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" id="button" onClick={changePassword}>
            <div className="logout">
              Change Password
            </div>
          </button>
      </div>
    </>
  );
}