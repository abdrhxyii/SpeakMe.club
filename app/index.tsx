import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { supabase } from '@/libs/supabase';
import { useUserStore } from '@/store/userStore';

const Index = () => {
  const { isSignedIn, setIsSignedIn } = useUserStore(); 

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsSignedIn(!!session);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSignedIn(!!session);
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