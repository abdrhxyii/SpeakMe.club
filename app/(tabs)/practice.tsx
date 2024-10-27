import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function practice() {
  return (
    <View style={styles.titleContainer}>
      <Text>practice</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    titleContainer: {
        flex: 1,
        backgroundColor: '#ffffff'
      },
})