import React from 'react';
import { Play, SkipBack, SkipForward } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

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

const CurrentSong: React.FC<CurrentSongProps> = ({
    date,
    songTitle,
    artistName,
    imageUrl = 'https://placehold.co/400x400',
    backgroundColor = '#9747FF',
    currentTime = '0:01',
    totalDuration = '3:35',
    progress = 0.1
}) => {
    // Safely handle date splitting
    const [day, month] = (date || '').split(' ').length === 2
        ? date.split(' ')
        : ['--', '---'];

    return (
        <div className="w-full flex justify-center px-4 mt-4">
            <div
                className="w-[90%] aspect-[5/5] rounded-xl p-6 flex flex-col justify-between relative" // Increased width from 4/5 (80%) to 90%, increased height aspect ratio
                style={{ backgroundColor }}
            >
                {/* Date Display */}
                <div className="text-white/80 text-sm font-medium flex flex-col">
                    <div className="text-2xl font-bold text-white">{day}</div>
                    <div>{month}</div>
                </div>

                {/* Album Art */}
                <div className="flex justify-center items-center flex-1 my-4">
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