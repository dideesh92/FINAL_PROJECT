import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignupPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const signupSubmit = async (userDetails) => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });
    if (res.ok) {
      toast.success("Signup success");
      return navigate("/");
    } else {
      toast.error("Please check the input data");
      return navigate("/signup");
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const userDetails = {
      userName,
      password,
      email,
      userType: "admin"
    };
    signupSubmit(userDetails);
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
        Welcome to Walmart
      </h1>
      
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-6 text-center">
          Create Account
        </h2>
        <form onSubmit={submitForm} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              placeholder="Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-sky-400 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-8 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-300 font-semibold">
            Log In
          </Link>
        </p>
      </div>
      
      <footer className="mt-8 text-center text-white">
        <p className="text-sm">
          Software developed by Dideesh Babu N
        </p>
      </footer>
    </div>
  );
};

export default SignupPage;