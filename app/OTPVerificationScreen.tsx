import { StyleSheet, Text, View, SafeAreaView, TextInput,Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import Common from '@/constants/Common';
import TextHeader from '@/components/TextHeader';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '@/libs/supabase';

const OTPVerificationScreen = () => {
    const router = useRouter()
    const { email } = useLocalSearchParams();
    const validEmail = Array.isArray(email) ? email[0] : email;

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [counter, setCounter] = useState(60);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (counter > 0) {
            const timer = setTimeout(() => setCounter(counter - 1), 1000);
            return () => clearTimeout(timer); 
        }
    }, [counter]);

    useEffect(() => {
        if (otp.every(digit => digit !== "")) {
            handleVerify();
        }
    }, [otp]);

    const handleChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
    };

    const handleVerify = async () => {
        const otpCode = otp.join('');
        if (otpCode.length !== 6) {
            Alert.alert('Invalid OTP', 'Please enter the 6-digit OTP sent to your email.');
            return;
        }

        const { data: { session }, error } = await supabase.auth.verifyOtp({
            email: email as string,
            token: otpCode,
            type: 'signup',
        });

        if (error) {
            Alert.alert('Verification Failed', error.message);
            return;
        }
        if(session) {
            console.log(session, "session")
            router.push('/(tabs)/')
        }
    };

    return (
        <SafeAreaView style={Common.container}>
            <View style={Common.content}>
                <TextHeader header="Enter 4 Digit Code" subheader={`Enter 4 digit code that you receive on your email ${email}`}/>
                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            style={styles.otpInput}
                            value={digit}
                            onChangeText={(text) => handleChange(text, index)}
                            keyboardType="numeric"
                            maxLength={1}
                        />
                    ))}
                </View>
                {counter > 0 ? (
                    <Text style={styles.terms}>
                        Resend code in <Text style={styles.link}>{counter} seconds</Text> 
                    </Text>
                ) : (
                    <Text style={styles.terms}>
                        Email not received? <Text style={styles.link}>Resend code</Text>
                    </Text>
                )}
            </View>
        </SafeAreaView>
    )
}

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
        textAlign: 'center'
    },
    link: {
        color: '#1A1A1A',
        fontWeight: '800',
        textDecorationLine: 'underline'
    },
});