import { useState, useEffect } from 'react';

interface SpotifyDataResponse {
  timestamp: string;
  is_playing: boolean;
  track_data: {
    name: string;
    artists: string[];
    album: {
      name: string;
      images: {
        height: number;
        url: string;
        width: number;
      }[];
    };
    is_playing: boolean;
    progress_ms: number;
    duration_ms: number;
    external_urls: {
      spotify: string;
    };
  };
}

interface QueueResponse {
  timestamp: string;
  has_next_track: boolean;
  track_data: {
    name: string;
    artists: string[];
    album: {
      name: string;
      images: {
        height: number;
        url: string;
        width: number;
      }[];
    };
    is_playing: boolean;
    duration_ms: number;
    external_urls: {
      spotify: string;
    };
  } | null;
}

export function useCurrentTrack() {
  const [currentTrack, setCurrentTrack] = useState<SpotifyDataResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentTrack = async () => {
      try {
        const response = await fetch('/api/current-track');
        if (!response.ok) throw new Error('Failed to fetch current track');
        const data = await response.json();
        setCurrentTrack(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    // Initial fetch
    fetchCurrentTrack();

    // Set up polling every 5 seconds
    const interval = setInterval(fetchCurrentTrack, 5000);

    return () => clearInterval(interval);
  }, []);

  return { currentTrack, error };
}

export function useQueue() {
  const [queue, setQueue] = useState<QueueResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const response = await fetch('/api/queue');
        if (!response.ok) throw new Error('Failed to fetch queue');
        const data = await response.json();
        setQueue(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    // Initial fetch
    fetchQueue();

    // Set up polling every 5 seconds
    const interval = setInterval(fetchQueue, 5000);

    return () => clearInterval(interval);
  }, []);

  return { queue, error };
} 