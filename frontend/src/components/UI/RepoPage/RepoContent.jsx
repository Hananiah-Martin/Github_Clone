import React from 'react';
import {ChevronDown} from 'lucide-react';

function RepoContent() {
  const files = [
    { name: '.models', type: 'folder', message: 'initial commit', updated: 'last week' },
    { name: 'src', type: 'folder', message: 'initial commit', updated: 'last week' },
    { name: '.gitignore', type: 'file', message: 'initial commit', updated: 'last week' },
    { name: 'eslint.config.js', type: 'file', message: 'initial commit', updated: 'last week' },
    { name: 'package.json', type: 'file', message: 'initial commit', updated: 'last week' },
    { name: 'tailwind.config.js', type: 'file', message: 'initial commit', updated: 'last week' }
  ];

  return (
    <div className="mt-6">
      {/* Branch and file controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-1 text-sm bg-[#21262d] border border-gray-700 rounded-md">
            <span>main</span>
            <ChevronDown size={16} />
          </button>
          
          <div className="flex items-center text-sm text-gray-400">
            <span>1</span>
            <span className="mx-1">branch</span>
            <span className="mx-2">•</span>
            <span>0</span>
            <span className="mx-1">tags</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-sm bg-[#21262d] border border-gray-700 rounded-md">
            Add file
            <ChevronDown size={16} className="inline ml-1" />
          </button>
          
          <button className="px-3 py-1 text-sm text-white bg-green-600 rounded-md hover:bg-green-700">
            Code
            <ChevronDown size={16} className="inline ml-1" />
          </button>
        </div>
      </div>

      {/* Files table */}
      <div className="border border-gray-700 rounded-md">
        <div className="flex items-center justify-between p-4 bg-[#161b22] border-b border-gray-700">
          <div className="flex items-center gap-2">
            <img 
              src="https://github.com/identicons/user/icon_hash.png" 
              alt="User" 
              className="w-6 h-6 rounded-full"
            />
            <span className="text-gray-300">Hananiah-Martin</span>
            <span className="text-gray-500">initial commit</span>
          </div>
          <div className="text-gray-500">
            <span>44b21db</span>
            <span className="mx-2">•</span>
            <span>last week</span>
          </div>
        </div>

        {files.map((file) => (
          <div key={file.name} className="flex items-center justify-between p-3 border-b border-gray-700 hover:bg-[#161b22]">
            <div className="flex items-center">
              <span className="w-4 h-4 mr-2">
                {file.type === 'folder' ? '📁' : '📄'}
              </span>
              <a href="#" className="text-blue-400 hover:underline">{file.name}</a>
            </div>
            <div className="text-sm text-gray-500">
              <span>{file.message}</span>
              <span className="mx-2">•</span>
              <span>{file.updated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RepoContent;