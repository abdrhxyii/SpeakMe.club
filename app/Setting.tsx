import React, { useState, useEffect , useRef} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Lock, UserX, HelpCircle, PencilLine } from 'lucide-react-native';
import { supabase } from '@/libs/supabase';

import Common from '@/constants/Common';
import { Colors } from '@/constants/Colors';
import { useUserStore } from '@/store/userStore';
import { useProfileStore } from '@/store/profileStore';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { GoogleSignin  } from '@react-native-google-signin/google-signin';

import ReviewBottomSheet from '@/components/BottomSheets/ReviewBottomSheet';
import DeleteUserBottomSheet from '@/components/BottomSheets/DeleteUserBottomSheet';
import { removeTokens } from '@/utils/TokenStorage';

const SettingsScreen = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetDeleteModalRef = useRef<BottomSheetModal>(null);
  
  const router = useRouter();

  const { setSession, setIsSignedIn, session } = useUserStore();
  const { resetProfileImage } = useProfileStore();

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [signedOut, setSignedOut] = useState(false);


  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_WEB_CLINET_ID,
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  const openReviewModal = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.present();
    } else {
      console.error('BottomSheetModalRef is null');
    }
  };

  const openDeleteModal = () => {
    if (bottomSheetDeleteModalRef.current) {
      bottomSheetDeleteModalRef.current.present();
    } else {
      console.error('BottomSheetModalRef is null');
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        setErrorMessage('An error occurred while signing out. Please try again...');
        return;
      }
      await GoogleSignin.signOut();
      await markUserOffline(session.id);
      await removeTokens();
      resetProfileImage();
      setSession(null);
      setIsSignedIn(null);
      setSignedOut(true);
    } catch (error) {
      console.log(error, "error")
      setErrorMessage('An unexpected error occurred while signing out. Please try again...');
    } finally {
      setLoading(false);
    }
  };  

  const markUserOffline = async (userId: string) => {
    await supabase
      .from('users')
      .update({ is_online: false, last_seen: new Date().toISOString() })
      .eq('id', userId);
  };

  useEffect(() => {
    if (signedOut) {
      router.replace('/Authentication');
    }
  }, [signedOut, router]);

  const showLogoutAlert = () => {
    Alert.alert(
      'Warning!',
      'Are you sure you want to logout?',
      [
        {
          text: 'No, Stay',
          onPress: () => console.log('Logout canceled'),
          style: 'cancel',
        },
        { text: 'Yes, Logout', onPress: handleSignOut },
      ],
      { cancelable: true }
    );
  };

  return (
    <>
    <SafeAreaView style={Common.container}>
      <ScrollView style={Common.content}>
        <TouchableOpacity style={styles.row}>
          <Lock color={Colors.light.primary} size={24} />
          <View style={styles.rowTextContainer}>
            <Text style={styles.title}>Create password</Text>
            <Text style={styles.warningText}>You don't have a password, it's insecure</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={openReviewModal}>
          <PencilLine color={Colors.light.primary} size={24} />
          <View style={styles.rowTextContainer}>
            <Text style={styles.title}>Give us feedback</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={openDeleteModal}>
          <UserX color={Colors.light.primary} size={24} />
          <View style={styles.rowTextContainer}>
            <Text style={styles.title}>Delete account</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <HelpCircle color={Colors.light.primary} size={24} />
          <View style={styles.rowTextContainer}>
            <Text style={styles.title}>FAQ</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={Common.dangerButton} onPress={showLogoutAlert}>
          <Text style={Common.dangerButtonText}>Log out</Text>
        </TouchableOpacity>
        <Text style={[Common.ErrorMessage, styles.errorMessage]}>{errorMessage}</Text>
      </ScrollView>

      {loading && (
        <View style={[styles.loadingContainer, StyleSheet.absoluteFillObject]}>
          <ActivityIndicator size={65} color={"#FFFFFF"} />
        </View>
      )}
    </SafeAreaView>
    <ReviewBottomSheet ref={bottomSheetModalRef}/>
    <DeleteUserBottomSheet ref={bottomSheetDeleteModalRef}/>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  rowTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 16,
    color: '#000000',
  },
  subtitle: {
    fontSize: 14,
    color: '#828282',
  },
  warningText: {
    fontSize: 14,
    color: Colors.light.danger,
  },
  errorMessage: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  }
});

export default SettingsScreen;
