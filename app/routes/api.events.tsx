import { json } from "@remix-run/node";
import { getEvents } from "~/services/events.server";

export async function loader() {
  try {
    const events = await getEvents();
    return json(events);
  } catch (error) {
    console.error("Loader error:", error);
    return json({ error: "Failed to load events" }, { status: 500 });
  }
}

export async function action() {
  return json({ message: "Method not allowed" }, { status: 405 });
}
