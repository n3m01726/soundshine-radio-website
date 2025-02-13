
import { PlayerState } from "@/types/radio"
import VolumeControl from "./VolumeControl"

interface PlayerBarProps {
  playerState: PlayerState
  onVolumeChange: (value: number) => void
}

const PlayerBar = ({ playerState, onVolumeChange }: PlayerBarProps) => {
  if (!playerState.currentStation) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1A1F2C]/80 backdrop-blur-lg border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-neutral-400">
            {playerState.currentTrack || playerState.currentStation.name}
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
