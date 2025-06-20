
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://voafepsmbtsfovfdsoxx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvYWZlcHNtYnRzZm92ZmRzb3h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNTgxOTksImV4cCI6MjA2MjkzNDE5OX0.1ADcKMwfk6drsUJv-2nt6zhzxKndp3OWTCrbR2bER2Q'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
