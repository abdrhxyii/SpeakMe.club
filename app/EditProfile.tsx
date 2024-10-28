import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { User, MessageSquare, Globe, Languages, Calendar, MapPin, List } from 'lucide-react-native';
import Common from '@/constants/Common';
import { Colors } from '@/constants/Colors';

const EditProfile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImage}>
          <Text style={styles.profileInitial}>A</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.itemContainer} activeOpacity={0.8}>
        <User color={Colors.light.primary} size={24} />
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>Name</Text>
          <Text style={styles.itemValue}>Abdur Rahman</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemContainer} activeOpacity={0.8}>
        <MessageSquare color={Colors.light.primary} size={24} />
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>About me</Text>
          <Text style={styles.itemValue}>Write about yourself</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemContainer} activeOpacity={0.8}>
        <Globe color={Colors.light.primary} size={24} />
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>Native language</Text>
          <Text style={styles.itemValue}>Tamil</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemContainer} activeOpacity={0.8}>
        <Languages color={Colors.light.primary} size={24} />
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>English level</Text>
          <Text style={styles.itemValue}>A1 (Beginner)</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemContainer} activeOpacity={0.8}>
        <Calendar color={Colors.light.primary} size={24} />
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>Age</Text>
          <Text style={styles.itemValue}>50 years old</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemContainer} activeOpacity={0.8}>
        <MapPin color={Colors.light.primary} size={24} />
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>Location</Text>
          <Text style={styles.itemValue}>Sri Lanka</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemContainer} activeOpacity={0.8}>
        <List color={Colors.light.primary} size={24} />
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>Interests</Text>
          <Text style={styles.itemValue}>hy</Text>
        </View>
      </TouchableOpacity>
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
    right: 10,
    backgroundColor: '#FFF',
    padding: 5,
    borderRadius: 20,
  },
  cameraIcon: {
    width: 20,
    height: 20,
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
