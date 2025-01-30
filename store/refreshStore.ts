import { create } from 'zustand'
import { RefreshState } from '@/interfaces'

export const refreshStore = create<RefreshState>((set) => ({
    hasUserUpdated: false, 
    markUpdated: () => set({ hasUserUpdated: true }),
    resetUpdated: () => set({ hasUserUpdated: false }),
}));