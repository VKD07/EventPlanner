const API_URL = "http://localhost:3000/events";
import e from "cors";
import { supabase } from "./supabase";

const TABLE_NAME = "events";

export async function getEvents() {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .order("eventDate", { ascending: true });

  if (error) {
    throw new Error("Failed to fetch events from Supabase: " + error.message);
  }

  return data;
}

export async function addEvent(title, eventDate, location, description) {
  const { error } = await supabase
    .from(TABLE_NAME)
    .insert({ title, eventDate: eventDate, location, description });

  if (error) {
    throw new Error("Failed to add events to Supabase: " + error.message);
  }
}
