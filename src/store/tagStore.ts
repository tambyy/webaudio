import Tag from "@/types/tag";
import { create } from "zustand";

interface TagStore {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
}

const tagStore = create<TagStore>((set) => ({
  /**
   * Tags list
   */
  tags: [],

  /**
   * Update tags list
   * @param tags
   */
  setTags: (tags) => {
    set({
      tags,
    });
  },
}));

export default tagStore;
