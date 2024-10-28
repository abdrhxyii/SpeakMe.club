import { Colors } from '@/constants/Colors';
import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';

const Dialogbox = ({ visible, onClose, type = 'success', title, bodymessage}: any) => {
  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Image source={type == 'warning' ? require('@/assets/images/Warning.png') : require('@/assets/images/success.png') }/>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{bodymessage}</Text>
          {
            type == 'success' ?
            <>
                <TouchableOpacity style={[styles.basebutton,styles.successbutton]} onPress={onClose} activeOpacity={0.8}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </> :
            <>
                <TouchableOpacity style={[styles.basebutton,styles.warningbutton]} onPress={onClose} activeOpacity={0.8}>
                  <Text style={styles.buttonText}>Yes, Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.basebutton,styles.cancelbutton]} onPress={onClose} activeOpacity={0.8}>
                  <Text style={type == 'success' ? styles.buttonText : styles.cnclbuttonText}>No Cancel</Text>
                </TouchableOpacity>
            </>
          }
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  iconContainer: {
    padding: 10,
    marginBottom: 15,
  },
  icon: {
    fontSize: 24,
    color: '#155724',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: "#808080"
  },
  basebutton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '100%',
    marginBottom: 10,
  },
  successbutton: {
    backgroundColor: '#000',
  },
  warningbutton: {
    backgroundColor: Colors.light.danger
  },
  cancelbutton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#808080'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center'
  },
  cnclbuttonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center'
  },
});

export default Dialogbox;