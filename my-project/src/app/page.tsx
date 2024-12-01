"use client";
import { useState } from 'react';
import DateDisplay from "../components/MusicPlayer/DateDisplay"
import Header from "../components/MusicPlayer/Header"
import { CarouselMain } from "../components/Carousel";
import Queue from "../components/Queue";

export default function Home() {
  const [bgColor, setBgColor] = useState("");
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0);
  const [isCurrentlyListening, setIsCurrentlyListening] = useState(true);

  const dates = [
    "Friday",      // Current day
    "Thursday",    // Previous day
    "Wednesday",   // etc...
    // Add more dates as needed
  ];

  const allQueues = [
    // Queue for first carousel item
    [
      {
        isUpNext: true,
        songName: "FLY HIGH!!!!",
        artist: "Burnout Syndromes",
        coverUrl: "https://i.scdn.co/image/ab67616d0000b2739b2fd3a5d29c28e87a25553a"
      },
      // ... more songs for first queue
    ],
    // Queue for second carousel item
    [
      {
        isUpNext: true,
        songName: "Another Song",
        artist: "Different Artist",
        coverUrl: "path/to/cover"
      },
      // ... more songs for second queue
    ],
    // Add more queues for each carousel item
  ];

  const handleSlideChange = (color: string, index: number) => {
    setBgColor(color);
    setCurrentQueueIndex(index);
    setIsCurrentlyListening(index === 0);
  };

  return (
    <div 
      style={{ 
        background: `linear-gradient(to bottom, ${bgColor} 0%, rgba(0, 0, 0, 1) 100%)`,
        transition: 'background 0.3s ease-in-out' 
      }}
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)] overflow-hidden"
    >
      <main className="w-full flex flex-col row-start-2 items-center">
        <Header/>
        <DateDisplay 
          isCurrentlyListening={isCurrentlyListening}
          date={dates[currentQueueIndex]}
        />
        <CarouselMain 
          onSlideChange={handleSlideChange}
          setBgColor={setBgColor}
        />
        <Queue queueItems={allQueues[currentQueueIndex]} />
      </main>

    </div>
  );
}