import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://fbnvwnopfmcucvmkvfbo.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZibnZ3bm9wZm1jdWN2bWt2ZmJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwNDMwMjEsImV4cCI6MjA3MTYxOTAyMX0.wVmJ8jl_8oDWfe3mdCBjsY3KI1MNw2DzFKs3KmHyi0A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
