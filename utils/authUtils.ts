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
