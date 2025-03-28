import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { User, MessageSquare, Globe, Languages, List, Camera, ChevronRight, UserRoundPen } from 'lucide-react-native';
import Common from '@/constants/Common';
import { Colors } from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { useUserStore } from '@/store/userStore';
import { useRouter, useFocusEffect } from 'expo-router';
import { supabase } from '@/libs/supabase';
import { UserData } from '@/interfaces';

import { refreshStore } from '@/store/refreshStore';
import { useProfileStore } from '@/store/profileStore';

import uploadProfileImage from '@/utils/uploadProfileImage';
import { baseUrl } from '@/utils/BaseUrl';
import axios from 'axios';
import { showToast } from '@/utils/toast';

const EditProfile = () => {

  const router = useRouter();
  const { session } = useUserStore();
  const { hasUserUpdated, resetUpdated } = refreshStore();
  const { profileImage, setProfileImage, setRefreshImage } = useProfileStore();

  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isImageFetched, setIsImageFetched] = useState<boolean>(false); 

  const memoizedImageSource = useMemo(() => {
    return profileImage ? { uri: profileImage } : require('@/assets/images/defaultuser.jpg');
  }, [profileImage]);

  const fetchProfileImage = useCallback(async () => {
    if (!session || isImageFetched) return; 
    try {
      const response = await axios.get(`${baseUrl}/profile/get-profile-pic/${session.id}`);
      console.log('Fetched profile image:', response.data.imageUrl);
      setProfileImage(response.data.imageUrl || null);
      setIsImageFetched(true); 
    } catch (error: any) {
      if (error.response) {
        console.log('No profile image for this user');
        setProfileImage(null);
      } else {
        console.log('Error fetching profile picture:', error.message);
      }
      setIsImageFetched(true); 
    }
  }, [session, setProfileImage, isImageFetched]);

  const openImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setProfileImage(imageUri); 
      await handleImageUpload(imageUri);
    }
  };

  const handleImageUpload = async (imageUri: string) => {
    if (!imageUri || !session) return;
    setLoading(true);
    try {
      const success = await uploadProfileImage(imageUri, session.id);
      if (success) {
        setIsImageFetched(false); 
        await fetchProfileImage();
        showToast({ title: 'Profile saved successfully', message: 'Image uploaded successfully!', preset: 'done' }); 
      } else {
        throw new Error('Upload failed');
      }
    } catch (error: any) {
      console.log('Error uploading image:', error.response.data);
      showToast({ title: 'Profile failed to save', message: 'Image uploaded successfully!', preset: 'done' }); 
      setProfileImage(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.id)
        .single();

      if (error) throw error;
      setUserData(data);
    } catch (err) {
      console.log('Error fetching user data:', err);
    } finally {
      setLoading(false);
      resetUpdated();
    }
  }, [session, resetUpdated]);

  useEffect(() => {
    fetchUserData();
    if (!profileImage && !isImageFetched) {
      fetchProfileImage(); 
    }
  }, [fetchUserData, fetchProfileImage, profileImage, isImageFetched]);

  useFocusEffect(
    useCallback(() => {
      if (hasUserUpdated) {
        fetchUserData();
      }
    }, [hasUserUpdated, fetchUserData])
  );

  if (loading) return (
    <View style={Common.loaderContainer}>
      <ActivityIndicator size={65} color={'#000000'}/>
    </View>
  );

  return (
    <View style={Common.container}>
      <View style={Common.content}>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.profileImage} onPress={openImagePicker}>
          <Image
              source={memoizedImageSource}
              style={styles.profileImage}
          />
          <View style={styles.cameraIconContainer}>
            <Camera color={Colors.light.primary} size={20} />
          </View>
        </TouchableOpacity>
      </View>

      <Pressable style={styles.itemContainer} onPress={() => router.push('/NameScreen')}>
          <UserRoundPen color={Colors.light.primary} size={24} />
          <View style={styles.textContainer}>
            <Text style={styles.itemTitle}>Name</Text>
            <Text style={styles.itemValue}>{userData?.display_name || "Add your name"}</Text>
          </View>
          <ChevronRight color={Colors.light.primary} size={24} />
        </Pressable>

        <Pressable style={styles.itemContainer} onPress={() => router.push({pathname: '/GenderSelection', params: {mode: 'edit'}})}>
          <User color={Colors.light.primary} size={24} />
          <View style={styles.textContainer}>
            <Text style={styles.itemTitle}>Gender</Text>
            <Text style={styles.itemValue}>{userData?.gender || "Select your gender"}</Text>
          </View>
          <ChevronRight color={Colors.light.primary} size={24} />
        </Pressable>

        <Pressable style={styles.itemContainer} onPress={() => router.push({pathname: '/NativeLanguage', params: {mode: 'edit'}})}>
          <Globe color={Colors.light.primary} size={24} />
          <View style={styles.textContainer}>
            <Text style={styles.itemTitle}>Native language</Text>
            <Text style={styles.itemValue}>{userData?.native_language || "Add your native language"}</Text>
          </View>
          <ChevronRight color={Colors.light.primary} size={24} />
        </Pressable>

        <Pressable style={styles.itemContainer} onPress={() => router.push({pathname: '/EnglishLevel', params: {mode: 'edit'}})}>
          <Languages color={Colors.light.primary} size={24} />
          <View style={styles.textContainer}>
            <Text style={styles.itemTitle}>English level</Text>
            <Text style={styles.itemValue}>{userData?.language_fluency_level || "Add your english fluency level"}</Text>
          </View>
          <ChevronRight color={Colors.light.primary} size={24} />
        </Pressable>

        <Pressable style={styles.itemContainer} onPress={() => router.push('/AboutMe')}>
          <MessageSquare color={Colors.light.primary} size={24} />
          <View style={styles.textContainer}>
            <Text style={styles.itemTitle}>About me</Text>
            <Text style={styles.itemValue}>{userData?.about_me ? userData.about_me.length > 40 ? `${userData.about_me.slice(0, 40)}...` : userData.about_me : "Write about yourself"}</Text>
          </View>
          <ChevronRight color={Colors.light.primary} size={24} />
        </Pressable>

        <Pressable style={styles.itemContainer} onPress={() => router.push('/Interest')}>
          <List color={Colors.light.primary} size={24} />
          <View style={styles.textContainer}>
            <Text style={styles.itemTitle}>Interests</Text>
            <Text style={styles.itemValue}>
              {userData?.interest_list && userData?.interest_list.length > 0
                ? userData?.interest_list.join(', ') 
                : "Add your interest"}  
            </Text>
          </View>
          <ChevronRight color={Colors.light.primary} size={24} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    fontSize: 40,
    color: 'white',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: 5,
    borderRadius: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    color: '#555',
  },
  itemValue: {
    fontSize: 14,
    color: '#888',
  },
});

export default EditProfile;
