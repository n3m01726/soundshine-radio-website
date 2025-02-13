import { useState, useRef, useEffect } from "react"
import { RadioStation as RadioStationType, IcecastMetadata } from "@/types/radio"
import RadioStation from "./RadioStation"
import VolumeControl from "./VolumeControl"
import { PlayerState } from "@/types/radio"
import { Facebook, Instagram, Github } from "lucide-react"

const STATIONS: RadioStationType[] = [
  {
    id: "mainstream",
    name: "soundSHINE Radio",
    description: "On vous en met plein les oreilles!",
    streamUrl: "https://stream.soundshineradio.com:8445/stream",
    metadataUrl: "https://stream.soundshineradio.com:8445/status-json.xsl",
    genre: "Variety"
  }
]

const RadioPlayer = () => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    currentStation: null,
    volume: 0.5
  })

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const metadataIntervalRef = useRef<number>()

  const fetchMetadata = async (station: RadioStationType) => {
    if (!station.metadataUrl) return

    try {
      const response = await fetch(station.metadataUrl)
      const data: IcecastMetadata = await response.json()
      
      // Find the source that matches our station
      const source = data.icestats.source.find(
        s => s.server_name?.toLowerCase().includes(station.id)
      )

      if (source) {
        const trackInfo = source.title || source.artist 
          ? `${source.artist || ''} - ${source.title || ''}`
          : undefined

        setPlayerState(prev => ({
          ...prev,
          currentTrack: trackInfo
        }))
      }
    } catch (error) {
      console.error('Failed to fetch metadata:', error)
    }
  }

  const handlePlay = (station: RadioStationType) => {
    if (audioRef.current) {
      if (playerState.currentStation?.id === station.id) {
        audioRef.current.play()
        setPlayerState(prev => ({ ...prev, isPlaying: true }))
      } else {
        // Clear existing metadata interval
        if (metadataIntervalRef.current) {
          window.clearInterval(metadataIntervalRef.current)
        }

        audioRef.current.src = station.streamUrl
        audioRef.current.play()
        setPlayerState({
          isPlaying: true,
          currentStation: station,
          volume: playerState.volume
        })

        // Start fetching metadata
        fetchMetadata(station)
        metadataIntervalRef.current = window.setInterval(() => {
          fetchMetadata(station)
        }, 10000) // Update metadata every 10 seconds
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
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1A1F2C] via-[#1A1F2C] to-[#2A2F3C] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col items-center justify-center space-y-8">
          <img 
            src="/path-to-your-logo.webp" 
            alt="soundSHINE Radio" 
            className="w-64 h-auto mb-8"
          />
          
          <div className="w-full space-y-8">
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1 max-w-2xl mx-auto">
              {STATIONS.map(station => (
                <RadioStation
                  key={station.id}
                  station={station}
                  isPlaying={playerState.isPlaying && playerState.currentStation?.id === station.id}
                  onPlay={handlePlay}
                  onPause={handlePause}
                />
              ))}
            </div>

            <div className="text-center space-y-4">
              <h5 className="text-lg font-medium text-neutral-300">Disponible sur</h5>
              <div className="flex justify-center space-x-8">
                <a 
                  href="https://stream.soundshineradio.com:8445/stream" 
                  target="_blank"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <i className="fa-brands fa-windows fa-2x"></i>
                </a>
                <a 
                  href="https://stream.soundshineradio.com:8445/stream" 
                  target="_blank"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <i className="fa-brands fa-apple fa-2x"></i>
                </a>
                <a 
                  href="https://stream.soundshineradio.com:8445/stream" 
                  target="_blank"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <i className="fa-brands fa-android fa-2x"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 bg-[#1A1F2C]/80 backdrop-blur-lg border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-neutral-400">
              © 2020-2024 soundSHINE Radio. Tous droits réservés.
            </div>
            
            <div className="flex items-center space-x-4">
              <a 
                href="https://www.facebook.com/soundshineradiocom/" 
                target="_blank"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/soundshineradio/" 
                target="_blank"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              
              {playerState.currentStation && (
                <VolumeControl
                  volume={playerState.volume}
                  onVolumeChange={handleVolumeChange}
                  className="ml-6"
                />
              )}
            </div>
          </div>
          
          {playerState.currentStation && (
            <div className="mt-2 text-sm">
              <span className="text-neutral-400">Now Playing: </span>
              <span className="text-white">
                {playerState.currentTrack || playerState.currentStation.name}
              </span>
            </div>
          )}
        </div>
      </footer>
    </div>
  )
}

export default RadioPlayer
