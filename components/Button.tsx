import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/Colors';
import { LoadingButtonProps } from '@/interfaces'; 

const Button: React.FC<LoadingButtonProps> = ({ loading, onPress, children }) => {
    return (
        <TouchableOpacity
            style={styles.button} 
            onPress={onPress} 
            activeOpacity={0.9}
        >
            {loading ? (
                <ActivityIndicator size="small" color="#fff" />
            ) : (
                <Text style={styles.buttonText}>{children}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.light.primary, 
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabled: {
        backgroundColor: '#b5b5b5', 
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Button;
