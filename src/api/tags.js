import { supabase } from "./supabase";


export async function getTagBySongID(songID) {
    const { data, error } = await supabase.rpc("get_tags_by_song", { song_uuid: songID });
    if (error) {
        throw new Error("Failed to fetch tags for song from Supabase: " + error.message);
    }
    return data;
}

export async function getAllTags(){
    const {data, error} = await supabase.from("tags").select("*");
    if(error){
        throw new Error("Failed to fetch tags from Supabase: " + error.message);
    }

    return data;
}

export async function addTagToSong(songId, tagId) {
  const { error } = await supabase
    .from("song_tags")
    .insert({ song_id: songId, tag_id: tagId });

  if (error) {
    throw new Error("Failed to add tag to song in Supabase: " + error.message);
  }
}

export async function removeTagFromSong(songId, tagId) {
  const { error } = await supabase
    .from("song_tags")
    .delete()
    .eq("song_id", songId)
    .eq("tag_id", tagId);

  if (error) {
    throw new Error("Failed to remove tag from song in Supabase: " + error.message);
  }
}