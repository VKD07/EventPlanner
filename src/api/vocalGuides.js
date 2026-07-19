import { supabase } from "./supabase";

const STORAGE_NAME = "vocal-guides";

export const VOCAL_CATEGORIES = ["Soprano", "Alto", "Tenor", "Bass"];

export async function uploadVocalGuide({ songId, category, label, audioFile }) {
  const fileName = `${Date.now()}_${audioFile.name}`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_NAME)
    .upload(`uploads/${fileName}`, audioFile, {
      contentType: audioFile.type,
    });

  if (uploadError) {
    throw new Error(
      "Failed to upload vocal guide to Supabase Storage: " + uploadError.message
    );
  }

  const { error: dbError } = await supabase.from("vocal_guides").insert({
    song_id: songId,
    category,
    label: label || null,
    audioUrl: `uploads/${fileName}`,
  });

  if (dbError) {
    throw new Error(
      "Failed to add vocal guide record to Supabase DB: " + dbError.message
    );
  }
}

export async function getVocalGuidesBySongID(songId) {
  const { data, error } = await supabase
    .from("vocal_guides")
    .select("*")
    .eq("song_id", songId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error("Failed to fetch vocal guides from Supabase: " + error.message);
  }
  return data;
}

export async function getVocalGuideAudioUrl(audioPath) {
  const { data, error } = await supabase.storage
    .from(STORAGE_NAME)
    .getPublicUrl(audioPath);
  if (error) {
    throw new Error(
      "Failed to get vocal guide audio URL from Supabase Storage: " + error.message
    );
  }
  return data.publicUrl;
}

export async function deleteVocalGuide(id) {
  const { error } = await supabase.from("vocal_guides").delete().eq("id", id);
  if (error) {
    throw new Error("Failed to delete vocal guide from Supabase: " + error.message);
  }
}
