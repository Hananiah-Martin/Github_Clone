import React from "react";
import {useState,useEffect} from "react";
import { GoPlus } from "react-icons/go";
import {FiSearch } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../UI/Navbar";
import IssuesList from "./IssuesList";
const IssuesUI = () => {
  const [issues,setIssues]=useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  function handleNew(e) {
    e.preventDefault();
    navigate(`/${id}/issues/new`);
  }
  useEffect(() => {
      const fetchIssues = async () => {
        try {
          const response = await fetch(`http://localhost:3000/repo/${id}`);
          const data = await response.json();
          setIssues(data[0].issues);
        } catch (error) {
          console.error(
            "Error fetching issues:",
            error.response?.data || error.message
          );
        }
      };
      fetchIssues();
    }, [issues]);
  useEffect(() => {
      if (searchQuery == "") {
        setSearchResults(issues);
      } else {
        const filteredRepo = issues.filter((issue) =>
          issue.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        console.log(filteredRepo+"hello");
        setSearchResults(filteredRepo);
      }
    }, [searchQuery, issues]);
  return (
    <>
      <Navbar />
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
      <div className="max-w-6xl mx-auto p-6">
        
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1">
            <div className="relative flex items-center">
              <button className="absolute left-0 px-3 text-gray-500">
                <FiSearch className="w-4 h-4" />
              </button>
              <input
                type="text"
                placeholder="Search all issues"
                className="w-full pl-10 pr-3 py-1.5 bg-[#161b22] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery} style={{color:"white"}}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
              onClick={handleNew}
            >
              <GoPlus className="w-4 h-4" />
              New issue
            </button>
          </div>
        </div>

        <IssuesList issues={searchResults}/>
      </div>
    </>
  );
};

export default IssuesUI;
