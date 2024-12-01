import * as React from "react";

import CurrentSong from "@/components/CurrentSong";
import HistoryCard from "@/components/HistoryCard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function CarouselMain({ onSlideChange }: { onSlideChange: (color: string, index: number) => void }) {
  const currentSong = {
    color: "#5F2F85",
    songTitle: "I Wonder",
    artistName: "Kanye West",
    imageUrl: "/path-to-image"
  };

  const historyItems = [
    { 
      color: "#4CAF50", 
      songTitle: "chill guy gyatt\nbrat thursday", 
      artistName: "From the gym, to the office. You were nothing but vibes and just a chill guy ig.",
      date: "29 Nov"
    },
    // Add more history items as needed
  ];

  const allSlides = [currentSong, ...historyItems];

  return (
    <Carousel 
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-xs"
      setApi={(api) => {
        if (!api) return;
        
        api.on("select", () => {
          const selectedIndex = api.selectedScrollSnap();
          onSlideChange(allSlides[selectedIndex].color, selectedIndex);
        });
      }}
    >
      <CarouselContent>
        {/* Current Song Card */}
        <CarouselItem key="current">
          <div className="p-1">
            <CurrentSong
              date="30 Nov"
              songTitle={currentSong.songTitle}
              artistName={currentSong.artistName}
              imageUrl={currentSong.imageUrl}
              backgroundColor={currentSong.color}
            />
          </div>
        </CarouselItem>

        {/* History Cards */}
        {historyItems.map((item, index) => (
          <CarouselItem key={`history-${index}`}>
            <div className="p-1">
              <HistoryCard
                date={item.date}
                songTitle={item.songTitle}
                artistName={item.artistName}
                backgroundColor={item.color}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
