import React, { useEffect } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import Common from '@/constants/Common';

import { useUserSelectionStore } from "@/store/onboardingUserSelection";
import { useRouter, useNavigation } from 'expo-router';
import TextHeader from '@/components/TextHeader';

const languages = [
  "English", "Spanish", "Mandarin", "Hindi", "French", "Arabic", "Russian", "Portuguese",
  "Bengali", "German", "Japanese", "Korean", "Italian", "Tamil", "Turkish", "Vietnamese", 
  "Urdu", "Persian", "Swahili", "Thai", "Dutch", "Greek", "Czech", "Polish",
  "Romanian", "Hungarian", "Danish", "Finnish", "Norwegian", "Swedish",
  "Indonesian", "Malay", "Tagalog",
];

export default function NativeLanguage() {
  const router = useRouter();
  const navigation = useNavigation()
  const { nativeLanguage, setNativeLanguage, resetNativeLanguage } = useUserSelectionStore();

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      resetNativeLanguage();
    })
    return unsubscribe;
  }, [nativeLanguage, resetNativeLanguage])

  const handleNext = () => {
    if(nativeLanguage){
      router.push('/EnglishLevel');
    } else {
       Alert.alert(
        "Native Language Required", 
        "Please select your native language to proceed.", 
        [{ text: "OK", style: "default" }]
      ); 
    }
  };

  return (
    <SafeAreaView style={Common.container}>
      <View style={[Common.content, { flex: 1 }]}>
        <TextHeader 
            header="Select Native Language" 
            subheader="Choose your native language" 
        />
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
          <Text style={Common.continueText}>Continue</Text>
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
