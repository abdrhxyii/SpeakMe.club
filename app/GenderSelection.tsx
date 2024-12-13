import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Vibration
} from "react-native";

import { Colors } from "@/constants/Colors";
import Common from "@/constants/Common";
import TextHeader from "@/components/TextHeader";

const GenderSelection = () => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

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
    setSelectedGender(id);
    Vibration.vibrate(30);
  };

  return (
    <SafeAreaView style={Common.container}>
      <View style={Common.content}>
        <TextHeader
          header="Select Your Gender"
          subheader="Choose the gender that best describes you to continue."
        />
        {genders.map((gender) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={gender.id}
            style={[
              styles.genderCard,
              selectedGender === gender.id && styles.selectedCard,
            ]}
            onPress={() => handleSelection(gender.id)}
          >
            <View
              style={[
                styles.radioButton,
                selectedGender === gender.id && styles.radioButtonSelected,
              ]}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{gender.title}</Text>
              <Text style={styles.description}>{gender.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.continueButton} activeOpacity={0.8}>
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
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.light.lightgray,
    marginRight: 15,
  },
  radioButtonSelected: {
    borderColor: Colors.light.primary,
    backgroundColor: Colors.light.primary,
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
