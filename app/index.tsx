import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { supabase } from '@/libs/supabase';

const index = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log(session, "session from index.tsx")
      setIsSignedIn(!!session); 
    };

    checkAuth();
  }, []);

  if (isSignedIn === null) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href="/(tabs)/" />;
  }

  return <Redirect href="/Welcome" />;
};

export default index;
