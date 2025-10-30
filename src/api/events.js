const API_URL = "http://localhost:3000/events";
import { supabase } from "./supabase";


export async function getEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('eventDate', { ascending: true });

  if (error) {
    throw new Error("Failed to fetch events from Supabase: " + error.message);
  }

  return data;
}

export async function addEvent(newEvent) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: newEvent.title,
      day: newEvent.day,
      month: newEvent.month,
      year: newEvent.year,
      location: newEvent.location,
      description: newEvent.description,
    }),
  });

  if (!res.ok) throw new Error("Failed to add event");
  return res.json();
}
