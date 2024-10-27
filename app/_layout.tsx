import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 

import { useColorScheme } from '@/hooks/useColorScheme';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
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
      <BottomSheetModalProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="Setting" 
              options={{
                headerShown: true,
                headerStyle: {
                  backgroundColor: '#ffffff',
                },
                headerTitle: 'Setting',
                headerTintColor: '#000',
                headerTitleAlign: 'center',
                headerLeft: () => (
                  <TouchableOpacity style={Common.headerBtn} onPress={() => route.back()}>
                    <ArrowLeft color={'black'} size={18} />
                  </TouchableOpacity>  
                )        
              }}/>
            <Stack.Screen name="+not-found" />
          </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
