import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react'
import ProfileHeader from '@/components/ProfileHeader';
import Common from '@/constants/Common';
import ActionButton from '@/components/ActionButton';
import AccountSection from '@/components/AccountSection';
import ReviewCard from '@/components/ReviewCard';

export default function Profile() {
  return (
    <SafeAreaView style={Common.container}>
        <ScrollView 
            style={Common.profileContent}
            showsVerticalScrollIndicator={false}
          >
            <ProfileHeader/>
            <ActionButton/>
            <Text style={Common.profileContentTitle}>Personal Information</Text>
                <AccountSection/> 
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