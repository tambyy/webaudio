"use client";

import DashboardPlaylist from "@/types/dashboard-playlist";
import useDashboardPlaylistStore from "@/store/dasboardPlaylistStore";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Tag from "@/types/tag";
import Song from "@/types/song";

const PlayList = ({ playlist, selected, repartition }: DashboardPlaylist) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const currentSong =
    playlist.songs && playlist.songs.length > currentSongIndex
      ? playlist.songs[currentSongIndex]
      : null;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleDashboardPlaylistSelected = useDashboardPlaylistStore(
    (state) => state.toggleDashboardPlaylistSelected
  );

  const setDashboardPlaylistRepartition = useDashboardPlaylistStore(
    (state) => state.setDashboardPlaylistRepartition
  );

  /**
   * Handle play/pause toggle
   * @param e
   */
  const togglePlayPause = () => {
    if (!audioRef.current) {
      return;
    }

    // Pause the audio if it's playing
    if (isPlaying) {
      audioRef.current.pause();
      // Play the audio if it's paused
    } else {
      audioRef.current.play();
    }

    // Toggle the play/pause state
    setIsPlaying(!isPlaying);
  };

  /**
   * Handle audio playing ended
   */
  useEffect(() => {
    const handleEnded = () => {
      // Update the current song index
      setCurrentSongIndex((prevIndex) =>
        playlist.songs && prevIndex >= playlist.songs.length - 1
          ? 0
          : prevIndex + 1
      );
    };

    if (audioRef.current) {
      // Add event listener for when the song ends
      audioRef.current.addEventListener("ended", handleEnded);

      if (isPlaying) {
        audioRef.current?.play();
      }
    }

    return () => {
      // Cleanup event listener
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleEnded);
      }
    };
  }, [currentSongIndex, isPlaying, playlist.songs]);

  return (
    <label className="w-full h-auto flex flex-col cursor-pointer">
      <div
        className={`bg-white shadow-lg rounded-lg p-4 w-full flex flex-col items-center ${
          selected
            ? "border border-cyan-500 shadow-sm shadow-cyan-500"
            : "border border-transparent shadow-lg"
        }`}
      >
        {/* Cover with Play Button */}
        <div
          className="relative flex items-center justify-center bg-black bg-opacity-30 rounded-full w-32 h-32"
          style={{
            backgroundImage: `url('${playlist.cover}')`,
            backgroundSize: "cover",
          }}
        >
          {currentSong && <audio ref={audioRef} src={currentSong.path} />}
          <div
            className="bg-white w-12 h-12 rounded-full flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();

              togglePlayPause();
            }}
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#333"
              >
                <path d="M541.79-240v-480H720v480H541.79ZM240-240v-480h178.72v480H240Zm335.64-33.85h110.51v-412.3H575.64v412.3Zm-301.79 0h111.02v-412.3H273.85v412.3Zm0-412.3v412.3-412.3Zm301.79 0v412.3-412.3Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#333"
              >
                <path d="M360-273.28v-415.39l326.15 207.7L360-273.28Zm33.85-207.69Zm0 145.33 229.84-145.33-229.84-145.34v290.67Z" />
              </svg>
            )}
          </div>

          {/* Search */}
          <div className="absolute top-0 right-0 bg-white bg-opacity-70 w-8 h-8 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#333"
            >
              <path d="M762.69-160.92 524.46-399.16q-30 22.77-65.79 35.27-35.79 12.5-73.87 12.5-93.58 0-159.11-65.51-65.53-65.51-65.53-159.04 0-93.52 65.51-159.1 65.51-65.57 159.04-65.57 93.52 0 159.1 65.53 65.57 65.53 65.57 159.11 0 39.23-12.88 75.02-12.89 35.8-34.89 64.64l238.23 238.23-37.15 37.16ZM384.77-403.38q72.31 0 122.46-50.16 50.16-50.15 50.16-122.46t-50.16-122.46q-50.15-50.16-122.46-50.16t-122.46 50.16Q212.15-648.31 212.15-576t50.16 122.46q50.15 50.16 122.46 50.16Z" />
            </svg>
          </div>
        </div>

        {/* Text Content */}
        <div className="w-full h-auto flex flex-col pb-6 border-b border-b-gray-200 items-center">
          <h2 className="w-full text-center text-base font-medium mt-5 mb-2 text-black text-nowrap overflow-hidden text-ellipsis">
            {playlist.name}
          </h2>
          {
            <p className="w-full h-6 text-center text-gray-400 text-xs text-nowrap overflow-hidden text-ellipsis">
              {isPlaying && currentSong
                ? currentSong.name
                : playlist.songs
                    ?.reduce((carry: Tag[], song: Song) => {
                      song.tags?.forEach((tag: Tag) => {
                        if (!carry.find((t) => t.id == tag.id)) {
                          carry.push(tag);
                        }
                      });
                      return carry;
                    }, [])
                    .map((tag) => tag.name)
                    .join(", ")}
            </p>
          }
        </div>

        {/* Checkbox & Repartition */}
        <div className="flex items-center gap-3 mt-5 mb-6 w-full">
          <input
            type="checkbox"
            className="hidden peer"
            checked={selected}
            onChange={() => {
              toggleDashboardPlaylistSelected(playlist);
            }}
          />
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
          <span
            className={`text-white px-2 py-0.5 rounded text-xs font-medium bg-gray-400`}
            style={{
              backgroundColor:
                selected && playlist.color ? playlist.color : "#9ca3af",
            }}
          >
            {Math.floor(repartition)}%
          </span>
        </div>

        {/* Volume Slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={repartition}
          onChange={(e) =>
            setDashboardPlaylistRepartition(playlist, Number(e.target.value))
          }
          onClick={(e) => {
            e.stopPropagation();
          }}
          disabled={!selected}
          className="w-full h-0.5 mb-4 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-500 disabled:accent-gray-400"
        />
      </div>
    </label>
  );
};

export default PlayList;
