import * as SecureStore from 'expo-secure-store';

export const setSecureValue = async (key: string, value: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) { 
    console.error('Error setting secure value', error);
  }
};

export const getSecureValue = async (key: string): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error('Error getting secure value', error);
    return null;
  }
};

export const deleteSecureValue = async (key: string): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error('Error deleting secure value', error);
  }
};