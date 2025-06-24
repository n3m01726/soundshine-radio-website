
import { LastFmTrackInfo, CachedAlbumArt } from "@/types/radio";

const LASTFM_API_KEY = "296603f4446bcea4f3970178949eea63";
const LASTFM_BASE_URL = "https://ws.audioscrobbler.com/2.0/";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

class LastFmService {
  private albumArtCache = new Map<string, CachedAlbumArt>();

  private getCacheKey(artist: string, title: string): string {
    return `${artist.toLowerCase()}-${title.toLowerCase()}`.replace(/[^a-z0-9-]/g, '');
  }

  private isCacheValid(cachedItem: CachedAlbumArt): boolean {
    return Date.now() - cachedItem.timestamp < CACHE_DURATION;
  }

  async getTrackInfo(artist: string, title: string): Promise<LastFmTrackInfo | null> {
    try {
      const params = new URLSearchParams({
        method: 'track.getInfo',
        api_key: LASTFM_API_KEY,
        artist: artist.trim(),
        track: title.trim(),
        autocorrect: '1',
        format: 'json'
      });

      console.log(`Fetching Last.fm info for: ${artist} - ${title}`);
      
      const response = await fetch(`${LASTFM_BASE_URL}?${params}`);
      const data: LastFmTrackInfo = await response.json();
      
      if (data.error) {
        console.warn(`Last.fm API error:`, data.message);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching Last.fm track info:', error);
      return null;
    }
  }

  async getAlbumArt(artist: string, title: string): Promise<string | null> {
    const cacheKey = this.getCacheKey(artist, title);
    
    // Check cache first
    const cached = this.albumArtCache.get(cacheKey);
    if (cached && this.isCacheValid(cached)) {
      console.log('Using cached album art for:', `${artist} - ${title}`);
      return cached.url;
    }

    try {
      const trackInfo = await this.getTrackInfo(artist, title);
      
      if (trackInfo?.track?.album?.image) {
        const images = trackInfo.track.album.image;
        const largeImage = images.find(img => img.size === 'large');
        const mediumImage = images.find(img => img.size === 'medium');
        const imageUrl = largeImage?.['#text'] || mediumImage?.['#text'] || null;
        
        // Cache the result
        this.albumArtCache.set(cacheKey, {
          url: imageUrl,
          timestamp: Date.now()
        });

        return imageUrl;
      }

      // Cache null result to avoid repeated API calls
      this.albumArtCache.set(cacheKey, {
        url: null,
        timestamp: Date.now()
      });

      return null;
    } catch (error) {
      console.error('Error fetching album art:', error);
      return null;
    }
  }

  async getTrackDuration(artist: string, title: string): Promise<number | null> {
    try {
      const trackInfo = await this.getTrackInfo(artist, title);
      
      if (trackInfo?.track?.duration) {
        const durationMs = parseInt(trackInfo.track.duration);
        return isNaN(durationMs) ? null : Math.floor(durationMs / 1000);
      }

      return null;
    } catch (error) {
      console.error('Error fetching track duration:', error);
      return null;
    }
  }
}

export const lastfmService = new LastFmService();
