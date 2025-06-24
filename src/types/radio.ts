
export interface RadioStation {
  id: string;
  name: string;
  description: string;
  streamUrl: string;
  genre: string;
  metadataUrl?: string;
}

export interface PlayerState {
  isPlaying: boolean;
  currentStation: RadioStation | null;
  volume: number;
  currentTrack?: string;
  isLoading?: boolean;
  currentArtist?: string;
  currentTitle?: string;
  albumCover?: string | null;
}

export interface IcecastMetadata {
  icestats: {
    source: IcecastSource | IcecastSource[];
  };
}

export interface IcecastSource {
  title?: string;
  artist?: string;
  server_name?: string;
  genre?: string;
  listeners?: number;
  listenurl?: string;
}

export interface TrackProgress {
  title: string;
  artist: string;
  duration: number; // in seconds
  elapsed: number; // in seconds
  progress: number; // percentage (0-100)
  startTime: number; // timestamp
  isEstimated: boolean; // whether this is estimated or real data
}

export interface LastFmTrackInfo {
  track?: {
    name: string;
    artist: {
      name: string;
    };
    album?: {
      image: Array<{
        '#text': string;
        size: string;
      }>;
    };
    duration?: string; // in milliseconds as string
  };
  error?: number;
  message?: string;
}

export interface CachedAlbumArt {
  url: string | null;
  timestamp: number;
}
