"use client";
import Link from "next/link";
import React from "react";
// import Router from "next/router"; wrong
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const onSignup = async () => {
    // As this method is going to talk to database, it is async
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 p-3 content-evenly ">
      <h1>SignUp</h1>
      <hr />
      <label htmlFor="username" className="font-bold">username</label>
      <input
        className="p-2"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <label htmlFor="email" className="font-bold">email</label>
      <input
        className="p-2"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password" className="font-bold">password</label>
      <input
        className="p-2"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button 
        onClick={onSignup}
        >
        Signup
      </button>
      Already have an account?
      <Link href="/login">click here</Link>
    </div>
  );
}
