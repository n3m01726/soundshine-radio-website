import { useState, useRef, useEffect } from "react"
import { RadioStation as RadioStationType, IcecastMetadata } from "@/types/radio"
import RadioStation from "./RadioStation"
import VolumeControl from "./VolumeControl"
import { PlayerState } from "@/types/radio"
import { Facebook, Instagram, Github } from "lucide-react"

const STATIONS: RadioStationType[] = [
  {
    id: "mainstream",
    name: "Mainstream",
    description: "Les meilleurs hits du moment",
    streamUrl: "https://stream.soundshineradio.com:8445/stream",
    metadataUrl: "https://stream.soundshineradio.com:8445/status-json.xsl",
    genre: "Pop"
  },
  {
    id: "lofi",
    name: "Lo-Fi",
    description: "Détente et ambiance chill",
    streamUrl: "https://stream.soundshineradio.com:8445/lofi",
    metadataUrl: "https://stream.soundshineradio.com:8445/lofi/status-json.xsl",
    genre: "Lo-Fi"
  },
  {
    id: "edm",
    name: "EDM",
    description: "Electronic Dance Music",
    streamUrl: "https://stream.soundshineradio.com:8445/edm",
    metadataUrl: "https://stream.soundshineradio.com:8445/edm/status-json.xsl",
    genre: "Electronic"
  },
  {
    id: "reggaeton",
    name: "Reggaeton",
    description: "Le meilleur du Reggaeton",
    streamUrl: "https://stream.soundshineradio.com:8445/reggaeton",
    metadataUrl: "https://stream.soundshineradio.com:8445/reggaeton/status-json.xsl",
    genre: "Reggaeton"
  },
  {
    id: "dance90",
    name: "Dance 90's",
    description: "Le son des années 90",
    streamUrl: "https://stream.soundshineradio.com:8445/dance90",
    metadataUrl: "https://stream.soundshineradio.com:8445/dance90/status-json.xsl",
    genre: "Dance"
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
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
          </div>
        </div>
      </div>

      {playerState.currentStation && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#1A1F2C]/80 backdrop-blur-lg border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-neutral-400">
                {playerState.currentTrack || playerState.currentStation.name}
              </div>
              
              <div className="flex items-center space-x-4">
                <VolumeControl
                  volume={playerState.volume}
                  onVolumeChange={handleVolumeChange}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="py-4 mt-auto">
        <div className="mx-auto max-w-7xl px-4">
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default RadioPlayer
