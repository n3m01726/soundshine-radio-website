import { useState, useRef, useEffect } from "react"
import { RadioStation as RadioStationType, IcecastMetadata } from "@/types/radio"
import { PlayerState } from "@/types/radio"
import PlayerBar from "./PlayerBar"
import Footer from "./Footer"
import TopMenu from "./TopMenu"
import { Play, Pause, Loader2 } from "lucide-react"
import { Button } from "./ui/button"

const STATIONS: RadioStationType[] = [
  {
    id: "mainstream",
    name: "Mainstream",
    description: "Les meilleurs hits du moment",
    streamUrl: "https://stream.soundshineradio.com:8445/stream",
    metadataUrl: "https://stream.soundshineradio.com:8445/status-json.xsl",
    genre: "Pop"
  }
]

const RadioPlayer = () => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    currentStation: null,
    volume: 0.5,
    isLoading: false,
    currentArtist: undefined,
    currentTitle: undefined,
    albumCover: undefined
  })

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const metadataIntervalRef = useRef<number>()

  const fetchAlbumCover = async (artist: string, title: string) => {
    try {
      const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=67957983894e4e8936784e8944949494&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(title)}&format=json`);
      const data = await response.json();
      console.log("Last.fm API response:", data);
      if (data.track && data.track.album && data.track.album.image) {
        const imageUrl = data.track.album.image.find((image: any) => image.size === 'large')['#text'];
        setPlayerState(prev => ({ ...prev, albumCover: imageUrl }));
      } else {
        setPlayerState(prev => ({ ...prev, albumCover: null }));
      }
    } catch (error) {
      console.error("Error fetching album cover:", error);
      setPlayerState(prev => ({ ...prev, albumCover: null }));
    }
  };

  const fetchMetadata = async (station: RadioStationType) => {
    try {
      console.log("Fetching metadata from:", station.metadataUrl);
      const response = await fetch(station.metadataUrl || '', {
        mode: 'cors',
        headers: {
          'Accept': 'application/json'
        }
      });
  
      console.log("Metadata response status:", response.status);
      const data: IcecastMetadata = await response.json();
      console.log("Full metadata response:", JSON.stringify(data, null, 2));
  
      if (data?.icestats?.source) {
        let metadata;
        if (Array.isArray(data.icestats.source)) {
          metadata = data.icestats.source[0]; // Premier élément du tableau
        } else {
          metadata = data.icestats.source; // Directement un objet
        }
  
        console.log("Parsed metadata:", metadata);
  
        const artistTitle = metadata.title || 'Unknown - Unknown';
        const [artist, title] = artistTitle.includes(' - ')
          ? artistTitle.split(' - ', 2)
          : ['Unknown Artist', artistTitle];
  
        console.log("Extracted:", { artist, title });
  
        setPlayerState(prev => ({
          ...prev,
          currentArtist: artist,
          currentTitle: title,
          isLoading: false
        }));
  
        await fetchAlbumCover(artist, title);
      } else {
        console.log("No metadata found in response");
        setPlayerState(prev => ({
          ...prev,
          currentArtist: 'No metadata available',
          currentTitle: 'Currently Playing',
          isLoading: false
        }));
      }
    } catch (error) {
      console.error('Error fetching metadata:', error);
      setPlayerState(prev => ({
        ...prev,
        currentArtist: 'Radio SoundShine',
        currentTitle: 'Currently Playing',
        isLoading: false
      }));
    }
  };
  

  const handlePlay = async (station: RadioStationType) => {
    if (audioRef.current) {
      setPlayerState(prev => ({ ...prev, isLoading: true }));
      console.log("Trying to play station:", station.name);
  
      try {
        if (playerState.currentStation?.id === station.id) {
          await audioRef.current.play();
          setPlayerState(prev => ({ 
            ...prev, 
            isPlaying: true,
            isLoading: false 
          }));
        } else {
          if (metadataIntervalRef.current) {
            window.clearInterval(metadataIntervalRef.current);
          }
  
          audioRef.current.src = station.streamUrl;
          await audioRef.current.play();
  
          console.log("Playing new station:", station.name);
          setPlayerState(prev => ({
            ...prev,
            isPlaying: true,
            currentStation: station,
            currentArtist: 'Radio SoundShine',
            currentTitle: 'Loading stream...'
          }));
  
          await fetchMetadata(station);  // Vérifier que cette ligne est bien exécutée
  
          metadataIntervalRef.current = window.setInterval(() => {
            fetchMetadata(station);
          }, 10000);
        }
      } catch (error) {
        console.error('Failed to play audio:', error);
        setPlayerState(prev => ({ 
          ...prev, 
          isLoading: false,
          currentArtist: 'Radio SoundShine',
          currentTitle: 'Error playing stream'
        }));
      }
    }
  };
  

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setPlayerState(prev => ({ ...prev, isPlaying: false }))
    }
  }

  const handleVolumeChange = (value: number) => {
    if (audioRef.current) {
      audioRef.current.volume = value
      setPlayerState(prev => ({ ...prev, volume: value }))
    }
  }

  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.volume = playerState.volume
    
    return () => {
      if (metadataIntervalRef.current) {
        window.clearInterval(metadataIntervalRef.current)
      }
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  return (
    <div 
      className="min-h-screen w-full text-white flex flex-col custom-gradient"
    >
      <TopMenu />
      
      <div className="mx-auto max-w-7xl px-4 py-12 flex-grow">
        <div className="flex flex-col items-center justify-center space-y-8">
          <img 
            src="logo.png" 
            width="100%" 
            height="100%"
            alt="soundSHINE Radio" 
            className="w-100 h-auto mb-6 mt-4"
          />

          <div className="flex justify-center mb-12">
            {playerState.isLoading ? (
              <Button 
                variant="outline"
                className="w-32 h-32 rounded-full bg-[#220d50]/10 backdrop-blur-lg border-white/20 hover:bg-[#220d50]/20"
                disabled
              >
                <Loader2 className="h-12 w-12 animate-spin text-white" />
              </Button>
            ) : (
              <Button
                
                variant="outline"
                className="w-32 h-32 rounded-full bg-[#220d50]/10 backdrop-blur-lg border-white/20 hover:bg-[#4d1fae]/20 transition-all duration-300"
                onClick={() => !playerState.isPlaying ? handlePlay(STATIONS[0]) : handlePause()}
              >
                {playerState.isPlaying ? (
                  <Pause className="h-12 w-12 text-white" fill="white" />
                ) : (
                  <Play className="h-12 w-12 text-white" fill="white" />
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center px-4 mb-24">
        <div className="text-sm text-[#4d1fae]" style={{ marginLeft: '20px' }}>
          © 2020-2024 soundSHINE Radio. Tous droits réservés.
        </div>
        <div>
          <Footer />
        </div>
      </div>

      <PlayerBar 
        playerState={playerState}
        onVolumeChange={handleVolumeChange}
      />
    </div>
  )
}

export default RadioPlayer
