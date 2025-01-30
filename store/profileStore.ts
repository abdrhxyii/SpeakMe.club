import { create } from 'zustand';
import { ProfileState } from '@/interfaces'

export const useProfileStore = create<ProfileState>((set) => ({
    profileImage: null,
    refreshImage: false,
    setProfileImage: (imageUri: string | null) => set({ profileImage: imageUri }),
    setRefreshImage: (refresh: boolean) => set({ refreshImage: refresh }),
    resetProfileImage: () => set({ profileImage: null, refreshImage: false }),
}));