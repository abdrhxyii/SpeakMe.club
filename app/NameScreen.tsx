import React, { useState, useEffect } from 'react';
import { Colors } from '@/constants/Colors';
import Common from '@/constants/Common';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useUserStore } from '@/store/userStore';
import { supabase } from '@/libs/supabase';
import { useRouter } from 'expo-router';
import { refreshStore } from '@/store/refreshStore';

export default function NameScreen() {
  const route = useRouter();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [screenLoading, setScreenLoading] = useState(false);

  const { session } = useUserStore();
  const { markUpdated } = refreshStore();

  const fetchUserData = async () => {
    if (!session) return;
    setScreenLoading(true)
    try {
      const { data, error } = await supabase
        .from('users')
        .select('display_name')
        .eq('id', session.user.id) 
        .single();
      if (error) {
        setError(error.message);
      } else {
        setName(data.display_name);
      }

    } catch (error: any) {
      setError(error.message || "An unexpected error occurred.");
    }  finally {
      setScreenLoading(false)
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [session?.user?.id])

  const handleNameUpdate = async () => {
    if (!name.trim()) {
      setError("Name cannot be empty.");
      return;
    }
  
    if (name.length > 20) {
      setError("Name must be 20 characters or fewer.");
      return;
    }
  
    try {
      setLoading(true);
      setError('');
  
      const { error } = await supabase
        .from('users')
        .update({ display_name: name.trim() })
        .eq('id', session.user.id);
  
      if (error) {
        setError(error.message);
      } else {
        markUpdated();
        route.back();
      }
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (screenLoading) return (
    <View style={Common.loaderContainer}>
      <ActivityIndicator size={65} color={'#000000'}/>
    </View>
  );
  
  return (
    <SafeAreaView style={Common.container}>
      <View style={Common.content}>
        <TextInput
          style={[styles.input, { borderColor: error ? Colors.light.red : '#333' }]}
          placeholder="Your name"
          maxLength={20}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <View style={styles.wrappingText}>
          { error ? <Text style={Common.warningText}>{error}</Text> : <View /> }
          <Text style={styles.charCount}>{name.length}/20</Text>
        </View>

        <Text style={styles.infoText}>
          Use a recognizable name (like your full name or nickname). Avoid sexual, religious, or political references, as such names will be blocked. You can change your name once every 30 days.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={handleNameUpdate} disabled={loading}>
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
  },
  charCount: {
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
  wrappingText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
