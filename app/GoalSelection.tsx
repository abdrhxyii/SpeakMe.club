import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Vibration, ScrollView } from "react-native";

import { useRouter } from "expo-router";

import { Colors } from "@/constants/Colors";
import Common from "@/constants/Common";
import TextHeader from "@/components/TextHeader";

const GoalSelection = () => {
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);
  const router = useRouter()

  const goals = [
    {
      id: 1,
      emoji: "📝",
      title: "Prepare for exams",
      description: "I’m aiming to pass important English tests like IELTS or TOEFL for my studies or career.",
    },
    {
      id: 2,
      emoji: "💼",
      title: "Advance my career",
      description: "I aim to secure a better job, earn a promotion, or take on side projects, but my English skills are holding me back.",
    },
    {
      id: 3,
      emoji: "🤝",
      title: "Connect with locals and natives",
      description: "I want to build meaningful relationships with people in my community or abroad.",
    },
    {
      id: 4,
      emoji: "🌍",
      title: "Travel confidently",
      description: "I want to explore the world without language barriers holding me back.",
    },
  ];

  const handleSelection = (id: number) => {
    setSelectedGoal(id);
    Vibration.vibrate(30);
  };

  const handleNext = () => {
    router.replace('/GenderSelection')
  }

  return (
    <SafeAreaView style={Common.container}>
        <ScrollView contentContainerStyle={Common.content}>
          <TextHeader 
            header="Set Your Goal" 
            subheader="Choose a goal that aligns with your aspirations to get started." 
          />
          {goals.map((goal) => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={goal.id}
              style={[
                styles.goalCard,
                selectedGoal === goal.id && styles.selectedCard,
              ]}
              onPress={() => handleSelection(goal.id)}
            >
              <Text style={styles.emoji}>{goal.emoji}</Text>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{goal.title}</Text>
                <Text style={styles.description}>{goal.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.continueButton} activeOpacity={0.8} onPress={handleNext}>
          <Text style={Common.continueText}>Continue</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  goalCard: {
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
  emoji: {
    fontSize: 30,
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

export default GoalSelection;
