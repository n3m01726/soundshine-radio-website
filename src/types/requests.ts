
export interface SongRequest {
  id: string;
  song_id?: string;
  username: string;
  user_ip?: string;
  message?: string;
  requested: string;
  played?: string;
  status: 'pending' | 'played' | 'rejected';
  user_id?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateSongRequest {
  song_id?: string;
  username: string;
  message?: string;
  user_id?: string;
}
