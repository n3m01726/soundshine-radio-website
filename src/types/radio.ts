
export interface RadioStation {
  id: string;
  name: string;
  description: string;
  streamUrl: string;
  genre: string;
  metadataUrl?: string; // URL for the Icecast JSON status endpoint
}

export interface PlayerState {
  isPlaying: boolean;
  currentStation: RadioStation | null;
  volume: number;
  currentTrack?: string;
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
