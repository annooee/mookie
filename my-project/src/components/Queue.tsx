import React from 'react';
import SongElement from './SongElement';

interface QueueItem {
    isUpNext: boolean;
    songName: string;
    artist: string;
    coverUrl: string;
}

interface QueueProps {
    queueItems: QueueItem[];
}

const Queue: React.FC<QueueProps> = ({ queueItems }) => {
    return (
        <div className="w-full flex flex-col items-center">
            <h3 className="text-white mt-6">Up Next</h3>
            {queueItems.map((item, index) => (
                <SongElement
                    key={index}
                    isUpNext={item.isUpNext}
                    songName={item.songName}
                    artist={item.artist}
                    coverUrl={item.coverUrl}
                />
            ))}
        </div>
    );
};

export default Queue; 