import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import ProfileHeader from '@/components/ProfileHeader';
import Common from '@/constants/Common';
import ActionButton from '@/components/ActionButton';
import AccountSection from '@/components/AccountSection';
import ReviewCard from '@/components/ReviewCard';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { UserProfile } from '@/interfaces';
import { baseUrl } from '@/utils/BaseUrl';
import api from '@/utils/apiServices';
import { useUserStore } from '@/store/userStore';
import { Heart } from 'lucide-react-native';
import { showToast } from '@/utils/toast';

export default function Profile() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [heartFilled, setHeartFilled] = useState(false); 
  const [userData, setUserData] = useState<UserProfile[]>([]);
  const { session } = useUserStore();

  useEffect(() => {
    retriveUsers();
    checkFriendStatus();
  }, [id, session]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerTintColor: '#000',
      headerTitleAlign: 'center',
      headerRight: () => (
        <TouchableOpacity
          style={[Common.headerBtn, { marginRight: 2 }]}
          onPress={() => handleFriendToggle(id)}
        >
          <Heart color={'black'} size={20} fill={heartFilled ? '#000000' : 'none'} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, id, heartFilled]);

  const checkFriendStatus = async () => {
    if (!session || !id) return;
    try {
      const { data } = await api.get(`${baseUrl}/friends/check/${session.id}/${id}`);
      setHeartFilled(data.isFriend);
    } catch (error: any) {
      console.log('Error checking friend status:', error.response?.data?.message || error.message);
    }
  };

  const handleFriendToggle = async (favouriteUserId: any) => {
    if (!session || !favouriteUserId) return;

    try {
      if (heartFilled) {
        const { status } = await api.delete(`${baseUrl}/friends/${session.id}/${favouriteUserId}`);
        if (status === 200) {
          setHeartFilled(false);
          showToast({
            title: 'Friend Removed',
            message: 'This user has been removed from your friends list.',
            preset: 'done',
            duration: 2,
          });
          checkFriendStatus();
        }
      } else {
        const { data, status } = await api.post(`${baseUrl}/friends/${session.id}/${favouriteUserId}`);
        if (status === 201) {
          setHeartFilled(true);
          showToast({
            title: 'Friend Added',
            message: 'This user is now your friend!',
            preset: 'done',
            duration: 2,
          });
          checkFriendStatus();
        }
      }
    } catch (error: any) {
      showToast({
        title: error.response?.data?.message,
        message: error.response?.data?.message || 'Failed to update friend status. Please try again.',
        preset: 'error',
        duration: 3,
      });
    }
  };

  const retriveUsers = async () => {
    setLoading(true);
    try {
      const { data, status } = await api.get(`${baseUrl}/user/${id}`);
      if (status === 200) {
        setUserData(data);
      } 
    } catch (error: any) {
      showToast({
        title: 'Error',
        message: 'Failed to load profile. Please refresh or check your connection.',
        preset: 'error',
        duration: 3,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={Common.loaderContainer}>
        <ActivityIndicator size={65} color={'#000000'} />
      </View>
    );
  }

  return (
    <SafeAreaView style={Common.container}>
      <ScrollView 
        style={Common.profileContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader user={userData} />
        <ActionButton />
        <Text style={Common.profileContentTitle}>Personal Information</Text>
        <AccountSection user={userData} /> 
        <Text style={Common.profileContentTitle}>Feedbacks</Text>
        <View style={Common.profileReviewContainer}>
          <ScrollView showsHorizontalScrollIndicator={false} overScrollMode="never">
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
          </ScrollView>
          <TouchableOpacity style={Common.Reviewbutton}>
            <Text style={Common.ReviewbuttonText}>Show all 14 reviews</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}