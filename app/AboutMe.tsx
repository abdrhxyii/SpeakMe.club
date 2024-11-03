import { Colors } from '@/constants/Colors';
import Common from '@/constants/Common';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

export default function AboutMe() {
  const [name, setName] = useState('');

  return (
    <SafeAreaView style={Common.container}>
      <View style={Common.content}>
        <TextInput
          style={styles.input}
          placeholder="Tell us about you"
          maxLength={50}
          value={name}
          multiline
          onChangeText={(text) => setName(text)}
        />
        <Text style={styles.charCount}>{name.length}/50</Text>

        <Text style={styles.infoText}>
            Share a bit about yourself! Describe your interests, background, or anything unique, but avoid sharing contact details or personal information.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} activeOpacity={0.9}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.light.darkGray,
    borderRadius: 10,
    padding: 13,
    fontSize: 16,
    color: '#333',
    marginTop: 8,
    paddingLeft: 12,
  },
  charCount: {
    textAlign: 'right',
    color: '#a5a5a5',
    marginVertical: 4,
    fontSize: 12,
  },
  infoText: {
    fontSize: 14,
    color: Colors.light.info,
    lineHeight: 20,
    marginVertical: 6,
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
