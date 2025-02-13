
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
        "group relative overflow-hidden rounded-xl p-8 transition-all",
        "bg-gradient-to-br from-[#2A2F3C]/50 to-[#1A1F2C]/50",
        "backdrop-blur-sm border border-white/10",
        isPlaying && "ring-1 ring-[#9b87f5]/50"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white">{station.name}</h3>
          <p className="text-lg text-neutral-400">{station.description}</p>
        </div>
        <button
          onClick={() => isPlaying ? onPause() : onPlay(station)}
          className={cn(
            "rounded-full p-6 transition-all",
            "bg-[#9b87f5]/10 hover:bg-[#9b87f5]/20",
            "text-white hover:scale-105",
            "active:scale-95"
          )}
        >
          {isPlaying ? <Pause size={32} /> : <Play size={32} />}
        </button>
      </div>
    </div>
  )
}

export default RadioStation
