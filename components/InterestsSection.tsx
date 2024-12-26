import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Plus } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function InterestsSection({user}: any) {
    const router = useRouter();
    return (
        <View style={styles.interestsContainer}>
            {user.interest_list.length > 0 &&
                user.interest_list.map((item: string, index: number) => (
                <View key={index} style={styles.interestTag}>
                    <Text style={styles.interestText}>{item}</Text>
                </View>
            ))}
            <TouchableOpacity style={styles.addTag} activeOpacity={0.6} onPress={() => router.push('/Interest')}>
                <Text style={styles.addText}>Add</Text>
                <Plus size={20} color="#000" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  interestTag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  addTag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.light.darkGray
  },
  addIcon: {
    marginRight: 4,
  },
  addText: {
    fontWeight: 'bold',
    color: '#000',
  },
});
