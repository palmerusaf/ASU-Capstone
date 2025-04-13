import { createClient } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';
import { Database } from './supabase';
const anonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZseXV6aHl3b2ZoY25ycGZ5dXVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MjIwNjAsImV4cCI6MjA1OTQ5ODA2MH0.YhEbZJbYGxsLTKJg2S8G-d-lLLyOntRtIj3xz98RFuA';
const pjUrl = 'https://flyuzhywofhcnrpfyuui.supabase.co';
const supabase = createClient<Database>(pjUrl, anonKey);

export const useExampleQuery = () =>
  useQuery({
    queryKey: ['example'],
    queryFn: async () => {
      return await supabase.from('Example').select();
    },
  });

export const useAuthQuery = () =>
  useQuery({
    queryKey: ['auth'],
    queryFn: async () => {
      return await supabase.auth.getSession();
    },
  });
