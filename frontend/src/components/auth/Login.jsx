import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { Github } from "lucide-react";
import "./auth.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(formData.email + " " + formData.password);
      const res = await axios.post("https://github-clone-si5u.onrender.com/login", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      setCurrentUser(res.data.userId);
      setLoading(false);
      
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center pt-16 px-4">
      <div className="mb-6">
        <Github size={48} className="text-white" />
      </div>
      <h1 className="text-2xl font-semibold text-white mb-8">Sign in to GitHub</h1>
      <div className="w-full max-w-[340px] bg-[#161b22] rounded-lg p-6 border border-[#30363d]">
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Email address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
      <div className="mt-6 p-4 bg-[#161b22] rounded-lg border border-[#30363d] text-center w-full max-w-[340px]">
        <span className="text-[#7d8590]">New to GitHub? </span>
        <a href="https://github-clone-xita-hananiahs-projects.vercel.app/signup" className="text-blue-500 hover:text-blue-400">
          Create an account
        </a>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Login;
