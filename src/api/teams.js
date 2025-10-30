const API_URL = "http://localhost:3000/teams";

import { supabase } from "./supabase";

export async function getTeams() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch skills");
  }
  return res.json();
}


export async function getTeamsAndMembers() {
  const res = await fetch(`${API_URL}/with-members`);
  if (!res.ok) {
    throw new Error("Failed to fetch teams with members");
  }
  return res.json();
}

export async function getTeamsAndMembersByEventID(id) {

  const { data, error } = await supabase.rpc("get_teams_by_event_id", {
    event_id: id,
  });

  if(error){
    throw new Error("Failed to fetch teams and members from Supabase: " + error.message);
  }
  // const res = await fetch(`${API_URL}/by-event`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     id: id,
  //   }),
  // });

  // if (!res.ok) {
  //   throw new Error("Failed to get a member by ID.");
  // }
  return data;
}

export async function addMemberIntoTeam(teamId, memberId) {
  const res = await fetch(`${API_URL}/add-member`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },  
    body: JSON.stringify({
      teamId: teamId,
      memberId: memberId,
    }),
  });  
}

export async function removeMemberFromTeam(teamId, memberId) {
  const res = await fetch(`${API_URL}/remove-member`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },  
    body: JSON.stringify({
      teamId: teamId,
      memberId: memberId,
    }),
  });  
}

export async function updateTeamName(teamId, teamName) {
  const res = await fetch(`${API_URL}/update-team-name`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },  
    body: JSON.stringify({
      teamId: teamId,
      teamName: teamName,
    }),
  });  
}