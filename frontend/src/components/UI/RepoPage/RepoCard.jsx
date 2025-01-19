import React from "react";
import { Star, ChevronDown } from "lucide-react";
import { useParams} from "react-router-dom";
import axios from "axios";
function RepoCard({details}) {
  const { id } = useParams();
  const handleStar=async(e)=>{
    e.preventDefault();
    if(details.isStarrred===false){
      try {
        const userId=localStorage.getItem("userId");
        const response=await axios.put("https://github-clone-si5u.onrender.com/repo/star",{
          repoId:id,
          userId:userId,
        })
        console.log(response);
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
    <div className="flex flex-col gap-4">
      {/* Header with repo name and buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="https://github.com/identicons/johndoe.png"
            alt="Portfolio"
            className="w-8 h-8 rounded-full"
          />
          <h1 className="text-xl font-bold text-gray-200">{details?.name}</h1>
          {<span className="px-2 py-0.5 text-xs border border-gray-700 rounded-full">
            Public
          </span>}
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-3 py-1 text-sm text-gray-300 bg-[#21262d] border border-gray-700 rounded-md hover:bg-gray-800">
            <span>Unwatch</span>
            <span className="px-2 bg-[#30363d] rounded">1</span>
            <ChevronDown size={16} />
          </button>

          <button className="flex items-center gap-1 px-3 py-1 text-sm text-gray-300 bg-[#21262d] border border-gray-700 rounded-md hover:bg-gray-800">
            <span>Fork</span>
            <span className="px-2 bg-[#30363d] rounded">0</span>
            <ChevronDown size={16} />
          </button>

          <button className="flex items-center gap-1 px-3 py-1 text-sm text-gray-300 bg-[#21262d] border border-gray-700 rounded-md hover:bg-gray-800" onClick={handleStar}>
            <Star size={16} color={details?.isStarrred?"yellow":"white"}/>
            <span>{details?.isStarrred?"Starred":"Star"}</span>
            <span className="px-2 bg-[#30363d] rounded">{details?.isStarrred?1:0}</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Navigation */}
    </div>
    </>
  );
}

export default RepoCard;
