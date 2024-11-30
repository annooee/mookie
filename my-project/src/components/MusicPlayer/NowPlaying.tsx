import Image from 'next/image';
import { Play, SkipBack, SkipForward } from 'react-feather';

export default function NowPlaying() {
  return (
    <div className="bg-purple-700 rounded-lg mx-4 p-6 mt-4">
      <div className="flex items-start">
        <div className="text-6xl font-bold text-white">29</div>
        <div className="text-xl text-white/80 mt-1 ml-2">Nov</div>
      </div>
      
      <div className="mt-4">
        <Image
          src="/graduation-album.jpg" // You'll need to add this image
          alt="Graduation Album Cover"
          width={300}
          height={300}
          className="rounded-lg w-full"
        />
      </div>

      <div className="mt-4">
        <h2 className="text-3xl font-bold text-white">I Wonder</h2>
        <p className="text-white/80 mt-1">Kanye West</p>
      </div>

      <div className="mt-4">
        <div className="w-full bg-white/20 rounded-full h-1">
          <div className="bg-white w-[1%] h-full rounded-full"/>
        </div>
        <div className="flex justify-between mt-2 text-white/80">
          <span>0:01</span>
          <span>-3:35</span>
        </div>
      </div>

      <div className="flex justify-center items-center gap-12 mt-6">
        <button className="text-white">
          <SkipBack size={28} />
        </button>
        <button className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
          <Play size={28} className="text-purple-700 ml-1" />
        </button>
        <button className="text-white">
          <SkipForward size={28} />
        </button>
      </div>
    </div>
  );
} 