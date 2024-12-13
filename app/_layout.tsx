import { useEffect, useState } from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import 'react-native-reanimated';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { Stack, useRouter } from 'expo-router';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Heart } from 'lucide-react-native';

import { supabase } from '@/libs/supabase';
import Common from '@/constants/Common';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const route = useRouter()
  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <BottomSheetModalProvider>
          <Stack screenOptions={{
              headerStyle: {
                backgroundColor: '#FFFFFF',
              },
              headerShadowVisible: false,
              headerBackTitleVisible: false,
              navigationBarColor: '#FFFFFF',
              statusBarColor: '#FFFFFF'
          }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="Setting" 
              options={{
                headerShown: true,
                headerTitle: 'Setting',
                headerTintColor: '#000',
                headerTitleAlign: 'center',     
              }}/>
              <Stack.Screen name="Profile"
                options={{
                  headerShown: true,
                  headerTitle: '',
                  headerTintColor: '#000',
                  headerTitleAlign: 'center',   
                  headerRight: () => (
                    <TouchableOpacity style={[Common.headerBtn, { marginRight: 2 }]} onPress={() => route.back()}>
                      <Heart color={'black'} size={18} />
                    </TouchableOpacity>  
                  )   
                }}/>
              <Stack.Screen name="EditProfile"
                options={{
                  headerShown: true,
                  headerTitle: 'Edit Profile',
                  headerTintColor: '#000',
                  headerTitleAlign: 'center',   
                }}/>
              <Stack.Screen name="NameScreen"
                  options={{
                    headerShown: true,
                    headerTitle: '',
                    headerTintColor: '#000',
                    headerTitleAlign: 'center', 
                  }}
              />
              <Stack.Screen name="NativeLanguage"
                  options={{
                    headerShown: true,
                    headerTitle: '',
                    headerTintColor: '#000',
                    headerTitleAlign: 'center', 
                  }}
              />
              <Stack.Screen name="EnglishLevel"
                  options={{
                    headerShown: true,
                    headerTitle: '',
                    headerTintColor: '#000',
                    headerTitleAlign: 'center', 
                  }}
              />
              <Stack.Screen name="AboutMe"
                  options={{
                    headerShown: true,
                    headerTitle: '',
                    headerTintColor: '#000',
                    headerTitleAlign: 'center', 
                  }}
              />
              <Stack.Screen name="CountryList"
                  options={{
                    headerShown: true,
                    headerTitle: '',
                    headerTintColor: '#000',
                    headerTitleAlign: 'center', 
                  }}
              />
              <Stack.Screen name="Interest"
                  options={{
                    headerShown: true,
                    headerTitle: '',
                    headerTintColor: '#000',
                    headerTitleAlign: 'center', 
                  }}
              />
              
              <Stack.Screen name="Authentication" 
                  options={{
                    headerShown: false,
                    animation: 'fade',
                    navigationBarColor: '#E8f5E3'
                  }}
                />
              <Stack.Screen name="EmailAuthScreen"
                  options={{
                    headerShown: true,
                    headerTitle: '',
                    headerTintColor: '#000',
                    headerTitleAlign: 'center', 
                  }}
              />
              <Stack.Screen name="PasswordAuthScreen"
                  options={{
                    headerShown: true,
                    headerTitle: '',
                    headerTintColor: '#000',
                    headerTitleAlign: 'center', 
                  }}
              />
              <Stack.Screen name="OTPVerificationScreen"
                  options={{
                    headerShown: true,
                    headerTitle: '',
                    headerTintColor: '#000',
                    headerTitleAlign: 'center', 
                    headerBackVisible: false,
                  }}
              />
            <Stack.Screen name="index"
                  options={{
                    headerShown: false,
                  }}
              />
              <Stack.Screen name="Welcome"
                  options={{
                    headerShown: false,
                    headerTitle: '',
                    headerTintColor: '#000',
                    headerTitleAlign: 'center', 
                    headerBackVisible: false,
                    statusBarColor: '#FFD8B1',
                  }}
              />
              <Stack.Screen name="+not-found" />
          </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
