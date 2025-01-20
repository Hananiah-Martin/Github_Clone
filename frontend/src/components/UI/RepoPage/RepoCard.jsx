import React, { useState } from "react";
import { Star, ChevronDown } from "lucide-react";
import { useParams} from "react-router-dom";
import axios from "axios";
import ReadmeView from "./ReadMeView";
import RepoSidebar from "./RepoSidebar";
function RepoCard({details}) {
  const { id } = useParams();
  const [star,setStar]=useState(false);
  const handleStar=async(e)=>{
    e.preventDefault();
    if(details.isStarrred===false){
      try {
        setStar(true);
        const userId=localStorage.getItem("userId");
        const response=await axios.put("https://github-clone-si5u.onrender.com/repo/star",{
          repoId:id,
          userId:userId,
        })
        setStar(false);
      } catch (error) {
        console.error("Error during starring the repository",error);
      }
    }
    else{
      try {
        const userId=localStorage.getItem("userId");
        const response=await axios.put("https://github-clone-si5u.onrender.com/repo/unStar",{
          repoId:id,
          userId:userId,
        })
        console.log(response);
      } catch (error) {
        console.error("Error during starring the repository",error);
      }
    }
  }
  return (
    <>
    <div className="flex items-center justify-center ">
      <div className="flex flex-col gap-4 bg-[#0d1117] p-6 rounded-lg border border-gray-700 w-full max-w-2xl">
        {/* Header with repo name and status */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <img
              src="https://github.com/identicons/johndoe.png"
              alt="Portfolio"
              className="w-8 h-8 rounded-full ring-2 ring-gray-700"
            />
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-bold text-gray-200">{details.name}</h1>
              <span className="px-2 py-0.5 text-xs border border-gray-700 rounded-full w-fit text-gray-300">
                Public
              </span>
            </div>
          </div>
          
          {/* Star button in its own row */}
          <div className="mt-2">
            <button 
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-300 bg-[#21262d] border border-gray-700 rounded-md hover:bg-gray-800 transition-colors duration-200 group"
              onClick={handleStar}
            >
              <Star 
                size={16} 
                className={`${details.isStarrred ? 'text-yellow-400' : 'text-gray-300'} group-hover:scale-110 transition-transform duration-200`}
              />
              <span className="group-hover:text-gray-200 transition-colors duration-200">
                {star ? 'Starring' : (details.isStarrred ? 'Starred' : 'Star')}
              </span>
              <span className="px-2 bg-[#30363d] rounded ml-1">{details.isStarrred ? 1 : 0}</span>
              <ChevronDown size={16} className="ml-1 group-hover:text-gray-200 transition-colors duration-200" />
            </button>
            <ReadmeView details={details}/>
            <RepoSidebar details={details}/>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default RepoCard;
