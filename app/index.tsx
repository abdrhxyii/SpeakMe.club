import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { supabase } from '@/libs/supabase';
import { useUserStore } from '@/store/userStore';
import { StyleSheet, ActivityIndicator, View } from 'react-native';

const Index = () => {
  const { isSignedIn, setIsSignedIn } = useUserStore();
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<Boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error('Error fetching session:', sessionError.message);
          setIsLoading(false);
          return;
        }

        const isLoggedIn = !!session;
        setIsSignedIn(isLoggedIn);

        if (isLoggedIn) {
          const { data, error } = await supabase
            .from('users')
            .select('is_onboarding_complete')
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching onboarding status:', error.message);
            setIsOnboardingComplete(false); // Default value if error occurs
          } else {
            setIsOnboardingComplete(data.is_onboarding_complete);
          }
        }
      } catch (err) {
        console.error('Unexpected error in checkAuth:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const isLoggedIn = !!session;
      setIsSignedIn(isLoggedIn);

      if (isLoggedIn) {
        supabase
          .from('users')
          .select('is_onboarding_complete')
          .eq('id', session.user.id)
          .single()
          .then(({ data, error }) => {
            if (error) {
              console.error('Error fetching onboarding status (auth state change):', error.message);
              setIsOnboardingComplete(false);
            } else {
              setIsOnboardingComplete(data.is_onboarding_complete);
            }
          });
      } else {
        setIsOnboardingComplete(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={65} color="#000000" />
      </View>
    );
  }

  if (isSignedIn && isOnboardingComplete === false) {
    return <Redirect href="/GoalSelection" />;
  }

  if (isSignedIn) {
    return <Redirect href="/(tabs)/" />;
  }

  return <Redirect href="/Welcome" />;
};

export default Index;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
