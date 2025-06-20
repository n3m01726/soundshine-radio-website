
-- Create table for song requests
CREATE TABLE public.song_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  song_id TEXT,
  username TEXT NOT NULL,
  user_ip INET,
  message TEXT,
  requested TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  played TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'played', 'rejected')),
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.song_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can submit requests (public feature)
CREATE POLICY "Anyone can submit requests" 
  ON public.song_requests 
  FOR INSERT 
  WITH CHECK (true);

-- Policy: Anyone can view requests (public feature for transparency)
CREATE POLICY "Anyone can view requests" 
  ON public.song_requests 
  FOR SELECT 
  USING (true);

-- Policy: Only authenticated users can update their own requests
CREATE POLICY "Users can update their own requests" 
  ON public.song_requests 
  FOR UPDATE 
  USING (user_id = auth.uid() OR user_id IS NULL);

-- Create index for performance
CREATE INDEX idx_song_requests_status ON public.song_requests(status);
CREATE INDEX idx_song_requests_requested ON public.song_requests(requested DESC);
