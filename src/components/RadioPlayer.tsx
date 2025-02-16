import { useState, useRef, useEffect } from "react"
import { RadioStation as RadioStationType, IcecastMetadata } from "@/types/radio"
import { PlayerState } from "@/types/radio"
import PlayerBar from "./PlayerBar"
import Footer from "./Footer"
import { Play, Pause, Loader2 } from "lucide-react"
import { Button } from "./ui/button"

// Add import for social media icons if needed
import { Facebook, Twitter, Instagram } from "lucide-react"


// Define and initialize playerState here
const [playerState, setPlayerState] = useState({
  isPlaying: false,
  currentStation: null,
  volume: 0.5,
  isLoading: false
});




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
  // ... existing code ...

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

      <div className="flex justify-between items-center px-4">
        <div className="text-sm text-neutral-400 text-left py-4" style={{ marginLeft: '20px' }}>
          © 2020-2024 soundSHINE Radio. Tous droits réservés.
        </div>

        <div className="flex space-x-4">
          <Facebook className="text-white" />
          <Twitter className="text-white" />
          <Instagram className="text-white" />
        </div>
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
