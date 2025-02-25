import React, { useCallback, useRef, useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { useFocusEffect, useNavigation } from 'expo-router';
import { BottomSheetModal, BottomSheetFlatList } from '@gorhom/bottom-sheet';

import Common from '@/constants/Common';
import ReviewCard from '@/components/ReviewCard';
import AccountSection from '@/components/AccountSection';
import ProfileHeader from '@/components/ProfileHeader';
import InterestsSection from '@/components/InterestsSection';
import ComplimentsList from '@/components/ComplimentsList';
import AdviceList from '@/components/AdviceList';
import ActionButton from '@/components/ActionButton';

import { supabase } from '@/libs/supabase';
import { useUserStore } from '@/store/userStore';

import { UserData } from '@/interfaces';
import { reviews } from '@/data/appData';

import CustomBackdrop from '@/components/CustomBackdrop';

export default function Account() {
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { session } = useUserStore();

  const [showHeaderTitle, setShowHeaderTitle] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollThreshold = useMemo(() => 10, []);
  const [userData, setUserData] = useState<UserData | null>(null);

  const openModal = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.present();
    } else {
      console.log('BottomSheetModalRef is null');
    }
  };

  const handleScroll = useCallback(
    (event: any) => {
      const yOffset = event.nativeEvent.contentOffset.y;
      const shouldShowTitle = yOffset > scrollThreshold;

      if (shouldShowTitle !== showHeaderTitle) {
        setShowHeaderTitle(shouldShowTitle);
        navigation.setOptions({ headerTitle: shouldShowTitle ? userData?.display_name : '' });
      }
    },
    [navigation, showHeaderTitle, scrollThreshold]
  );

  const fetchUserData = async () => {
    if (!session) return;

    try {
      const { data, error } = await supabase
        .from('users') 
        .select('*')
        .eq('id', session.id) 
        .single();

      if (error) {
        console.error(error.message);
      } else {
        setUserData(data);
      }
    } catch (err) {
      console.error('Error fetching user data', err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [session?.id])
  );

  const ReviewItem = useCallback(({ review }: any) => (
    <View style={styles.reviewContainer}>
      <View style={styles.Modalheader}>
        <Image
          source={require('@/assets/images/user.jpg')}
          style={styles.ModalprofileImage}
        />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>
            {review.name}, {review.location}
          </Text>
          <Text style={styles.date}>{review.date}</Text>
        </View>
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>👍</Text>
        </View>
      </View>
      <Text style={styles.reviewText}>{review.review}</Text>
    </View>
  ), []); 

  const MemoizedReviewItem = useMemo(() => ReviewItem, [ReviewItem]);

  if (loading) return (
    <View style={Common.loaderContainer}>
      <ActivityIndicator size={65} color={'#000000'}/>
    </View>
  );

  return (
    <>
      <SafeAreaView style={Common.container}>
        <ScrollView
          style={Common.profileContent}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <ProfileHeader user={userData}/>
          { userData?.about_me === null ? 
            null : <Text style={styles.bio}>{userData?.about_me}</Text>
          }
          <ActionButton/>
          
          <Text style={Common.profileContentTitle}>Personal Information</Text>
          <AccountSection user={userData}/>

          <Text style={Common.profileContentTitle}>Interests</Text>
          <InterestsSection user={userData}/>

          <ComplimentsList/>
          <AdviceList/>

          <Text style={Common.profileContentTitle}>Feedbacks (10.8K)</Text>
          <View style={Common.profileReviewContainer}>
            <ScrollView showsHorizontalScrollIndicator={false} overScrollMode="never">
              <ReviewCard />
              <ReviewCard />
              <ReviewCard />
            </ScrollView>
            <TouchableOpacity style={Common.Reviewbutton} onPress={openModal}>
              <Text style={Common.ReviewbuttonText}>Show all 14 reviews</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={(props) => <CustomBackdrop {...props} />}  
        snapPoints={['80%']}
        index={0}
        enablePanDownToClose
      >
        <BottomSheetFlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MemoizedReviewItem review={item} />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<Text style={styles.headerText}>14 Reviews</Text>}
        />
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  reviewContainer: {
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  Modalheader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ModalprofileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    color: 'gray',
    fontSize: 14,
  },
  emojiContainer: {
    backgroundColor: '#DFF2BF',
    borderRadius: 25,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  emoji: {
    fontSize: 16,
  },
  reviewText: {
    marginVertical: 5,
    fontSize: 14,
    color: '#333',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
  bio: {
    lineHeight: 20 
  }
});
