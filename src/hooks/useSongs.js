import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { uploadSong, getSongs, getSongAudioUrl, getSongIdByTitleAndAuthor } from "../api/songs";

export function useAddSong() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ title, author, lyrics, audioFile }) =>
      uploadSong(title, author, lyrics, audioFile),
    onSuccess: () => {
      queryClient.invalidateQueries(["songs"]);
    },
  });
}

export function useGetSongs() {
  return useQuery({
    queryKey: ["songs"],
    queryFn: () => getSongs(),
    staleTime: 1000 * 60 * 5,
  });
}


export function useSongAudioUrl(audioPath) {
  return useQuery({
    queryKey: ["song-audio-url", audioPath],
    queryFn: () => getSongAudioUrl(audioPath),
    staleTime: 1000 * 60 * 60,
  });
}

export function useGetSongIdByTitleAndAuthor(){
return useQuery({
    queryKey: ["song-by-title"],
    queryFn: (title, author) => getSongIdByTitleAndAuthor(title, author),
    staleTime: 1000 * 60 * 5,
  });
}