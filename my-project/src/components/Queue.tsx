import React from 'react';

interface QueueItem {
  isUpNext: boolean;
  songName: string;
  artist: string;
  coverUrl: string;
}

interface QueueProps {
  queueItems: QueueItem[];
  isHistory?: boolean;
}

const Queue = ({ queueItems, isHistory = false }: QueueProps) => {
  if (!queueItems || queueItems.length === 0) {
    return (
      <div className="w-full flex flex-col items-center">
        <h3 className="text-white mt-6">{isHistory ? 'History' : 'Up Next'}</h3>
        <p className="text-gray-400 text-sm">No tracks in queue</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <h3 className="text-white mt-4 mb-3">{isHistory ? 'History' : 'Up Next'}</h3>
      {queueItems.map((item, index) => (
        <div key={index} className="flex items-center gap-4 p-3 w-4/5 border border-gray-200/20 rounded-lg">
          <img
            src={item.coverUrl}
            alt={item.songName}
            className="h-12 w-12"
          />
          <div className="flex flex-col">
            <p className="text-white text-sm">{item.songName}</p>
            <p className="text-gray-400 text-xs">{item.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Queue;