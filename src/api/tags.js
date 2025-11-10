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

export async function addTagsToSong(songID, tagIDs) {
    
  const rows = tagIDs.map((tagID) => ({
    song_id: songID,
    tags_id: tagID,
  }));

  const { error } = await supabase.from("song_tags").insert(rows);

  if (error) {
    throw new Error("Failed to add tags to song in Supabase: " + error.message);
  }
}