import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import Common from '@/constants/Common';
import { Colors } from '@/constants/Colors';

const AdviceList = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const advices = [
    'Speak more',
    'Speak less',
    'Focus on improving pronunciation',
    'Expand your vocabulary',
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        activeOpacity={0.8}
        onPress={() => setIsCollapsed(!isCollapsed)}
      >
        <Text style={Common.profileContentTitle}>Advices</Text>
        {isCollapsed ? (
          <ChevronDown size={24} color="#000" />
        ) : (
          <ChevronUp size={24} color="#000" />
        )}
      </TouchableOpacity>

      {!isCollapsed && (
        <View style={styles.listContainer}>
          {advices.map((item, index) => (
            <View key={index} style={styles.item}>
              <View style={styles.countWrapper}>
                <Text style={styles.countText}>0</Text>
              </View>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
  },
  listContainer: {},
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 10,
  },
  countWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15, 
    backgroundColor: Colors.light.primary + '20', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 14,
    color: Colors.light.primary,
  },
  itemText: {
    fontSize: 16,
    color: '#555',
  },
});

export default AdviceList;