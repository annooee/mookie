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
    background: 'bg-blue-900/50',
    hover: 'hover:bg-blue-800/50'
  },
  normal: {
    background: 'bg-black/50',
    hover: 'hover:bg-black/30'
  }
};

const SongElement: React.FC<SongElementProps> = ({ isUpNext, songName, artist, coverUrl }) => {
  return (
    <div className={`flex items-center p-4 rounded-lg transition-colors w-[90%] ${
      isUpNext 
        ? `${colors.upNext.background} ${colors.upNext.hover}`
        : `${colors.normal.background} ${colors.normal.hover}`
    }`}>
      <div className="w-12 h-12 relative flex-shrink-0">
        <img
          src={coverUrl || "https://via.placeholder.com/48"}
          alt={`${songName} cover`}
          className="rounded-md object-cover"
        />
      </div>
      
      <div className="ml-4 flex-grow min-w-0">
        <div className="flex flex-col">
          <h3 className="text-white font-medium text-base truncate">
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