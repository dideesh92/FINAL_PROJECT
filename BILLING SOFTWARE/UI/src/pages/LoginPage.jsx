import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const loginSubmit = async (e) => {
  e.preventDefault();
  const loginDetails = {
    email,
    password,
  };
console.log(loginDetails)
  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginDetails),
  });
  console.log(res, "login res from ");
  if (res.ok) { 
   
    const data =await res.json();
    const userType = data.userType;
    toast.success(`Logged in as : ${userType}`);
   return navigate("/home");

  } else {
    toast.error(`Please check your credentials`);
    return navigate("/");
  }

}


  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 flex flex-col items-center justify-center min-h-screen p-4">
    <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
      Welcome to Walmart
    </h1>
    
    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full transform hover:scale-105 transition-transform duration-300">
      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-6 text-center">
        Sign In
      </h2>
      <form onSubmit={loginSubmit} className="space-y-6">
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
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <button
            type="submit"
            className="w-full bg-sky-400 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-300"
          >
            Sign In
          </button>
        </div>
      </form>
      <p className="mt-8 text-center text-gray-600">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-300 font-semibold">
          Sign Up
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


const getUserType = () => {
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("Authtoken"))
    ?.split("=")[1];
  console.log("documemnt.cookie vslue", authToken);

  const decoded = jwtDecode(authToken);
  console.log("decoded", decoded);
  const userType = decoded.userType;
  console.log("usertype", userType);
  return userType;
};

export { LoginPage as default, getUserType };

