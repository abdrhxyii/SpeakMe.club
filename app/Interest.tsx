import { Colors } from '@/constants/Colors';
import Common from '@/constants/Common';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';

export default function InterestsScreen() {
  const [interest, setInterest] = useState('');
  const [interests, setInterests] = useState(['ilove', 'interest']);

  const addInterest = () => {
    if (interest.trim() && !interests.includes(interest)) {
      setInterests([...interests, interest.trim()]);
      setInterest('');
    }
  };

  const removeInterest = (item: any) => {
    setInterests(interests.filter(i => i !== item));
  };

  return (
    <SafeAreaView style={Common.container}>
    <View style={[Common.content, { flex: 1 }]}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add your interest"
          value={interest}
          onChangeText={setInterest}
        />
        <TouchableOpacity style={styles.addButton} onPress={addInterest} disabled={!interest.trim()}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.interestsContainer}>
        {interests.map((item, index) => (
          <View key={index} style={styles.interestTag}>
            <Text style={styles.interestText}>{item}</Text>
            <TouchableOpacity onPress={() => removeInterest(item)}>
              <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.button} activeOpacity={0.9}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.light.darkGray
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFF',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  interestTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    marginRight: 8,
  },
  removeText: {
    fontWeight: 'bold',
    color: '#888',
  },
  button: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 6,
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
