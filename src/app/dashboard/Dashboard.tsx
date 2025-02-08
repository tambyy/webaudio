"use client";

import Header from "./Header";
import Playlists from "./Playlists";
import Chart from "./Chart";
import NewPlaylistSlide from "./NewPlaylistSlide";
import useFetchPlaylists from "@/hooks/useFetchPlaylists";
import useDashboardPlaylistStore from "@/store/dasboardPlaylistStore";
import useFetchTags from "@/hooks/useFetchTags";
import NewTagModal from "./NewTagModal";
import { useState } from "react";
import EditSongModal from "./EditSongModal";

export default function Dashboard() {
  const [filterKeyword, setFilterKeyword] = useState("");

  const {} = useFetchPlaylists();
  const {} = useFetchTags();
  const playlists = useDashboardPlaylistStore(
    (state) => state.dashboardPlaylists
  );

  return (
    <>
      <div className="w-full min-h-full h-auto bg-gray-50 pt-12 pl-7 pr-7 flex flex-row gap-5">
        <div className="flex-1 h-full flex flex-col">
          {/* Header */}
          <Header
            onFilterChanged={(filter: string) => setFilterKeyword(filter)}
          />

          {/* Playlists */}
          <Playlists
            playlists={playlists.filter((playlist) =>
              playlist.playlist.name
                .toLowerCase()
                .includes(filterKeyword.toLowerCase())
            )}
          />
        </div>

        {/* Chart */}
        <Chart playlists={playlists.filter((playlist) => playlist.selected)} />
      </div>

      <NewPlaylistSlide />
      <NewTagModal />
      <EditSongModal />
    </>
  );
}
