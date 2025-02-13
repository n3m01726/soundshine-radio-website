
export interface RadioStation {
  id: string;
  name: string;
  description: string;
  streamUrl: string;
  genre: string;
}

export interface PlayerState {
  isPlaying: boolean;
  currentStation: RadioStation | null;
  volume: number;
}
