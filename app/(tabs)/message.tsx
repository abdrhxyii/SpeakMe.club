import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function message() {
  return (
    <View style={styles.titleContainer}>
      <Text>message</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    titleContainer: {
        flex: 1,
        backgroundColor: '#ffffff'
      },
})