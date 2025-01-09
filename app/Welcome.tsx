import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Common from '@/constants/Common';
import { Image } from 'react-native';

const Welcome = () => {
  const router = useRouter()
  const emojiData = [
    { image: require('@/assets/images/introuser6.png'), backgroundColor: '#C5B1FF' },
    { image: require('@/assets/images/introuser2.png'), backgroundColor: '#FFF6B1' },
    { image: require('@/assets/images/introuser3.png'), backgroundColor: '#D8FFB1' },
    { image: require('@/assets/images/introuser4.png'), backgroundColor: '#B1DFFF' },
    { image: require('@/assets/images/introuser10.png'), backgroundColor: '#FFB1B9' },
    { image: require('@/assets/images/introuser9.png'), backgroundColor: '#FFD8B1' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFD8B1', '#00000000']} 
        style={styles.gradient}
      />

      <View style={styles.content}>
        <View style={styles.emojiContainer}>
          <View style={[styles.centerEmojiWrapper, { backgroundColor: emojiData[0].backgroundColor }]}>
          <Image
              source={emojiData[0].image}
              style={styles.centerEmojiImage}
          />
          </View>
          {emojiData.slice(1).map((emoji, index) => {
            const angle = (index * 360) / (emojiData.length - 1);
            const radius = 125;
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);

            return (
              <View
                key={index}
                style={[
                  styles.surroundingEmojiWrapper,
                  { backgroundColor: emoji.backgroundColor },
                  { transform: [{ translateX: x }, { translateY: y }] },
                ]}
              >
                <Image
                  source={emoji.image}
                  style={styles.emojiImage}
                />
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} activeOpacity={0.8} onPress={() => router.replace('/Authentication')}>
          <Text style={Common.continueText}>Get Started</Text>
        </TouchableOpacity>
        <Text style={styles.privacyText}>
          Hands up! Read our Privacy Policy, it’s not as boring as you might think.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiContainer: {
    position: 'relative',
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerEmojiWrapper: {
    width: 120,
    height: 120,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  surroundingEmojiWrapper: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiImage: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
  },
  centerEmojiImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  privacyText: {
    fontSize: 12,
    color: '#7D7D7D',
    textAlign: 'center',
    marginTop: 10,
    width: '80%',
  },
});

export default Welcome;
