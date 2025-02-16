import { useState, useRef, useEffect } from "react"
import { RadioStation as RadioStationType, IcecastMetadata } from "@/types/radio"
import { PlayerState } from "@/types/radio"
import PlayerBar from "./PlayerBar"
import Footer from "./Footer"
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
      const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=67957983894e4e8936784e8944949494&artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(title)}&format=json`);
      const data = await response.json();
      if (data.album && data.album.image) {
        const imageUrl = data.album.image.find((image: any) => image.size === 'large')['#text'];
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
      const response = await fetch(station.metadataUrl || '')
      const data: IcecastMetadata = await response.json()

      if (data?.icestats?.source && data.icestats.source.length > 0) {
        const metadata = data.icestats.source[0]
        const artist = metadata.artist || 'Unknown Artist'
        const title = metadata.title || 'Unknown Title'

        setPlayerState(prev => ({
          ...prev,
          currentArtist: artist,
          currentTitle: title
        }))

        fetchAlbumCover(artist, title)
      }
    } catch (error) {
      console.error('Error fetching metadata:', error)
    }
  }

  const handlePlay = async (station: RadioStationType) => {
    if (audioRef.current) {
      setPlayerState(prev => ({ ...prev, isLoading: true }))
      
      try {
        if (playerState.currentStation?.id === station.id) {
          await audioRef.current.play()
          setPlayerState(prev => ({ 
            ...prev, 
            isPlaying: true, 
            isLoading: false 
          }))
        } else {
          if (metadataIntervalRef.current) {
            window.clearInterval(metadataIntervalRef.current)
          }

          audioRef.current.src = station.streamUrl
          await audioRef.current.play()
          
          setPlayerState(prev => ({
            ...prev,
            isPlaying: true,
            currentStation: station
          }))

          await fetchMetadata(station)
          
          metadataIntervalRef.current = window.setInterval(() => {
            fetchMetadata(station)
          }, 10000)
        }
      } catch (error) {
        console.error('Failed to play audio:', error)
        setPlayerState(prev => ({ ...prev, isLoading: false }))
      }
    }
  }

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
      className="min-h-screen w-full text-white flex flex-col"
      style={{
        background: "linear-gradient(45deg, #230e4e, #0f0524)",
        backgroundSize: "300% 300%",
        animation: "gradientBackground 15s ease infinite"
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 flex-grow">
        <div className="flex flex-col items-center justify-center space-y-8">
          <img 
            src="logo.webp" 
            width="100%" 
            height="100%"
            alt="soundSHINE Radio" 
            className="w-100 h-auto mb-8"
          />

          <div className="flex justify-center mb-12">
            {playerState.isLoading ? (
              <Button 
                size="lg" 
                variant="outline"
                className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20"
                disabled
              >
                <Loader2 className="h-12 w-12 animate-spin text-white" />
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300"
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

      <div className="text-sm text-neutral-400 text-center py-4">
        © 2020-2024 soundSHINE Radio. Tous droits réservés.
      </div>

      <PlayerBar 
        playerState={playerState}
        onVolumeChange={handleVolumeChange}
      />
      
      <Footer />
    </div>
  )
}

export default RadioPlayer
