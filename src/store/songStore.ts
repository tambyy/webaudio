import Song from "@/types/song";
import { create } from "zustand";

interface SongStore {
  song: Song | null;
  songs: Song[];
  setSong: (song: Song | null) => void;
  setSongs: (songs: Song[]) => void;
}

const songStore = create<SongStore>((set) => ({
  /**
   * Song
   */
  song: null,

  /**
   * Songs list
   */
  songs: [],

  /**
   * Seet current songs
   * @param songs
   */
  setSong: (song: Song | null) => {
    set({
      song,
    });
  },

  /**
   * Update songs list
   * @param songs
   */
  setSongs: (songs: Song[]) => {
    set({
      songs,
    });
  },
}));

export default songStore;
