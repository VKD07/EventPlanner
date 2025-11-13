import { supabase } from "./supabase";

export async function signInWithPassword(email, password) {
  if (!email || !password) {
    console.error("Email or password missing!");
    return { error: { message: "Missing email or password" } };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Supabase sign-in error:", error.message);
    return { error };
  }

  return { data };
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
    if (error) {
        throw new Error("Failed to get current user from Supabase: " + error.message);
    }
    return data.user;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
    if (error) {
        throw new Error("Failed to sign out from Supabase: " + error.message);
    }
}
