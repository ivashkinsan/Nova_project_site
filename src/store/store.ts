import { create } from 'zustand';

type Page = 'home' | 'artists' | 'booking' | 'about' | 'contacts';

interface AppState {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  scrollPosition: number;
  setScrollPosition: (pos: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentPage: 'home',
  setCurrentPage: (page: Page) => set({ currentPage: page }),
  isMenuOpen: false,
  setIsMenuOpen: (isOpen: boolean) => set({ isMenuOpen: isOpen }),
  scrollPosition: 0,
  setScrollPosition: (pos: number) => set({ scrollPosition: pos }),
}));
