import * as SecureStore from 'expo-secure-store';
import { AppState } from 'react-native';
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = 'https://uekrcehhnvygsiyymqvl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVla3JjZWhobnZ5Z3NpeXltcXZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjczNjQyNTQsImV4cCI6MjA0Mjk0MDI1NH0.gEfA-OsmmOY1A8EpQhdqO_ONpTEYmjX-SUXcGnKrcBI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Track user presence
export const trackPresence = async (userId: string) => {
  const presenceChannel = supabase.channel('online-users', {
    config: {
      presence: {
        key: userId, // Unique key for the user
      },
    },
  });

  console.log('Presence channel created for user:', userId);

  // Track user as online
  presenceChannel.on('presence', { event: 'sync' }, () => {
    console.log('Online users from supabase libs:', presenceChannel.presenceState());
  });

  presenceChannel.subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      // Update user's online status in the database
      await supabase
        .from('users')
        .update({ is_online: true, last_seen: new Date().toISOString() })
        .eq('id', userId);

      // Track presence
      await presenceChannel.track({ online_at: new Date().toISOString() });
    }
  });

  // Handle app state changes (foreground/background)
  AppState.addEventListener('change', (state) => {
    console.log(`current app state is ${state}`)
    if (state === 'active') {
      console.log('App is active, marking user as online:', userId);

      // User is active, mark as online
      presenceChannel.track({ online_at: new Date().toISOString() })
      .then(() => console.log('Presence tracked successfully'))
      .catch((error) => console.error('Failed to track presence:', error));
      supabase
        .from('users')
        .update({ is_online: true, last_seen: new Date().toISOString() })
        .eq('id', userId);
      supabase.auth.startAutoRefresh();
    } else if (state === 'background' || state === 'inactive') {
      console.log('App is inactive, marking user as offline:', userId);

      // User is inactive, mark as offline
      supabase
        .from('users')
        .update({ is_online: false, last_seen: new Date().toISOString() })
        .eq('id', userId);
      supabase.auth.stopAutoRefresh();
    }
  });

  return presenceChannel;
};