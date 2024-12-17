import React, { useState, useEffect } from 'react';
import { View, Text, Alert, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';

import { Eye, EyeOff, CheckCircle } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { supabase } from '@/libs/supabase';
import { checkIfEmailExists } from '@/utils/authUtils';
import { Colors } from '@/constants/Colors';
import Common from '@/constants/Common';

import { object, string } from 'yup';

import { useUserSelectionStore } from "@/store/onboardingUserSelection";

const passwordValidationSchema = object().shape({
    password: string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[A-Za-z]/, 'Password must contain at least one letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special symbol'),
});

export default function PasswordAuthScreen() {
    const { email } = useUserSelectionStore();
    const { mode } = useLocalSearchParams();

    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const [passwordValidation, setPasswordValidation] = useState({
        isLengthValid: false,
        isLetterValid: false,
        isNumberValid: false,
        isSymbolValid: false,
    });

    const validatePassword = (text: string) => {
        setPassword(text);

        passwordValidationSchema
            .validate({ password: text })
            .then(() => {
                setError('');
                setPasswordValidation({
                    isLengthValid: text.length >= 8,
                    isLetterValid: /[A-Za-z]/.test(text),
                    isNumberValid: /\d/.test(text),
                    isSymbolValid: /[!@#$%^&*(),.?":{}|<>]/.test(text),
                });
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const continueAuthentication = async () => {
        if (loading) return;
        setLoading(true);

        try {
            if (mode === 'login') {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: email.trim(),
                    password: password.trim(),
                });

                if (error) {
                    setError(error.message);
                    return;
                }

                if (data) {
                    console.log(data, 'data from login');
                    router.replace('/(tabs)/');
                }
            } else if (mode === 'signup') {
                const emailExists = await checkIfEmailExists(email.trim());

                if (emailExists) {
                    setError('An account with this email already exists. Please log in instead.');
                    return;
                }

                const { data, error: signupError } = await supabase.auth.signUp({
                    email: email.trim(),
                    password: password.trim(),
                });

                if (signupError) {
                    setError(signupError.message);
                    return;
                }

                if (data && data.user) {
                    router.replace('/OTPVerificationScreen');
                }
            }
        } catch (err) {
            console.log(err, 'err');
            Alert.alert('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    const isPasswordEmpty = password.trim() === '';

    return (
        <SafeAreaView style={Common.container}>
            <View style={Common.content}>
                <View
                    style={[
                        styles.inputContainer,
                        {
                            borderColor: error
                                ? Colors.light.red
                                : passwordValidation.isLengthValid &&
                                  passwordValidation.isLetterValid &&
                                  passwordValidation.isNumberValid &&
                                  passwordValidation.isSymbolValid
                                ? 'green'
                                : Colors.light.primary,
                        },
                    ]}
                >
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={!isPasswordVisible}
                        value={password}
                        onChangeText={validatePassword}
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
                        {isPasswordVisible ? (
                            <EyeOff color={Colors.light.primary} size={24} />
                        ) : (
                            <Eye color={Colors.light.primary} size={24} />
                        )}
                    </TouchableOpacity>
                </View>

                {error ? <Text style={styles.warningText}>{error}</Text> : null}
                {passwordValidation.isLengthValid && passwordValidation.isLetterValid && passwordValidation.isNumberValid && passwordValidation.isSymbolValid && (
                    <View style={styles.validationItem}>
                        <CheckCircle color="green" size={16} />
                        <Text style={[styles.validationText, { color: 'green' }]}>
                            Password is strong
                        </Text>
                    </View>
                )}
            </View>

            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.9}
                onPress={continueAuthentication}
                disabled={loading || !(passwordValidation.isLengthValid && passwordValidation.isLetterValid && passwordValidation.isNumberValid && passwordValidation.isSymbolValid) || isPasswordEmpty}
            >
                {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={Common.continueText}>Continue</Text>}
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 8,
    },
    input: {
        flex: 1,
        padding: 13,
        fontSize: 16,
        color: '#333',
        paddingLeft: 12,
    },
    icon: {
        paddingHorizontal: 8,
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
    validationContainer: {
        marginTop: 16,
    },
    validationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        marginVertical: 6,
    },
    validationText: {
        marginLeft: 8,
        fontSize: 14,
    },
});
