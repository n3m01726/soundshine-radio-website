
import { useState, useEffect } from "react"
import { TrackProgress } from "@/types/radio"
import { fetchTrackProgress, mockTrackProgress } from "@/services/trackProgressService"

export const useTrackProgress = (isPlaying: boolean) => {
  const [trackProgress, setTrackProgress] = useState<TrackProgress | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!isPlaying) return

    const fetchProgress = async () => {
      setIsLoading(true)
      try {
        // For now, using mock data - replace with actual API call
        const progress = mockTrackProgress()
        setTrackProgress(progress)
      } catch (error) {
        console.error('Failed to fetch track progress:', error)
      } finally {
        setIsLoading(false)
      }
    }

    // Fetch immediately
    fetchProgress()

    // Then fetch every 5 seconds
    const interval = setInterval(fetchProgress, 5000)

    return () => clearInterval(interval)
  }, [isPlaying])

  return { trackProgress, isLoading }
}
