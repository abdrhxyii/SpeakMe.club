import { create } from 'zustand'
import { UserState } from '@/interfaces'

export const useUserStore = create<UserState>((set) => ({
  isSignedIn: null,
  setIsSignedIn: (status) => set({ isSignedIn: status }),
  session: null,  
  setSession: (session) => set({ session }),
}));