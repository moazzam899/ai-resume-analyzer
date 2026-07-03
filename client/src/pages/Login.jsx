import { Link } from "react-router-dom";
import { useState } from "react";

import api from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";


function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
  try {
    const response = await api.post("/users/login", formData);

    localStorage.setItem("token", response.data.data.token);

    toast.success("Login Successful");

    navigate("/dashboard");
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Login Failed"
    );
  }
};

  return (
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-red-950 flex justify-center items-center px-6">
      <div className="w-full max-w-md bg-zinc-900/70 backdrop-blur-xl border border-red-900 rounded-3xl shadow-2xl p-10">

<div className="flex items-center gap-3">
  <img
    src={logo}
    alt="logo"
    className="w-10 h-10 rounded-lg"
  />

  <h1 className="text-2xl font-bold">
    AI Resume Analyzer
  </h1>
</div>


        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Welcome Back
       </h2>

       <p className="text-center text-gray-400 mb-8">
        Login to continue using AI Resume Analyzer
       </p>

        <p className="text-center text-gray-500 mt-2">
          Login to continue
        </p>

        <div className="mt-6">

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/30 border border-red-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-700"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-black/30 border border-red-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-700"
          />

          <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-red-700 to-red-900 py-4 rounded-xl font-semibold hover:scale-[1.02] transition-all duration-300 text-white"
          >
          Login
          </button>

         <p className="text-center text-gray-400 mt-6">
           Don't have an account?

         <Link
         to="/signup"
         className="text-red-500 ml-2 hover:underline"
         >
          Sign Up
         </Link>

</p>

        </div>

      </div>

    </div>
  );
}

export default Login;