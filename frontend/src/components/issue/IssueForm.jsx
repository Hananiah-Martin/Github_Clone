import React, { useState,useRef} from "react";
import axios from "axios";
import Navbar from "../UI/Navbar";
import { useNavigate, useParams } from "react-router-dom";
function IssueForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate=useNavigate();
  const {id}=useParams();
  const handeleSubmit= async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/issue/create", {
        title: title,
        description: description,
        status:"open",
        repoId:id,
      });
      console.log("Issue created:", response.data);
      navigate(`/repo/${id}/issues`);
    } catch (error) {
      console.error("Error creating issue:",error.response?.data || error.message);
    }
  }
  return (
    <>
    <Navbar/>
    <nav className="flex items-center border-b border-gray-700 md-5 py-2">
          <a
            href={`http://localhost:5173/repo/${id}`}
            className="px-4 py-2 text-gray-200"
          >
            Code
          </a>
          <a
            href={`http://localhost:5173/repo/${id}/issues`}
            className="px-4 py-2 text-gray-400 border-b-2 border-orange-500 hover:text-gray-200"
          >
            Issues
          </a>
        </nav>
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center gap-3 mb-4">
          <img
            src="https://github.com/github.png"
            alt="Avatar"
            className="w-8 h-8 rounded-full"
          />
          <h1 className="text-xl font-semibold text-white">Add a title</h1>
        </div>

        <form>
          {/* Title Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              className="w-full px-3 py-2 bg-[#161b22] border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Markdown Editor */}
          <div className="border border-gray-700 rounded-md overflow-hidden">
            {/* Editor Toolbar */}
            <div
              className="flex items-center justify-between px-2 py-1 bg-[#1c2128] border-b border-gray-700"
              style={{ color: "white" }}
            >
            </div>

            {/* Text Area */}
            <textarea
              placeholder="Add your description here..."
              className="w-full h-64 p-3 bg-[#161b22] text-gray-300 placeholder-gray-500 focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* Footer */}
            <div className="px-3 py-2 bg-[#161b22] border-t border-gray-700 text-xs text-gray-400">
              <span>Markdown is supported</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors" onClick={handeleSubmit}>
              Submit new issue
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default IssueForm;
