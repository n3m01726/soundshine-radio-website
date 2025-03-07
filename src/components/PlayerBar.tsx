
import { PlayerState } from "@/types/radio"
import VolumeControl from "./VolumeControl"

interface PlayerBarProps {
  playerState: PlayerState
  onVolumeChange: (value: number) => void
}

const PlayerBar = ({ playerState, onVolumeChange }: PlayerBarProps) => {
  if (!playerState.currentStation) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white backdrop-blur-lg border-t border-white/10">
      {/* Gradient border on top of the player */}
      <div className="h-1 w-full bg-gradient-to-l from-[#f0b1f7] via-[#aff6e4] via-[#d4f8ae] to-[#88edc3]"></div>
      
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {playerState.albumCover && (
              <img 
                src={playerState.albumCover} 
                alt="Album Cover"
                className="w-12 h-12 rounded-md"
              />
            )}
            <div className="text-sm">
              <div className="font-bold text-[#220d50]">
                {playerState.currentArtist || "Loading..."}
              </div>
              <div className="text-[#4d1fae]">
                {playerState.currentTitle || "Loading..."}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <VolumeControl
              volume={playerState.volume}
              onVolumeChange={onVolumeChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerBar
