
import { useState, useRef, useEffect } from "react"
import { RadioStation as RadioStationType } from "@/types/radio"
import { PlayerState } from "@/types/radio"
import PlayerBar from "./PlayerBar"
import Footer from "./Footer"
import TopMenu from "./TopMenu"
import { Play, Pause, Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { icecastService } from "@/services/icecastService"
import { lastfmService } from "@/services/lastfmService"

const STATIONS: RadioStationType[] = [
  {
    id: "mainstream",
    name: "Mainstream",
    description: "Les meilleurs hits du moment",
    streamUrl: "https://stream.soundshineradio.com/stream",
    metadataUrl: "https://stream.soundshineradio.com/status-json",
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

  const fetchMetadata = async (station: RadioStationType) => {
    if (!station.metadataUrl) {
      console.warn("No metadata URL for station:", station.name)
      return
    }

    try {
      console.log("Fetching metadata for station:", station.name)
      
      const metadata = await icecastService.fetchMetadata(station.metadataUrl)
      
      if (metadata) {
        const { artist, title } = metadata
        console.log("Got metadata:", { artist, title })

        // Update player state with new metadata
        setPlayerState(prev => ({
          ...prev,
          currentArtist: artist,
          currentTitle: title,
          isLoading: false
        }))

        // Fetch album cover in the background
        try {
          const albumCover = await lastfmService.getAlbumArt(artist, title)
          setPlayerState(prev => ({
            ...prev,
            albumCover
          }))
        } catch (coverError) {
          console.error("Error fetching album cover:", coverError)
          setPlayerState(prev => ({
            ...prev,
            albumCover: null
          }))
        }
      } else {
        console.log("No metadata available")
        setPlayerState(prev => ({
          ...prev,
          currentArtist: 'Radio SoundShine',
          currentTitle: 'En direct',
          isLoading: false,
          albumCover: null
        }))
      }
    } catch (error) {
      console.error('Error in fetchMetadata:', error)
      setPlayerState(prev => ({
        ...prev,
        currentArtist: 'Radio SoundShine',
        currentTitle: 'Erreur de métadonnées',
        isLoading: false,
        albumCover: null
      }))
    }
  }

  const handlePlay = async (station: RadioStationType) => {
    if (!audioRef.current) return

    setPlayerState(prev => ({ ...prev, isLoading: true }))
    console.log("Trying to play station:", station.name)

    try {
      if (playerState.currentStation?.id === station.id) {
        // Resume same station
        await audioRef.current.play()
        setPlayerState(prev => ({ 
          ...prev, 
          isPlaying: true,
          isLoading: false 
        }))
      } else {
        // Switch to new station
        if (metadataIntervalRef.current) {
          window.clearInterval(metadataIntervalRef.current)
        }

        audioRef.current.src = station.streamUrl
        await audioRef.current.play()

        console.log("Playing new station:", station.name)
        setPlayerState(prev => ({
          ...prev,
          isPlaying: true,
          currentStation: station,
          currentArtist: 'Radio SoundShine',
          currentTitle: 'Connexion en cours...',
          albumCover: null
        }))

        // Fetch metadata immediately
        await fetchMetadata(station)

        // Set up periodic metadata refresh
        metadataIntervalRef.current = window.setInterval(() => {
          fetchMetadata(station)
        }, 15000) // Check every 15 seconds
      }
    } catch (error) {
      console.error('Failed to play audio:', error)
      setPlayerState(prev => ({ 
        ...prev, 
        isLoading: false,
        currentArtist: 'Radio SoundShine',
        currentTitle: 'Erreur de lecture'
      }))
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
      className="min-h-screen w-full text-white flex flex-col custom-gradient"
    >
      <TopMenu />
      
      <div className="mx-auto max-w-7xl px-4 flex-grow flex items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-8">
          <img 
            src="logo.png" 
            width="75%"
            height="75%"
            alt="soundSHINE Radio" 
            className="w-100 h-auto mb-6"
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
