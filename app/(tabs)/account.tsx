import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, TouchableWithoutFeedback, ActivityIndicator  } from 'react-native';
import React, { useEffect, useCallback, useRef, useState, useMemo } from 'react';
import Common from '@/constants/Common';
import ReviewCard from '@/components/ReviewCard';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import AccountSection from '@/components/AccountSection';
import ProfileHeader from '@/components/ProfileHeader';
import { useFocusEffect, useNavigation } from 'expo-router';
import { supabase } from '@/libs/supabase';
import { useUserStore } from '@/store/userStore';
import { UserData } from '@/interfaces'
import { reviews } from '@/data/appData';
import InterestsSection from '@/components/InterestsSection';

export default function Account() {
  const navigation = useNavigation();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { session } = useUserStore();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showHeaderTitle, setShowHeaderTitle] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollThreshold = useMemo(() => 10, []);
  const [userData, setUserData] = useState<UserData | null>(null);

  const close = () => {
    setIsModalVisible(false);
      navigation.setOptions({ 
        tabBarStyle: {
          backgroundColor: 'white',
          height: 55,
          borderTopWidth: 0,
        },
        headerShown: true 
      });
  }

  const handleSheetChanges = useCallback(
    (index: number) => {
      const options = index === -1
        ? {
            tabBarStyle: {
              backgroundColor: 'white',
              height: 55,
              borderTopWidth: 0,
            },
            headerShown: true,
          }
        : { tabBarStyle: { display: 'none' }, headerShown: false };

      setIsModalVisible(index !== -1);
      navigation.setOptions(options);
    },
    [navigation]
  );

  const openModal = useCallback(() => {
    setIsModalVisible(true);
    bottomSheetRef.current?.snapToIndex(0);
    navigation.setOptions({ tabBarStyle: { display: 'none' }, headerShown: false });
  }, [navigation]);

  const handleScroll = useCallback(
    (event: any) => {
      const yOffset = event.nativeEvent.contentOffset.y;
      const shouldShowTitle = yOffset > scrollThreshold;

      if (shouldShowTitle !== showHeaderTitle) {
        setShowHeaderTitle(shouldShowTitle);
        navigation.setOptions({ headerTitle: shouldShowTitle ? userData?.email.split('@')[0] : '' });
      }
    },
    [navigation, showHeaderTitle, scrollThreshold]
  );

  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        console.log("called")
        if (!session) return;
  
        try {
          const { data, error } = await supabase
            .from('users') 
            .select('*')
            .eq('id', session.user.id) 
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
  
      fetchUserData();
    }, [session?.user?.id])
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
      {isModalVisible && (
          <TouchableWithoutFeedback
            onPress={() => {
              setIsModalVisible(false);
              bottomSheetRef.current?.close();
              navigation.setOptions({ tabBarStyle: { backgroundColor: 'white', height: 55 }, headerShown: true });
            }}
          >
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
        )}
        <ScrollView
          style={Common.profileContent}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <ProfileHeader user={userData}/>

          <Text style={Common.profileContentTitle}>Personal Information</Text>
          <AccountSection user={userData}/>

          <Text style={Common.profileContentTitle}>Interests</Text>
          <InterestsSection user={userData}/>

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

      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={['80%']}
        index={isModalVisible ? 0 : -1}
        enablePanDownToClose
      >
        <BottomSheetFlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MemoizedReviewItem review={item} />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<Text style={styles.headerText}>14 Reviews</Text>}
        />
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
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
});
