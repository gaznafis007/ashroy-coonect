"use client";
import Button from "@/components/Button/Button";
import Link from "next/link";
import React from "react";

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);
  };
  const handleGoogleLogin = () => {
    console.log("google");
  };
  return (
    <div className="flex items-center justify-center space-y-8">
      <div className="flex flex-col space-y-8 items-center justify-center mx-4 my-4 shadow-md rounded-xl px-8 py-12 ">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-3xl text-yellow-400 font-semibold">
            Join us to help smile everyone
          </h2>
          <div className="flex flex-col space-y-3">
            <label className="font-semibold text-sm">Email</label>
            <input
              type="email"
              name="email"
              className="border border-slate-400 px-4 py-2 rounded-md"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <label className="font-semibold text-sm">Password</label>
            <input
              type="password"
              name="password"
              className="border border-slate-400 px-4 py-2 rounded-md"
            />
          </div>
          <Button type={"submit"} style={"block w-full"}>
            Login
          </Button>
          <p className="text-slate-800 text-sm font-thin">
            Wanna Apply first time?{" "}
            <Link className="hover:underline" href="/register">
              Register
            </Link>
          </p>
        </form>
        <button
          onClick={handleGoogleLogin}
          className="px-4 py-2 block w-full shadow-sm border border-slate-200 rounded-md text-sm font-semibold"
        >
          Login with <span className="text-green-600">Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
