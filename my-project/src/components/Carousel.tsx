import * as React from "react";
import CurrentSong from "@/components/CurrentSong";
import HistoryCard from "@/components/HistoryCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useCurrentTrack } from '@/hooks/useSpotifyData';

export function CarouselMain({ 
  onSlideChange,
  setBgColor 
}: { 
  onSlideChange: (color: string, index: number) => void;
  setBgColor: (color: string) => void;
}) {
  const { currentTrack, error } = useCurrentTrack();
  const [currentSongColor, setCurrentSongColor] = React.useState("#8C8C8C");

  const handleColorChange = (color: string) => {
    setCurrentSongColor(color);
    // Only update the background if we're on the first slide (current track)
    if (api?.selectedScrollSnap() === 0) {
      setBgColor(color);
    }
  };

  // Store carousel API reference
  const [api, setApi] = React.useState<any>(null);

  const currentSong = {
    color: currentSongColor,
    songTitle: currentTrack?.track_data?.name || "Loading...",
    artistName: currentTrack?.track_data?.artists?.[0] || "Loading...",
    imageUrl: currentTrack?.track_data?.album?.images?.[0]?.url || "/path-to-default-image"
  };

  const historyItems = [
    { 
      color: "#59C00A", 
      songTitle: "chill guy gyatt\nbrat thursday", 
      artistName: "From the gym, to the office. You were nothing but vibes and just a chill guy ig.",
      date: "29 Nov"
    },
  ];

  const allSlides = [currentSong, ...historyItems];

  return (
    <Carousel 
      opts={{
        align: "start",
        loop: false,
      }}
      className="w-full max-w-xs"
      setApi={(api) => {
        setApi(api);
        if (!api) return;
        
        api.on("select", () => {
          const selectedIndex = api.selectedScrollSnap();
          // Use currentSongColor only for index 0, otherwise use the static colors
          const color = selectedIndex === 0 
            ? currentSongColor 
            : historyItems[selectedIndex - 1].color;
          
          onSlideChange(color, selectedIndex);
          setBgColor(color);
        });
      }}
    >
      <CarouselContent>
        {/* Current Song Card */}
        <CarouselItem key="current">
          <div className="p-1">
            <CurrentSong
              date={new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
              songTitle={currentSong.songTitle}
              artistName={currentSong.artistName}
              imageUrl={currentSong.imageUrl}
              backgroundColor={currentSong.color}
              onColorChange={handleColorChange}
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

export default CarouselMain;