import { supabase } from '@/libs/supabase';

export const checkIfEmailExists = async (email: string): Promise<boolean> => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('email')
            .eq('email', email);

        if (error) {
            console.error('Error fetching user:', error);
            return false;
        }

        if (!data) {
            console.warn('No data returned from query.');
            return false;
        }

        return data.length > 0;
    } catch (err) {
        console.error('Unexpected error:', err);
        return false;
    }
};


export const checkIfNewUser = async (userId: any) => {
    const { data, error } = await supabase
      .from('users') 
      .select('is_onboarding_complete')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { 
      console.log('Error checking user profile:', error);
      return true;
    }

    return !data || !data.is_onboarding_complete;
}