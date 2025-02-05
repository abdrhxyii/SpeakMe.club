import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

export default function ReviewCard() {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.Modalheader}>
        <Image
          source={require('@/assets/images/user.jpg')}
          style={styles.ModalprofileImage}
        />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>Bridget, New York</Text>
          <Text style={styles.date}>9 months ago</Text>
        </View>
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>👍</Text>
        </View>
      </View>
      <Text style={styles.reviewText}>
        We had a happy family holiday to celebrate a birthday. The dining experience was wonderful, and the food was spectacular!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewContainer: {
    marginVertical: 10,
    borderColor: '#ddd',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  Modalheader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ModalprofileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10, 
  },
  userDetails: {
    flex: 1,
    marginRight: 15, 
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  date: {
    color: 'gray',
    fontSize: 14,
  },
  emojiContainer: {
    backgroundColor: '#DFF2BF', 
    borderRadius: 25,
    padding: 8, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 25,
  },
  reviewText: {
    marginTop: 6,
    fontSize: 14,
    color: '#333',
    lineHeight: 20
  },
});
