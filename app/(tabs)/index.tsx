import React, { useEffect, useRef } from 'react';
import { View, Text, FlatList, Image, Pressable, SafeAreaView, StyleSheet, Vibration, TouchableOpacity } from 'react-native';
import { ChevronDown, PhoneCall, Search } from 'lucide-react-native';
import Common from '@/constants/Common';
import { Colors } from '@/constants/Colors';
import { Link } from 'expo-router';
import { data } from '@/data/appData';
import { BottomSheetView, BottomSheetModal } from '@gorhom/bottom-sheet';
import CustomBackdrop from '@/components/CustomBackdrop';

export default function HomeScreen() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openModal = () => {
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
      <TouchableOpacity style={styles.perfectPartnerButton} activeOpacity={0.9} onPress={openModal}>
        <Search color="white" size={25} />
        <Text style={styles.buttonText}>Find a perfect partner</Text>
      </TouchableOpacity>
    </SafeAreaView>

    <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={['100%']}
        index={0}
        backdropComponent={(props) => <CustomBackdrop {...props} />}  
        enablePanDownToClose
        handleIndicatorStyle={{ display: 'none' }}
      >
        <BottomSheetView style={styles.contentContainer}>
        <View style={styles.bottomSheetHeader}>
          <TouchableOpacity onPress={() => bottomSheetModalRef.current?.close()}>
            <ChevronDown color={'#000000'} size={24} />
          </TouchableOpacity>
          <View style={styles.centerContainer}>
            <Text style={styles.headerText}>Find a Partner</Text>
          </View>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.headingText}>Looking for the perfect partner</Text>
          <View style={styles.timerContainer}>
            <View style={styles.circle}>
              <Text style={styles.emoji}>👩‍💻</Text>
              <Text style={styles.timerText}>0:02</Text>
              <Text style={styles.subText}>Waiting time 0-1 minute</Text>
            </View>
          </View>
          <Text style={styles.noteText}>Don’t lock the screen or exit the app during the search</Text>
          <TouchableOpacity>
            <Text style={styles.settingsText}>Search settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel the search</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
      </BottomSheetModal>
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
  //bottomSheet
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1, 
    alignItems: 'center',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600'
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 40,
  },
  headingText: {
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  timerContainer: {
    marginVertical: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  circle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 10,
    borderColor: '#7F56D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 40,
    marginBottom: 5,
  },
  timerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  subText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  noteText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  settingsText: {
    fontSize: 16,
    color: '#7F56D9',
    textAlign: 'center',
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
});
