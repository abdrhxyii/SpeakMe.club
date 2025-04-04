import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { PhoneCall, MessageCircle } from 'lucide-react-native'
import { Colors } from '@/constants/Colors'

export default function ActionButton() {
  return (
    <>
    <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <PhoneCall color={Colors.light.background} size={18} />
            <Text style={styles.buttonText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <MessageCircle color={Colors.light.background} size={18} />
            <Text style={styles.buttonText}>Message</Text>
        </TouchableOpacity>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 7,
        marginBottom: 15,
        gap: 10,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light.primary,
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 6,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
        textAlign: 'center'
    },
    buttonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#FFF',
        marginLeft: 8,
    },
})