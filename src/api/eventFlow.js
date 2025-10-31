const API_URL = "http://localhost:3000/eventFlow";

import { supabase } from "./supabase";

const TABLE_NAME = "event_flow";

export async function getEventFlowByEventID(id) {
  const { data, error } = await supabase.rpc("get_event_flow_by_event_id", {
    event_id: id,
  });

  if (error) {
    throw new Error(
      "Failed to fetch event flow from Supabase: " + error.message
    );
  }

  // const res = await fetch(API_URL, {
  //     method: 'POST',
  //     headers: {"Content-Type": "application/json" },
  //     body: JSON.stringify({
  //         id: id
  //     })
  // })

  // if(!res.ok){
  //     throw new Error("Failed to search for eventFlow");
  // }
  // return res.json();
  return data;
}

export async function updateEventFlowByID(agendaID, time, segment, leaderID) {
  const { error } = await supabase
    .from(TABLE_NAME)
    .update({
      time: time,
      segment: segment,
      leaderID: leaderID,
    })
    .eq("id", agendaID);

  if (error) {
    throw new Error(
      "Failed to update event flow in Supabase: " + error.message
    );
  }
}

export async function addAgendaItem(eventID, time, segment, leaderID) {
  const { error } = await supabase
    .from(TABLE_NAME)
    .insert({ time, segment, leaderID, eventID })
    .eq("eventID", eventID);
  if (error) {
    throw new Error("Failed to add agenda item to Supabase: " + error.message);
  }
}

export async function deleteAgendaItem(agendaID) {
  const { error } = await supabase.from(TABLE_NAME).delete().eq("id", agendaID);

  if (error) {
    throw new Error(
      "Failed to delete agenda item from Supabase: " + error.message
    );
  }
}
