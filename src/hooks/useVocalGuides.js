import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  uploadVocalGuide,
  getVocalGuidesBySongID,
  getVocalGuideAudioUrl,
  deleteVocalGuide,
} from "../api/vocalGuides";

export function useGetVocalGuidesBySongID(songId) {
  return useQuery({
    queryKey: ["vocal-guides", songId],
    queryFn: () => getVocalGuidesBySongID(songId),
    enabled: !!songId,
    staleTime: 1000 * 60 * 5,
  });
}

export function useAddVocalGuide() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (guideDetails) => uploadVocalGuide(guideDetails),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["vocal-guides", variables.songId]);
    },
  });
}

export function useVocalGuideAudioUrl(audioPath) {
  return useQuery({
    queryKey: ["vocal-guide-audio-url", audioPath],
    queryFn: () => getVocalGuideAudioUrl(audioPath),
    enabled: !!audioPath,
    staleTime: 1000 * 60 * 60,
  });
}

export function useDeleteVocalGuide() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteVocalGuide(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["vocal-guides"]);
    },
  });
}
