import { create } from 'zustand'
import { UserSelectionState } from '@/interfaces'

export const useUserSelectionStore = create<UserSelectionState>((set) => ({
    email: '',
    goalOfLearning: null,
    nativeLanguage: null,
    languageFluencyLevel: null,
    gender: null,
    
    setEmail: (email) => set({ email }),
    setGoalOfLearning: (goal) => set({ goalOfLearning: goal }),
    setNativeLanguage: (language) => set({ nativeLanguage: language }),
    setLanguageFluencyLevel: (level) => set({ languageFluencyLevel: level }),
    setGender: (gender) => set({ gender }),
    reset: () => set({
        email: '',
        goalOfLearning: null,
        nativeLanguage: null,
        languageFluencyLevel: null,
        gender: null,
    }),

    resetEmail: () => set({ email: '' }),
    resetGoalOfLearning: () => set({ goalOfLearning: null }),
    resetNativeLanguage: () => set({ nativeLanguage: null }),
    resetLanguageFluencyLevel: () => set({ languageFluencyLevel: null }),
    resetGender: () => set({ gender: null }),
}));