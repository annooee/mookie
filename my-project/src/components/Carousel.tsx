import * as React from "react";

import CurrentSong from "@/components/CurrentSong";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselMain({ onSlideChange }: { onSlideChange: (color: string) => void }) {
  const slides = [
    { color: "#5F2F85", songTitle: "I Wonder", artistName: "Kanye West", imageUrl: "/path-to-image" },
    { color: "#4CAF50", songTitle: "Another Song", artistName: "Artist 2", imageUrl: "/path-to-image" },
    // Add more slides with their respective colors
  ];

  return (
    <Carousel 
      className="w-full max-w-xs"
      setApi={(api) => {
        if (!api) return;
        
        api.on("select", () => {
          const selectedIndex = api.selectedScrollSnap();
          console.log('Current index:', selectedIndex); // Debug log
          onSlideChange(slides[selectedIndex].color);
        });
      }}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <CurrentSong
                date="30 Nov"
                songTitle={slide.songTitle}
                artistName={slide.artistName}
                imageUrl={slide.imageUrl}
                backgroundColor={slide.color}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
