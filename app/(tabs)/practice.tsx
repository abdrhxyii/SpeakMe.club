import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import Common from '@/constants/Common';
import { ArrowRight } from 'lucide-react-native';

export default function Practice() {
  return (
    <SafeAreaView style={Common.container}>
      <ScrollView style={styles.content}>
        
        <View style={[styles.card, styles.vocabularyCard]}>
          <Text style={styles.cardTitle}>Vocabulary</Text>
          <Text style={styles.cardSubtitle}>Enhance your word knowledge</Text>
          <Text style={styles.levelText}>B1 Intermediate</Text>
          <TouchableOpacity style={[styles.roundButton, styles.vocableryButton]}>
            <ArrowRight color="#fff" size={20} />
          </TouchableOpacity>
        </View>

        <View style={[styles.card, styles.grammarCard]}>
          <Text style={styles.cardTitle}>Grammar</Text>
          <Text style={styles.cardSubtitle}>Polish your grammar skills</Text>
          <Text style={styles.levelText}>A1 Beginner</Text>
          <TouchableOpacity style={[styles.roundButton, styles.grammarButton]}>
            <ArrowRight color="#fff" size={20} />
          </TouchableOpacity>
        </View>

        <View style={[styles.card, styles.speakingCard]}>
          <Text style={styles.cardTitle}>Speaking</Text>
          <Text style={styles.cardSubtitle}>Improve your speaking fluency</Text>
          <Text style={styles.levelText}>C1 Expert</Text>
          <TouchableOpacity style={[styles.roundButton, styles.speakingButton]}>
            <ArrowRight color="#fff" size={20} />
          </TouchableOpacity>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 15,
  },
  card: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    position: 'relative',
  },
  vocabularyCard: {
    backgroundColor: '#f0f1ff',
    borderColor: '#2b1c50',
  },
  grammarCard: {
    backgroundColor: '#dbf0ff',
    borderColor: '#1b224b',
  },
  speakingCard: {
    backgroundColor: '#e8f5e3',
    borderColor: '#142a19',
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#2b1c50', 
  },
  levelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#606060',
    marginTop: 5,
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#606060',
    marginBottom: 10,
  },
  roundButton: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: '#142a19', 
    padding: 12,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vocableryButton: {
    backgroundColor: '#2b1c50',
  },
  grammarButton: {
    backgroundColor: '#1b224b',
  },
  speakingButton: {
    backgroundColor: '#142a19',
  },
});
