
import { supabase } from "@/integrations/supabase/client";
import { SongRequest, CreateSongRequest } from "@/types/requests";

export const requestService = {
  // Submit a new song request
  async submitRequest(request: CreateSongRequest): Promise<SongRequest | null> {
    try {
      const { data, error } = await supabase
        .from('song_requests')
        .insert([request])
        .select()
        .single();

      if (error) {
        console.error('Error submitting request:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Failed to submit request:', error);
      return null;
    }
  },

  // Get recent requests
  async getRecentRequests(limit: number = 20): Promise<SongRequest[]> {
    try {
      const { data, error } = await supabase
        .from('song_requests')
        .select('*')
        .order('requested', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching requests:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Failed to fetch requests:', error);
      return [];
    }
  },

  // Get requests by status
  async getRequestsByStatus(status: 'pending' | 'played' | 'rejected', limit: number = 50): Promise<SongRequest[]> {
    try {
      const { data, error } = await supabase
        .from('song_requests')
        .select('*')
        .eq('status', status)
        .order('requested', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching requests by status:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Failed to fetch requests by status:', error);
      return [];
    }
  }
};
