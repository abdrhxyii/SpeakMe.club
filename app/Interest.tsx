import { Colors } from '@/constants/Colors';
import Common from '@/constants/Common';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '@/libs/supabase';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'expo-router';
import { refreshStore } from '@/store/refreshStore';
import { X } from 'lucide-react-native';

export default function InterestsScreen() {
  const router = useRouter()
  const [interest, setInterest] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const { session } = useUserStore();
  const { markUpdated } = refreshStore()

  useEffect(() => {
    fetchInterests();
  }, []);

  const fetchInterests = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('interest_list')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;

      if (data?.interest_list) {
        setInterests(data.interest_list);
      }
    } catch (error) {
      setError("Failed to fetch interests. Please try again later.")
    } finally {
      setLoading(false);
    }
  };

  const addInterest = () => {
    if (interest.trim() && !interests.includes(interest)) {
      if (interests.length < 5) {
        setInterests([...interests, interest.trim()]);
        setInterest('');
      } else {
        setError('Limit Reached, You can only add up to 5 interests.')
      }
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('users')
        .update({ interest_list: interests })
        .eq('id', session.user.id);

      if (error) {
        throw error;
      } else {
        markUpdated();
        router.back();
      }
    } catch (error) {
      setError('Failed to update interests. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const removeInterest = (interestToRemove: string) => {
    setInterests(interests.filter((i) => i !== interestToRemove));
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
      {error ? <Text style={styles.warningText}>{error}</Text> : null}
      
      <View style={styles.interestsContainer}>
        {interests.map((item, index) => (
          <View key={index} style={styles.interestTag}>
            <Text style={styles.interestText}>{item}</Text>
            <TouchableOpacity onPress={() => removeInterest(item)}>
              <X color={'#000000'} size={18}/>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={handleSave} disabled={loading} >
          {loading ? <ActivityIndicator size="small" color="#FFFFFF" /> : <Text style={Common.continueText}>Done</Text>}
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
  removeText: {
    fontWeight: 'bold',
    color: '#888',
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
  warningText: {
    fontSize: 14,
    color: Colors.light.red,
    lineHeight: 20,
    marginVertical: 3,
  },
});
