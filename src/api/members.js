import { sup } from "framer-motion/client";

const API_URL = "http://localhost:3000/members";

import { supabase } from "./supabase";

export async function getMembersById(id) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to get a member by ID.");
  }
  return res.json();
}

export async function getAllMembers(){
  const res = await fetch(API_URL);
  if(!res.ok){
    throw new Error("Failed to get all members")
  }
  return res.json();
}

export async function getAllMembersWithSkillsAndRoles(){

  const {data, error} = await supabase.rpc("get_all_members_with_skills_and_roles");
  
  if(error){
    throw new Error("Failed to fetch members with skills and roles from Supabase: " + error.message);
  }

  return data;
}