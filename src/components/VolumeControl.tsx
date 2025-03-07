
import { Slider } from "@/components/ui/slider"
import { Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (value: number) => void;
  className?: string;
}

const VolumeControl = ({ volume, onVolumeChange, className }: VolumeControlProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        onClick={() => onVolumeChange(volume === 0 ? 0.5 : 0)}
        className="text-[#4d1fae] hover:text-[#220d50] transition-colors"
      >
        {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
      <Slider
        value={[volume]}
        max={1}
        step={0.01}
        onValueChange={(value) => onVolumeChange(value[0])}
        className="w-[100px] custom-volume-slider"
      />
    </div>
  )
}

export default VolumeControl
