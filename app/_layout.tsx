import { useEffect } from 'react';
import 'react-native-reanimated';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { Stack } from 'expo-router';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {  
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
    <GestureHandlerRootView   style={{ flex: 1 }}>
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
            <Stack.Screen name="Setting"  options={{ headerShown: true, headerTitle: 'Setting', headerTintColor: '#000', headerTitleAlign: 'center'}}/>
            <Stack.Screen name="Profile/[id]"/>
              <Stack.Screen name="EditProfile" options={{ headerShown: true, headerTitle: 'Edit Profile', headerTintColor: '#000', headerTitleAlign: 'center' }} />
              <Stack.Screen name="NameScreen" options={{ headerShown: true, headerTitle: '', headerTintColor: '#000', headerTitleAlign: 'center' }} />
              <Stack.Screen name="NativeLanguage" options={{ headerShown: true, headerTitle: '', headerTintColor: '#000', headerTitleAlign: 'center', animation: 'slide_from_right' }} />
              <Stack.Screen name="EnglishLevel" options={{ headerShown: true, headerTitle: '', headerTintColor: '#000', headerTitleAlign: 'center', animation: 'slide_from_right' }} />
              <Stack.Screen name="AboutMe" options={{ headerShown: true, headerTitle: '', headerTintColor: '#000', headerTitleAlign: 'center', animation: 'slide_from_right'}} />
              <Stack.Screen name="Interest" options={{ headerShown: true, headerTitle: '', headerTintColor: '#000', headerTitleAlign: 'center' }}/>
              <Stack.Screen name="Authentication" options={{ headerShown: false, animation: 'fade', navigationBarColor: '#E8f5E3' }} />
              <Stack.Screen name="EmailAuthScreen" options={{ headerShown: true, headerTitle: '', headerTintColor: '#000', headerTitleAlign: 'center' }} />
              <Stack.Screen name="PasswordAuthScreen" options={{ headerShown: true, headerTitle: '', headerTintColor: '#000', headerTitleAlign: 'center'}}/>
              <Stack.Screen name="OTPVerificationScreen" options={{ headerShown: true, headerTitle: '', headerTintColor: '#000', headerTitleAlign: 'center', headerBackVisible: false }} />
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="Welcome" options={{ headerShown: false, headerTitle: '', headerTintColor: '#000', headerTitleAlign: 'center', headerBackVisible: false, statusBarColor: '#FFD8B1' }} />
              <Stack.Screen name="GoalSelection" options={{ headerShown: true, headerTitle: '', headerTintColor: '#000', headerTitleAlign: 'center', headerBackVisible: false }} />
              <Stack.Screen name="GenderSelection" options={{ headerShown: true, headerTitle: '', headerTintColor: '#000', headerTitleAlign: 'center', headerBackVisible: true, animation: 'slide_from_right' }} />
              <Stack.Screen name="+not-found" />
          </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
