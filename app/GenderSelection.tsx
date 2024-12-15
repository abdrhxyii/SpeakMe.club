import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Vibration,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Common from "@/constants/Common";
import TextHeader from "@/components/TextHeader";
import { useUserSelectionStore } from "@/store/onboardingUserSelection";

import { useRouter } from "expo-router";

const GenderSelection = () => {
  const route = useRouter()
  const { gender, setGender } = useUserSelectionStore();

  const genders = [
    {
      id: "male",
      title: "Male",
      description: "I identify as a male.",
    },
    {
      id: "female",
      title: "Female",
      description: "I identify as a female.",
    },
  ];

  const handleSelection = (id: string) => {
    setGender(id);
    Vibration.vibrate(30);
  };

  const handleNext = () => {
    route.push('/NativeLanguage')
  }

  return (
    <SafeAreaView style={Common.container}>
      <View style={Common.content}>
        <TextHeader
          header="Select Your Gender"
          subheader="Choose the gender that best describes you to continue."
        />
        {genders.map((genders) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={genders.id}
            style={[
              styles.genderCard,
              gender === genders.id && styles.selectedCard,
            ]}
            onPress={() => handleSelection(genders.id)}
          >
            <MaterialCommunityIcons
              name={
                gender === genders.id ? "radiobox-marked" : "radiobox-blank"
              }
              size={24}
              color={gender === genders.id ? Colors.light.primary : "#999"}
              style={styles.radioButtonIcon}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{genders.title}</Text>
              <Text style={styles.description}>{genders.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.continueButton} activeOpacity={0.8} onPress={handleNext}>
        <Text style={Common.continueText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  genderCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.light.lightgray,
  },
  selectedCard: {
    borderColor: Colors.light.primary,
  },
  radioButtonIcon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  description: {
    fontSize: 14,
    color: "#666666",
    marginTop: 5,
  },
  continueButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
});

export default GenderSelection;
