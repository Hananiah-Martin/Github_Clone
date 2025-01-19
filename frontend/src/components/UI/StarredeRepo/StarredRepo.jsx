import React from "react";
import { useState, useEffect } from "react";
import RepositoryCard from "../AllRepoPage/RepositoryCard";
import Navbar from "../Navbar";
const StarredRepo = () => {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `https://github-clone-si5u.onrender.com/userProfile/${userId}`
        );
        const data = await response.json();
        setRepositories(data.repositories); // Update user's repositories
      } catch (err) {
        console.error("Error while fetching repositories: ", err);
      }
    };

    fetchRepositories();
  }, []);
  useEffect(() => {
  }, [repositories]);
  return (
    <>
      <Navbar />
      <div className="space-y-6 space-x-10 mt-8">
      <h1 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white md:text-2xl lg:text-4xl " style={{marginLeft:"5rem",marginTop:"3rem"}}>Starred Repositories</h1>
        <div className="flex flex-col"></div>
        {repositories.map((repo) => (
          <RepositoryCard key={repo.name} repo={repo} />
        ))}
      </div>
    </>
  );
};

export default StarredRepo;
