import React from "react";
import { Activity, Star, GitFork, Eye } from "lucide-react";
import { useState} from "react";
import { BsX } from "react-icons/bs";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
function RepoSidebar({ details }) {
  const {id}=useParams();
  const navigate=useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name,setName]=useState("");
  const [description,setDescription]=useState("");
  const [visibility, setVisibility] = useState(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [formData, setFormData] = useState({
      name: "",
      description: "",
      visibility: true,
    });
  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      console.log(description);
      const response=await axios.put(`https://github-clone-si5u.onrender.com/repo/update/${id}`,{
        name:formData.name,
        description:formData.description,
        visibility:formData.visibility,
      });
      toast.success("Repository updated successfully!");
      console.log(response);
    } catch (error) {
      console.error("Error updating repository:",error.response?.data||error.message);
    }

    setIsModalOpen(false);
  };
  const handleDelete=async(e)=>{
    e.preventDefault();
    try {
      const response=await axios.delete(`https://github-clone-si5u.onrender.com/repo/delete/${id}`);
      navigate("/");
      console.log(response);
    } catch (error) {
      console.error("Error deleting repository:",error.response?.data||error.message);
    }
}
  function handleUpdate() {
    setIsModalOpen(true);
  }
  function handleEdit() {
    setFormData({
      username: details?.name,
      description: details?.description,
      visibility: details?.visibility,
    });
    setIsModalOpen(true);
  }
  return (
    <div className="w-80 pl-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-200 mb-2">About</h2>
        <p className="text-white-400 font-bold mb-4">{details?.description}</p>

        <div className="space-y-2 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Activity size={16} />
            <span>Activity</span>
          </div>
          <div className="flex items-center gap-2">
            <Star size={16} />
            {details?.isStarrred ? <span>1 Stars</span> : <span>0 Stars</span>}
          </div>
          <div className="flex items-center gap-2">
            <Eye size={16} />
            <span>1 watching</span>
          </div>
          <div className="flex items-center gap-2">
            <GitFork size={16} />
            <span>0 forks</span>
          </div>
      
            <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-red rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-green-700 mt-3" onClick={handleEdit}>Edit Repo</button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-200 mb-2">Releases</h2>
        <p className="text-sm text-gray-400">No releases published</p>
        <a href="#" className="text-sm text-blue-400 hover:underline">
          Create a new release
        </a>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-200 mb-2">Packages</h2>
        <p className="text-sm text-gray-400">No packages published</p>
        <a href="#" className="text-sm text-blue-400 hover:underline">
          Publish your first package
        </a>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-200 mb-2">Languages</h2>
        <div className="w-full h-2 rounded-full bg-gray-700 overflow-hidden mb-2">
          <div className="h-full bg-blue-500" style={{ width: "86.5%" }}></div>
          <div className="h-full bg-purple-500" style={{ width: "8.1%" }}></div>
          <div className="h-full bg-yellow-500" style={{ width: "4.3%" }}></div>
          <div className="h-full bg-red-500" style={{ width: "1.1%" }}></div>
        </div>
        <div className="text-sm space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="text-gray-300">TypeScript</span>
            <span className="text-gray-500">86.5%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <span className="text-gray-300">CSS</span>
            <span className="text-gray-500">8.1%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            <span className="text-gray-300">JavaScript</span>
            <span className="text-gray-500">4.3%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span className="text-gray-300">HTML</span>
            <span className="text-gray-500">1.1%</span>
          </div>
        </div>
        <div style={{marginTop:"50px"}}>
          <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-red rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-red-700" onClick={handleDelete}>Delete Repo</button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#161b22] rounded-lg w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold">Edit Repository</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-300"
              >
                <BsX size={24} />
              </button>
            </div>

            <form className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#0d1117] border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full h-32 px-3 py-2 bg-[#0d1117] border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Visibility
                </label>
                <select
                  value={formData.visibility?"public":"private"}
                  onChange={(e) =>
                    setFormData({...formData,visibility:e.target.value==="public"?true:false})
                  }
                  className="w-full px-3 py-2 bg-[#0d1117] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
                   onClick={handleSubmit}
                >
                  Edit Repository
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default RepoSidebar
