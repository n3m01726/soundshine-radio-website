import { TrackProgress } from "@/types/radio"
import { lastfmService } from "./lastfmService"

class TrackProgressService {
  private currentTrackStart: number | null = null;
  private currentTrackDuration: number | null = null;
  private currentArtist: string = '';
  private currentTitle: string = '';

  async initializeTrack(artist: string, title: string): Promise<void> {
    // Only reinitialize if it's a different track
    if (this.currentArtist === artist && this.currentTitle === title) {
      return;
    }

    console.log(`Initializing track progress for: ${artist} - ${title}`);
    
    this.currentArtist = artist;
    this.currentTitle = title;
    this.currentTrackStart = Date.now();
    
    // Try to get duration from Last.fm
    try {
      this.currentTrackDuration = await lastfmService.getTrackDuration(artist, title);
      console.log(`Track duration from Last.fm: ${this.currentTrackDuration} seconds`);
    } catch (error) {
      console.error('Failed to get track duration:', error);
      this.currentTrackDuration = null;
    }
  }

  getCurrentProgress(): TrackProgress | null {
    if (!this.currentTrackStart || !this.currentTrackDuration) {
      return null;
    }

    const elapsed = Math.floor((Date.now() - this.currentTrackStart) / 1000);
    const progress = Math.min((elapsed / this.currentTrackDuration) * 100, 100);

    return {
      title: this.currentTitle,
      artist: this.currentArtist,
      duration: this.currentTrackDuration,
      elapsed: Math.min(elapsed, this.currentTrackDuration),
      progress,
      startTime: this.currentTrackStart,
      isEstimated: true // Since we're estimating based on start time
    };
  }

  reset(): void {
    this.currentTrackStart = null;
    this.currentTrackDuration = null;
    this.currentArtist = '';
    this.currentTitle = '';
  }
}

export const trackProgressService = new TrackProgressService();

// Keep the old functions for backwards compatibility
export const fetchTrackProgress = async (): Promise<TrackProgress | null> => {
  return trackProgressService.getCurrentProgress();
}

export const mockTrackProgress = (): TrackProgress => {
  const now = Date.now()
  const startTime = now - 45000
  const duration = 210
  const elapsed = Math.floor((now - startTime) / 1000)
  
  return {
    title: "Example Song",
    artist: "Example Artist",
    duration,
    elapsed,
    progress: (elapsed / duration) * 100,
    startTime,
    isEstimated: false
  }
}
