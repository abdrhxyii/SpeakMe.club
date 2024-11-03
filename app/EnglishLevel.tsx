import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Common from '@/constants/Common';

const englishLevels = [
  { id: 'A1', level: 'Beginner', description: 'I can answer questions about my name and how old I am.' },
  { id: 'A2', level: 'Pre-Intermediate', description: 'I can answer with simple phrases to various questions which are not very complex.' },
  { id: 'B1', level: 'Intermediate', description: 'I can introduce myself, ask what you are doing, and keep up the conversation on general topics.' },
  { id: 'B2', level: 'Upper-Intermediate', description: 'I can express my opinion on any topic, sometimes making mistakes. I don’t always remember the correct word, but I’ll pick up a synonym.' },
  { id: 'C1', level: 'Advanced', description: 'I speak fluently on any topic and use idioms; my pronunciation does not cause difficulties in understanding.' },
  { id: 'C2', level: 'Proficienct', description: 'English is my native language, or I speak it so fluently it’s like a native.' },
];

export default function EnglishLevel() {
  const [selectedLevel, setSelectedLevel] = useState('A1');

  const renderItem = ({ item }: any) => (
    <Pressable
      style={styles.levelItem}
      onPress={() => setSelectedLevel(item.id)}
    >
      <MaterialCommunityIcons
        name={selectedLevel === item.id ? "radiobox-marked" : "radiobox-blank"}
        size={24}
        color={selectedLevel === item.id ? "#000000" : "#999"}
      />
      <View style={styles.textContainer}>
        <Text style={styles.levelText}>{item.level}</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={Common.container}>
      <View style={Common.content}>
        <FlatList
          data={englishLevels}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  levelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
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
});
