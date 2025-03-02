import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Vibration, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { PhoneCall, Search } from 'lucide-react-native';
import Common from '@/constants/Common';
import { Colors } from '@/constants/Colors';
import { useFocusEffect, useRouter } from 'expo-router';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import PartnerFinderModal from '@/components/BottomSheets/PartnerFinderModal';
import usePresence from '@/hooks/usePresence';
import api from '@/utils/apiServices';
import { baseUrl } from '@/utils/BaseUrl';
import { UserDataCard } from '@/interfaces/index';

export default function HomeScreen() {
  const router = useRouter();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [userData, setUserData] = useState<UserDataCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { isOnline } = usePresence();

  useEffect(() => {
  }, [isOnline])

  const onRefresh = React.useCallback( async () => {
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
      params: {id: id}
    })
  }

  const handleCall = () => {
    Vibration.vibrate(20); 
  };

  if (loading) return (
    <View style={Common.loaderContainer}>
      <ActivityIndicator size={65} color={'#000000'}/>
    </View>
  );

  const renderUserItem = ({ item }: {item: UserDataCard}) => (
      <Pressable style={Common.userContainer} android_ripple={{ color: '#ccc' }} onPress={() => handleNavigationToProfile(item.id)}>
        <View style={Common.profileInfo} pointerEvents="box-none">
          <View style={Common.imageContainer}>
            <Image source={ item.profilePictureUrl ? { uri: item.profilePictureUrl } : require('@/assets/images/defaultuser.jpg')} style={Common.profileImage} />
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
  );

  return (
    <>
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
    </>
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
    backgroundColor:  Colors.light.primary,
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
  }
});
