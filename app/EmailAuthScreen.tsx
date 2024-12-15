import { Colors } from '@/constants/Colors';
import Common from '@/constants/Common';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, Pressable, ActivityIndicator } from 'react-native';
import { Info, CheckCircle } from 'lucide-react-native';
import TextHeader from '@/components/TextHeader';
import { checkIfEmailExists } from '@/utils/authUtils';
import { object, string } from 'yup'; 
import { useUserSelectionStore } from '@/store/onboardingUserSelection';

export default function EmailAuthScreen() {
    const route = useRouter();
    const navigation = useNavigation();

    const { mode } = useLocalSearchParams();
    const {email, setEmail} = useUserSelectionStore()

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const resetGoalOfLearning = useUserSelectionStore((state) => state.resetEmail); 

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            if (e.data.action.type === "GO_BACK") {
                resetGoalOfLearning();
            }
        });
        return unsubscribe;
    }, [navigation, resetGoalOfLearning]);

    const emailSchema = object({
        email: string()
            .email('Ensure your email is correct. Invalid email addresses may result in access issues.')
            .required('Please fill in all fields before continuing.')
    });

    const validateEmail = (text: string) => {
        setEmail(text);

        emailSchema
            .validate({ email: text })
            .then(() => {
                setError('');
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    const handleContinue = async () => {
        try {
            setLoading(true);
            await emailSchema.validate({ email });

            if (mode === 'signup') {
                const exists = await checkIfEmailExists(email);
                if (exists) {
                    setError('An account with this email already exists. Please log in instead.');
                    setEmail('');
                    return;
                }
    
                route.push('/GoalSelection');
            } else if (mode === 'login') {
                route.push({
                    pathname: '/PasswordAuthScreen',
                    params: {
                        mode: mode,
                    },
                });
            }
        } catch (error) {
            setError('There was an issue checking the email. Please try again later.');
        } finally {
            setLoading(false);
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
                            header="Create an account 👋" 
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

            <Pressable style={styles.button} onPress={handleContinue} disabled={loading}>
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                    ) : (
                    <Text style={Common.continueText}>Continue</Text>
                )}
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
