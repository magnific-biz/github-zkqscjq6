import { supabase } from "~/db.server";

export async function getEvents() {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("title")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events");
  }
}
