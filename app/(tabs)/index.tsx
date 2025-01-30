import React, { useRef } from 'react';
import { View, Text, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Vibration, TouchableOpacity } from 'react-native';
import { PhoneCall, Search } from 'lucide-react-native';
import Common from '@/constants/Common';
import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';
import { data } from '@/data/appData';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import PartnerFinderModal from '@/components/BottomSheets/PartnerFinderModal';

export default function HomeScreen() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openPartnerFinderModal = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.present();
    } else {
      console.error('BottomSheetModalRef is null');
    }
  };

  const handleCall = () => {
    Vibration.vibrate(20); 
  };

  const renderUserItem = ({ item }: any) => (
    <Link href="/Profile" asChild>
      <Pressable style={Common.userContainer} android_ripple={{ color: '#ccc' }}>
        <View style={Common.profileInfo} pointerEvents="box-none">
          <View style={Common.imageContainer}>
            <Image source={item.profileImg} style={Common.profileImage} />
            <View style={Common.levelBadge}>
              <Text style={Common.levelText}>{item.level || 'B1'}</Text>
            </View>
          </View>
          <View style={Common.details}>
            <Text style={Common.name}>{item.name}</Text>
            <Text style={Common.subtext}>
              {item.gender} • {item.country}
            </Text>
            <Text style={Common.subtext}>1200 talks</Text>
          </View>
        </View>
        <Pressable style={styles.callButton} onPress={handleCall}>
          <PhoneCall color="white" size={20} />
        </Pressable>
      </Pressable>
    </Link>
  );

  return (
    <>
    <SafeAreaView style={Common.container}>
      <FlatList
        data={data}
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
  },
});
