import { StyleSheet } from 'react-native'
import React from 'react'

import { LinearGradient } from 'expo-linear-gradient';

export default function LinearGradientStyle() {
  return (
    <>
        <LinearGradient
            colors={['#FFD8B1', '#00000000']} 
            style={styles.gradient}
        />
    </>
  )
}

const styles = StyleSheet.create({
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '50%',
    },
})