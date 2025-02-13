
import { useState, useRef, useEffect } from "react"
import { RadioStation as RadioStationType, IcecastMetadata } from "@/types/radio"
import RadioStation from "./RadioStation"
import VolumeControl from "./VolumeControl"
import { PlayerState } from "@/types/radio"

const STATIONS: RadioStationType[] = [
  {
    id: "mainstream",
    name: "Mainstream Hits",
    description: "Top 40 hits and popular music from today's chart-toppers.",
    streamUrl: "https://stream.example.com/mainstream",
    metadataUrl: "https://stream.example.com/status-json.xsl",
    genre: "Pop"
  },
  {
    id: "lofi",
    name: "Lo-Fi Beats",
    description: "Relaxing beats to study and chill to.",
    streamUrl: "https://stream.example.com/lofi",
    metadataUrl: "https://stream.example.com/lofi/status-json.xsl",
    genre: "Lo-Fi"
  },
  {
    id: "jazz",
    name: "Jazz Café",
    description: "Smooth jazz and contemporary fusion.",
    streamUrl: "https://stream.example.com/jazz",
    metadataUrl: "https://stream.example.com/jazz/status-json.xsl",
    genre: "Jazz"
  },
  {
    id: "classical",
    name: "Classical Symphony",
    description: "Timeless classical masterpieces.",
    streamUrl: "https://stream.example.com/classical",
    metadataUrl: "https://stream.example.com/classical/status-json.xsl",
    genre: "Classical"
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
    <div className="min-h-screen w-full bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Featured Stations</h2>
            <p className="text-neutral-400">Select a station to start listening</p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

          {playerState.currentStation && (
            <div className="fixed bottom-0 left-0 right-0 bg-neutral-900/80 backdrop-blur-lg border-t border-white/10">
              <div className="mx-auto max-w-7xl px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-neutral-400">Now Playing</p>
                    <h3 className="font-medium text-white">
                      {playerState.currentTrack || playerState.currentStation.name}
                    </h3>
                  </div>
                  <VolumeControl
                    volume={playerState.volume}
                    onVolumeChange={handleVolumeChange}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RadioPlayer
