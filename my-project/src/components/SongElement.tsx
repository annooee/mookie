import React from 'react';

interface SongElementProps {
  isUpNext: boolean;
  songName: string;
  artist: string;
  coverUrl?: string;
}

// Color configurations - can be modified here
const colors = {
  upNext: {
    background: 'bg-stone-300/3',
    hover: 'hover:bg-stone-300/3',
    border: 'border border-gray-600'
  },
  normal: {
    background: 'bg-black/10',
    hover: 'hover:bg-black/10',
    border: ''
  }
};

const SongElement: React.FC<SongElementProps> = ({ isUpNext, songName, artist, coverUrl }) => {
  return (
    <div className={`flex items-center p-2 rounded-lg transition-colors w-[90%] my-6 ${
      isUpNext 
        ? `${colors.upNext.background} ${colors.upNext.hover} ${colors.upNext.border}`
        : `${colors.normal.background} ${colors.normal.hover} ${colors.normal.border}`
    }`}>
      <div className="w-9 h-9 relative flex-shrink-0">
        <img
          src={coverUrl || "https://via.placeholder.com/48"}
          alt={`${songName} cover`}
          className="rounded-md object-cover"
        />
      </div>
      
      <div className="ml-4 flex-grow min-w-0">
        <div className="flex flex-col">
          <h3 className="text-white font-sm text-base truncate">
            {songName}
          </h3>
          <p className="text-gray-400 text-xs font-light truncate mt-1">
            {artist}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SongElement;