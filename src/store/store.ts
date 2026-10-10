import { create } from 'zustand';

interface AppState {
  scrollPosition: number;
  setScrollPosition: (pos: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  scrollPosition: 0,
  setScrollPosition: (pos: number) => set({ scrollPosition: pos }),
}));
