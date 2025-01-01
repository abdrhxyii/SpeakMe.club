import React, { forwardRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { ChevronDown } from 'lucide-react-native';
import CustomBackdrop from '@/components/CustomBackdrop';

const PartnerFinderModal = forwardRef<BottomSheetModal>((_, ref) => {
  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={['100%']}
      index={0}
      backdropComponent={(props) => <CustomBackdrop {...props} />}
      enablePanDownToClose
      handleIndicatorStyle={{ display: 'none' }}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.bottomSheetHeader}>
          <TouchableOpacity onPress={() => (ref as any)?.current?.close()}>
            <ChevronDown color={'#000000'} size={24} />
          </TouchableOpacity>
          <View style={styles.centerContainer}>
            <Text style={styles.headerText}>Find a Partner</Text>
          </View>
        </View>
        <View style={styles.bodyContainer}>
          <Text style={styles.headingText}>Looking for the perfect partner</Text>
          <View style={styles.timerContainer}>
            <View style={styles.circle}>
              <Text style={styles.emoji}>👩‍💻</Text>
              <Text style={styles.timerText}>0:02</Text>
              <Text style={styles.subText}>Waiting time 0-1 minute</Text>
            </View>
          </View>
          <Text style={styles.noteText}>Don’t lock the screen or exit the app during the search</Text>
          <TouchableOpacity>
            <Text style={styles.settingsText}>Search settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel the search</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingHorizontal: 15,
      },
      bottomSheetHeader: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      centerContainer: {
        flex: 1, 
        alignItems: 'center',
      },
      headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600'
      },
      bodyContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 40,
      },
      headingText: {
        fontSize: 25,
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'center',
        color: '#000',
      },
      timerContainer: {
        marginVertical: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      },
      circle: {
        width: 180,
        height: 180,
        borderRadius: 90,
        borderWidth: 10,
        borderColor: '#7F56D9',
        justifyContent: 'center',
        alignItems: 'center',
      },
      emoji: {
        fontSize: 40,
        marginBottom: 5,
      },
      timerText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000',
      },
      subText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
      },
      noteText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
      },
      settingsText: {
        fontSize: 16,
        color: '#7F56D9',
        textAlign: 'center',
        marginBottom: 20,
      },
      cancelButton: {
        backgroundColor: '#F0F0F0',
        padding: 15,
        borderRadius: 8,
      },
      cancelButtonText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
      },
});

export default PartnerFinderModal;
