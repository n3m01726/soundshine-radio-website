
import { RadioStation as RadioStationType } from "@/types/radio"
import { Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"

interface RadioStationProps {
  station: RadioStationType;
  isPlaying: boolean;
  onPlay: (station: RadioStationType) => void;
  onPause: () => void;
}

const RadioStation = ({ station, isPlaying, onPlay, onPause }: RadioStationProps) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl bg-neutral-900/50 p-6 transition-all",
        "hover:bg-neutral-900/70 backdrop-blur-sm",
        "border border-neutral-800/50",
        isPlaying && "ring-1 ring-white/20"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="font-semibold text-white">{station.name}</h3>
          <p className="text-sm text-neutral-400">{station.genre}</p>
        </div>
        <button
          onClick={() => isPlaying ? onPause() : onPlay(station)}
          className={cn(
            "rounded-full p-3 transition-all",
            "bg-white/10 hover:bg-white/20",
            "text-white hover:scale-105",
            "active:scale-95"
          )}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>
      <p className="mt-4 text-sm text-neutral-400 line-clamp-2">{station.description}</p>
    </div>
  )
}

export default RadioStation
