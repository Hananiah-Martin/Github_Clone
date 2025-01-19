import React, { useEffect, useState } from "react";
import { Plus } from 'lucide-react';
import { Star,Clock } from 'lucide-react';
const RepositoryGrid = () => {
  const [repositories, setRepositories] = useState(["newrepo"]);
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `https://github-clone-si5u.onrender.com/repo/user/${userId}`
        );
        const data = await response.json();
        setRepositories(data.repository);
      } catch (err) {
        console.error("Error while fetching repositories: ", err);
      }
    };

    fetchRepositories();
  }, []);
  useEffect(() => {
  }, [repositories]);
  return (
    <section className="p-6 text-white mx-5 mt-5">
      <h1 className="text-xl font-medium text-white mb-2">Popular Repos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-4">
        {repositories.length == 0 ? (
          <div className="min-h-screen bg-[#0d1117] flex flex-col items-center pt-16 px-4">
            <div className="w-full max-w-[800px] bg-[#161b22] rounded-lg p-8 border border-[#30363d] mb-8">
              <div className="border border-[#30363d] rounded-lg p-8 text-center">
                <img
                  src="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=200&h=200"
                  alt="Repository illustration"
                  className="w-32 h-32 mx-auto mb-4 rounded-lg "
                />
                <h3 className="text-xl font-medium text-white mb-2">
                  No repositories yet
                </h3>
                <p className="text-[#7d8590] mb-6 max-w-md mx-auto">
                  Repositories are a great way to organize your work and
                  collaborate with others. Create your first repository to get
                  started!
                </p>
                <a
                  href="https://github-clone-xita-hananiahs-projects.vercel.app/new"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors"
                >
                  <Plus size={20} />
                  Create a new repository
                </a>
              </div>
            </div>

            <div className="text-[#7d8590] text-sm">
              <a href="#" className="text-blue-500 hover:text-blue-400">
                Learn more
              </a>{" "}
              about repositories and their benefits.
            </div>
          </div>
        ) : repositories.map((repo) => (
          <div
            key={repo._id}
            className="group bg-[#161b22] border border-gray-800 rounded-lg p-6 
              transition-all duration-300 ease-in-out
              hover:border-gray-700 hover:shadow-lg hover:shadow-blue-500/5
              hover:translate-y-[-2px]" style={{width:"20rem"}}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl">
                    <a
                      href={`https://github-clone-xita-hananiahs-projects.vercel.app/repo/${repo._id}`}
                      className="text-blue-400 hover:text-blue-300 font-bold 
                        transition-colors duration-200 hover:underline"
                    >
                      {repo.name}
                    </a>
                  </h3>
                  <span
                    className={`px-2 py-0.5 text-xs border rounded-full 
                      transition-colors duration-200 mx-4
                      ${repo.visibility
                        ? 'border-green-800 text-green-400 group-hover:border-green-700'
                        : 'border-gray-700 text-gray-300 group-hover:border-gray-600'
                      }`}
                  >
                    {repo.visibility ? 'Public' : 'Private'}
                  </span>
                </div>
  
                <p className="mt-2 text-gray-400 text-sm group-hover:text-gray-300 
                  transition-colors duration-200">
                  {repo.description}
                </p>
  
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
                  
                  {repo.isStarrred===true && (
                    <span className="flex items-center gap-1.5 hover:text-gray-300 
                      transition-colors duration-200 cursor-pointer">
                      <Star size={16} className="group-hover:fill-current" />
                    </span>
                  )}
                    <span className="flex items-center gap-1.5 ml-auto">
                      <Clock size={16} />
                      Updated now
                    </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RepositoryGrid;
