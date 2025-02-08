import { useQuery } from "@tanstack/react-query";
import useDashboardPlaylistStore from "../store/dasboardPlaylistStore";
import Playlist from "@/types/playlist";
import { useEffect } from "react";

const fetchPlaylists = async (): Promise<Playlist[]> => {
  const res = await fetch("/api/playlists");
  if (!res.ok) throw new Error("Failed to fetch playlists");
  return res.json();
};

export default function useFetchPlaylists() {
  const setDashboardPlaylists = useDashboardPlaylistStore(
    (state) => state.setDashboardPlaylists
  );

  const { data, isLoading, error } = useQuery<Playlist[], Error>({
    queryKey: ["playlists"],
    queryFn: fetchPlaylists,
  });

  useEffect(() => {
    if (data) {
      setDashboardPlaylists(data);
    }
  }, [data, setDashboardPlaylists]);

  return { data, isLoading, error };
}
