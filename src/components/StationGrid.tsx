
import { RadioStation as RadioStationType } from "@/types/radio"
import RadioStation from "./RadioStation"

interface StationGridProps {
  stations: RadioStationType[]
  currentStationId: string | null
  isPlaying: boolean
  isLoading?: boolean
  onPlay: (station: RadioStationType) => void
  onPause: () => void
}

const StationGrid = ({ 
  stations, 
  currentStationId, 
  isPlaying,
  isLoading = false,
  onPlay, 
  onPause 
}: StationGridProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
      {stations.map(station => (
        <RadioStation
          key={station.id}
          station={station}
          isPlaying={isPlaying && currentStationId === station.id}
          isLoading={isLoading}
          onPlay={onPlay}
          onPause={onPause}
        />
      ))}
    </div>
  )
}

export default StationGrid
