
import { RadioStation as RadioStationType } from "@/types/radio"
import { cn } from "@/lib/utils"

interface RadioStationProps {
  station: RadioStationType;
  isPlaying: boolean;
  isLoading?: boolean;
  onPlay: (station: RadioStationType) => void;
  onPause: () => void;
}

const RadioStation = ({ station, isPlaying, isLoading, onPlay, onPause }: RadioStationProps) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl p-8 transition-all",
        "bg-[#230e4e]/50 hover:bg-[#230e4e]/70",
        "backdrop-blur-sm border border-white/10",
        isPlaying && "ring-1 ring-[#9b87f5]/50"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white">{station.name}</h3>
          <p className="text-lg text-[#9b87f5]">{station.description}</p>
        </div>
        <button
          onClick={() => isPlaying ? onPause() : onPlay(station)}
          disabled={isLoading}
          className={cn(
            "rounded-full p-6 transition-all",
            "bg-[#9b87f5]/10 hover:bg-[#9b87f5]/20",
            "text-white hover:scale-105",
            "active:scale-95",
            isLoading && "animate-pulse"
          )}
        >
          <i className={cn(
            "fa-solid",
            isLoading ? "fa-spinner fa-spin" : isPlaying ? "fa-pause" : "fa-play"
          )}></i>
        </button>
      </div>
    </div>
  )
}

export default RadioStation
