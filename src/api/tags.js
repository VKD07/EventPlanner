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

export async function addTagsToSongByTitleAndAuthor(title, author, tagIDs) {
  
  const { error } = await supabase.rpc("add_tags_to_song", {
    song_title: title,
    song_author: author,
    tag_ids: tagIDs,
  });

  if (error) {
    throw new Error("Failed to add tags to song in Supabase: " + error.message);
  }
}