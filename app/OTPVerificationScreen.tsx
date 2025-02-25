import { StyleSheet, Text, View, SafeAreaView, TextInput, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';

import { useNavigation } from "expo-router";

import Common from '@/constants/Common';
import TextHeader from '@/components/TextHeader';
import { useRouter } from 'expo-router';
import { supabase } from '@/libs/supabase';

import { useUserSelectionStore } from "@/store/onboardingUserSelection";
import { useUserStore } from '@/store/userStore';
import { useLocalSearchParams } from 'expo-router';
import { saveTokens } from '@/utils/TokenStorage';

const OTPVerificationScreen = () => {
    const router = useRouter();
    const navigation = useNavigation();
    const { resend, emailto } = useLocalSearchParams();    

    const { email, resetEmail } = useUserSelectionStore();
    const { setIsSignedIn, setSession } = useUserStore();

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [startTime, setStartTime] = useState(Date.now());
    const [counter, setCounter] = useState(60);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const inputRefs = useRef<TextInput[]>([]);

    const handleRedirect = () => {
        router.replace("/Authentication");
        resetEmail();
    };

    useEffect(() => {
        if (resend === "true" && emailto) {
            resendOTP(emailto);
        }
    }, [resend, emailto]);    

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
                            onPress: () => {
                                setTimeout(() => {
                                    handleRedirect();
                                }, 200); 
                            },
                        },
                    ]
                );
            }
        });
    }, [navigation]);

    useEffect(() => {
        const interval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const newCounter = Math.max(60 - elapsed, 0);
            setCounter(newCounter);

            if (newCounter <= 0) clearInterval(interval);
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime]);

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
            setIsSignedIn(true)
            setSession(session.user)
            await saveTokens(session.access_token, session.refresh_token)
            router.replace('/GoalSelection');
        }
    }, [otp, email, router]);

    const resendOTP = useCallback(async (email: any) => {
        if (loading) return;
        setLoading(true);

        try {
            const { error } = await supabase.auth.resend({
                type: 'signup',
                email: email,
            });

            if (error) {
                setError(error.message);
                return;
            }

            setStartTime(Date.now()); 
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
                            <TouchableOpacity onPress={() => resendOTP(email)}>
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