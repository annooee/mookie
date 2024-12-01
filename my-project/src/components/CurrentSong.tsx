import React, { useEffect, useState } from 'react';
import { Play, SkipBack, SkipForward } from 'lucide-react';

interface CurrentSongProps {
  date: string;
  songTitle: string;
  artistName: string;
  imageUrl: string;
  backgroundColor?: string;
  currentTime?: string;
  totalDuration?: string;
  progress?: number;
}

const getAverageColor = (imgUrl: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw image to canvas
      ctx?.drawImage(img, 0, 0);
      
      // Get pixel data
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height).data;
      
      if (!imageData) {
        resolve('#D3D3D3'); // Fallback color
        return;
      }
      
      let totalR = 0;
      let totalG = 0;
      let totalB = 0;
      const pixelCount = imageData.length / 4; // Each pixel has 4 values (R,G,B,A)
      
      // Sum up all RGB values
      for (let i = 0; i < imageData.length; i += 4) {
        totalR += imageData[i];
        totalG += imageData[i + 1];
        totalB += imageData[i + 2];
      }
      
      // Calculate averages
      const avgR = Math.round(totalR / pixelCount);
      const avgG = Math.round(totalG / pixelCount);
      const avgB = Math.round(totalB / pixelCount);
      
      // Convert to hex
      const avgColor = `#${((1 << 24) + (avgR << 16) + (avgG << 8) + avgB).toString(16).slice(1)}`;
      
      resolve(avgColor);
    };
    
    img.onerror = () => {
      resolve('#D3D3D3'); // Fallback color
    };
    
    img.src = imgUrl;
  });
};

const CurrentSong: React.FC<CurrentSongProps> = ({
  date,
  songTitle,
  artistName,
  imageUrl = 'https://placehold.co/400x400',
  backgroundColor = '#D3D3D3',
  currentTime = '0:01',
  totalDuration = '3:35',
  progress = 0.1
}) => {
  const [averageColor, setAverageColor] = useState('#D3D3D3');
  
  useEffect(() => {
    getAverageColor(imageUrl)
      .then(color => setAverageColor(color))
      .catch(() => setAverageColor(backgroundColor));
  }, [imageUrl, backgroundColor]);
  
  // Safely handle date splitting
  const [day, month] = (date || '').split(' ').length === 2
    ? date.split(' ')
    : ['--', '---'];

  return (
    <div className="w-full flex justify-center mt-4">
      <div
        className="w-full h-[600px] rounded-xl p-6 flex flex-col justify-between"
        style={{ backgroundColor: averageColor }}
      >
        {/* Date Display */}
        <div className="text-white/80 text-sm font-medium">
          <div className="text-2xl font-bold text-white">{day}</div>
          <div>{month}</div>
        </div>

        {/* Album Art */}
        <div className="flex justify-center items-center flex-grow my-4">
          <div className="aspect-square w-64 rounded-lg overflow-hidden shadow-lg">
            <img
              src={imageUrl}
              alt={`${songTitle} album art`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Song Info and Controls - Bottom Section */}
        <div className="space-y-4">
          {/* Song Info */}
          <div className="space-y-0">
            <h2 className="text-white text-2xl font-bold leading-tight line-clamp-2">
              {songTitle}
            </h2>
            <p className="text-white/60 text-base font-medium">
              {artistName}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full h-1 bg-white/20 rounded-full">
              <div
                className="h-full bg-white rounded-full"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-white/80 text-sm">
              <span>{currentTime}</span>
              <span>-{totalDuration}</span>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex justify-center items-center space-x-8">
            <button className="text-white hover:text-white/80 transition-colors">
              <SkipBack size={32} fill="white" />
            </button>
            <button className="text-white hover:text-white/80 transition-colors">
              <Play size={40} fill="white" />
            </button>
            <button className="text-white hover:text-white/80 transition-colors">
              <SkipForward size={32} fill="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentSong;