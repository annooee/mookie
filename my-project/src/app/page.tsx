"use client";
import { useState } from 'react';
import DateDisplay from "../components/MusicPlayer/DateDisplay"
import Header from "../components/MusicPlayer/Header"
import Image from "next/image";
import { CarouselMain } from "../components/Carousel";
import Queue from "../components/Queue";

export default function Home() {
  const [bgColor, setBgColor] = useState("#5F2F85");
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0);

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
        <DateDisplay/>
        <CarouselMain onSlideChange={handleSlideChange}/>
        <Queue queueItems={allQueues[currentQueueIndex]} />
      </main>

    </div>
  );
}