import React, { useEffect, useState } from "react";
import RepositoryCard from "./RepositoryCard";
import Navbar from "../Navbar";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
function RepositoryList() {
  const filters = [];
  const navigate = useNavigate();
  const [repos, setRepositories] = useState(["newrepo"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const userId = localStorage.getItem("userId");
  const [isFocused, setIsFocused] = useState(false);
  function changePath(e) {
    e.preventDefault();
    navigate("/new");
  }
  useEffect(() => {
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
    fetchRepositories();
  }, []);
  useEffect(() => {
    if (searchQuery == "") {
      setSearchResults(repos);
    } else {
      const filteredRepo = repos.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      console.log(filteredRepo+"hello");
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repos]);
  useEffect(() => {}, [repos, searchResults]);
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0d1117] p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col mb-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative group">
                <div
                  className={`absolute inset-0 bg-blue-500/10 rounded-lg transition-all duration-300 ${
                    isFocused ? "opacity-100 scale-105" : "opacity-0 scale-100"
                  }`}
                ></div>
                <div className="relative flex items-center">
                  <Search
                    size={18}
                    className={`absolute left-3 transition-colors duration-200 ${
                      isFocused ? "text-blue-400" : "text-gray-500"
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Find a repository..."
                    className="w-full pl-10 pr-4 py-2 bg-[#0d1117] border border-gray-700/80 rounded-lg 
            focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 
            text-gray-200 placeholder-gray-500 transition-all duration-200
            hover:border-gray-600"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <button
                  className="px-4 py-2 bg-[#238636] text-white rounded-lg hover:bg-[#2ea043] 
        flex items-center gap-2 text-sm font-medium shadow-lg shadow-green-900/20
        border border-green-700/50 transition-all duration-200 
        hover:shadow-green-900/30 hover:scale-105 active:scale-95"
                  onClick={changePath}
                >
                  <Plus
                    size={16}
                    className="transition-transform group-hover:rotate-90 duration-200"
                  />
                  New
                </button>
              </div>
            </div>
          </div>

          {searchResults.map((repo) => (
          <RepositoryCard key={repo.name} repo={repo} />
        ))}
        </div>
      </div>
    </>
  );
}

export default RepositoryList;
