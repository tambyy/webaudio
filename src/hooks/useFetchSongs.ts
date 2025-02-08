import { useQuery } from "@tanstack/react-query";
import useSongStore from "../store/songStore";
import Song from "@/types/song";
import { useEffect } from "react";

const fetchSongs = async (): Promise<Song[]> => {
  const res = await fetch("/api/songs");
  if (!res.ok) throw new Error("Failed to fetch songs");
  return res.json();
};

export default function useFetchSongs() {
  const setSongs = useSongStore((state) => state.setSongs);

  const { data, isLoading, error } = useQuery<Song[], Error>({
    queryKey: ["songs"],
    queryFn: fetchSongs,
  });

  useEffect(() => {
    if (data) {
      setSongs(data);
    }
  }, [data, setSongs]);

  return { data, isLoading, error };
}
