import React from "react";
import { BsCircle,BsX } from "react-icons/bs";
import {useState } from "react";
import axios from "axios";
function IssuesList({issues}) {
  const [id,setId] = useState(issues._id); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "",id:""});
  const [loading,setLoading]=useState(false);
  const handleIssueClick = (issue) => {
    setFormData({ title: issue.title, description:issue.description,id:issue._id});
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ title: "", description: "" });
  };
  const handleUpdateIssue = async(e) => {
    e.preventDefault();
    try{
        setLoading(true);
        const response=await axios.put('https://github-clone-si5u.onrender.com/issue/update',{
            id:formData.id,
            title:formData.title,
            description:formData.description,
        });
        setLoading(false);
    }catch(err){
        console.error("Error in updating the issue",err);
    }
    handleCloseModal();
  };

  const handleDeleteIssue = async(e) => {
    e.preventDefault();
    try{
        const response = await axios.delete(
            `https://github-clone-si5u.onrender.com/issue/delete?id=${formData.id}`
          );
    }catch(err){
        console.error("Error in deleting the issue",err);
    }
    handleCloseModal();
  };
  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-300" style={{border:"1px solid grey",borderRadius:"10px"}}>
    <div className="border-b border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BsCircle className="text-green-500" />
              <span>{issues.length} Open</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Issues List */}
    <div className="max-w-6xl mx-auto">
      {issues.map((issue) => (
        <div
          key={issue.id}
          className="flex items-center px-4 py-3 border-b border-gray-700 hover:bg-[#161b22] cursor-pointer"
          onClick={() => handleIssueClick(issue)}
        >
          <BsCircle className="text-green-500 mr-3" />
          <div className="flex-1">
            <div className="flex items-baseline">
              <h3 className="text-gray-100 font-medium hover:text-blue-400">
                {issue.title}
              </h3>
            </div>
            <div className="text-sm text-white-500 mt-1">
              {issue.description} 
            </div>
            <div className="text-gray-500 mt-1" style={{fontSize:"10px"}}>
              #{issue._id} 
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Modal */}
    {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-[#161b22] rounded-lg w-full max-w-2xl mx-4">
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold">Edit Issue</h2>
            <button 
              onClick={handleCloseModal}
              className="text-gray-400 hover:text-gray-300"
            >
              <BsX size={24} />
            </button>
          </div>
          
          <form onSubmit={handleUpdateIssue} className="p-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-[#0d1117] border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full h-32 px-3 py-2 bg-[#0d1117] border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Id</label>
              <input
                type="text"
                value={formData.id}
                className="w-full px-3 py-2 bg-[#0d1117] border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleDeleteIssue}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
              >
                Delete Issue
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors" onClick={handleUpdateIssue}
              >
                {loading?"Updating":"Update Issue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
  );
}

export default IssuesList;
