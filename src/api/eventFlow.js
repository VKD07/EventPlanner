const API_URL = "http://localhost:3000/eventFlow";

import { supabase } from "./supabase";

export async function getEventFlowByEventID(id) {

  const { data, error } = await supabase.rpc("get_event_flow_by_eventid", {
    event_id: id,
  });

  if (error) {
    throw new Error("Failed to fetch event flow from Supabase: " + error.message);
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
