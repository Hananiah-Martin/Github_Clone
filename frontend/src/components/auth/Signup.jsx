import React, { useState } from 'react'
import axios from "axios";
import { Github } from 'lucide-react';
import "./auth.css"
import { useAuth } from '../../AuthContext';
const Signup = () => {
  const [loading,setLoading]=useState(false);
  const {setCurrentUser}=useAuth();
  const [formData, setFormData] = useState({
      email: '',
      username: '',
      password: ''
    });
  const handleSignup=async(e)=>{
      e.preventDefault();
      try{
        setLoading(true);
        const res=await axios.post("https://github-clone-si5u.onrender.com/signup",{
          email:formData.email,
          password:formData.password,
          username:formData.username  
        });
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("userId",res.data.userId);
        setCurrentUser(res.data.userId);
        setLoading(false);
        window.location.href='/';
      }catch(err){
        console.error(err);
        // alert(err.response.data.message);
        setLoading(false);
      }
  }
  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center pt-16 px-4">
      <div className="mb-6">
        <Github size={48} className="text-white" />
      </div>
      
      <h1 className="text-2xl font-semibold text-white mb-8">Sign Up to GitHub</h1>
      
      <div className="w-full max-w-[340px] bg-[#161b22] rounded-lg p-6 border border-[#30363d]">
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
              Email address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e)=>setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={(e)=>setFormData({ ...formData, username: e.target.value })}
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
              onChange={(e)=>setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors" onClick={handleSignup}
          >
            {loading?"Signing up...":"Sign Up"}
          </button>
        </form>
      </div>
      <div className="mt-6 p-4 bg-[#161b22] rounded-lg border border-[#30363d] text-center w-full max-w-[340px]">
        <span className="text-[#7d8590]">Already have an account? </span>
        <a href="/auth" className="text-blue-500 hover:text-blue-400">Login</a>
      </div>
    </div>
  )
}

export default Signup
