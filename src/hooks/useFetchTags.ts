import { useQuery } from "@tanstack/react-query";
import useTagStore from "../store/tagStore";
import Tag from "@/types/tag";
import { useEffect } from "react";

const fetchTags = async (): Promise<Tag[]> => {
  const res = await fetch("/api/tags");
  if (!res.ok) throw new Error("Failed to fetch tags");
  return res.json();
};

export default function useFetchTags() {
  const setTags = useTagStore((state) => state.setTags);

  const { data, isLoading, error } = useQuery<Tag[], Error>({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  useEffect(() => {
    if (data) {
      setTags(data);
    }
  }, [data, setTags]);

  return { data, isLoading, error };
}
