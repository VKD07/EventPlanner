import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { uploadSong, updateSong, getSongs, getSongAudioUrl, getSongIdByTitleAndAuthor, getSongsAndMaterialID, getSongByID } from "../api/songs";

export function useAddSong() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (songDetails) => uploadSong(songDetails),
    onSuccess: () => {
      queryClient.invalidateQueries(["songs"]);
      queryClient.invalidateQueries(["songs-with-material-id"]);
    },
  });
}

export function useUpdateSong() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (songDetails) => updateSong(songDetails),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["songs"]);
      queryClient.invalidateQueries(["songs-with-material-id"]);
      queryClient.invalidateQueries(["song-by-id", variables.id]);
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

export function useGetSongsAndMaterialID() {
  return useQuery({
    queryKey: ["songs-with-material-id"],
    queryFn: () => getSongsAndMaterialID(),
    staleTime: 1000 * 60 * 5,
  });
}


export function useSongAudioUrl(audioPath) {
  return useQuery({
    queryKey: ["song-audio-url", audioPath],
    queryFn: () => getSongAudioUrl(audioPath),
    enabled: !!audioPath,
    staleTime: 1000 * 60 * 60,
  });
}

export function useGetSongByTitleAndAuthor(){
return useQuery({
    queryKey: ["song-by-title"],
    queryFn: (title, author) => getSongIdByTitleAndAuthor(title, author),
    staleTime: 1000 * 60 * 5,
  });
}


export function useGetSongByID(id){
  return useQuery({
    queryKey: ["song-by-id", id],
    queryFn: () => getSongByID(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}