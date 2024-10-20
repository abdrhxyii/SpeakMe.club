import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function ReviewCard() {
  return (
    <View style={styles.reviewCard}>
        <Text style={styles.quote}>
        "We had a happy family holiday to celebrate a birthday. We dined in on two of the three nights that we stayed and the food was spectacular."
        </Text>
            <View style={styles.userInfo}>
                <Image
                source={require('@/assets/images/user.jpg')} 
                style={styles.avatar}
                />
            <View>
                <Text style={styles.userName}>Bridget</Text>
                <Text style={styles.timeAgo}>9 months ago</Text>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    reviewCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        padding: 15,
        borderColor: '#ddd',
        borderWidth: 1,
        height: '100%',
        marginRight: 15,
        width: 290
      },
      quote: {
        fontSize: 13,
        marginBottom: 15,
        lineHeight: 20,

      },
      userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
      },
      userName: {
        fontSize: 14,
        fontWeight: 'bold',
      },
      timeAgo: {
        fontSize: 12,
        color: '#777',
      },
})