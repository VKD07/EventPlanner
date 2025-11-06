import { supabase } from "./supabase";

const STORAGE_NAME = "songs";

export async function uploadSong(title, author, lyrics, audioFile) {

  const fileName = `${Date.now()}_${audioFile.name}`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_NAME)
    .upload(`uploads/${fileName}`, audioFile, {
      contentType: audioFile.type,
    });

  if (uploadError) {
    throw new Error("Failed to upload song to Supabase Storage: " + uploadError.message);
  }

  console.log("✅ Song uploaded successfully with filename:", fileName);

  const { error: dbError } = await supabase
    .from("songs")
    .insert({
      author,
      title,
      lyrics,
      audioUrl: `uploads/${fileName}`,
    });

  if (dbError) {
    throw new Error("Failed to add song record to Supabase DB: " + dbError.message);
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
        throw new Error("Failed to get song audio URL from Supabase Storage: " + error.message);
    }
    return data.publicUrl;
}

