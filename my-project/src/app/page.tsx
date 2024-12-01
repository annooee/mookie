"use client";
import { useState } from 'react';
import DateDisplay from "../components/MusicPlayer/DateDisplay"
import Header from "../components/MusicPlayer/Header"
import { CarouselMain } from "../components/Carousel";
import Queue from "../components/Queue";
import trackData from "../../../backend/next_in_queue.json";

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
        songName: trackData.track_data.name,        
        artist: trackData.track_data.artists.join(', '),
        coverUrl: trackData.track_data.album.images[2].url // URL from the images array
      },
      
      // ... more songs for first queue
    ],
    // Queue for second carousel item
    [
      {
        isUpNext: false,
        songName: "Disease",
        artist: "Lady Gaga",
        coverUrl: "https://upload.wikimedia.org/wikipedia/en/d/de/Lady_Gaga_-_Disease.png"
      },
      {
        isUpNext: false,
        songName: "360",
        artist: "Charli xcx",
        coverUrl: "https://upload.wikimedia.org/wikipedia/commons/6/60/Charli_XCX_-_Brat_%28album_cover%29.png"
      },
      {
        isUpNext: false,
        songName: "I love you, I'm sorry",
        artist: "Gracie Abrams",
        coverUrl: "https://www.melodicmag.com/wp-content/uploads/2024/10/thesecretofus_deluxe_tracklist-1.jpg"
      },
      {
        isUpNext: false,
        songName: "Beaches",
        artist: "Beabadoobee",
        coverUrl: "https://media.pitchfork.com/photos/623a9d636597466fa9d6e2ba/master/pass/beabadoobee-Beatopia.jpg"
      },
      {
        isUpNext: false,
        songName: "Thick of it",
        artist: "KSI",
        coverUrl: "https://i.scdn.co/image/ab67616d0000b27312e5ad29295bd49dd7e45a73"
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
        <Header />
        <DateDisplay
          isCurrentlyListening={isCurrentlyListening}
          date={dates[currentQueueIndex]}
        />
        <CarouselMain
          onSlideChange={handleSlideChange}
          setBgColor={setBgColor}
        />
        <Queue 
          queueItems={allQueues[currentQueueIndex]} 
          isHistory={currentQueueIndex !== 0}
        />
      </main>

    </div>
  );
}