import * as SecureStore from 'expo-secure-store';
import { AppState } from 'react-native';
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uekrcehhnvygsiyymqvl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVla3JjZWhobnZ5Z3NpeXltcXZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjczNjQyNTQsImV4cCI6MjA0Mjk0MDI1NH0.gEfA-OsmmOY1A8EpQhdqO_ONpTEYmjX-SUXcGnKrcBI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
