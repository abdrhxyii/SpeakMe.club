import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Mail, Lock, UserX, HelpCircle, LogOut, PencilLine } from 'lucide-react-native';
import Common from '@/constants/Common';
import { Colors } from '@/constants/Colors';
import Dialogbox from '@/components/Dialogbox';

const SettingsScreen = () => {
  const [dialog, setDialog] = useState(false)
  return (
    <SafeAreaView style={Common.container}>
      <ScrollView style={styles.content}>
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
          <LogOut color="#FFFFFF" size={24} />
          <Text style={Common.dangerButtonText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
      <Dialogbox
          visible={dialog}
          onClose={() => setDialog(false)}
          title="Confirm Logout"
          bodymessage="Are you sure you want to logout?"
          type={'warning'}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
  },
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
});

export default SettingsScreen;
