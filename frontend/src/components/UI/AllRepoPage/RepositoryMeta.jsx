import React from 'react';
import { Star } from 'lucide-react';

function RepositoryMeta({ repo }) {
  return (
    <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
      {repo.tags && (
        <div className="flex gap-2">
          {repo.tags.map(tag => (
            <span key={tag} className="text-blue-400">#{tag}</span>
          ))}
        </div>
      )}
      
      {repo.language && (
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          {repo.language}
        </span>
      )}
      
      {repo.stars && (
        <a href="#" className="flex items-center gap-1 hover:text-blue-400">
          <Star size={16} />
          {repo.stars}
        </a>
      )}
      
      <span>Updated now</span>
    </div>
  );
}

export default RepositoryMeta;