import { json } from "@remix-run/node";
import { getEvents } from "~/services/events.server";

export async function loader() {
  const events = await getEvents();
  return json(events);
}
