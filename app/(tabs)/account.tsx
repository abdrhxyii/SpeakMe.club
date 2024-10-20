import { View, Text, StyleSheet, Image, ScrollView, Animated, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Languages, Globe, MapPin, User, PhoneCall, MessageCircle, X  } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import Common from '@/constants/Common';
import ReviewCard from '@/components/ReviewCard';
import BottomModal from '@/components/BottomModal';

export default function Account() {

  return (
    <>
    <SafeAreaView style={Common.container}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
            <Animated.Image
              source={require('@/assets/images/user.jpg')}
              style={styles.profileImage}
            />
          <View style={styles.onlineDot}></View>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Abdur Rahman, 19</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Hours</Text>
              <Text style={styles.detailValue}>120 hrs</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Talks</Text>
              <Text style={styles.detailValue}>450</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Feedback</Text>
              <Text style={styles.detailValue}>4.8/5</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.button}>
          <PhoneCall color={Colors.light.primary} size={22} />
          <Text style={styles.buttonText}>Call</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <MessageCircle color={Colors.light.primary} size={22} />
          <Text style={styles.buttonText}>Message</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.contentTitle}>Personal Information</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Languages color={Colors.light.primary} size={22} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.label}>Native language</Text>
                <Text style={styles.value}>Tamil</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Globe color={Colors.light.primary} size={22} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.label}>English level</Text>
                <Text style={styles.value}>A1 (Beginner)</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <User color={Colors.light.primary} size={22} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.label}>Gender</Text>
                <Text style={styles.value}>Male</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <MapPin color={Colors.light.primary} size={22} />
              <View style={styles.infoTextContainer}>
                <Text style={styles.label}>Location</Text>
                <Text style={styles.value}>Sri Lanka</Text>
              </View>
            </View>
          </View>

        <Text style={styles.contentTitle}>Feedbacks</Text>
          <View style={styles.infoContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} overScrollMode="never">
                <ReviewCard/>
                <ReviewCard/>
                <ReviewCard/>
            </ScrollView>
            <TouchableOpacity style={styles.Reviewbutton}>
              <Text style={styles.ReviewbuttonText}>Show all 14 reviews</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    paddingBottom: 20,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '700',
  },
  detailsContainer: {
    flexDirection: 'row',
    marginTop: 6,
  },
  detailItem: {
    marginRight: 20, 
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontSize: 12,
    color: '#888', 
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333', 
    marginTop: 2,
  },
  profileImage: {
    width: 65,
    height: 65,
    borderRadius: 50,
    backfaceVisibility: 'hidden',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginBottom: 10,
  },
  profileContainer: {
    position: 'relative',
  },
  onlineDot: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: Colors.light.online, 
    borderRadius: 8,
    padding: 8 
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  content: {
    padding: 15,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
  },
  infoContainer: {
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  infoTextContainer: {
    marginLeft: 10,
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  separator: {
    height: 8,
    width: '100%',
    backgroundColor: '#ddd',
    marginVertical: 15,
  },
  Reviewbutton: {
    paddingVertical: 12,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 15
  },
  ReviewbuttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  }
});
