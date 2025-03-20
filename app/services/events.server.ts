import { supabase } from "~/db.server";

export async function getEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("title")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
