import React, {useEffect, useState} from 'react';
import { View, Text, Pressable, Image, StyleSheet, ActivityIndicator } from 'react-native';

import { useRouter } from 'expo-router';
import { GoogleSignin  } from '@react-native-google-signin/google-signin';

import Common from '@/constants/Common';
import { Mail } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { supabase } from '@/libs/supabase';
import { useUserStore } from '@/store/userStore';
import { saveTokens } from '@/utils/TokenStorage';
import { checkIfNewUser } from '@/utils/authUtils';

const Authentication = () => {
  const { setSession, setIsSignedIn } = useUserStore();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_WEB_CLINET_ID, 
      offlineAccess: true,
      hostedDomain: '',
      forceCodeForRefreshToken: true,
    });
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
        if (userInfo?.data?.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo?.data?.idToken,
        });

        if (error) {
          console.log('Supabase auth error:', error)
          return;
        }

        if(data) {
          setIsSignedIn(true);
          setSession(data.user);
          await saveTokens(data.session.access_token, data.session.refresh_token);

          const isNewUser = await checkIfNewUser(data.user.id);
          if (isNewUser) {            
            router.replace('/GoalSelection');
          } else {
            router.replace('/(tabs)/'); 
          }
        }
      }
    } catch (error) {
      console.log('Error during Google sign-in:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={Common.container}>
      <View style={styles.backgroundContainer}>
        <View style={styles.buttonsContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.socialButton,
              pressed && { opacity: 0.8 },
            ]}
            onPress={signInWithGoogle}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color={Colors.light.primary} />
            ) : (
              <>
                <Image
                  source={require('@/assets/images/google1.png')}
                  style={styles.icon}
                />
                <Text style={styles.socialButtonText}>Continue with Google</Text>
              </>
            )}
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.emailButton,
              pressed && { opacity: 0.8 },
            ]}
            onPress={() => router.push({ pathname: '/EmailAuthScreen', params: { mode: 'signup' } })}
            disabled={loading}
          >
            <Mail size={20} color="#FFF" />
            <Text style={styles.emailButtonText}>Sign up with Email</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.emailButton,
              pressed && { opacity: 0.8 },
            ]}
            onPress={() => router.push({ pathname: '/EmailAuthScreen', params: { mode: 'login' } })}
            disabled={loading}
          >
            <Mail size={20} color="#FFF" />
            <Text style={styles.emailButtonText}>Log in with Email</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#e8f5e3', 
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 15,
  },
  buttonsContainer: {
    paddingVertical: 45,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.light.darkGray,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  emailButton: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  emailButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Authentication;
