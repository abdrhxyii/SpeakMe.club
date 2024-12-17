import { StyleSheet, Text, View, SafeAreaView, TextInput, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';

import { useNavigation } from "expo-router";

import Common from '@/constants/Common';
import TextHeader from '@/components/TextHeader';
import { useRouter } from 'expo-router';
import { supabase } from '@/libs/supabase';

import { useUserSelectionStore } from "@/store/onboardingUserSelection";

const OTPVerificationScreen = () => {
    const router = useRouter();
    const navigation = useNavigation();

    const { email, resetEmail } = useUserSelectionStore()

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [counter, setCounter] = useState(60);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const inputRefs = useRef<TextInput[]>([]);

    const handleRedirect = () => {
        router.replace("/Authentication");
        resetEmail();
    }

    useEffect(() => {
        navigation.addListener("beforeRemove", (e) => {
            if (e.data.action.type === "GO_BACK") {
                e.preventDefault();
                Alert.alert(
                    "Leave OTP Verification?",
                    "Are you sure you want to leave this screen? Any progress will be lost.",
                    [
                        { text: "Cancel", style: "cancel", onPress: () => {} },
                        {
                            text: "Yes",
                            style: "destructive",
                            onPress: handleRedirect
                        },
                    ]
                );
            }
        });
    }, [navigation]);

    useEffect(() => {
        if (counter > 0) {
            const timer = setTimeout(() => setCounter(counter - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [counter]);

    const handleChange = useCallback((text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text !== "" && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    }, [otp]);

    const handleVerify = useCallback(async () => {
        const otpCode = otp.join('');
        if (otpCode.length !== 6) {
            setError('Invalid OTP, Please enter the 6-digit OTP sent to your email.');
            return;
        }

        setLoading(true);

        const { data: { session }, error } = await supabase.auth.verifyOtp({
            email: email,
            token: otpCode,
            type: 'signup',
        });

        setLoading(false);

        if (error) {
            setError(error.message);
            return;
        }
        if (session) {
            console.log(session, "session");
            router.replace('/GoalSelection');
        }
    }, [otp, email, router]);

    const resendOTP = useCallback(async () => {
        if (loading) return;
        setLoading(true);

        try {
            const { error } = await supabase.auth.resend({
                type: 'signup',
                email: email
            });

            if (error) {
                setError(error.message);
                return;
            }

            setCounter(60);
            Alert.alert('OTP Resent', 'A new OTP has been sent to your email.');
        } catch (error) {
            Alert.alert('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    }, [loading, email]);

    useEffect(() => {
        if (otp.every(digit => digit !== "")) {
            handleVerify();
        }
    }, [otp, handleVerify]);

    return (
        <SafeAreaView style={Common.container}>
            <View style={Common.content}>
                <TextHeader header="Enter 6 Digit Code" subheader={`Enter the 6-digit code sent to your email ${email}`} />
                
                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            style={styles.otpInput}
                            value={digit}
                            onChangeText={(text) => handleChange(text, index)}
                            keyboardType="numeric"
                            maxLength={1}
                            ref={(ref) => inputRefs.current[index] = ref!}  
                        />
                    ))}
                </View>

                {error ? <Text style={styles.warningText}>{error}</Text> : null}

                {loading ? (
                    <ActivityIndicator size="large" color="#000000" style={styles.loader} />
                ) : (
                    counter > 0 ? (
                        <Text style={styles.terms}>
                            Resend code in <Text style={styles.link}>{counter} seconds</Text>
                        </Text>
                    ) : (
                        <Text style={styles.terms}>
                            Email not received?{" "}
                            <TouchableOpacity onPress={resendOTP}>
                                <Text style={styles.link}>Resend code</Text>
                            </TouchableOpacity>
                        </Text>
                    )
                )}
            </View>
        </SafeAreaView>
    );
};

export default OTPVerificationScreen;

const styles = StyleSheet.create({
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 0,
        marginRight: 20,
        marginBottom: 10,
        marginLeft: 20,
    },
    otpInput: {
        width: 50,
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 24,
    },
    terms: {
        fontSize: 13,
        color: '#808080',
        marginBottom: 16,
        textAlign: 'center',
    },
    link: {
        color: '#1A1A1A',
        fontWeight: '800',
        textDecorationLine: 'underline',
    },
    warningText: {        
        fontSize: 14,
        color: 'red',
        lineHeight: 20,
        marginVertical: 6,
        textAlign: 'center',
    },
    loader: {
        marginTop: 20,
    },
});