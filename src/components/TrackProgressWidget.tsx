
import { useState, useEffect } from "react"
import { TrackProgress } from "@/types/radio"
import { Progress } from "./ui/progress"

interface TrackProgressWidgetProps {
  trackProgress: TrackProgress | null
  isPlaying: boolean
}

const TrackProgressWidget = ({ trackProgress, isPlaying }: TrackProgressWidgetProps) => {
  const [localElapsed, setLocalElapsed] = useState(0)

  useEffect(() => {
    if (trackProgress) {
      setLocalElapsed(trackProgress.elapsed)
    }
  }, [trackProgress])

  useEffect(() => {
    if (!isPlaying || !trackProgress) return

    const interval = setInterval(() => {
      setLocalElapsed(prev => {
        const newElapsed = prev + 1
        return newElapsed >= trackProgress.duration ? trackProgress.duration : newElapsed
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, trackProgress])

  if (!trackProgress) {
    return null
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const currentProgress = trackProgress.duration > 0 
    ? (localElapsed / trackProgress.duration) * 100 
    : 0

  return (
    <div className="space-y-2">
      <div className="text-sm">
        <div className="font-bold text-[#220d50] truncate">
          {trackProgress.title}
        </div>
        <div className="text-[#4d1fae] truncate">
          {trackProgress.artist}
        </div>
      </div>
      
      <div className="space-y-1">
        <Progress 
          value={currentProgress} 
          className="h-2"
        />
        <div className="flex justify-between text-xs text-[#4d1fae]">
          <span>{formatTime(localElapsed)}</span>
          <span>{formatTime(trackProgress.duration)}</span>
        </div>
      </div>
    </div>
  )
}

export default TrackProgressWidget
