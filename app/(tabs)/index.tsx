import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Vibration, TouchableOpacity, RefreshControl, ActivityIndicator, Animated } from 'react-native';
import { PhoneCall, Search, UserX } from 'lucide-react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import Common from '@/constants/Common';
import { Colors } from '@/constants/Colors';
import { useFocusEffect, useRouter } from 'expo-router';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import PartnerFinderModal from '@/components/BottomSheets/PartnerFinderModal';
import usePresence from '@/hooks/usePresence';
import api from '@/utils/apiServices';
import { baseUrl } from '@/utils/BaseUrl';
import { UserDataCard } from '@/interfaces/index';
import { showToast } from '@/utils/toast';
import { useUserStore } from '@/store/userStore';

export default function HomeScreen() {
  const router = useRouter();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [userData, setUserData] = useState<UserDataCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { isOnline } = usePresence();
  const { session } = useUserStore()
  const swipeableRefs = useRef<Map<string, Swipeable | null>>(new Map());

  useEffect(() => {
  }, [isOnline])

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await retriveUsers();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const openPartnerFinderModal = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.present();
    } else {
      console.log('BottomSheetModalRef is null');
    }
  };

  const retriveUsers = async () => {
    setLoading(true)
    try {
      const { data, status } = await api.get(`${baseUrl}/user`)
      if (status === 200) {
        setUserData(data.users)
      }
    } catch (error: any) {
      console.log("An unexpected error occured, Please refresh or check your internet connection")
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      retriveUsers();
    }, [])
  );

  const handleNavigationToProfile = async (id: string) => {
    router.push({
      pathname: "/Profile/[id]",
      params: { id: id }
    })
  }

  const handleCall = () => {
    Vibration.vibrate(20);
  };

  const handleBlock = async (userId: string) => {
    Vibration.vibrate(30);     
    const swipeable = swipeableRefs.current.get(userId);
    if (swipeable) {
      swipeable.close();
    }
  
    try {
      if (session?.id) {  
        const response = await api.post(`${baseUrl}/block/${session.id}/${userId}`);
        if (response.status === 200) {
          showToast({
            title: 'User Blocked',
            message: 'This user has been successfully blocked.',
            preset: 'done',
            duration: 2,
          });
          await retriveUsers();
        }
      }
    } catch (error: any) {
      showToast({
        title: error.response?.data.message,
        message: error.response?.data?.message || 'Failed to block user. Please try again.',
        preset: 'error',
        duration: 3,
      });
    }
  };
  

  if (loading) return (
    <View style={Common.loaderContainer}>
      <ActivityIndicator size={65} color={'#000000'} />
    </View>
  );

  const renderRightActions = (progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>, userId: string) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });
    
    const opacity = dragX.interpolate({
      inputRange: [-100, -50, 0],
      outputRange: [1, 0.5, 0],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View 
        style={[
          styles.blockActionContainer, 
          { transform: [{ translateX: trans }], opacity }
        ]}
      >
        <TouchableOpacity 
          style={styles.blockButton} 
          onPress={() => handleBlock(userId)}
        >
          <UserX color="white" size={24} />
          <Text style={styles.blockText}>Block</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderUserItem = ({ item }: { item: UserDataCard }) => (
    <Swipeable
      ref={(ref) => {
        if (ref) swipeableRefs.current.set(item.id, ref);
        else swipeableRefs.current.delete(item.id);
      }}
      friction={2}
      leftThreshold={100}
      rightThreshold={100}
      renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item.id)}
      overshootRight={false}
    >
      <Pressable 
        style={[Common.userContainer, styles.userItemContainer]} 
        android_ripple={{ color: '#ccc' }} 
        onPress={() => handleNavigationToProfile(item.id)}
      >
        <View style={Common.profileInfo} pointerEvents="box-none">
          <View style={Common.imageContainer}>
            <Image source={item.profilePictureUrl ? { uri: item.profilePictureUrl } : require('@/assets/images/defaultuser.jpg')} style={Common.profileImage} />
            <View style={Common.levelBadge}>
              <Text style={Common.levelText}>{item.level.replace(/\s*\(.*?\)/, '')}</Text>
            </View> 
          </View>
          <View style={Common.details}>
            <Text style={Common.name}>{item.display_name}</Text>
            <Text style={Common.subtext}>
              {item.gender} • {item.country}
            </Text>
            <Text style={Common.subtext}>{item.talksCount} talks</Text>
          </View>
        </View>
        <Pressable style={styles.callButton} onPress={handleCall}>
          <PhoneCall color="white" size={20} />
        </Pressable>
      </Pressable>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={Common.container}>
        <FlatList
          data={userData}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity style={styles.perfectPartnerButton} activeOpacity={0.9} onPress={openPartnerFinderModal}>
          <Search color="white" size={25} />
          <Text style={styles.buttonText}>Find a perfect partner</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <PartnerFinderModal ref={bottomSheetModalRef} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inviteText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  callButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  callText: {
    color: 'white',
    marginLeft: 5,
  },
  perfectPartnerButton: {
    backgroundColor: Colors.light.primary,
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 10
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  levelBadge: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#f3f0f0',
    borderRadius: 12,
    paddingHorizontal: 4,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.light.primary,
  },
  userItemContainer: {
    backgroundColor: 'white',
  },
  blockActionContainer: {
    backgroundColor: Colors.light.danger,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '95%',
    flexDirection: 'row',
  },
  blockButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  blockText: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 5,
  }
});