import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getAllTags, getTagBySongID } from "../api/tags";

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
    staleTime: 1000 * 60 * 10,
  });
}

export function useAddTagsToSong() {
  const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ songID, tagIDs }) => getTagBySongID(songID, tagIDs),
        onSuccess: () => {
            queryClient.invalidateQueries(["tags-by-song"]);
        },
    });
}