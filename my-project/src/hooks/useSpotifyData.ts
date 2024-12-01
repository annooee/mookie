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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentTrack = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/current-track');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCurrentTrack(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching current track:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentTrack();
    const interval = setInterval(fetchCurrentTrack, 5000);

    return () => clearInterval(interval);
  }, []);

  return { currentTrack, error, isLoading };
}

export function useQueue() {
  const [queue, setQueue] = useState<QueueResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/queue');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setQueue(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching queue:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQueue();
    const interval = setInterval(fetchQueue, 5000);

    return () => clearInterval(interval);
  }, []);

  return { queue, error, isLoading };
} 