
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
  albumCover?: string;
}

export interface IcecastMetadata {
  icestats: {
    source: {
      title?: string;
      artist?: string;
      server_name?: string;
      genre?: string;
      listeners?: number;
    }[];
  };
}

export interface TrackProgress {
  title: string;
  artist: string;
  duration: number; // in seconds
  elapsed: number; // in seconds
  progress: number; // percentage (0-100)
  startTime: number; // timestamp
}
