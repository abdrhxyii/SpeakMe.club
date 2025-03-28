import { Colors } from '@/constants/Colors';
import Common from '@/constants/Common';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '@/libs/supabase';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'expo-router';
import { refreshStore } from '@/store/refreshStore';

export default function AboutMe() {
  const router = useRouter()
  const [aboutMe, setAboutMe] = useState('');
  const [error, setError] = useState('');
  
  const [loading, setLoading] = useState(false);
  const { session } = useUserStore();
  const { markUpdated } = refreshStore()

  useEffect(() => {
    fetchAboutMe();
  }, []);

  const fetchAboutMe = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('about_me')
        .eq('id', session?.id)
        .single();

      if (error && error.code !== 'PGRST116') { 
        setError(error.message);
      }

      if (data?.about_me) {
        setAboutMe(data.about_me);
      }
    } catch (error) {
      setError('Failed to fetch your information. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('users')
        .upsert({
          id: session.id,
          about_me: aboutMe,
        });

      if (error) {
        setError(error.message)
      } else {
        markUpdated();
        router.back();
      }
    } catch (error) {
        setError('Failed to save your information. Please try again later.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <SafeAreaView style={Common.container}>
      <View style={Common.content}>
        <TextInput
          style={styles.input}
          placeholder="Tell us about you"
          maxLength={74}
          value={aboutMe}
          multiline
          onChangeText={(text) => setAboutMe(text)}
        />
        <View style={styles.wrappingText}>
          { error ? <Text style={Common.warningText}>{error}</Text> : <View /> }
          <Text style={styles.charCount}>{aboutMe.length}/75</Text>
        </View>

        <Text style={styles.infoText}>
          Share a bit about yourself! Describe your interests, background, or anything unique, but avoid sharing contact details or personal information.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={handleSave}>
        {loading ? <ActivityIndicator size="small" color="#FFFFFF" /> : <Text style={Common.continueText}>Done</Text>}
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
    height: 100, 
    textAlignVertical: 'top',
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
  wrappingText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
