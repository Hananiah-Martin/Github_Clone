import RepoCard from "./RepoCard";
import RepoContent from "./RepoContent";
import RepoSidebar from "./RepoSidebar";
import Navbar from "../Navbar";
import React,{useState,useEffect} from 'react';
import ReadmeView from "./ReadMeView";
import { useParams } from "react-router-dom";
function Repository() {
  const {id}=useParams();
  const [details,setDetails]=useState([]);
  useEffect(() => {
    const fetchDetails = async () => {
      const response = await fetch(`https://github-clone-si5u.onrender.com/repo/${id}`);
      const data = await response.json();
      setDetails(data[0]);
    }
    fetchDetails();
  }, [details]);
  return (
    <>
    <Navbar/>
    <div className="min-h-screen text-gray-300">
      <nav className="flex items-center border-b border-gray-700 overflow-x-auto">
        <a
          href={`/repo/${id}`}
          className="px-4 py-2 border-b-2 border-orange-500 text-gray-200 whitespace-nowrap"
        >
          Code
        </a>
        <a 
          href={`/repo/${id}/issues`} 
          className="px-4 py-2 text-gray-400 hover:text-gray-200 whitespace-nowrap"
        >
          Issues
        </a>
      </nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <RepoCard details={details}/>
      </div>
    </div>
    </>
  );
}

export default Repository;
