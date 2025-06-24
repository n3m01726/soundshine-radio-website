
import { useState, useEffect } from "react"
import { TrackProgress } from "@/types/radio"
import { trackProgressService } from "@/services/trackProgressService"

export const useTrackProgress = (isPlaying: boolean, artist?: string, title?: string) => {
  const [trackProgress, setTrackProgress] = useState<TrackProgress | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!isPlaying || !artist || !title) {
      setTrackProgress(null)
      return
    }

    const initializeAndFetch = async () => {
      setIsLoading(true)
      try {
        await trackProgressService.initializeTrack(artist, title)
        const progress = trackProgressService.getCurrentProgress()
        setTrackProgress(progress)
      } catch (error) {
        console.error('Failed to initialize track progress:', error)
        setTrackProgress(null)
      } finally {
        setIsLoading(false)
      }
    }

    // Initialize immediately
    initializeAndFetch()

    // Update progress every second
    const interval = setInterval(() => {
      const progress = trackProgressService.getCurrentProgress()
      setTrackProgress(progress)
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, artist, title])

  // Reset when not playing
  useEffect(() => {
    if (!isPlaying) {
      trackProgressService.reset()
    }
  }, [isPlaying])

  return { trackProgress, isLoading }
}
