import React, {useEffect} from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';

import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as Google from "expo-auth-session/providers/google"

import Common from '@/constants/Common';
import { Mail } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

const webClinetId = '1070629572115-nk6jq1edb7ngjav853b0u0kbalb9ia3g.apps.googleusercontent.com'
const androidClientId = '1070629572115-qeu9dutp1evr9mqlcd7prulks1otasjm.apps.googleusercontent.com'
const iosClientId = '1070629572115-qgjtl00997dmrjdc89bepqnfa372bic8.apps.googleusercontent.com'

WebBrowser.maybeCompleteAuthSession();

const Authentication = () => {
  const router = useRouter();
  const config = {
    webClinetId,
    iosClientId,
    androidClientId
  }

  const [request, response, promptAsync] = Google.useAuthRequest(config)

  const handleToken = () => {
    if(response?.type === "success"){
      const {authentication} =  response;
      const token = authentication?.accessToken;
      console.log(token, "access token")
    }
  }

  useEffect(() => {
    handleToken()

  }, [response])

  return (
    <View style={Common.container}>
      <View style={styles.backgroundContainer}>
        <View style={styles.buttonsContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.socialButton,
              pressed && { opacity: 0.8 },
            ]}
            onPress={() => promptAsync()}
          >
            <Image
              source={require('@/assets/images/google1.png')}
              style={styles.icon}
            />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.emailButton,
              pressed && { opacity: 0.8 },
            ]}
            onPress={() => router.push({pathname: '/EmailAuthScreen', params: {mode: 'signup'}})}
          >
            <Mail size={20} color="#FFF" />
            <Text style={styles.emailButtonText}>Sign up with Email</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.emailButton,
              pressed && { opacity: 0.8 },
            ]}
            onPress={() => router.push({pathname: '/EmailAuthScreen', params: {mode: 'login'}})}
          >
            <Mail size={20} color="#FFF" />
            <Text style={styles.emailButtonText}>Log in with Email</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#e8f5e3', 
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 15,
  },
  buttonsContainer: {
    paddingVertical: 45,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.light.darkGray,
    borderWidth: 1,
    borderRadius: 10,
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
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    paddingVertical: 15,
    borderRadius: 10,
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
