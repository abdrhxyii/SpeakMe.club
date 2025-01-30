import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { supabase, trackPresence } from '@/libs/supabase';
import { useUserStore } from '@/store/userStore';

const Index = () => {
  const { isSignedIn, setIsSignedIn, setSession } = useUserStore();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsSignedIn(!!session);
      setSession(session);

      if (session) {
        // Track user presence
        const presenceChannel = await trackPresence(session.user.id);
        console.log(presenceChannel, "presenceChannel from index.js (app)")
        return () => {
          presenceChannel.unsubscribe();
        };
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSignedIn(!!session);
      setSession(session);

      if (session) {
        // Track user presence
        trackPresence(session.user.id).then((presenceChannel) => {
          // Cleanup function
          return () => presenceChannel.unsubscribe();
        });
      }

      // No need to return anything from here directly
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isSignedIn === null) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href="/(tabs)/" />;
  }

  return <Redirect href="/Welcome" />;
};

export default Index;
