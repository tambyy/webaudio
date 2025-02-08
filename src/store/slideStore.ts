import { create } from "zustand";

interface SlideStore {
  slides: string[];
  open: (name: string) => void;
  openSub: (name: string) => void;
  close: () => void;
}

const slideStore = create<SlideStore>((set) => ({
  /**
   * Dashboard playlists list
   */
  slides: [],

  /**
   * Open a slide
   * @param name
   */
  open: (name: string) => {
    set({
      slides: [name],
    });
  },

  /**
   * Open a sub slide
   * @param name
   */
  openSub: (name: string) => {
    set((state) => ({
      slides: [...state.slides, name],
    }));
  },

  /**
   * Close top slide
   * @param name
   */
  close: () => {
    set((state) => ({
      slides:
        state.slides.length > 0
          ? state.slides.slice(0, state.slides.length - 1)
          : state.slides,
    }));
  },
}));

export default slideStore;
