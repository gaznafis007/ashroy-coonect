'use client';
import Button from "@/components/Button/Button";
import Link from "next/link";
import React from "react";

const Register = () => {
    const handleSubmit = (event) =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const address = form.address.value;
        const city = form.city.value;
        const country = form.country.value;
        const dob = form.dob.value;
        const role = form.role.value;
        const password = form.password.value;
        const description = form.description.value;
        const userInfo = {
            name,
            email,
            address,
            city,
            country,
            dob,
            role,
            password,
            description
        } 
        console.log(userInfo);
        fetch('/api/register',{
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(userInfo)
        })
        .then(res => res.json())
        .then(data =>{
          console.log(data)
        })
    }
    const handleGoogleLogin = () =>{}
  return (
    <div className="flex items-center justify-center space-y-8">
      <div className="flex flex-col space-y-8 items-center justify-center mx-4 my-4 shadow-md rounded-xl px-8 py-12 ">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-3xl text-yellow-400 font-semibold">
            Join us to help smile everyone
          </h2>
          <div className="flex flex-col space-y-3">
            <label className="font-semibold text-sm">Full Name</label>
            <input
              type="text"
              name="name"
              className="border border-slate-400 px-4 py-2 rounded-md"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <label className="font-semibold text-sm">Email</label>
            <input
              type="email"
              name="email"
              className="border border-slate-400 px-4 py-2 rounded-md"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <label className="font-semibold text-sm">Address</label>
            <input
              type="address"
              name="address"
              className="border border-slate-400 px-4 py-2 rounded-md"
            />
          </div>
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
          <div className="flex flex-col space-y-3 w-full md:w-1/2">
            <label className="font-semibold text-sm">City</label>
            <input
              type="text"
              name="city"
              className="border border-slate-400 px-4 py-2 rounded-md"
            />
          </div>
          <div className="flex flex-col space-y-3 w-full md:w-1/2">
            <label className="font-semibold text-sm">Country</label>
            <input
              type="text"
              name="country"
              className="border border-slate-400 px-4 py-2 rounded-md"
            />
          </div>
          </div>
          <div className="flex flex-col space-y-3">
            <label className="font-semibold text-sm">Date of birth</label>
            <input
              type="date"
              name="dob"
              className="border border-slate-400 px-4 py-2 rounded-md"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <label className="font-semibold text-sm">What you want to be?</label>
            <select
              name="role"
              className="border border-slate-400 px-4 py-2 rounded-md"
            >
              <option value="sponsor">Sponsor</option>
              <option value="volunteer">Volunteer</option>
            </select>
          </div>
          <div className="flex flex-col space-y-3">
            <label className="font-semibold text-sm">Tell us about yourself</label>
            <textarea
              type="text"
              name="description"
              className="border border-slate-400 px-4 py-4 rounded-md"
            ></textarea>
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
            Register
          </Button>
          <p className="text-slate-800 text-sm font-thin">
            Already involved with us before?{" "}
            <Link className="hover:underline" href="/login">
              Login
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

export default Register;
