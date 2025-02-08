import Slide from "@/components/Slide";
import SongsTab from "./(components)/(new-playlist)/SongsTab";
import Song from "./(components)/(new-playlist)/Song";
import useFetchSongs from "@/hooks/useFetchSongs";
import useSongsStore from "@/store/songStore";
import useTagsStore from "@/store/tagStore";
import useSlideStore from "@/store/slideStore";
import useModalStore from "@/store/modalStore";
import SongUpload from "./(components)/(new-playlist)/SongUpload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CoverUpload from "./(components)/(new-playlist)/CoverUpload";
import { useState } from "react";
import AICover from "./(components)/(new-playlist)/AICover";
import ColorPicker from "./(components)/(new-playlist)/ColorPicker";
import SongType from "@/types/song";
import TabLayout from "@/components/TabLayout";

/**
 * Ad new playlist
 * @param
 * @returns
 */
const addPlaylist = async (playlist) => {
  const formData = new FormData();
  formData.append("name", playlist.name);
  formData.append("color", playlist.color);
  formData.append("cover", playlist.coverFile);

  playlist.songs.forEach((song: SongType) => {
    formData.append("songs[]", song.id);
  });

  const response = await fetch("/api/playlists", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to add playlist item");
  }

  return response.json();
};

/**
 * Add new song
 * @param song
 * @returns
 */
const addSong = async (song) => {
  const formData = new FormData();
  formData.append("name", song.name);
  formData.append("duration", song.duration);
  formData.append("singer", "");
  formData.append("audio", song.audio);

  const response = await fetch("/api/songs", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to add song item");
  }

  return response.json();
};

