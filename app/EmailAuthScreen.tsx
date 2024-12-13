import { Colors } from '@/constants/Colors';
import Common from '@/constants/Common';
import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { Info, CheckCircle } from 'lucide-react-native';
import TextHeader from '@/components/TextHeader';

export default function EmailAuthScreen() {
    const route = useRouter();
    const { mode } = useLocalSearchParams();
    
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [fullNameError, setFullNameError] = useState('');

    const validateFullName = (text: string) => {
        setFullName(text);
        if (text.trim() === '') {
            setFullNameError('Full name is required.');
        } else {
            setFullNameError('');
        }
    };

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
        if (
            (mode === 'login' || !fullNameError) &&  
            !error && 
            email.trim()  
        ) {
            route.push({
                pathname: '/PasswordAuthScreen', 
                params: {
                    fullName: fullName,
                    email: email,
                    mode: mode === 'signup' ? 'signup' : 'login'
                }
            });
        } else {
            setError('Please fill in all fields correctly before continuing.');
        }
    };

    const inputBorderColor = error ? Colors.light.red : email.trim() && !error ? 'green' : Colors.light.darkGray;
    const fullNameBorderColor = fullNameError && mode === 'signup' ? Colors.light.red : fullName.trim() && !fullNameError ? 'green' : Colors.light.darkGray;

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
                            header="Create an account 👋" 
                            subheader="Let's create your account." 
                        />
                    )
                }

                {mode === 'signup' && (
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, { borderColor: fullNameBorderColor }]}
                            placeholder="Full Name"
                            autoCapitalize="words"
                            value={fullName}
                            onChangeText={validateFullName}
                        />
                        {fullName.trim() && !fullNameError ? (
                            <View style={styles.iconContainer}>
                                <CheckCircle color="green" size={25} />
                            </View>
                        ) : fullNameError ? (
                            <View style={styles.iconContainer}>
                                <Info color="red" size={25} />
                            </View>
                        ) : null}
                    </View>
                )}
                {fullNameError ? <Text style={styles.warningText}>{fullNameError}</Text> : null}

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
                <Text style={Common.continueText}>Continue</Text>
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
    borderRadius: 25,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
});
