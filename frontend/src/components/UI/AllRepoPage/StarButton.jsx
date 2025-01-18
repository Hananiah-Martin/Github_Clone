import React from 'react';
import { Star, ChevronDown } from 'lucide-react';

function StarButton({star}) {
  return (
    <div className="flex items-center gap-2">
      <button className="flex items-center gap-1 px-3 py-1 text-sm border border-gray-700 rounded-md hover:bg-gray-800" style={{ color: star ? "yellow" : "white" }}>
        <Star size={16} />
        {star?"Starred":'Star'}
      </button>
      
      <button className="px-2 py-1 border-l border-gray-700 rounded-r-md hover:bg-gray-800">
        <ChevronDown size={16} />
      </button>
    </div>
  );
}

export default StarButton;