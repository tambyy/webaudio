import SongType from "@/types/song";
import SongTag from "./SongTag";
import { useRef, useState } from "react";
import useSongStore from "@/store/songStore";
import useModalStore from "@/store/modalStore";

const Song = ({
  song,
  added,
  isSelected,
  onChange,
}: {
  song: SongType;
  added: boolean;
  isSelected: boolean;
  onChange?: (e: boolean) => void;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const setSong = useSongStore((state) => state.setSong);
  /**
   *
   */
  const openModal = useModalStore((state) => state.open);

  /**
   * Handle play/pause toggle
   * @param e
   */
  const togglePlayPause = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (audioRef.current) {
      // Pause the audio if it's playing
      if (isPlaying) {
        audioRef.current.pause();
        // Play the audio if it's paused
      } else {
        audioRef.current.play();
      }

      // Toggle the play/pause state
      setIsPlaying(!isPlaying);
    }
  };

  /**
   * Handle audio playing ended
   */
  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }
  };

  /**
   * Handle song dragging
   * @param e
   */
  const handleDragStart = (e) => {
    e.dataTransfer.setData(
      added ? "added-new-playlist-song" : "new-playlist-song",
      JSON.stringify(song)
    );
  };

  /**
   * Edit a song
   * @param e
   */
  const editSong = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSong(song);
    openModal("update-song");
  };

  return (
    <label
      className="flex flex-row p-2 items-center bg-gray-50 hover:bg-gray-200 cursor-move rounded"
      draggable
      onDragStart={handleDragStart}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {/* Checkbox */}
      {!added && (
        <input
          type="checkbox"
          className="hidden peer"
          checked={isSelected}
          onChange={(e) => {
            if (onChange) onChange(e.target.checked);
          }}
        />
      )}
      {!added && (
        <div className="w-5 h-5 border border-gray-400 rounded shadow-md flex items-center justify-center peer-checked:border-transparent peer-checked:bg-cyan-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#FFFFFF"
          >
            <path d="M389-280.85 209.62-459.23 246.38-497 389-354.38 713.62-678l36.76 36.77L389-280.85Z" />
          </svg>
        </div>
      )}

      {/* Move */}
      <div className="px-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="#333"
        >
          <path d="M359.79-207.39q-23.44 0-39.92-16.69t-16.48-40.13q0-23.44 16.69-39.92t40.13-16.48q23.44 0 39.92 16.69t16.48 40.13q0 23.44-16.69 39.92t-40.13 16.48Zm240 0q-23.44 0-39.92-16.69t-16.48-40.13q0-23.44 16.69-39.92t40.13-16.48q23.44 0 39.92 16.69t16.48 40.13q0 23.44-16.69 39.92t-40.13 16.48Zm-240-216q-23.44 0-39.92-16.69t-16.48-40.13q0-23.44 16.69-39.92t40.13-16.48q23.44 0 39.92 16.69t16.48 40.13q0 23.44-16.69 39.92t-40.13 16.48Zm240 0q-23.44 0-39.92-16.69t-16.48-40.13q0-23.44 16.69-39.92t40.13-16.48q23.44 0 39.92 16.69t16.48 40.13q0 23.44-16.69 39.92t-40.13 16.48Zm-240-216q-23.44 0-39.92-16.69t-16.48-40.13q0-23.44 16.69-39.92t40.13-16.48q23.44 0 39.92 16.69t16.48 40.13q0 23.44-16.69 39.92t-40.13 16.48Zm240 0q-23.44 0-39.92-16.69t-16.48-40.13q0-23.44 16.69-39.92t40.13-16.48q23.44 0 39.92 16.69t16.48 40.13q0 23.44-16.69 39.92t-40.13 16.48Z" />
        </svg>
      </div>

      {/* Title / Singer / Duration */}
      <div className="flex flex-col pl-3 flex-1">
        <div className="flex flex-row">
          {/* Singer */}
          <span className="text-sm text-gray-700">{song.name}</span>
          {/* Favorite */}
          {song.favorite && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#F19E39"
            >
              <path d="m352-293 128-76 129 76-34-144 111-95-147-13-59-137-59 137-147 13 112 95-34 144Zm-79 107.46 55.31-231.77-183.46-155.92 240.61-20.92L480-812.84l94.54 219.69 240.61 19.92-183.46 155.92L687-185.54 480-308.46 273-185.54ZM480-477Z" />
            </svg>
          )}
        </div>
        <div className="flex flex-row gap-1 items-center">
          {/* Singer */}
          <span className="text-xs text-gray-400">{song.singer}</span>
          <div className="w-0.5 h-0.5 bg-gray-600 rounded-full"></div>
          {/* Duration */}
          <span className="text-xs text-gray-400">
            {Math.floor(song.duration / 60)}:{song.duration % 60}
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-row gap-1">
        {song.tags?.map((tag) => (
          <SongTag key={tag.id} tag={tag} />
        ))}
      </div>

      {/* Play and pause */}
      <audio ref={audioRef} src={song.path} onPlay={handlePlay} />
      <a
        className="flex flex-row items-center justify-center text-sm  w-6 h-8 ml-1 cursor-pointer"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={togglePlayPause}
      >
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#333"
          >
            <path d="M538-212v-536h210v536H538Zm-326 0v-536h210v536H212Zm378-52h106v-432H590v432Zm-326 0h106v-432H264v432Zm0-432v432-432Zm326 0v432-432Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#333"
          >
            <path d="M356-252.16v-455.68L707.07-480 356-252.16ZM409-481Zm-1 133 204.77-132L408-612v264Z" />
          </svg>
        )}
      </a>

      {/* Edit */}
      <a
        className="flex flex-row items-center justify-center text-sm w-6 h-8 cursor-pointer"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          editSong(e);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16px"
          viewBox="0 -960 960 960"
          width="16px"
          fill="#333"
        >
          <path d="M144-144v-153l498-498q11-11 24-16t27-5q14 0 27 5t24 16l51 51q11 11 16 24t5 27q0 14-5 27t-16 24L297-144H144Zm549-498 51-51-51-51-51 51 51 51Z" />
        </svg>
      </a>

      {/* + */}
      {added ? (
        <div
          className="flex flex-row items-center justify-center text-sm rounded bg-gray-200 text-gray-500 w-8 h-8"
          onClick={() => {
            if (onChange) onChange(false);
          }}
        >
          &times;
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center text-sm rounded bg-blue-100 text-blue-500 w-8 h-8">
          +
        </div>
      )}
    </label>
  );
};

export default Song;
