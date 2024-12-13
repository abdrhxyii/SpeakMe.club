import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Redirect } from 'expo-router';

import { Mail, Lock, UserX, HelpCircle, PencilLine } from 'lucide-react-native';
import { supabase } from '@/libs/supabase';

import Common from '@/constants/Common';
import { Colors } from '@/constants/Colors';
import Dialogbox from '@/components/Dialogbox';

const SettingsScreen = () => {
  const [dialog, setDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if(error){
      setErrorMessage("An Error occurred while signing out, Please try again...");
      setDialog(false)
      return;
    }

    if(!error){
      setDialog(false);
      return <Redirect href={'/Authentication'}/>
    }
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
  starRow: {
    flexDirection: 'row',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 7,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.light.danger,
    marginBottom: 30,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.danger,
  },
  errorMessage: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500'
  }
});

export default SettingsScreen;
