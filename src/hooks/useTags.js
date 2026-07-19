import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getAllTags, getTagBySongID, addTagToSong, removeTagFromSong } from "../api/tags";

export function useGetAllTags() {
  return useQuery({
    queryKey: ["all-tags"],
    queryFn: () => getAllTags(),
    staleTime: 1000 * 60 * 10,
  });
}

export function useTagBySongID(songID) {
  return useQuery({
    queryKey: ["tags-by-song", songID],
    queryFn: () => getTagBySongID(songID),
    enabled: !!songID,
    staleTime: 1000 * 60 * 10,
  });
}

export function useUpdateSongTags() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ songId, addTagIds = [], removeTagIds = [] }) => {
      await Promise.all([
        ...addTagIds.map((tagId) => addTagToSong(songId, tagId)),
        ...removeTagIds.map((tagId) => removeTagFromSong(songId, tagId)),
      ]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tags-by-song"]);
    },
  });
}