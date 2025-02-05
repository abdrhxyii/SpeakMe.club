import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

type BottomSheetComponentProps = {
  isVisible: boolean;
  onClose: () => void;
  headerText?: string;
  data: Array<any>;
  renderItem: ({ item }: { item: any }) => React.ReactElement;
};

const BottomSheetComponent: React.FC<BottomSheetComponentProps> = ({
  isVisible,
  onClose,
  headerText,
  data,
  renderItem,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      onClose();
    }
  }, [onClose]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      snapPoints={['80%']}
      index={isVisible ? 0 : -1}
      enablePanDownToClose
    >
      <BottomSheetFlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={headerText ? (
          <Text style={styles.headerText}>{headerText}</Text>
        ) : null}
      />
    </BottomSheet>
  );
};

export default BottomSheetComponent;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
});
