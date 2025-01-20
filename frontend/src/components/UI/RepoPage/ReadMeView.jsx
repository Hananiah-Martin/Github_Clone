import React, { useState,useEffect } from "react";
import { BsBook, BsPencil } from "react-icons/bs";
import { useParams } from "react-router-dom";
import axios from "axios";
function ReadmeView({ details }) {
  const [loading,setLoading]=useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState("");
  const {id}=useParams();
 useEffect(() => {
     const fetchDetails = async () => {
       const response = await fetch(`https://github-clone-si5u.onrender.com/repo/${id}`);
       const data = await response.json();
       setContent(data[0]?.readMe);
     }
     fetchDetails();
   }, []);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async(e) => {
    e.preventDefault();
    try{
      setLoading(true);
        const response=await axios.put('https://github-clone-si5u.onrender.com/repo/updateReadme',{
            repoId:id,
            readMe:content,
        });
        setLoading(false);
        setIsEditing(!isEditing);
    }catch(err){
        console.error("Error in updating the issue",err);
    }
  };

  return (
    <div className="bg-[#0d1117] text-gray-300">
      <div className="max-w-5xl mx-auto p-4">
        {/* Header */}
        <div className="border-b border-gray-700 mb-4">
          <div className="flex items-center space-x-2 text-lg font-semibold mb-3">
            <BsBook className="text-gray-400" />
            <h1>README</h1>
            {/* <p>{details.readMe}</p> */}
            <button
              onClick={handleEdit}
              className="ml-auto p-2 hover:bg-gray-800 rounded-md"
              title="Edit README"
            >
              <BsPencil className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-[#161b22] rounded-md border border-gray-700 p-4">
          {isEditing ? (
            <div className="space-y-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-40 bg-[#0d1117] text-gray-300 p-3 rounded-md border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  {loading?"Saving...":"Save Changes"}
                </button>
              </div>
            </div>
          ) : (
            <div className="prose prose-invert">
              <p className="text-gray-300 leading-relaxed">{content}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReadmeView;
