import { Colors } from '@/constants/Colors';
import Common from '@/constants/Common';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { Info, CheckCircle  } from 'lucide-react-native';
import TextHeader from '@/components/TextHeader';

export default function EmailAuthScreen() {
    const route = useRouter();
    const { mode } = useLocalSearchParams();
    
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (text: string) => {
        setEmail(text);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (text.trim() === '' || emailRegex.test(text)) {
            setError('');
        } else {
            setError('Ensure your email is correct. Invalid email addresses may result in access issues.');
        }
    };

    const handleContinue = () => {
        if (!error && email.trim()) {
            route.push({
                pathname: '/PasswordAuthScreen', 
                params: {
                    email: email,
                    mode: mode === 'signup' ? 'signup' : 'login'
                }
            });
        } else {
            setError('Please enter a valid email before continuing.');
        }
    };

    const inputBorderColor = error ? Colors.light.red : email.trim() && !error ? 'green' : Colors.light.darkGray;
    const iconColor = error ? Colors.light.red : email.trim() && !error ? 'green' : 'transparent';

    return (
        <SafeAreaView style={Common.container}>
            <View style={Common.content}>
                {
                    mode === 'login' ? (
                        <TextHeader 
                            header="Login to your account" 
                            subheader="It's great to see you again." 
                        />
                    ) : (
                        <TextHeader 
                            header="Create an account" 
                            subheader="Let's create your account." 
                        />
                    )
                }
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, { borderColor: inputBorderColor }]}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={email}
                        onChangeText={validateEmail}
                    />
                    {email.trim() && !error ? (
                        <View style={styles.iconContainer}>
                            <CheckCircle color="green" size={25} /> 
                        </View>
                    ) : error ? (
                        <View style={styles.iconContainer}>
                            <Info color={iconColor} size={25} />  
                        </View>
                    ) : null}
                </View>
                {error ? <Text style={styles.warningText}>{error}</Text> : null}
            </View>

            <Pressable style={styles.button} onPress={handleContinue}>
                <Text style={styles.buttonText}>Continue</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 13,
    fontSize: 16,
    color: '#333',
    marginTop: 8,
    paddingLeft: 12,
    paddingRight: 40,
  },
  iconContainer: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  warningText: {
    fontSize: 14,
    color: Colors.light.red,
    lineHeight: 20,
    marginVertical: 6,
  },
  button: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 6,
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
});
