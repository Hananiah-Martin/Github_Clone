import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { BsX } from "react-icons/bs";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LogOut } from "lucide-react";
import { useAuth } from "../../AuthContext";
import Navbar from "../UI/Navbar";
const ProfileHeader = () => {
  const { setCurrentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({ username: "hello" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    description: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (userId) {
        try {
          const response = await axios.get(
            `https://github-clone-si5u.onrender.com/userProfile/${userId}`
          );
          setUserDetails(response.data);
        } catch (err) {
          console.error("Cannot fetch user details: ", err);
        }
      }
    };
    fetchUserDetails();
  }, []);

  function handleEdit() {
    setFormData({
      username: userDetails.username,
      description: userDetails.description,
      email: userDetails.email,
    });
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  async function handleUpdate(e) {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    try {
      setLoading(true);
      const response = await axios.put(
        `https://github-clone-si5u.onrender.com/updateProfile/${userId}`,
        {
          username: formData.username,
          description: formData.description,
          email: formData.email,
          userId: userId,
        }
      );
      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        setUserDetails((prev) => ({
          ...prev,
          username: formData.username,
          description: formData.description,
          email: formData.email,
        }));
      }
      setLoading(false);
    } catch (err) {
      console.error("Error in updating the profile", err);
      toast.error("Failed to update profile. Please try again.");
    }
    handleCloseModal();
  }
  async function handleLogout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setCurrentUser(null); // set current user to null
    toast.success("Logged out successfully!");
    window.location.href = "/auth";
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black-100 flex items-center justify-center">
      <div className="flex flex-col md:flex-col gap-6 p-8 mt-5 bg-gray rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-green-500">
        <div className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
          <img
            src="https://github.com/identicons/johndoe.png"
            alt="Profile"
            className="w-44 h-44 rounded-full border-4 border-gray-200 hover:border-green-500 transition-colors duration-300 shadow-md" 
            style={{margin:"auto"}}
          />
        </div>
        <div className="flex-grow backdrop-blur-sm bg-white/50 p-6 rounded-lg border border-gray-100 hover:border-green-400 transition-all duration-300" style={{margin:"auto"}}>
          <div className="flex flex-col md:flex-col justify-between items-start mb-4">
            <div className="hover:translate-x-1 transition-transform duration-300">
              <h1 className="text-2xl font-bold text-gray-800">{userDetails.username}</h1>
              <p className="text-white-100 text-lg">{userDetails.email}</p>
            </div>
          </div>
          <p className="text-white-700 mb-4 hover:text-gray-900 transition-colors duration-300">{userDetails.description}</p>
          <button
            className="mt-4 md:mt-0 px-4 py-2 border border-green-700 rounded-md flex items-center gap-2 bg-green-800 text-white hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={handleEdit}
          >
            <FaUserPlus />
            Edit Profile
          </button>
          <button
            className="mt-5 md:mt-0 px-4 py-2 border border-red-600 rounded-md flex items-center gap-2 bg-red-600 hover:bg-red-500 transition-all duration-300 text-white hover:scale-105 shadow-md hover:shadow-lg"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#161b22] rounded-lg w-full max-w-2xl mx-4">
              <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <h2 className="text-xl text-white font-semibold">Edit Profile</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <BsX size={24} />
                </button>
              </div>

              <form className="p-4">
                <div className="mb-4">
                  <label className="block text-sm text-white font-medium mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#0d1117] border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-white mb-2">
                    Email
                  </label>
                  <input
                    type="text"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#0d1117] border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-white font-medium mb-2">
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

                <div className="flex justify-end space-x-3">
                  {loading ? (
                    <button
                      disabled
                      type="button"
                      class="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-black rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                    >
                      <svg
                        aria-hidden="true"
                        role="status"
                        class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="#1C64F2"
                        />
                      </svg>
                      Loading...
                    </button>
                  ) : (
                    <button
                      className="mt-4 md:mt-0 px-4 py-2 border rounded-md flex items-center gap-2 bg-green-800 text-white"
                      onClick={handleUpdate}
                    >
                      <FaUserPlus />
                      Edit Profile
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
        <ToastContainer />
    </>
  );
};

export default ProfileHeader;
