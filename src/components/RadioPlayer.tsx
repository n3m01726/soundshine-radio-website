
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
    isLoading: false
  })

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const metadataIntervalRef = useRef<number>()

  const fetchAlbumCover = async (artist: string, title: string) => {
    try {
      const response = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=1a53684f4d53a11c61218a0d7609549a&artist=${encodeURIComponent(
          artist
        )}&track=${encodeURIComponent(title)}&format=json`
      )
      const data = await response.json()
      const images = data?.track?.album?.image || []
      const largeImage = images.find((img: any) => img.size === "large")
      const albumImage = largeImage ? largeImage["#text"] : null
      
      if (albumImage) {
        setPlayerState(prev => ({ ...prev, albumCover: albumImage }))
      }
    } catch (error) {
      console.error("Failed to fetch album cover:", error)
    }
  }

  const fetchMetadata = async (station: RadioStationType) => {
    if (!station.metadataUrl) return

    try {
      const response = await fetch(station.metadataUrl)
      const data: IcecastMetadata = await response.json()
      
      if (!data.icestats || !data.icestats.source) {
        console.error('Invalid metadata format:', data)
        return
      }
      
      // Always use the first source as it contains the current stream info
      const source = Array.isArray(data.icestats.source) 
        ? data.icestats.source[0] 
        : data.icestats.source
      
      const artist = source.artist || ""
      const title = source.title || ""
      
      setPlayerState(prev => ({
        ...prev,
        currentArtist: artist,
        currentTitle: title,
        currentTrack: `${artist} - ${title}`,
        isLoading: false // Ensure loading is cleared after metadata is fetched
      }))

      if (artist && title) {
        fetchAlbumCover(artist, title)
      }
    } catch (error) {
      console.error('Failed to fetch metadata:', error)
      setPlayerState(prev => ({ ...prev, isLoading: false })) // Clear loading on error
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
            // Don't clear isLoading here, wait for metadata
          }))

          // Fetch metadata immediately
          await fetchMetadata(station)
          
          // Set up interval for subsequent fetches
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

      <div className="text-sm text-neutral-400 text-left py-4">
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
