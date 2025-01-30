import React, { useState, forwardRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import CustomBackdrop from '@/components/CustomBackdrop';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Colors } from '@/constants/Colors';

const EnglishLevelFilterSheet = forwardRef<BottomSheetModal>((_, ref) => {
    const [selectedRange, setSelectedRange] = useState<[number, number]>([0, 5]);
    const languageLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

    const handleSliderChange = (values: number[]) => {
        setSelectedRange([values[0], values[1]]);
    };

    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={['50%']}
            backdropComponent={(props) => <CustomBackdrop {...props} />}
            index={0}
            enablePanDownToClose={true}
            enableDynamicSizing={false}
            handleIndicatorStyle={{ display: 'none' }}
        >
            <BottomSheetView style={styles.sheetContainer}>
                <Text style={styles.sheetTitle}>Find a Partner</Text>
                <Text style={styles.subtitle}>123 partners online</Text>

                <View style={styles.sliderContainer}>
                    {languageLevels.map((level, index) => (
                        <View key={index} style={styles.levelWrapper}>
                            <View
                                style={[
                                    styles.levelContainer,
                                    index >= selectedRange[0] && index <= selectedRange[1] && styles.levelSelected,
                                ]}
                            />
                            <Text style={styles.levelText}>{level}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.sliderWrapper}>
                    <MultiSlider
                        values={selectedRange}
                        sliderLength={310}
                        onValuesChange={handleSliderChange}
                        min={0}
                        max={5}
                        step={1}
                        allowOverlap={false}
                        snapped
                        unselectedStyle={{
                            backgroundColor: '#C4C4C4',
                            height: 5,
                         }}
                        selectedStyle={{
                            backgroundColor: Colors.light.primary,
                            height: 5,
                        }}
                        markerStyle={{
                            backgroundColor: Colors.light.primary,
                            height: 20,
                            width: 20, 
                            borderRadius: 15, 
                        }}
                    />
                </View>

                <Text style={styles.rangeText}>
                    I'm finding friends From {languageLevels[selectedRange[0]]} to {languageLevels[selectedRange[1]]} English fluency level
                </Text>

                <Pressable style={styles.applyButton}>
                    <Text style={styles.applyButtonText}>Apply</Text>
                </Pressable>
            </BottomSheetView>
        </BottomSheetModal>
    );
});

const styles = StyleSheet.create({
    sheetContainer: {
        flex: 1,
        paddingHorizontal: 15,
        paddingBottom: 70,
    },
    sheetTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 12,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
    },
    sliderWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    sliderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    levelWrapper: {
        alignItems: 'center', 
    },
    levelContainer: {
        alignItems: 'center',
        backgroundColor: '#E4E4E4',
        height: 100,
        width: 20,
        borderRadius: 8,
    },
    levelSelected: {
        backgroundColor: Colors.light.primary, 
    },
    levelText: {
        color: '#333',
        fontSize: 14,
        marginTop: 5, 
    },
    slider: {
        width: '100%',
        height: 10,
        marginBottom: 15,
    },
    rangeText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#333',
        marginBottom: 20,
    },
    applyButton: {
        backgroundColor: Colors.light.primary,
        paddingVertical: 16,
        borderRadius: 25,
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        left: 16,
        right: 16,
    },
    applyButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});


export default EnglishLevelFilterSheet;
