import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, SafeAreaView, Vibration, Alert, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Common from '@/constants/Common';
import { Colors } from '@/constants/Colors';
import { useRouter, useNavigation } from 'expo-router';

import { useUserSelectionStore } from "@/store/onboardingUserSelection";
import { CommonActions } from '@react-navigation/native';
import { supabase } from '@/libs/supabase';

const englishLevels = [
  { id: 'A1', level: 'Beginner', description: 'I can answer questions about my name and how old I am.' },
  { id: 'A2', level: 'Pre-Intermediate', description: 'I can answer with simple phrases to various questions which are not very complex.' },
  { id: 'B1', level: 'Intermediate', description: 'I can introduce myself, ask what you are doing, and keep up the conversation on general topics.' },
  { id: 'B2', level: 'Upper-Intermediate', description: 'I can express my opinion on any topic, sometimes making mistakes. I don’t always remember the correct word, but I’ll pick up a synonym.' },
  { id: 'C1', level: 'Advanced', description: 'I speak fluently on any topic and use idioms; my pronunciation does not cause difficulties in understanding.' },
  { id: 'C2', level: 'Proficient', description: 'English is my native language, or I speak it so fluently it’s like a native.' },
];

export default function EnglishLevel() {
  const route = useRouter();
  const navigation = useNavigation();
  const {languageFluencyLevel, setLanguageFluencyLevel, resetLanguageFluencyLevel, goalOfLearning, nativeLanguage, gender } = useUserSelectionStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
        resetLanguageFluencyLevel()
    })
    return unsubscribe;
  }, [languageFluencyLevel, resetLanguageFluencyLevel])

  const handleSelect = (id: any) => {
    Vibration.vibrate(30);
    setLanguageFluencyLevel(id)
  }

  const handleNext = async () => {
    if (!languageFluencyLevel) {
      Alert.alert(
        "Fluency Level Required",
        "Please select your English fluency level to proceed.",
        [{ text: "OK", style: "default" }]
      );
      return;
    }
  
    setLoading(true);
  
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  
      if (sessionError || !sessionData?.session?.user) {
        throw new Error("Failed to retrieve user session. User might not be logged in.");
      }
  
      const userId = sessionData.session.user.id;
  
      const { error: updateError } = await supabase
        .from('users')
        .update({
          goal_of_learning: goalOfLearning,
          native_language: nativeLanguage,
          language_fluency_level: languageFluencyLevel,
          gender: gender,
        })
        .eq('id', userId);
  
      if (updateError) {
        throw new Error("Failed to update user data.");
      }

      const { error } = await supabase
      .from('users')
      .update({ is_onboarding_complete: true })
      .eq('id', userId);

      if (error) {
        throw new Error("Failed to update user data.");
      }
  
      navigation.dispatch(
        CommonActions.reset({
          routes: [{ key: "(tabs)", name: "(tabs)" }],
        })
      );
    } catch (error: any) {
      console.error(error); 
      Alert.alert("Error", error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

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
        <Pressable style={styles.button} onPress={handleNext} disabled={loading}>
          { loading ? <ActivityIndicator size="small" color="#FFFFFF" /> : <Text style={styles.buttonText}>Continue</Text> }
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    zIndex: 1000,
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
  },
});
