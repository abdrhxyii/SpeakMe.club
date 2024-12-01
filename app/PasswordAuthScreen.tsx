import React, { useState, useMemo } from 'react';
import { View, Text, Alert, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/Colors';
import Common from '@/constants/Common';
import { Eye, EyeOff, CheckCircle } from 'lucide-react-native'; 
import { router, useLocalSearchParams } from 'expo-router';
import { supabase } from '@/libs/supabase';

export default function PasswordAuthScreen() {
    const { email, mode } = useLocalSearchParams();
    const validEmail = Array.isArray(email) ? email[0] : email;

    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const [isLengthValid, setIsLengthValid] = useState(false);
    const [isLetterValid, setIsLetterValid] = useState(false);
    const [isNumberValid, setIsNumberValid] = useState(false);

    useMemo(() => {}, [email, mode]);

    const validatePassword = (text: any) => {
        setPassword(text);

        const lengthRegex = /.{8,}/; 
        const letterRegex = /[A-Za-z]/; 
        const numberRegex = /\d/; 

        setIsLengthValid(lengthRegex.test(text));
        setIsLetterValid(letterRegex.test(text));
        setIsNumberValid(numberRegex.test(text));

        if (text.trim() === '' || !lengthRegex.test(text) || !letterRegex.test(text) || !numberRegex.test(text)) {
            setError('Password must be at least 8 characters long and include at least one letter and one number.');
        } else {
            setError('');
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const continueAuthentication = async () => {
        if (loading) return; 
        setLoading(true);

        try {
            if (mode === 'login') {
                const { data, error } = await supabase.auth.signInWithOtp({
                    email: validEmail as string,
                    options: {
                        shouldCreateUser: false,
                    },
                });

                if (error) {
                    console.log(error, "PassowrdAuthScreen Line 71")
                    Alert.alert(error.message);
                    return
                }
                if (data) {
                    console.log(data, "data login")
                    router.push({ pathname: '/OTPVerificationScreen', params: { email: validEmail } });
                }
            } else if (mode === 'signup') {
                const { data, error } = await supabase.auth.signInWithOtp({
                    email: validEmail as string,
                    options: {
                        shouldCreateUser: true,
                    },
                });

                if (error) {
                    console.log(error, "PassowrdAuthScreen Line 71")
                    Alert.alert(error.message);
                    return
                }
                if (data) {
                    console.log(data, "data")
                    router.push({ pathname: '/OTPVerificationScreen', params: { email: validEmail } });
                }
            }
        } catch (err) {
            Alert.alert("An unexpected error occurred");
        } finally {
            setLoading(false); 
        }
    };

    return (
        <SafeAreaView style={Common.container}>
            <View style={Common.content}>
                <View style={[styles.inputContainer, { borderColor: isLengthValid && isLetterValid && isNumberValid ? 'green' : Colors.light.primary }]}>
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

                <View style={styles.validationContainer}>
                    <View style={styles.validationItem}>
                        <CheckCircle color={isLengthValid ? 'green' : 'red'} size={16} />
                        <Text style={[styles.validationText, { color: isLengthValid ? 'green' : 'red' }]}>Should include at least 8 characters</Text>
                    </View>
                    <View style={styles.validationItem}>
                        <CheckCircle color={isLetterValid ? 'green' : 'red'} size={16} />
                        <Text style={[styles.validationText, { color: isLetterValid ? 'green' : 'red' }]}>Should include at least one letter</Text>
                    </View>
                    <View style={styles.validationItem}>
                        <CheckCircle color={isNumberValid ? 'green' : 'red'} size={16} />
                        <Text style={[styles.validationText, { color: isNumberValid ? 'green' : 'red' }]}>Should include at least one number</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.9}
                onPress={continueAuthentication}
                disabled={loading || !(isLengthValid && isLetterValid && isNumberValid)}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Continue</Text>
                )}
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
        color: 'red',
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
    validationContainer: {
        marginTop: 16,
    },
    validationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    validationText: {
        marginLeft: 8,
        fontSize: 14,
    },
});
