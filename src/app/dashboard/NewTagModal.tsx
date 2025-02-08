import Modal from "@/components/Modal";
import TagType from "@/types/tag";
import useTagsStore from "@/store/tagStore";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Add tag
 * @param tag
 * @returns
 */
const addTag = async (tag) => {
  const response = await fetch("/api/tags", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tag),
  });

  if (!response.ok) {
    throw new Error("Failed to add tag item");
  }

  return response.json();
};

/**
 * Remove tag
 * @param tag
 * @returns
 */
const removeTag = async (tag) => {
  const response = await fetch(`/api/tags/${tag.id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete tag item");
  }

  return response.json();
};

/**
 * Tag component
 * @param param0
 * @returns
 */
const Tag = ({ tag }: { tag: TagType }) => {
  /**
   * Remove tag mutation
   */
  const queryClient = useQueryClient();
  const removeTagMutation = useMutation({
    mutationFn: removeTag,
    // Refresh the tags list
    onSuccess: () => {
      queryClient.invalidateQueries(["tags"]);
    },
  });

  return (
    <div
      className="flex flex-row h-6 px-2 items-center rounded gap-1 cursor-pointer"
      style={{ backgroundColor: tag.bgcolor, color: tag.color }}
      onClick={() => {
        removeTagMutation.mutate(tag);
      }}
    >
      <span className="text-xs">{tag.name}</span>
      <span>&times;</span>
    </div>
  );
};

const NewTagModal = () => {
  const [newTag, setNewTag] = useState({
    name: "",
    color: "#333333",
    bgcolor: "#EEEEEE",
  });

  /**
   * List of tags
   */
  const tags = useTagsStore((state) => state.tags);

  /**
   * Highight color
   */
  const highightColor = (color: number, highight: number) => {
    return Math.floor(color + highight * (255 - color));
  };

  /**
   * Generate random color
   */
  const randColor = () => {
    const sum = Math.floor(Math.random() * 40 + 230);
    const r = Math.floor(Math.random() * Math.min(sum, 255));
    const g = Math.floor(Math.random() * Math.min(sum - r, 255));
    const b = sum - r - g;

    return { r, g, b };
  };

  /**
   * Generate random color
   */
  const randBgcolor = (r: number, g: number, b: number) => {
    const c = 0.9;

    return {
      r: highightColor(r, c),
      g: highightColor(g, c),
      b: highightColor(b, c),
    };
  };

  /**
   * Hex color
   */
  const hexColor = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  /**
   * Add tag mutation
   */
  const queryClient = useQueryClient();
  const addTagMutation = useMutation({
    mutationFn: addTag,
    // Refresh the tags list
    onSuccess: () => {
      queryClient.invalidateQueries(["tags"]);
    },
  });

  /**
   * Add tag
   */
  const handleTagAdd = (e) => {
    e.preventDefault();

    if (!newTag.name) {
      return;
    }

    const { r, g, b } = randColor();
    const { r: br, g: bg, b: bb } = randBgcolor(r, g, b);
    const tag = {
      ...newTag,
      color: hexColor(r, g, b),
      bgcolor: hexColor(br, bg, bb),
    };

    addTagMutation.mutate(tag);

    setNewTag((tag) => ({ ...tag, name: "" }));
  };

  return (
    <Modal name="add-tag" title="Gérer les tags">
      <form className="flex flex-col" onSubmit={handleTagAdd}>
        <div className="flex flex-row">
          <input
            className="w-52 h-8 border border-gray-200 px-3 shadow-sm rounded-tl rounded-bl"
            placeholder="Nouveau tag"
            value={newTag.name}
            onChange={(e) => {
              setNewTag((tag) => ({ ...tag, name: e.target.value }));
            }}
          />
          <button className="flex flex-row h-8 px-5 bg-cyan-500 text-white items-center rounded-tr rounded-br">
            + Ajouter
          </button>
        </div>
        <div className="flex flex-row flex-wrap gap-1.5 w-60 pt-4">
          {tags.map((tag) => (
            <Tag key={tag.id} tag={tag} />
          ))}
        </div>
      </form>
    </Modal>
  );
};

export default NewTagModal;
