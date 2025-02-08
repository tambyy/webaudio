import { create } from "zustand";

interface ModalStore {
  modals: string[];
  open: (name: string) => void;
  openSub: (name: string) => void;
  close: () => void;
}

const modalStore = create<ModalStore>((set) => ({
  /**
   * Dashboard playlists list
   */
  modals: [],

  /**
   * Open a modal
   * @param name
   */
  open: (name: string) => {
    set({
      modals: [name],
    });
  },

  /**
   * Open a sub modal
   * @param name
   */
  openSub: (name: string) => {
    set((state) => ({
      modals: [...state.modals, name],
    }));
  },

  /**
   * Close top modal
   * @param name
   */
  close: () => {
    set((state) => ({
      modals:
        state.modals.length > 0
          ? state.modals.slice(0, state.modals.length - 1)
          : state.modals,
    }));
  },
}));

export default modalStore;
