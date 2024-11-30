import Image from 'next/image';

export default function RecentlyPlayed() {
  return (
    <div className="px-4 mt-6">
      <h3 className="text-white/80 text-lg mb-3">Recently Listened to.</h3>
      <div className="bg-white/10 rounded-lg p-3 flex items-center gap-3">
        <Image
          src="/flyhigh-cover.jpg" // You'll need to add this image
          alt="FLY HIGH!!!!"
          width={48}
          height={48}
          className="rounded"
        />
        <div>
          <h4 className="text-white font-semibold">FLY HIGH!!!!</h4>
          <p className="text-white/60 text-sm">Burnout Syndromes</p>
        </div>
      </div>
    </div>
  );
} 