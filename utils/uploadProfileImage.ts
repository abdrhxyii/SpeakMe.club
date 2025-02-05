import axios from 'axios';
import mime from 'mime';
import { baseUrl } from './BaseUrl';

const uploadProfileImage = async (imageUri: string, userId: string) => {
  try {
    const newImageUri = "file:///" + imageUri.split("file:/").join("");

    const formData = new FormData();

    const file = {
      uri: newImageUri,
      type: mime.getType(newImageUri) || 'image/jpeg', 
      name: newImageUri.split('/').pop() || 'profile.jpg', 
    };

    formData.append('profilePic', file as any);

    formData.append('userId', userId);

    const response = await axios.post(`${baseUrl}/profile/upload-profile-pic`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      console.log('Image uploaded successfully:', response.data);
      return true;
    } else {
      console.error('Image upload failed with status:', response.status);
      return false; 
    }
  } catch (error) {
    console.log('Error uploading image:', error);
    return false;
  }
};

export default uploadProfileImage;