const NewPlaylistSlide = () => {
  /**
   * New current playlist
   */
  const [newPlaylist, setNewPlaylist] = useState({
    name: "",
    cover: "",
    coverFile: null as File | null,
    songs: [] as SongType[],
  });

  /**
   * Playlist songs tab
   */
  const [playlistSongsTab, setPlaylistSongsTab] = useState(0);

  /**
   * New playlist songs total duration
   */
  const newPlaylistSongsTotalDuration = newPlaylist.songs.reduce(
    (carry, song) => carry + song.duration,
    0
  );

  /**
   * Song filter keyword
   */
  const [filterSongKeyword, setFilterSongKeyword] = useState("");

  /**
   * Song filter tag
   */
  const [filterSongTag, setFilterSongTag] = useState<number | null>(null);

  /**
   *
   */
  const openModal = useModalStore((state) => state.open);

  /**
   * Fetch songs
   */
  const {} = useFetchSongs();

  /**
   * List of songs
   */
  const songs = useSongsStore((state) => state.songs);

  /**
   * List of filtered songs
   */
  const filteredSongs = songs.filter(
    (song) =>
      `${song.singer} ${song.name}`
        .toLowerCase()
        .includes(filterSongKeyword.toLowerCase()) &&
      (!filterSongTag || song.tags?.find((t) => t.id == filterSongTag))
  );

  /**
   * List of tags
   */
  const tags = useTagsStore((state) => state.tags);

  /**
   * Add song mutation
   */
  const addSongQueryClient = useQueryClient();
  const addSongMutation = useMutation({
    mutationFn: addSong,
    // Refresh the songs list
    onSuccess: () => {
      addSongQueryClient.invalidateQueries(["songs"]);
    },
  });

  /**
   * Add playlist mutation
   */
  const addPlayistQueryClient = useQueryClient();
  const addPlaylistMutation = useMutation({
    mutationFn: addPlaylist,
    // Refresh the songs list
    onSuccess: () => {
      addPlayistQueryClient.invalidateQueries(["playlists"]);
    },
  });

  /**
   * Close te current open slide
   */
  const close = useSlideStore((state) => state.close);

  /**
   * Load audio from the selected file
   * To retrieve infos like duration
   */
  const loadAudio = (file: File, callback) => {
    const audio = new Audio();
    const fileReader = new FileReader();

    fileReader.onload = () => {
      audio.src = fileReader.result as string;
      // Load the audio metadata
      audio.onloadedmetadata = () => {
        callback(audio);
      };
    };

    fileReader.readAsDataURL(file);
  };

  /**
   * Handle song upload
   */
  const handleSongUpload = (file: File) => {
    loadAudio(file, (audio) => {
      // Upload the selected audio
      addSongMutation.mutate({
        name: file.name,
        duration: audio.duration,
        audio: file,
      });
    });
  };

  /**
   * Handle the cover file
   * uploaded from the input
   * or from the AI
   */
  const handleCoverChange = (file: File | null) => {
    if (!file) {
      return;
    }

    // Convert file as img URL
    // in order to show the thumbnail
    // next to the input
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewPlaylist((playlist) => ({
        ...playlist,
        cover: reader.result as string,
        coverFile: file,
      }));
    };
    reader.readAsDataURL(file);
  };

  /**
   * Find playlist song
   */
  const findPlaylistSong = (song: SongType) => {
    return newPlaylist.songs.findIndex((s) => s.id == song.id) >= 0;
  };

  /**
   * Add playlist song
   */
  const addPlaylistSong = (song: SongType) => {
    // Check if song
    // is already added to the playlist songs
    if (findPlaylistSong(song)) {
      return;
    }

    setNewPlaylist((playlist) => ({
      ...playlist,
      songs: [...playlist.songs, song],
    }));
  };

  /**
   * Remove playlist song
   */
  const removePlaylistSong = (song: SongType) => {
    setNewPlaylist((playlist) => ({
      ...playlist,
      songs: playlist.songs.filter((s) => s.id != song.id),
    }));
  };

  /**
   * Handle song drop
   * on the playlist songs list area
   */
  const handleSongDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const songData = e.dataTransfer.getData("new-playlist-song");

    if (!songData) {
      return;
    }

    addPlaylistSong(JSON.parse(songData) as SongType);
  };

  /**
   * Handle added song drop
   * on the playlist songs list area
   */
  const handleAddedSongDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const songData = e.dataTransfer.getData("added-new-playlist-song");

    if (!songData) {
      return;
    }

    removePlaylistSong(JSON.parse(songData) as SongType);
  };

  /**
   * Handle add new playlist
   */
  const handleAddNewPlaylist = () => {
    addPlaylistMutation.mutate(newPlaylist);
    setNewPlaylist({
      name: "",
      cover: "",
      coverFile: null,
      songs: [],
    });
    close();
  };

  return (
    <Slide name="new-playlist" title="Créer une Playlist">
      <form
        className="flex-1 flex flex-col overflow-hidden"
        style={{ width: "800px" }}
        onSubmit={(e) => {
          e.preventDefault();
          handleAddNewPlaylist();
        }}
      >
        <div className="w-full flex-1 flex flex-col overflow-hidden">
          {/* Name & Cover */}
          <div className="flex flex-row gap-4 p-4 shadow-md border border-gray-100 rounded">
            {/* Name */}
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-600">Nom de la playlist</span>
              <div className="flex flex-row gap-2">
                {/* Name */}
                <input
                  className="w-52 h-8 border border-gray-200 px-3 shadow-sm rounded"
                  placeholder="Ma super playlist"
                  onChange={(e) =>
                    setNewPlaylist((playlist) => ({
                      ...playlist,
                      name: e.target.value,
                    }))
                  }
                />

                {/* Color */}
                <ColorPicker
                  title="Couleur"
                  onChange={(color) =>
                    setNewPlaylist((playlist) => ({
                      ...playlist,
                      color: color,
                    }))
                  }
                />
              </div>
            </div>

            {/* Cover */}
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-600">Pochette</span>
              <div className="flex flex-row bg-white border border-cyan-500 rounded">
                {/* Input */}
                <CoverUpload onChange={handleCoverChange} />

                {/* AI */}
                <AICover playlist={newPlaylist} onLoaded={handleCoverChange} />
              </div>
            </div>

            {/* Thumbnail */}
            {newPlaylist.cover && (
              <div className="flex-1 flex justify-end">
                <div className="w-14 h-14 duration-100 ease-in-out hover:scale-150 rounded">
                  <img src={newPlaylist.cover} />
                </div>
              </div>
            )}
          </div>

          {/* Songs */}
          <div className="w-full flex-1 flex flex-row pt-4 overflow-hidden">
            <div className="flex-1 flex flex-col border-r border-gray-200 overflow-hidden">
              <SongsTab
                onChange={(tab) => {
                  setPlaylistSongsTab(tab);
                }}
              />

              {/* Tabs */}
              <div className="flex-1 flex flex-col p-2 overflow-hidden">
                <TabLayout
                  tab={playlistSongsTab}
                  tabs={[
                    /* Tab: My files */
                    {
                      id: "#my-files",
                      content: (
                        <div className="w-full h-full overflow-auto p-2">
                          <div className="flex-1 flex flex-col overflow-hidden">
                            {/* Input */}
                            <SongUpload onChange={handleSongUpload} />

                            {/* Search */}
                            <div className="w-full text-sm font-medium text-gray-400 h-8 flex flex-row rounded border border-gray-300">
                              <div className="w-9 h-full flex items-center justify-center border-r border-gray-300">
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
                              {/* Input */}
                              <input
                                className="w-40 h-full bg-transparent px-3 border-r border-gray-300"
                                placeholder="Rechercher dans ma"
                                value={filterSongKeyword}
                                onChange={(e) =>
                                  setFilterSongKeyword(e.target.value)
                                }
                              />
                              {/* All tags */}
                              <select
                                className="flex-1 h-full px-3 bg-transparent"
                                onChange={(e) =>
                                  setFilterSongTag(Number(e.target.value))
                                }
                              >
                                <option>Tous les tags</option>
                                {tags.map((tag) => (
                                  <option key={tag.id} value={tag.id}>
                                    {tag.name}
                                  </option>
                                ))}
                              </select>
                              {/* Setting */}
                              <a
                                className="w-9 h-full flex items-center justify-center bg-gray-200 cursor-pointer"
                                onClick={() => openModal("add-tag")}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="20px"
                                  viewBox="0 -960 960 960"
                                  width="20px"
                                  fill="#333"
                                >
                                  <path d="m420.69-116-21.23-107.85q-26.07-9.38-52.96-24.07-26.88-14.7-48.19-33.77L194.46-247l-59.3-103 81.61-71.77q-2.38-13.92-3.96-28.42-1.58-14.5-1.58-29.43 0-14.53 1.58-28.84t3.96-29.77L135.16-610l59.3-102.23 103.46 34.31q22.47-19.46 48.39-33.96t52.77-24.27L420.69-844h118.62l21.23 108.23q28 10.54 52.57 24.27 24.58 13.73 47.43 33.58l105-34.31L824.84-610l-83.15 72.92q3.15 14.69 4.35 28.62 1.19 13.92 1.19 28.46 0 14.15-1.39 28.08-1.38 13.92-3.76 29.77L824.46-350l-59.31 103-104.61-35.08q-22.85 19.85-47.81 33.96-24.96 14.12-52.19 23.89L539.31-116H420.69ZM462-168h35.62L517-268.15q37.62-7 69.46-25.23 31.85-18.24 57.39-48.39L740.23-309l18.39-30-76.77-67.38q6-18.54 9.3-36.47 3.31-17.92 3.31-37.15 0-19.62-3.31-37.15-3.3-17.54-9.3-35.7L759.38-621 741-651l-97.54 32.38q-22.08-27.46-56.61-47.42-34.54-19.96-70.23-25.81L498-792h-36.38l-18.24 99.77q-37.61 6.23-70.03 24.65-32.43 18.43-57.97 48.96L219-651l-18.38 30L277-553.62q-6 16.24-9.5 35.12t-3.5 38.88q0 19.62 3.5 38.12 3.5 18.5 9.12 35.12l-76 67.38L219-309l96-32q24.77 29.38 57.19 47.81 32.43 18.42 70.81 25.42L462-168Zm16.46-188q51.92 0 87.96-36.04 36.04-36.04 36.04-87.96 0-51.92-36.04-87.96Q530.38-604 478.46-604q-51.54 0-87.77 36.04T354.46-480q0 51.92 36.23 87.96Q426.92-356 478.46-356ZM480-480Z" />
                                </svg>
                              </a>
                            </div>

                            {/* Songs list */}
                            <div
                              className="flex-1 flex flex-col gap-1 pt-2"
                              onDrop={handleAddedSongDrop}
                              onDragOver={(e) => {
                                e.preventDefault();
                              }}
                              onDragLeave={() => {}}
                            >
                              {filteredSongs.map((song) => (
                                <Song
                                  key={song.id}
                                  song={song}
                                  added={false}
                                  isSelected={findPlaylistSong(song)}
                                  onChange={(e) =>
                                    e
                                      ? addPlaylistSong(song)
                                      : removePlaylistSong(song)
                                  }
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      ),
                    },
                    /* Tab: Library */
                    {
                      id: "#library",
                      content: (
                        <div className="w-full h-full overflow-auto p-2">
                          <div className="flex-1 flex flex-col overflow-hidden">
                            {/* Search */}
                            <div className="w-full text-sm font-medium text-gray-400 h-8 flex flex-row rounded border border-gray-300">
                              <div className="w-9 h-full flex items-center justify-center border-r border-gray-300">
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
                              {/* Input */}
                              <input
                                className="w-40 h-full bg-transparent px-3 border-r border-gray-300"
                                placeholder="Rechercher dans ma"
                                value={filterSongKeyword}
                                onChange={(e) =>
                                  setFilterSongKeyword(e.target.value)
                                }
                              />
                              {/* All tags */}
                              <select
                                className="flex-1 h-full px-3 bg-transparent"
                                onChange={(e) =>
                                  setFilterSongTag(Number(e.target.value))
                                }
                              >
                                <option>Tous les tags</option>
                                {tags.map((tag) => (
                                  <option key={tag.id} value={tag.id}>
                                    {tag.name}
                                  </option>
                                ))}
                              </select>
                              {/* Setting */}
                              <a
                                className="w-9 h-full flex items-center justify-center bg-gray-200 cursor-pointer"
                                onClick={() => openModal("add-tag")}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="20px"
                                  viewBox="0 -960 960 960"
                                  width="20px"
                                  fill="#333"
                                >
                                  <path d="m420.69-116-21.23-107.85q-26.07-9.38-52.96-24.07-26.88-14.7-48.19-33.77L194.46-247l-59.3-103 81.61-71.77q-2.38-13.92-3.96-28.42-1.58-14.5-1.58-29.43 0-14.53 1.58-28.84t3.96-29.77L135.16-610l59.3-102.23 103.46 34.31q22.47-19.46 48.39-33.96t52.77-24.27L420.69-844h118.62l21.23 108.23q28 10.54 52.57 24.27 24.58 13.73 47.43 33.58l105-34.31L824.84-610l-83.15 72.92q3.15 14.69 4.35 28.62 1.19 13.92 1.19 28.46 0 14.15-1.39 28.08-1.38 13.92-3.76 29.77L824.46-350l-59.31 103-104.61-35.08q-22.85 19.85-47.81 33.96-24.96 14.12-52.19 23.89L539.31-116H420.69ZM462-168h35.62L517-268.15q37.62-7 69.46-25.23 31.85-18.24 57.39-48.39L740.23-309l18.39-30-76.77-67.38q6-18.54 9.3-36.47 3.31-17.92 3.31-37.15 0-19.62-3.31-37.15-3.3-17.54-9.3-35.7L759.38-621 741-651l-97.54 32.38q-22.08-27.46-56.61-47.42-34.54-19.96-70.23-25.81L498-792h-36.38l-18.24 99.77q-37.61 6.23-70.03 24.65-32.43 18.43-57.97 48.96L219-651l-18.38 30L277-553.62q-6 16.24-9.5 35.12t-3.5 38.88q0 19.62 3.5 38.12 3.5 18.5 9.12 35.12l-76 67.38L219-309l96-32q24.77 29.38 57.19 47.81 32.43 18.42 70.81 25.42L462-168Zm16.46-188q51.92 0 87.96-36.04 36.04-36.04 36.04-87.96 0-51.92-36.04-87.96Q530.38-604 478.46-604q-51.54 0-87.77 36.04T354.46-480q0 51.92 36.23 87.96Q426.92-356 478.46-356ZM480-480Z" />
                                </svg>
                              </a>
                            </div>

                            {/* Songs list */}
                            <div
                              className="flex-1 flex flex-col gap-1 pt-2"
                              onDrop={handleAddedSongDrop}
                              onDragOver={(e) => {
                                e.preventDefault();
                              }}
                              onDragLeave={() => {}}
                            >
                              {filteredSongs.map((song) => (
                                <Song
                                  key={song.id}
                                  song={song}
                                  added={false}
                                  isSelected={findPlaylistSong(song)}
                                  onChange={(e) =>
                                    e
                                      ? addPlaylistSong(song)
                                      : removePlaylistSong(song)
                                  }
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col pl-2">
              {/* Header */}
              <div className="flex flex-row items-center">
                {/* Title */}
                <div className="flex-1 flex flex-col">
                  <span className="text-sm font-medium text-gray-500">
                    Playlist en cours d'édition
                  </span>
                  <span className="text-xs font-medium text-gray-400">
                    Durée totale :{" "}
                    {Math.floor(newPlaylistSongsTotalDuration / 60)}:
                    {newPlaylistSongsTotalDuration % 60}
                  </span>
                </div>

                {/* Info */}
                <div className="flex w-9 h-5 items-center justify-center border border-gray-600 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="16px"
                    fill="#333"
                  >
                    <path d="M481.56-255.39q16.13 0 27.44-11.32 11.31-11.33 11.31-27.47 0-16.13-11.33-27.44-11.33-11.3-27.46-11.3-16.13 0-27.44 11.33-11.31 11.33-11.31 27.46 0 16.13 11.33 27.44 11.33 11.3 27.46 11.3Zm-28.33-142.23h55.31q.77-33.53 7.65-47.69 6.89-14.15 27.27-34.3 35.39-34.39 47.92-57.24 12.54-22.84 12.54-49.27 0-50.65-33.61-84.19-33.62-33.53-86.31-33.53-44.08 0-78.88 23.73-34.81 23.73-49.81 63.96l50.38 21.61q11.31-29.92 31-43.31 19.69-13.38 44.54-13.38 31.46 0 50.42 17.92 18.97 17.93 18.97 46.23 0 23.39-15.12 40.81-15.11 17.42-34.11 35.19-30.39 28.54-39.27 50.2-8.89 21.65-8.89 63.26ZM480.07-116q-74.84 0-141.21-28.42t-116.18-78.21q-49.81-49.79-78.25-116.13Q116-405.1 116-479.93q0-75.84 28.42-141.71t78.21-115.68q49.79-49.81 116.13-78.25Q405.1-844 479.93-844q75.84 0 141.71 28.42t115.68 78.21q49.81 49.79 78.25 115.63Q844-555.9 844-480.07q0 74.84-28.42 141.21t-78.21 116.18q-49.79 49.81-115.63 78.25Q555.9-116 480.07-116Zm-.07-52q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z" />
                  </svg>
                </div>
              </div>

              {/* Added songs */}
              <div
                className="flex-1 flex flex-col gap-1 p-3 bg-gray-50 bg-opacity-10 border border-dashed border-gray-200 rounded overflow-auto"
                onDrop={handleSongDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDragLeave={() => {}}
              >
                {newPlaylist.songs.map((song) => (
                  <Song
                    key={song.id}
                    song={song}
                    added={true}
                    isSelected={true}
                    onChange={(e) => removePlaylistSong(song)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-2 border-t border-gray-100">
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
            Enregistrer la playlist
          </button>
        </div>
      </form>
    </Slide>
  );
};

export default NewPlaylistSlide;
