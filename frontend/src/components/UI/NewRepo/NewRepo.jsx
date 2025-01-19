import React, { useState, useEffect } from "react";
import { FaGlobe, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const NewRepo = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [userName, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://github-clone-si5u.onrender.com/userProfile/${userId}`);
        setUsername(response.data.username);
      } catch (error) {
        toast.error("Error fetching user profile");
        console.error("Error fetching user:", error.response?.data || error.message);
      }
    };
    
    if (userId) {
      fetchUser();
    }
  }, []); // Add dependency array to prevent infinite loop

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Repository name is required");
      return;
    }

    try {
      setLoading(true);
      await axios.post("https://github-clone-si5u.onrender.com/repo/create", {
        name,
        description,
        content: [],
        visibility,
        owner: userId,
        issues: [],
      });
      
      toast.success("Repository created successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Wait for toast to be visible before navigating
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error creating repository";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-[#161b22] p-8 rounded-lg border border-gray-700">
          <h1 className="text-2xl font-bold mb-4 text-white">Create a new repository</h1>
          <p className="text-gray-400 text-sm mb-6">
            A repository contains all project files, including the revision history.{" "}
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
              Import a repository
            </a>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Owner field */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Owner
                </label>
                <input
                  type="text"
                  value={userName}
                  disabled
                  className="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md 
                    text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    focus:border-transparent disabled:opacity-60"
                />
              </div>

              {/* Repository name field */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Repository name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md 
                    text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    focus:border-transparent"
                  placeholder="awesome-project"
                />
                <p className="text-gray-400 text-xs mt-1">
                  Great repository names are short and memorable.
                </p>
              </div>

              {/* Description field */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Description <span className="text-gray-400">(optional)</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md 
                    text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    focus:border-transparent min-h-[80px]"
                  placeholder="A brief description of your project"
                />
              </div>

              {/* Visibility options */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-3">
                  Visibility
                </label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 rounded-md border border-gray-700 
                    cursor-pointer hover:bg-gray-800 transition-colors">
                    <input
                      type="radio"
                      name="visibility"
                      checked={visibility}
                      onChange={() => setVisibility(true)}
                      className="text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                    />
                    <div className="flex items-center gap-2">
                      <FaGlobe className="text-gray-400" />
                      <span className="text-gray-200">Public</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-md border border-gray-700 
                    cursor-pointer hover:bg-gray-800 transition-colors">
                    <input
                      type="radio"
                      name="visibility"
                      checked={!visibility}
                      onChange={() => setVisibility(false)}
                      className="text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                    />
                    <div className="flex items-center gap-2">
                      <FaLock className="text-gray-400" />
                      <span className="text-gray-200">Private</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md
                  font-medium transition-colors duration-200 disabled:opacity-60 
                  disabled:cursor-not-allowed focus:outline-none focus:ring-2 
                  focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                {loading ? "Creating..." : "Create repository"}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default NewRepo;