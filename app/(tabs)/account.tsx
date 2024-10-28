import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import React, { useCallback, useRef, useState, useLayoutEffect  } from 'react';
import Common from '@/constants/Common';
import ReviewCard from '@/components/ReviewCard';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import AccountSection from '@/components/AccountSection';
import ProfileHeader from '@/components/ProfileHeader';
import ActionButton from '@/components/ActionButton';
import { useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';

const reviews = [
  {
    id: '1',
    name: 'Vaishali',
    location: 'Dehradun, India',
    date: 'August 2024',
    review: 'Castle Oodeypore is a magnificent palace with stunning interiors. We stepped-in and were absolutely arrested by its royal charm. Kudos to Ma\'am Nirmal for the exquisite aesthetics, ',
  },
  {
    id: '2',
    name: 'Bridget',
    location: 'Auckland, New Zealand',
    date: 'January 2024',
    review: '',
  },
  {
    id: '3',
    name: 'Vaishali',
    location: 'Dehradun, India',
    date: 'August 2024',
    review: '',
  },
  {
    id: '4',
    name: 'Bridget',
    location: 'Auckland, New Zealand',
    date: 'January 2024',
    review: '',
  },
  {
    id: '5',
    name: 'Vaishali',
    location: 'Dehradun, India',
    date: 'August 2024',
    review: '',
  },
  {
    id: '6',
    name: 'Bridget',
    location: 'Auckland, New Zealand',
    date: 'January 2024',
    review: '',
  },
];

export default function Account() {
  const navigation = useNavigation();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [showHeaderTitle, setShowHeaderTitle] = useState(false);
  const scrollThreshold = 10;

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setIsModalVisible(false);
      navigation.setOptions({ 
        tabBarStyle: {
          backgroundColor: 'white',
          height: 55,
          borderTopWidth: 0,
        },
        headerShown: true 
      });
    } else {
      setIsModalVisible(true);
      navigation.setOptions({ 
        tabBarStyle: { display: 'none' }, 
        headerShown: false 
      });
    }
  }, [navigation]);

  const openModal = () => {
    setIsModalVisible(true);
    bottomSheetRef.current?.snapToIndex(0);  
    navigation.setOptions({ tabBarStyle: { display: 'none' }, headerShown: false });
  };

  const handleScroll = useCallback(
    (event: any) => {
      const yOffset = event.nativeEvent.contentOffset.y;
      if (yOffset > scrollThreshold && !showHeaderTitle) {
        setShowHeaderTitle(true);
        navigation.setOptions({ headerTitle: 'Abdur Rahman' });
      } else if (yOffset <= scrollThreshold && showHeaderTitle) {
        setShowHeaderTitle(false);
        navigation.setOptions({ headerTitle: '' });
      }
    },
    [navigation, showHeaderTitle]
  );

  const ReviewItem = ({ review }: any) => (
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
  );

  return (
    <>
      <SafeAreaView style={Common.container}>
      {isModalVisible && <View style={styles.overlay} />} 
        <ScrollView 
          style={Common.profileContent} 
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <ProfileHeader/>
          {/* <ActionButton/> */}
          <Text style={Common.profileContentTitle}>Personal Information</Text>
            <AccountSection/>
          <Text style={Common.profileContentTitle}>Feedbacks</Text>
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
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ReviewItem review={item} />}
            ListHeaderComponent={
              <Text style={styles.headerText}>14 Reviews</Text>
            }
          />
      </BottomSheet>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
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
  footer: {
    marginTop: 5,
    fontSize: 14,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
});
