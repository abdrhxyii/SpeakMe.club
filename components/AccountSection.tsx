import { View, Text, StyleSheet} from 'react-native';
import { Languages, Globe, MapPin, User } from 'lucide-react-native';
import React from 'react'
import { Colors } from '@/constants/Colors';

export default function AccountSection() {
  return (
    <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
        <Languages color={Colors.light.primary} size={22} />
        <View style={styles.infoTextContainer}>
            <Text style={styles.label}>Native language</Text>
            <Text style={styles.value}>Tamil</Text>
        </View>
        </View>

        <View style={styles.infoItem}>
        <Globe color={Colors.light.primary} size={22} />
        <View style={styles.infoTextContainer}>
            <Text style={styles.label}>English level</Text>
            <Text style={styles.value}>A1 (Beginner)</Text>
        </View>
        </View>

        <View style={styles.infoItem}>
        <User color={Colors.light.primary} size={22} />
        <View style={styles.infoTextContainer}>
            <Text style={styles.label}>Gender</Text>
            <Text style={styles.value}>Male</Text>
        </View>
        </View>

        <View style={styles.infoItem}>
        <MapPin color={Colors.light.primary} size={22} />
        <View style={styles.infoTextContainer}>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.value}>Sri Lanka</Text>
        </View>
        </View>

        <View style={styles.infoItem}>
        <User color={Colors.light.primary} size={22} />
        <View style={styles.infoTextContainer}>
            <Text style={styles.label}>College/School</Text>
            <Text style={styles.value}>London Metropolitan University</Text>
        </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    infoContainer: {
        backgroundColor: Colors.light.background,
        marginBottom: 10,
      },
      infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
      },
      infoTextContainer: {
        marginLeft: 10,
      },
      label: {
        fontSize: 12,
        color: '#6B7280',
      },
      value: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
      },
})