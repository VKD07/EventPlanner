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
  const {data, error} = await supabase.from("members").select("*");
  
  if(error){
    throw new Error("Failed to fetch members from Supabase: " + error.message);
  }
  return data;
}

export async function getAllMembersWithSkillsAndRoles(){

  const {data, error} = await supabase.rpc("get_all_members_with_skills_and_roles");

  if(error){
    throw new Error("Failed to fetch members with skills and roles from Supabase: " + error.message);
  }

  return data;
}

export async function createMember({ name, email, number }) {
  const { data, error } = await supabase
    .from("members")
    .insert({ name, email: email || null, number: number || null })
    .select("id, name, email, number")
    .single();

  if (error) {
    throw new Error("Failed to create member in Supabase: " + error.message);
  }
  return data;
}

export async function updateMember({ id, name, email, number }) {
  const { data, error } = await supabase
    .from("members")
    .update({ name, email: email || null, number: number || null })
    .eq("id", id)
    .select("id, name, email, number")
    .single();

  if (error) {
    throw new Error("Failed to update member in Supabase: " + error.message);
  }
  return data;
}

export async function deleteMember(id) {
  const { error } = await supabase.from("members").delete().eq("id", id);

  if (error) {
    throw new Error("Failed to delete member in Supabase: " + error.message);
  }
}

export async function addSkillToMember(memberId, skillId) {
  const { error } = await supabase
    .from("member_skills")
    .insert({ member_id: memberId, skill_id: skillId });

  if (error) {
    throw new Error("Failed to add skill to member in Supabase: " + error.message);
  }
}

export async function removeSkillFromMember(memberId, skillId) {
  const { error } = await supabase
    .from("member_skills")
    .delete()
    .eq("member_id", memberId)
    .eq("skill_id", skillId);

  if (error) {
    throw new Error("Failed to remove skill from member in Supabase: " + error.message);
  }
}

export async function addRoleToMember(memberId, roleId) {
  const { error } = await supabase
    .from("member_roles")
    .insert({ member_id: memberId, role_id: roleId });

  if (error) {
    throw new Error("Failed to add role to member in Supabase: " + error.message);
  }
}

export async function removeRoleFromMember(memberId, roleId) {
  const { error } = await supabase
    .from("member_roles")
    .delete()
    .eq("member_id", memberId)
    .eq("role_id", roleId);

  if (error) {
    throw new Error("Failed to remove role from member in Supabase: " + error.message);
  }
}