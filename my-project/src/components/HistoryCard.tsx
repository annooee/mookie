import React from 'react';

interface CurrentSongProps {
    date: string;
    songTitle: string;
    artistName: string;
    backgroundColor?: string;
}

const HistoryCard: React.FC<CurrentSongProps> = ({
    date,
    songTitle,
    artistName,
    backgroundColor = '#9747FF',
}) => {
    // Safely handle date splitting
    const [day, month] = (date || '').split(' ').length === 2
        ? date.split(' ')
        : ['--', '---'];

    return (
        <div className="w-full flex justify-center mt-4">
            <div
                className="w-full h-[600px] rounded-xl p-8 flex flex-col"
                style={{ backgroundColor }}
            >
                {/* Date Display */}
                <div className="text-white/80 mb-8">
                    <div className="text-4xl font-bold text-white">{day}</div>
                    <div className="text-xl">{month}</div>
                </div>

                {/* Title and Subtext */}
                <div className="flex-1 flex flex-col justify-center">
                    <h2 className="text-white text-4xl font-bold mb-4 leading-tight">
                        {songTitle}
                    </h2>
                    <p className="text-white/80 text-xl">
                        {artistName}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HistoryCard;