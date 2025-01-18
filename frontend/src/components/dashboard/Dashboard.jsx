import React, { useEffect, useState } from "react";
import Navbar from "../UI/Navbar.jsx";
import ProfileHeader from "./ProfileHeader.jsx";
import RepositoryGrid from "./RepositoryGrid.jsx";
const Dashboard = () => {
  const [repositories, setRepositories] = useState(["newrepo"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [userDetails,setUserDetails]=useState([]);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchUserDetails=async()=>{
      try {
        const response = await fetch(
          `http://localhost:3000/userProfile/${userId}`
        );
        const data = await response.json();
        setUserDetails(data);
      } catch (err) {
        console.error("Error while fetching user details: ", err);
      }
    }
    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/repo/user/${userId}`
        );
        const data = await response.json();
        setRepositories(data.repository); // Update user's repositories
      } catch (err) {
        console.error("Error while fetching repositories: ", err);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(`http://localhost:3000/repo/all`);
        const data = await response.json();
        setSuggestedRepositories(data);
      } catch (err) {
        console.error("Error while fetching suggested repositories: ", err);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
    fetchUserDetails();
  }, []);
  useEffect(() => {
    if (searchQuery == "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      console.log(filteredRepo);
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);
  useEffect(() => {
  }, [suggestedRepositories, repositories, searchResults,userDetails]);
  return (
    <div>
      <Navbar/>
      <div style={{display:"flex",flexDirection:"row"}}>
        <ProfileHeader />
        <RepositoryGrid/>
      </div>
    </div>
  );
};

export default Dashboard;
