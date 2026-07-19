import { supabase } from "./supabase";

const STORAGE_NAME = "songs";

export async function uploadSong({ title, author, lyrics, chords, originalKey, videoUrl, audioFile }) {
  let audioUrl = null;

  if (audioFile) {
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
    audioUrl = `uploads/${fileName}`;
  }

  const { error: dbError } = await supabase.from("songs").insert({
    author,
    title,
    lyrics,
    chords: chords || null,
    originalKey: originalKey || null,
    videoUrl: videoUrl || null,
    audioUrl,
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

  return { songId: songID.id };
}

export async function updateSong({ id, title, author, lyrics, chords, originalKey, videoUrl, audioFile }) {
  const update = {
    title,
    author,
    lyrics,
    chords: chords || null,
    originalKey: originalKey || null,
    videoUrl: videoUrl || null,
  };

  if (audioFile) {
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

    update.audioUrl = `uploads/${fileName}`;
  }

  const { error } = await supabase.from("songs").update(update).eq("id", id);

  if (error) {
    throw new Error("Failed to update song in Supabase: " + error.message);
  }

  const { error: materialError } = await supabase
    .from("agenda_materials")
    .update({ material_name: title })
    .eq("material_type", "song")
    .eq("material_id", id);

  if (materialError) {
    throw new Error(
      "Failed to update song's agenda material name in Supabase: " + materialError.message
    );
  }

  return { songId: id };
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

export async function getSongByID(id) {
  const {data,error } = await supabase.from("songs").select("*").eq("id", id).single();

  if (error) {
    throw new Error("Failed to fetch song by ID from Supabase: " + error.message);
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
