import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Image } from 'react-native';
import { User, MessageSquare, Globe, Languages, MapPin, List, Camera, ChevronRight } from 'lucide-react-native';
import Common from '@/constants/Common';
import { Colors } from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

const EditProfile = () => {
  const router = useRouter()
  const [profileImage, setProfileImage] = useState<string | null>(null);

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
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={Common.container}>
      <View style={Common.content}>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.profileImage} onPress={openImagePicker}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Text style={styles.profileInitial}>A</Text>
          )}
          <View style={styles.cameraIconContainer}>
            <Camera color={Colors.light.primary} size={20} />
          </View>
        </TouchableOpacity>
      </View>

        <Pressable style={styles.itemContainer} onPress={() => router.push('/NameScreen')}>
          <User color={Colors.light.primary} size={24} />
          <View style={styles.textContainer}>
            <Text style={styles.itemTitle}>Name</Text>
            <Text style={styles.itemValue}>Abdur Rahman</Text>
          </View>
          <ChevronRight color={Colors.light.primary} size={24} />
        </Pressable>

        <Pressable style={styles.itemContainer} onPress={() => router.push('/NativeLanguage')}>
          <Globe color={Colors.light.primary} size={24} />
          <View style={styles.textContainer}>
            <Text style={styles.itemTitle}>Native language</Text>
            <Text style={styles.itemValue}>Tamil</Text>
          </View>
          <ChevronRight color={Colors.light.primary} size={24} />
        </Pressable>

        <Pressable style={styles.itemContainer} onPress={() => router.push('/EnglishLevel')}>
          <Languages color={Colors.light.primary} size={24} />
          <View style={styles.textContainer}>
            <Text style={styles.itemTitle}>English level</Text>
            <Text style={styles.itemValue}>A1 (Beginner)</Text>
          </View>
          <ChevronRight color={Colors.light.primary} size={24} />
        </Pressable>

        <Pressable style={styles.itemContainer} onPress={() => router.push('/AboutMe')}>
          <MessageSquare color={Colors.light.primary} size={24} />
          <View style={styles.textContainer}>
            <Text style={styles.itemTitle}>About me</Text>
            <Text style={styles.itemValue}>Write about yourself</Text>
          </View>
          <ChevronRight color={Colors.light.primary} size={24} />
        </Pressable>

        <Pressable style={styles.itemContainer} onPress={() => router.push('/CountryList')}>
          <MapPin color={Colors.light.primary} size={24} />
          <View style={styles.textContainer}>
            <Text style={styles.itemTitle}>Location</Text>
            <Text style={styles.itemValue}>Sri Lanka</Text>
          </View>
          <ChevronRight color={Colors.light.primary} size={24} />
        </Pressable>

        <Pressable style={styles.itemContainer} onPress={() => router.push('/Interest')}>
          <List color={Colors.light.primary} size={24} />
          <View style={styles.textContainer}>
            <Text style={styles.itemTitle}>Interests</Text>
            <Text style={styles.itemValue}>hy</Text>
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
    backgroundColor: '#7B4CD9',
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
