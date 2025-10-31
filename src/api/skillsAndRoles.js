import { supabase } from "./supabase";

export async function getSkillsAndRoles() {
  try {
    const [skillsRes, rolesRes] = await Promise.all([
      supabase.from("skills").select("id, name"),
      supabase.from("roles").select("id, name"),
    ]);

    if (skillsRes.error) throw skillsRes.error;
    if (rolesRes.error) throw rolesRes.error;

    const memberFilters = [
      { id: crypto.randomUUID(), name: "Skills", elements: skillsRes.data },
      { id: crypto.randomUUID(), name: "Role", elements: rolesRes.data },
    ];

    return { data: memberFilters, error: null };
  } catch (error) {
    console.error("Error fetching skills and roles:", error.message);
    return { data: null, error };
  }
}
