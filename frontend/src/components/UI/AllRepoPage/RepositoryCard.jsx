import React from "react";
import RepositoryMeta from "./RepositoryMeta";
import StarButton from "./StarButton";
function RepositoryCard({ repo }) {
  return (
    <>
      <div className="py-6">
        <div>
          <div className="flex items-start justify-between p-6 bg-[#161b22] rounded-lg border border-gray-800 transition-all duration-200 hover:border-gray-700 hover:shadow-lg ">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="text-xl">
                  <a
                    href={`/repo/${repo._id}`}
                    className="text-blue-400 hover:text-blue-300 font-bold transition-colors duration-200 hover:underline"
                  >
                    {repo.name}
                  </a>
                </h3>
                <span
                  className={`px-2 py-0.5 text-xs border rounded-full transition-colors duration-200
                ${
                  repo.visibility
                    ? "border-green-800 text-green-400 group-hover:border-green-700"
                    : "border-gray-700 text-gray-300 group-hover:border-gray-600"
                }`}
                >
                  {repo.visibility ? "Public" : "Private"}
                </span>
              </div>
              <p className="mt-2 text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-200">
                {repo.description}
              </p>
              <div className="mt-4 opacity-90 group-hover:opacity-100 transition-opacity duration-200">
                <RepositoryMeta repo={repo} />
              </div>
            </div>

            <div className="ml-6 transform group-hover:scale-105 transition-transform duration-200">
              <StarButton star={repo.isStarrred} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RepositoryCard;
