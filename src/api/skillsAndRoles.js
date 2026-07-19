import { supabase } from "./supabase";
import { randomUUID } from "../utils/uuid";

export async function getSkillsAndRoles() {
  try {
    const [skillsRes, rolesRes] = await Promise.all([
      supabase.from("skills").select("id, name"),
      supabase.from("roles").select("id, name"),
    ]);

    if (skillsRes.error) throw skillsRes.error;
    if (rolesRes.error) throw rolesRes.error;

    const memberFilters = [
      { id: randomUUID(), name: "Skills", elements: skillsRes.data },
      { id: randomUUID(), name: "Role", elements: rolesRes.data },
    ];

    return { data: memberFilters, error: null };
  } catch (error) {
    console.error("Error fetching skills and roles:", error.message);
    return { data: null, error };
  }
}

export async function createSkill(name) {
  const { data, error } = await supabase
    .from("skills")
    .insert({ name })
    .select("id, name")
    .single();

  if (error) {
    throw new Error("Failed to create skill in Supabase: " + error.message);
  }
  return data;
}

export async function createRole(name) {
  const { data, error } = await supabase
    .from("roles")
    .insert({ name })
    .select("id, name")
    .single();

  if (error) {
    throw new Error("Failed to create role in Supabase: " + error.message);
  }
  return data;
}
