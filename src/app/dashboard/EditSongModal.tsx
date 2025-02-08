import Modal from "@/components/Modal";
import TagType from "@/types/tag";
import useTagsStore from "@/store/tagStore";
import useSongStore from "@/store/songStore";
import useModalStore from "@/store/modalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Song from "@/types/song";

/**
 * Update song
 * @param tag
 * @returns
 */
const updateSong = async (song: Song) => {
  const response = await fetch(`/api/songs/${song.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: song.name,
      singer: song.singer,
      tags: song.tags ? song.tags.map((tag) => tag.id) : [],
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update song item");
  }

  return response.json();
};

/**
 * Tag component
 * @param param0
 * @returns
 */
const Tag = ({
  tag,
  selected,
  onClick,
}: {
  tag: TagType;
  selected: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}) => {
  return (
    <div
      className={`flex flex-row h-6 px-2 items-center rounded gap-1 cursor-pointer ${
        selected ? "outline outline-cyan-600" : ""
      }`}
      style={{ backgroundColor: tag.bgcolor, color: tag.color }}
      onClick={onClick}
    >
      <span className="text-xs">{tag.name}</span>
    </div>
  );
};

const EditSongModal = () => {
  const song = useSongStore((state) => state.song);
  const setSong = useSongStore((state) => state.setSong);

  /**
   * Close te current open modal
   */
  const close = useModalStore((state) => state.close);

  /**
   * List of tags
   */
  const tags = useTagsStore((state) => state.tags);

  /**
   * Add tag mutation
   */
  const queryClient = useQueryClient();
  const updateSongMutation = useMutation({
    mutationFn: updateSong,
    // Refresh the songs list
    onSuccess: () => {
      queryClient.invalidateQueries(["songs"]);
    },
  });

  /**
   * Add song update
   */
  const handleSongUpdate = (e) => {
    e.preventDefault();

    updateSongMutation.mutate(song);

    close();
  };

  /**
   * Handle add toggle tag
   */
  const handleSongToggleTag = (tag: TagType) => {
    if (!song || !Array.isArray(song.tags)) {
      return;
    }

    if (song.tags.find((t) => t.id == tag.id)) {
      setSong({ ...song, tags: song.tags.filter((t) => t.id != tag.id) });
    } else {
      setSong({ ...song, tags: [...song.tags, tag] });
    }
  };

  return (
    <Modal name="update-song" title="Modifier une chanson">
      {song && (
        <form className="flex flex-col w-60 gap-5" onSubmit={handleSongUpdate}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1 w-full">
              <span className="text-xs text-gray-600">Titre de la chanson</span>
              <div className="flex flex-row gap-2">
                {/* Name */}
                <input
                  className="w-full h-8 border border-gray-200 px-3 shadow-sm rounded"
                  placeholder="Ma chanson"
                  value={song?.name}
                  onChange={(e) =>
                    setSong({ ...song, name: e.target.value } as Song)
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <span className="text-xs text-gray-600">Chanteur</span>
              <div className="flex flex-row gap-2">
                {/* Singer */}
                <input
                  className="w-full h-8 border border-gray-200 px-3 shadow-sm rounded"
                  placeholder="Jason Mraz, ..."
                  value={song?.singer}
                  onChange={(e) =>
                    setSong({ ...song, singer: e.target.value } as Song)
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-600">Tags</span>
              <div className="flex flex-row flex-wrap gap-1.5 w-full pt-4">
                {tags.map((tag) => (
                  <Tag
                    key={tag.id}
                    tag={tag}
                    selected={Boolean(song?.tags?.find((t) => t.id == tag.id))}
                    onClick={() => handleSongToggleTag(tag)}
                  />
                ))}
              </div>
            </div>
          </div>
          <button className="w-full h-8 bg-cyan-500 flex flex-row items-center justify-center text-white rounded">
            <div className="w-8 h-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#FFF"
              >
                <path d="M796-663.54v435.23q0 27.01-18.65 45.66Q758.7-164 731.69-164H228.31q-27.01 0-45.66-18.65Q164-201.3 164-228.31v-503.38q0-27.01 18.65-45.66Q201.3-796 228.31-796h435.23L796-663.54ZM744-642 642-744H228.31q-5.39 0-8.85 3.46t-3.46 8.85v503.38q0 5.39 3.46 8.85t8.85 3.46h503.38q5.39 0 8.85-3.46t3.46-8.85V-642ZM480-281.23q36.54 0 62.27-25.73Q568-332.69 568-369.23q0-36.54-25.73-62.27-25.73-25.73-62.27-25.73-36.54 0-62.27 25.73Q392-405.77 392-369.23q0 36.54 25.73 62.27 25.73 25.73 62.27 25.73ZM279.39-556.62h304.45v-123.99H279.39v123.99ZM216-629v413-528 115Z" />
              </svg>
            </div>
            Enregistrer la chanson
          </button>
        </form>
      )}
    </Modal>
  );
};

export default EditSongModal;
