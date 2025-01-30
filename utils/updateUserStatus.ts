import { supabase } from "@/libs/supabase";

const updateUserStatus = async (userId: any, isOnline: Boolean) => {
    const { error } = await supabase
      .from('users')
      .update({ is_online: isOnline })
      .eq('id', userId);
  
    if (error) {
      console.error('Error updating user status:', error);
    } else {
      console.log('User status updated:', isOnline);
    }
  };
  
export default updateUserStatus;