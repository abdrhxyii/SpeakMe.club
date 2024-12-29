import { View, Text, StyleSheet } from 'react-native';
import { Languages, Globe, MapPin, User } from 'lucide-react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { getCountry } from '@/utils/getCountry';

export default function AccountSection({ user }: any) {
  const country = getCountry();
  return (
    <View style={styles.infoContainer}>
      <View style={styles.infoItem}>
        <View style={styles.iconWrapper}>
          <Languages color={Colors.light.primary} size={22} />
        </View>
        <View style={styles.infoTextContainer}>
          <Text style={styles.label}>Native language</Text>
          <Text style={styles.value}>{user.native_language}</Text>
        </View>
      </View>

      <View style={styles.infoItem}>
        <View style={styles.iconWrapper}>
          <Globe color={Colors.light.primary} size={22} />
        </View>
        <View style={styles.infoTextContainer}>
          <Text style={styles.label}>English level</Text>
          <Text style={styles.value}>{user.language_fluency_level}</Text>
        </View>
      </View>

      <View style={styles.infoItem}>
        <View style={styles.iconWrapper}>
          <User color={Colors.light.primary} size={22} />
        </View>
        <View style={styles.infoTextContainer}>
          <Text style={styles.label}>Gender</Text>
          <Text style={styles.value}>{user.gender}</Text>
        </View>
      </View>

      <View style={styles.infoItem}>
        <View style={styles.iconWrapper}>
          <MapPin color={Colors.light.primary} size={22} />
        </View>
        <View style={styles.infoTextContainer}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.value}>{country}</Text>
        </View>
      </View>
    </View>
  );
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
  iconWrapper: {
    backgroundColor: Colors.light.primary + '20', 
    borderRadius: 25,
    padding: 8, 
    alignItems: 'center',
    justifyContent: 'center', 
  },
  infoTextContainer: {
    marginLeft: 10,
  },
  label: {
    fontSize: 13,
    color: '#6B7280',
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
});
