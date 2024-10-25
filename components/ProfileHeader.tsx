import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Modal, Image, TouchableWithoutFeedback } from 'react-native';
import { Colors } from '@/constants/Colors';
import { EllipsisVertical } from 'lucide-react-native';

export default function ProfileHeader() {
  const [modalVisible, setModalVisible] = useState(false);
  const scaleValue = useRef(new Animated.Value(0)).current;

  const handleImagePress = () => {
    setModalVisible(true);
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseModal = () => {
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  return (
    <View style={styles.header}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={handleImagePress}>
          <Image
            source={require('@/assets/images/user.jpg')}
            style={styles.profileImage}
          />
          <View style={styles.onlineDot}></View>
        </TouchableOpacity>
      </View>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerTitle}>Abdur Rahman, 19</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Hours</Text>
            <Text style={styles.detailValue}>120 hrs</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Talks</Text>
            <Text style={styles.detailValue}>450</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Feedback</Text>
            <Text style={styles.detailValue}>4.8/5</Text>
          </View>
        </View>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="none"  
        onRequestClose={handleCloseModal}
      >
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.fullScreenImageContainer, { transform: [{ scale: scaleValue }] }]}>
              <Image
                source={require('@/assets/images/user.jpg')}
                style={styles.fullScreenImage}
              />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    // padding: 15,
    paddingBottom: 20,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '700',
  },
  profileImage: {
    width: 65,
    height: 65,
    borderRadius: 50,
    backfaceVisibility: 'hidden',
  },
  profileContainer: {
    position: 'relative',
  },
  onlineDot: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: Colors.light.online,
    borderRadius: 8,
    padding: 8,
  },
  detailsContainer: {
    flexDirection: 'row',
    marginTop: 6,
  },
  detailItem: {
    marginRight: 20,
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImageContainer: {
    position: 'relative',
    width: 300,
    height: 300,
    borderRadius: 150,  
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    borderRadius: 150,  
    resizeMode: 'cover',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
