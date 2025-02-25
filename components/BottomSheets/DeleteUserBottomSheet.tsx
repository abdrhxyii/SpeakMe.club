import React, { useMemo, forwardRef, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import CustomBackdrop from '@/components/CustomBackdrop'; 
import { Colors } from '@/constants/Colors';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'expo-router';
import { baseUrl } from '@/utils/BaseUrl';
import axios from 'axios';

const DeleteUserBottomSheet = forwardRef<BottomSheetModal>((_, ref) => {
  const { setSession, setIsSignedIn, session } = useUserStore();
  const router = useRouter();
  const snapPoints = useMemo(() => ['45%'], []);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    console.log(session?.user?.id, "session?.user?.id")
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.delete(`${baseUrl}/user/${session?.id}`)
      console.log(response, "response")
      if(response.status === 200) {
        setSession(null);
        setIsSignedIn(false);
        router.replace('/Authentication');
      } 
    } catch (err) {
      console.log(err, "err")
      setError('Something went wrong, try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      index={0}
      backdropComponent={(props) => <CustomBackdrop {...props} />}
      enableDynamicSizing={false}
      handleIndicatorStyle={{ display: 'none' }}
    >
      <BottomSheetView style={styles.container}>
        <Text style={styles.emoji}>😱</Text>
        <Text style={styles.title}>Are you sure you want to delete your account?</Text>
        <Text style={styles.description}>
          Deleting is permanent and your data will be lost
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.deleteButton} 
            activeOpacity={0.9} 
            onPress={handleDelete} 
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.deleteButtonText}>Delete</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.cancelButton} 
            activeOpacity={0.9} 
            onPress={() => (ref as any)?.current?.close()}
            disabled={loading}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default DeleteUserBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'column', // Stack buttons vertically
    width: '100%',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: Colors.light.red,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10, // Adds space between buttons
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.darkGray,
  },
  cancelButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
