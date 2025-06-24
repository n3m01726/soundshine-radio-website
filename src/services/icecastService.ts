
import { IcecastMetadata, IcecastSource } from "@/types/radio";

class IcecastService {
  async fetchMetadata(metadataUrl: string): Promise<{ artist: string; title: string } | null> {
    try {
      console.log("Fetching Icecast metadata from:", metadataUrl);
      
      const response = await fetch(metadataUrl, {
        mode: 'cors',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: IcecastMetadata = await response.json();
      console.log("Icecast metadata response:", data);

      if (!data?.icestats?.source) {
        console.warn("No source data in Icecast response");
        return null;
      }

      // Handle both array and single object responses
      const source: IcecastSource = Array.isArray(data.icestats.source) 
        ? data.icestats.source[0] 
        : data.icestats.source;

      if (!source.title) {
        console.warn("No title in Icecast source data");
        return null;
      }

      // Parse the title field which typically contains "Artist - Title"
      const fullTitle = source.title;
      const [artist, title] = fullTitle.includes(' - ')
        ? fullTitle.split(' - ', 2)
        : ['Unknown Artist', fullTitle];

      console.log("Parsed metadata:", { artist: artist.trim(), title: title.trim() });

      return {
        artist: artist.trim(),
        title: title.trim()
      };
    } catch (error) {
      console.error('Error fetching Icecast metadata:', error);
      return null;
    }
  }
}

export const icecastService = new IcecastService();
