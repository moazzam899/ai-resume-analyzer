import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api"
import logo from "../assets/logo.png";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Submitting...");
  console.log(formData);

  try {
    setLoading(true);

    const res = await api.post("/users/register", formData);

    console.log("SUCCESS", res);

    toast.success(res.data.message);

    navigate("/login");
  } catch (error) {
    console.log("FULL ERROR", error);
    console.log("ERROR RESPONSE", error.response);
    console.log("ERROR MESSAGE", error.message);

    toast.error(error.response?.data?.message || "Registration Failed");
  } finally {
    setLoading(false);
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
          Create Your Account
       </h2>

       <p className="text-center text-gray-400 mb-8">
        Start analyzing your resume with AI.
       </p>

        <p className="text-center text-gray-500 mt-2">
          Create Account
        </p>

        <form
        onSubmit={handleSubmit}
        className="mt-6"
        >

          <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 p-4 rounded-xl bg-black/30 border border-red-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-700 mb-4"
         />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-4 p-4 rounded-xl bg-black/30 border border-red-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-700"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mb-4 p-4 rounded-xl bg-black/30 border border-red-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-700"
          />

          <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-red-700 to-red-900 py-4 rounded-xl font-semibold hover:scale-[1.02] transition-all duration-300 text-white"
          >
          Create Account
          </button>

         <p className="text-center text-gray-400 mt-6">
           Already have an account?

          <Link
            to="/login"
            className="text-red-500 ml-2 hover:underline"
          >
            Login
          </Link>

          </p>

        </form>

      </div>

    </div>
  );
};

export default Signup;