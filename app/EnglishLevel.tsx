import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, SafeAreaView, Vibration } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Common from '@/constants/Common';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

import { useUserSelectionStore } from "@/store/onboardingUserSelection";

const englishLevels = [
  { id: 'A1', level: 'Beginner', description: 'I can answer questions about my name and how old I am.' },
  { id: 'A2', level: 'Pre-Intermediate', description: 'I can answer with simple phrases to various questions which are not very complex.' },
  { id: 'B1', level: 'Intermediate', description: 'I can introduce myself, ask what you are doing, and keep up the conversation on general topics.' },
  { id: 'B2', level: 'Upper-Intermediate', description: 'I can express my opinion on any topic, sometimes making mistakes. I don’t always remember the correct word, but I’ll pick up a synonym.' },
  { id: 'C1', level: 'Advanced', description: 'I speak fluently on any topic and use idioms; my pronunciation does not cause difficulties in understanding.' },
  { id: 'C2', level: 'Proficient', description: 'English is my native language, or I speak it so fluently it’s like a native.' },
];

export default function EnglishLevel() {
  const route = useRouter()
  const {languageFluencyLevel, setLanguageFluencyLevel } = useUserSelectionStore()

  const handleSelect = (id: any) => {
    Vibration.vibrate(30);
    setLanguageFluencyLevel(id)
  }

  const handleNext = () => {
    route.push({pathname: '/PasswordAuthScreen', params: {mode: 'signup'}})
  }

  const renderItem = (item: any) => (
    <Pressable
      style={styles.levelItem}
      onPress={() => handleSelect(item.id)}
      key={item.id}
    >
      <View style={styles.levelWrapper}>
        <Text style={styles.levelWrapperText}>{item.id}</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.levelText}>{item.level}</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>
      </View>

      <MaterialCommunityIcons
        name={languageFluencyLevel === item.id ? "radiobox-marked" : "radiobox-blank"}
        size={24}
        color={languageFluencyLevel === item.id ? "#000000" : "#999"}
      />
    </Pressable>
  );

  return (
    <SafeAreaView style={Common.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {englishLevels.map(renderItem)}
        <Pressable style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
  },
  levelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginHorizontal: 16,
  },
  levelWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0f7fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelWrapperText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00796b',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  button: {
    marginVertical: 30,
    marginHorizontal: 16,
    backgroundColor: Colors.light.primary,
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
