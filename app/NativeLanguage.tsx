import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import Common from '@/constants/Common';

import { useUserSelectionStore } from "@/store/onboardingUserSelection";
import { useRouter, useNavigation, useLocalSearchParams } from 'expo-router';
import TextHeader from '@/components/TextHeader';
import { supabase } from '@/libs/supabase';
import { useUserStore } from '@/store/userStore';
import { refreshStore } from '@/store/refreshStore';
import { languages } from '@/data/appData';

export default function NativeLanguage() {
  const router = useRouter();
  const navigation = useNavigation();
  const { mode } = useLocalSearchParams();
  const { session } = useUserStore();
  const { markUpdated } = refreshStore()
  const { nativeLanguage, setNativeLanguage, resetNativeLanguage } = useUserSelectionStore();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      if (mode !== 'edit') resetNativeLanguage();
    });

    if (mode === 'edit') {
      fetchNativeLanguage();
    }

    return unsubscribe;
  }, [mode, resetNativeLanguage]);

  const fetchNativeLanguage = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('native_language')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;
      if (data?.native_language) {
        setNativeLanguage(data.native_language);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch native language. Please try again later.');
    }
  };

  const handleNext = async () => {
    if (!nativeLanguage) {
      Alert.alert(
        "Native Language Required",
        "Please select your native language to proceed.",
        [{ text: "OK", style: "default" }]
      );
      return;
    }

    try {
      setLoading(true)
      if (mode === "edit") {
        const { error } = await supabase
          .from("users")
          .update({ native_language: nativeLanguage })
          .eq("id", session.user.id);
  
        if (error) {
          Alert.alert('Error', 'Failed to update native language.');
        } else {
          markUpdated();
          router.back();
        }
      } else {
        router.push('/EnglishLevel');
      }
    } catch (error) {
      setLoading(false)
    }
  };

  return (
    <SafeAreaView style={Common.container}>
      <View style={[Common.content, { flex: 1 }]}>
        {mode !== "edit" && (
          <TextHeader
            header="Select Native Language"
            subheader="Choose your native language"
          />
        )}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search language"
          />
          <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        </View>

        <FlatList
          data={languages}
          keyExtractor={(item) => item}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={({ item }) => (
            <Pressable style={styles.languageItem} onPress={() => setNativeLanguage(item)}>
              <Text style={styles.languageText}>{item}</Text>
              <Ionicons
                name={nativeLanguage === item ? "radio-button-on" : "radio-button-off"}
                size={20}
                color={nativeLanguage === item ? Colors.light.primary : "gray"}
              />
            </Pressable>
          )}
        />

        <Pressable style={styles.button} onPress={handleNext}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={Common.continueText}>
              {mode === "edit" ? "Done" : "Continue"}
            </Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 8,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  languageText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    position: 'absolute', 
    bottom: 20,
    left: 16,
    right: 16,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
