import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react'
import ProfileHeader from '@/components/ProfileHeader';
import Common from '@/constants/Common';
import ActionButton from '@/components/ActionButton';
import AccountSection from '@/components/AccountSection';
import ReviewCard from '@/components/ReviewCard';
import { useGlobalSearchParams } from 'expo-router';
import { UserProfile } from '@/interfaces'
import { baseUrl } from '@/utils/BaseUrl';
import api from '@/utils/apiServices';

export default function Profile() {
    const { id } = useGlobalSearchParams();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<UserProfile[]>([]);

    useEffect(() => {
        retriveUsers()
    }, [])

    const retriveUsers = async () => {
      setLoading(true)
      try {
        const { data, status } = await api.get(`${baseUrl}/user/${id}`)
        if (status === 200) {
          setUserData(data)
        } 
      } catch (error: any) {
        console.log("An unexpected error occured, Please refresh or check your internet connection")
      } finally {
        setLoading(false)
      }
    }

  if (loading) return (
    <View style={Common.loaderContainer}>
      <ActivityIndicator size={65} color={'#000000'}/>
    </View>
  );

  return (
    <SafeAreaView style={Common.container}>
        <ScrollView 
            style={Common.profileContent}
            showsVerticalScrollIndicator={false}
          >
            <ProfileHeader user={userData}/>
            <ActionButton/>
            <Text style={Common.profileContentTitle}>Personal Information</Text>
            <AccountSection user={userData}/> 
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
  )
}   