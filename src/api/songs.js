import { sup } from "framer-motion/client";
import { supabase } from "./supabase";
import { get } from "react-hook-form";

const STORAGE_NAME = "songs";

export async function uploadSong(title, author, lyrics, audioFile) {
  const fileName = `${Date.now()}_${audioFile.name}`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_NAME)
    .upload(`uploads/${fileName}`, audioFile, {
      contentType: audioFile.type,
    });


  if (uploadError) {
    throw new Error(
      "Failed to upload song to Supabase Storage: " + uploadError.message
    );
  }

  console.log("✅ Song uploaded successfully with filename:", fileName);

  const { error: dbError } = await supabase.from("songs").insert({
    author,
    title,
    lyrics,
    audioUrl: `uploads/${fileName}`,
  });

  if (dbError) {
    throw new Error(
      "Failed to add song record to Supabase DB: " + dbError.message
    );
  }

  const songID =  await getSongIdByTitleAndAuthor(title, author);

  const {error} = await supabase.from("agenda_materials").insert({material_type: "song", material_id: songID.id, material_name: title});

  if(error){
    throw new Error("Failed to add song to agenda materials: " + error.message);
  }

  return { fileName };
}

export async function getSongs() {
  const { data, error } = await supabase.from("songs").select("*");
  if (error) {
    throw new Error("Failed to fetch songs from Supabase: " + error.message);
  }
  return data;
}

export async function getSongAudioUrl(audioPath) {
  const { data, error } = await supabase.storage
    .from(STORAGE_NAME)
    .getPublicUrl(audioPath);
  if (error) {
    throw new Error(
      "Failed to get song audio URL from Supabase Storage: " + error.message
    );
  }
  return data.publicUrl;
}

export async function getSongsAndMaterialID(){
  const { data, error } = await supabase.rpc("get_songs_with_material_id");

  if (error) {
    throw new Error("Failed to fetch songs and material IDs from Supabase: " + error.message);
  }

  return data;
}

export async function getSongIdByTitleAndAuthor(title, author) {
  const { data, error } = await supabase
    .from("songs")
    .select("id")
    .eq("title", title)
    .eq("author", author)
    .single();

  if (error) {
    throw new Error(
      "Failed to fetch song by title and author from Supabase: " + error.message
    );
  }
  return data;
}
