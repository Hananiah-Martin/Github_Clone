import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { BsX } from "react-icons/bs";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserPlus, LogOut } from 'lucide-react';
import { useAuth } from "../../authContext";
const ProfileHeader = () => {
  const { setCurrentUser } = useAuth();
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
    <div
      className="flex flex-col md:flex-col gap-6 p-6 mt-5 mx-3"
      style={{
        width: "20rem",
        backgroundColor: "rgb(13, 17, 23)",
        color: "white",
        border:"solid 1px grey",
        borderRadius:"10px"
      }}
    >
      <div className="flex-shrink-0">
        <img
          src="https://github.com/identicons/johndoe.png"
          alt="Profile"
          className="w-44 h-44 rounded-full border-2 border-gray-200"
        />
      </div>
      <div className="flex-grow">
        <div className="flex flex-col md:flex-col justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold">{userDetails.username}</h1>
            <p className="text-gray-600 text-lg">{userDetails.email}</p>
          </div>
        </div>
        <p className="text-white-700 mb-4">{userDetails.description}</p>
        <button
          className="mt-4 md:mt-0 px-4 py-2 border rounded-md flex items-center gap-2 bg-green-800"
          onClick={handleEdit}
        >
          <FaUserPlus />
          Edit Profile
        </button>
        <button
            className="mt-5 md:mt-0 px-4 py-2 border rounded-md flex items-center gap-2 hover:bg-red-500 transition-colors text-white"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#161b22] rounded-lg w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold">Edit Profile</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-300"
              >
                <BsX size={24} />
              </button>
            </div>

            <form className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
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
                <label className="block text-sm font-medium mb-2">Email</label>
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

              <div className="flex justify-end space-x-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
                  onClick={handleUpdate}
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ProfileHeader;
