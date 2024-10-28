import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Apple } from 'lucide-react-native';
import Common from '@/constants/Common';

const Authentication = () => {
  return (
    <View style={Common.container}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('@/assets/images/google1.png')} style={styles.icon} />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.emailButton}>
          <Text style={styles.emailButtonText}>Continue with Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    bg: {
        backgroundColor: '#D6FFEA'
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        paddingHorizontal: 15,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DDD',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 12,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    socialButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',
    },
    emailButton: {
        backgroundColor: '#000000',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 12,
    },
    emailButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Authentication;
