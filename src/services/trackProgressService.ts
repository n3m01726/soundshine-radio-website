
import { TrackProgress } from "@/types/radio"

export const fetchTrackProgress = async (): Promise<TrackProgress | null> => {
  try {
    // This would be your actual API endpoint
    // For now, I'll simulate the API response
    const response = await fetch('/api/current-track-progress')
    
    if (!response.ok) {
      throw new Error('Failed to fetch track progress')
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching track progress:', error)
    return null
  }
}

// Mock function for demonstration - replace with actual API call
export const mockTrackProgress = (): TrackProgress => {
  const now = Date.now()
  const startTime = now - 45000 // Started 45 seconds ago
  const duration = 210 // 3:30 in seconds
  const elapsed = Math.floor((now - startTime) / 1000)
  
  return {
    title: "Example Song",
    artist: "Example Artist",
    duration,
    elapsed,
    progress: (elapsed / duration) * 100,
    startTime
  }
}
