import DashboardPlaylist from "@/types/dashboard-playlist";
import Playlist from "@/types/playlist";
import { create } from "zustand";

interface DashboardPlaylistStore {
  dashboardPlaylists: DashboardPlaylist[];
  setDashboardPlaylists: (playlists: Playlist[]) => void;
  toggleDashboardPlaylistSelected: (playlist: Playlist) => void;
  setDashboardPlaylistRepartition: (
    playlist: Playlist,
    repartition: DashboardPlaylist["repartition"]
  ) => void;
}

const dashboardPlaylistStore = create<DashboardPlaylistStore>((set) => ({
  /**
   * Dashboard playlists list
   */
  dashboardPlaylists: [],

  /**
   * Update dashboard playlists list
   * @param playlists
   */
  setDashboardPlaylists: (playlists) => {
    set({
      // Convert playlists to dashboard playlists
      dashboardPlaylists: playlists.map((playlist) => ({
        playlist,
        selected: false,
        repartition: 0,
      })),
    });
  },

  /**
   * Toggle dashboard playlist selected
   * @param playlist
   */
  toggleDashboardPlaylistSelected: (playlist: Playlist) => {
    set((state) => {
      const selectedPashboardPlaylists = state.dashboardPlaylists.filter(
        (dashboardPlaylist) => dashboardPlaylist.selected
      );

      const totalRepartition = selectedPashboardPlaylists.reduce(
        (carry, dashboardPlaylist) =>
          carry +
          (dashboardPlaylist.selected ? dashboardPlaylist.repartition : 0),
        0
      );

      return {
        dashboardPlaylists: state.dashboardPlaylists.map((dashboardPlaylist) =>
          dashboardPlaylist.playlist.id === playlist.id
            ? {
                ...dashboardPlaylist,
                selected: !dashboardPlaylist.selected,
                repartition: Math.max(0, 100 - totalRepartition),
              }
            : dashboardPlaylist
        ),
      };
    });
  },

  /**
   * Update dashboard playlist repartition
   * @param playlist
   * @param repartition
   */
  setDashboardPlaylistRepartition: (
    playlist: Playlist,
    repartition: DashboardPlaylist["repartition"]
  ) => {
    set((state) => {
      const selectedPashboardPlaylists = state.dashboardPlaylists.filter(
        (dashboardPlaylist) => dashboardPlaylist.selected
      );
      const totalRepartition = selectedPashboardPlaylists.reduce(
        (carry, dashboardPlaylist) =>
          carry +
          (dashboardPlaylist.selected
            ? dashboardPlaylist.playlist.id === playlist.id
              ? repartition
              : dashboardPlaylist.repartition
            : 0),
        0
      );
      const totalOtherRepartition = totalRepartition - repartition;
      return {
        dashboardPlaylists: state.dashboardPlaylists.map((dashboardPlaylist) =>
          dashboardPlaylist.playlist.id === playlist.id
            ? { ...dashboardPlaylist, repartition }
            : dashboardPlaylist.selected
            ? {
                ...dashboardPlaylist,
                repartition:
                  dashboardPlaylist.repartition *
                  (totalOtherRepartition == 0
                    ? 0
                    : 1 + (100 - totalRepartition) / totalOtherRepartition),
              }
            : dashboardPlaylist
        ),
      };
    });
  },
}));

export default dashboardPlaylistStore;
