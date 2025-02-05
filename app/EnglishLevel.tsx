import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, SafeAreaView, Vibration, Alert, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Common from '@/constants/Common';
import { Colors } from '@/constants/Colors';
import { useRouter, useNavigation, useLocalSearchParams } from 'expo-router';

import { useUserSelectionStore } from "@/store/onboardingUserSelection";
import { useUserStore } from '@/store/userStore';
import { refreshStore } from '@/store/refreshStore';

import { CommonActions } from '@react-navigation/native';
import { supabase } from '@/libs/supabase';
import { englishLevels } from '@/data/appData';
import { getCountry } from '@/utils/getCountry';

export default function EnglishLevel() {
  const route = useRouter();
  const navigation = useNavigation();
  const { mode } = useLocalSearchParams();
  const country = getCountry();
  
  const { session } = useUserStore();
  const { markUpdated } = refreshStore();
  const {email, languageFluencyLevel, setLanguageFluencyLevel, resetLanguageFluencyLevel, goalOfLearning, nativeLanguage, gender, reset } = useUserSelectionStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === 'edit') {
      fetchLanguageFluencyLevel();
    }

    const unsubscribe = navigation.addListener('beforeRemove', () => {
      resetLanguageFluencyLevel();
    });

    return unsubscribe;
  }, [mode, navigation, resetLanguageFluencyLevel]);

  const fetchLanguageFluencyLevel = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('language_fluency_level')
        .eq('id', session.user.id)
        .single();

      if (error) {
        throw new Error("Failed to fetch the language fluency level.");
      }

      if (data?.language_fluency_level) {
        const selectedLevel = data.language_fluency_level.split(' ')[0]
        setLanguageFluencyLevel(selectedLevel);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "An unexpected error occurred.");
    }
  };

  const handleSelect = (id: any) => {
    Vibration.vibrate(30);
    if (id !== languageFluencyLevel) {
      setLanguageFluencyLevel(id);
    }
  }

  const updateUser = async (languageFluencyLevel: any) => {
    try {
      const selectedLevel = englishLevels.find(level => level.id === languageFluencyLevel);
      const levelDescription = selectedLevel ? `${selectedLevel.id} (${selectedLevel.level})` : '';
  
      const { error: updateError } = await supabase
        .from('users')
        .update({
          language_fluency_level: levelDescription,
        })
        .eq('id', session.user.id);
  
      if (updateError) throw new Error("Failed to update user data.");
    } catch (error: any) {
      throw new Error(error.message || "An unexpected error occurred.");
    }
  };

  const updateOnboardingData = async () => {
    try {
      const { error: updateError } = await supabase
        .from('users')
        .update({
          display_name: email.split("@")[0],
          goal_of_learning: goalOfLearning,
          native_language: nativeLanguage,
          gender: gender,
          country: country
        })
        .eq('id', session.user.id);
  
      if (updateError) throw new Error("Failed to update onboarding data.");
  
      const { error } = await supabase
        .from('users')
        .update({ is_onboarding_complete: true })
        .eq('id', session.user.id);
  
      if (error) throw new Error("Failed to mark onboarding as complete.");
    } catch (error: any) {
      throw new Error(error.message || "An unexpected error occurred.");
    }
  };

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
      await updateUser(languageFluencyLevel);
  
      if (mode === "edit") {
        markUpdated();
        route.back();
        return;
      }
  
      await updateOnboardingData();
  
      navigation.dispatch(
        CommonActions.reset({
          routes: [{ key: "(tabs)", name: "(tabs)" }],
        })
      );
      reset();
    } catch (error: any) {
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
