import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { X } from 'lucide-react-native';

interface BottomModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode; 
}

export default function BottomModal({ isOpen, onClose, content }: BottomModalProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isOpen]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={['50%', '80%']}
      enablePanDownToClose={true}
      onClose={onClose}
      index={isOpen ? 0 : -1} 
      backgroundStyle={{ backgroundColor: 'white' }} 
    >
      <View style={styles.bottomSheetContent}>
        <TouchableOpacity onPress={onClose} style={styles.dismissButton}>
          <X color={"#000000"} size={20} />
        </TouchableOpacity>
        <Text style={styles.sheetHeader}>All Reviews</Text>
        <ScrollView>{content}</ScrollView>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  bottomSheetContent: {
    padding: 16,
    flex: 1, // Allow the content to expand
  },
  dismissButton: {
    alignSelf: 'flex-end',
  },
  sheetHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
