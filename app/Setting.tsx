import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, UserX, HelpCircle, PencilLine } from 'lucide-react-native';
import { supabase } from '@/libs/supabase';

import Common from '@/constants/Common';
import { Colors } from '@/constants/Colors';
import Dialogbox from '@/components/Dialogbox';

const SettingsScreen = () => {
  const router = useRouter()
  const [dialog, setDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [signedOut, setSignedOut] = useState(false); 

  const handleSignOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);

    if (error) {
      setErrorMessage('An error occurred while signing out. Please try again...');
      setDialog(false);
      return;
    }

    setDialog(false);
    setSignedOut(true); 
  };

  if (signedOut) {
      router.replace('/Authentication')
  }

  return (
    <SafeAreaView style={Common.container}>
      <ScrollView style={Common.content}>
        <View style={styles.row}>
          <Mail color={Colors.light.primary} size={24} />
          <View style={styles.rowTextContainer}>
            <Text style={styles.title}>Change email</Text>
            <Text style={styles.subtitle}>abdurrahmanx33@gmail.com</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.row}>
          <Lock color={Colors.light.primary} size={24} />
          <View style={styles.rowTextContainer}>
            <Text style={styles.title}>Create password</Text>
            <Text style={styles.warningText}>You don't have a password, it's insecure</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <PencilLine color={Colors.light.primary} size={24} />
          <View style={styles.rowTextContainer}>
            <Text style={styles.title}>Give us feedback</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <UserX color={Colors.light.primary} size={24} />
          <View style={styles.rowTextContainer}>
            <Text style={styles.title}>Delete account</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <HelpCircle color={Colors.light.primary} size={24} />
          <View style={styles.rowTextContainer}>
            <Text style={styles.title}>FAQ</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={Common.dangerButton} onPress={() => setDialog(true)}>
          <Text style={Common.dangerButtonText}>Log out</Text>
        </TouchableOpacity>
        <Text style={[Common.ErrorMessage, styles.errorMessage]}>{errorMessage}</Text>
      </ScrollView>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
        </View>
      )}

      <Dialogbox
        visible={dialog}
        onSave={handleSignOut}
        onClose={() => setDialog(false)}
        title="Warning!"
        bodymessage="Are you sure you want to logout?"
        status="warning"
        warningPrimaryButtonText="Yes, Logout"
        warningSecondaryButtonText="No, Stay"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  rowTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 16,
    color: '#000000',
  },
  subtitle: {
    fontSize: 14,
    color: '#828282',
  },
  warningText: {
    fontSize: 14,
    color: Colors.light.danger,
  },
  errorMessage: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default SettingsScreen;
