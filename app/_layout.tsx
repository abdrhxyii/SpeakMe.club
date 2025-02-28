import { useEffect, useState } from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import 'react-native-reanimated';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { Stack, useGlobalSearchParams, useRouter } from 'expo-router';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Heart } from 'lucide-react-native';

import Common from '@/constants/Common';
import { useUserStore } from '@/store/userStore';
import api from '@/utils/apiServices';
import { baseUrl } from '@/utils/BaseUrl';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const route = useRouter();
  const { id } = useGlobalSearchParams()
  const [heartFilled, setHeartFilled] = useState(false); 
  const { session, isSignedIn } = useUserStore();
  
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

  const handleAddFriend = async (favouriteUserId: any) => {
    const data = {
      myId: session.id,
      otheruser: favouriteUserId
    }
    console.log(data, "data")

    try {
      const { status } = await api.post(`${baseUrl}/friends/${session.id}/${favouriteUserId}`);
      if (status === 200) {
        setHeartFilled(true);
      }
    } catch (error) {
      console.log('Error adding friend', error);
    }
  };

  return (
    <GestureHandlerRootView   style={{ flex: 1 }}>
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
            <Stack.Screen name="Setting"  options={{ headerShown: true, headerTitle: 'Setting', headerTintColor: '#000', headerTitleAlign: 'center'}}/>
            <Stack.Screen name="Profile/[id]"
                options={{
                  headerShown: true,
                  headerTitle: '',
                  headerTintColor: '#000',
                  headerTitleAlign: 'center',   
                  headerRight: () => (
                    <TouchableOpacity style={[Common.headerBtn, { marginRight: 2 }]} onPress={() => handleAddFriend(id)}>
                      <Heart color={'black'} size={20} fill={"#000000"}/>
                    </TouchableOpacity>  
                  )   
              }}/>
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
