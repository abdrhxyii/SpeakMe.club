import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Vibration,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Common from "@/constants/Common";
import TextHeader from "@/components/TextHeader";
import { useUserSelectionStore } from "@/store/onboardingUserSelection";
import { useRouter, useNavigation, useLocalSearchParams } from "expo-router";
import { useUserStore } from '@/store/userStore';
import { refreshStore } from '@/store/refreshStore';
import { supabase } from "@/libs/supabase";
import { genders } from "@/data/appData";

const GenderSelection = () => {
  const route = useRouter();
  const navigation = useNavigation();

  const { gender, setGender, resetGender } = useUserSelectionStore();
  const { markUpdated } = refreshStore();
  
  const { mode } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const { session } = useUserStore();

  useEffect(() => {
    if (mode === "edit") {
      fetchGender();
    } else {
      resetGender();
    }

    const unsubscribe = navigation.addListener("beforeRemove", () => {
      resetGender();
    });

    return unsubscribe;
  }, [navigation, resetGender, mode]);

  const fetchGender = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("users")
      .select("gender")
      .eq('id', session.user.id) 
      .single();

    if (error) {
      console.error("Error fetching gender:", error);
    } else {
      setGender(data.gender);
    }
    setLoading(false);
  };

  const handleSelection = (id: string) => {
    setGender(id);
    Vibration.vibrate(30);
  };

  const handleNext = async () => {
    if (!gender) {
      Alert.alert(
        "Gender Selection Required",
        "Please select a gender to proceed. Choose one that best aligns with your learning aspirations.",
        [{ text: "OK", style: "default" }]
      );
      return;
    }

    if (mode === "edit") {
      const { error } = await supabase
        .from("users")
        .update({ gender })
        .eq("id", session.user.id); 

      if (error) {
        console.error("Error updating gender:", error);
      } else {
        markUpdated();
        route.back();
      }
    } else {
      route.push("/NativeLanguage");
    }
  };

  if (loading) {
    return (
        <View style={Common.loaderContainer}>
          <ActivityIndicator size={65} color={'#000000'}/>
        </View>
    );
  }

  return (
    <SafeAreaView style={Common.container}>
      <View style={Common.content}>
        {mode !== "edit" && (
          <TextHeader
            header="Select Your Gender"
            subheader="Choose the gender that best describes you to continue."
          />
        )}
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
      <TouchableOpacity style={styles.continueButton} activeOpacity={0.8} onPress={handleNext} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={Common.continueText}>
            {mode === "edit" ? "Done" : "Continue"}
          </Text>
        )}
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
