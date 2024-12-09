import React, { useState, useMemo } from 'react';
import { View, Text, Alert, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/Colors';
import Common from '@/constants/Common';
import { Eye, EyeOff, CheckCircle } from 'lucide-react-native'; 
import { router, useLocalSearchParams } from 'expo-router';
import { supabase } from '@/libs/supabase';
import { checkIfEmailExists } from '@/utils/authUtils';

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
    const [isSymbolValid, setIsSymbolValid] = useState(false);

    useMemo(() => {}, [email, mode]);

    const validatePassword = (text: any) => {
        setPassword(text);

        const lengthRegex = /.{8,}/; 
        const letterRegex = /[A-Za-z]/; 
        const numberRegex = /\d/; 
        const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/; // Symbol regex

        setIsLengthValid(lengthRegex.test(text));
        setIsLetterValid(letterRegex.test(text));
        setIsNumberValid(numberRegex.test(text));
        setIsSymbolValid(symbolRegex.test(text));

        if (text.trim() === '' || !lengthRegex.test(text) || !letterRegex.test(text) || !numberRegex.test(text) || !symbolRegex.test(text)) {
            setError('Password must be at least 8 characters long and include at least one letter, one number, and one special symbol.');
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
                console.log({
                    email: validEmail as string,
                    password: password.trim(),
                })
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: validEmail as string,
                    password: password.trim(),
                });
    
                if (error) {
                    setError(error.message)
                    return;
                }
    
                if (data) {
                    console.log(data, "data from login")
                    router.replace('/(tabs)/'); 
                }
            } else if (mode === 'signup') {
                const emailExists = await checkIfEmailExists(validEmail as string);
                
                if (emailExists) {
                    setError("An account with this email already exists. Please log in instead.");
                    return;
                }

                const { data, error } = await supabase.auth.signUp({
                    email: validEmail as string,
                    password: password.trim(),
                });
            
                if (error) {
                    setError(error.message);
                    return;
                }
            
                if (data.user) {
                    console.log(data, "data from sigup");
                    router.replace({ pathname: '/OTPVerificationScreen', params: { email: validEmail } });
                }
            }
        } catch (err) {
            console.log(err, "err")
            Alert.alert("An unexpected error occurred");
        } finally {
            setLoading(false); 
        }
    };

    return (
        <SafeAreaView style={Common.container}>
            <View style={Common.content}>
                <View 
                    style={[
                        styles.inputContainer, 
                        { 
                        borderColor: error ? Colors.light.red : (isLengthValid && isLetterValid && isNumberValid && isSymbolValid ? 'green' : Colors.light.primary) 
                        }
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

                {mode != 'login' && 
                <View style={styles.validationContainer}>
                    <View style={styles.validationItem}>
                        <CheckCircle color={isLengthValid ? 'green' : Colors.light.red} size={16} />
                        <Text style={[styles.validationText, { color: isLengthValid ? 'green' : Colors.light.red }]}>Should include at least 8 characters</Text>
                    </View>
                    <View style={styles.validationItem}>
                        <CheckCircle color={isLetterValid ? 'green' : Colors.light.red} size={16} />
                        <Text style={[styles.validationText, { color: isLetterValid ? 'green' : Colors.light.red }]}>Should include at least one letter</Text>
                    </View>
                    <View style={styles.validationItem}>
                        <CheckCircle color={isNumberValid ? 'green' : Colors.light.red} size={16} />
                        <Text style={[styles.validationText, { color: isNumberValid ? 'green' : Colors.light.red }]}>Should include at least one number</Text>
                    </View>
                    <View style={styles.validationItem}>
                        <CheckCircle color={isSymbolValid ? 'green' : Colors.light.red} size={16} />
                        <Text style={[styles.validationText, { color: isSymbolValid ? 'green' : Colors.light.red }]}>Should include at least one symbol</Text>
                    </View>
                </View>}
            </View>

            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.9}
                onPress={continueAuthentication}
                disabled={loading || !(isLengthValid && isLetterValid && isNumberValid && isSymbolValid)}
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
