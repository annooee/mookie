import * as React from "react";
import CurrentSong from "@/components/CurrentSong";
import HistoryCard from "@/components/HistoryCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
// Import the JSON file directly
import currentTrackData from '../../../backend/current_track.json';

// Type definitions based on your JSON structure
interface TrackImage {
  height: number;
  url: string;
  width: number;
}

interface Album {
  name: string;
  images: TrackImage[];
}

interface TrackData {
  name: string;
  artists: string[];
  album: Album;
  is_playing: boolean;
  progress_ms: number;
  duration_ms: number;
  external_urls: {
    spotify: string;
  };
}

interface CurrentTrackData {
  timestamp: string;
  is_playing: boolean;
  track_data: TrackData;
}

export function CarouselMain({ 
  onSlideChange,
  setBgColor 
}: { 
  onSlideChange: (color: string, index: number) => void;
  setBgColor: (color: string) => void;
}) {
  const [currentTrack, setCurrentTrack] = React.useState<CurrentTrackData | null>(null);

  React.useEffect(() => {
    setCurrentTrack(currentTrackData);
  }, []);

  const currentSong = {
    color: "#8C8C8C",
    songTitle: currentTrack?.track_data?.name || "Loading...",
    artistName: currentTrack?.track_data?.artists?.[0] || "Loading...",
    imageUrl: currentTrack?.track_data?.album?.images?.[0]?.url || "/path-to-default-image"
  };

  const historyItems = [
    { 
      color: "#FFAE00", 
      songTitle: "chill guy gyatt\nbrat thursday", 
      artistName: "From the gym, to the office. You were nothing but vibes and just a chill guy ig.",
      date: "29 Nov"
    },
  ];

  const allSlides = [currentSong, ...historyItems];

  // Set initial background color when component mounts
  React.useEffect(() => {
    setBgColor(currentSong.color);
  }, [currentTrack]); // Depend on currentTrack to update when data loads

  return (
    <Carousel 
      opts={{
        align: "start",
        loop: false,
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
              date={new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
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

export default CarouselMain;