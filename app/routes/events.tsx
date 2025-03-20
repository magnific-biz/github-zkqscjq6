import { Link } from "@remix-run/react";
import { getEvents } from "~/services/events.server";

export const loader = async () => {
  const events = await getEvents();
  return events;
};

export default function Events() {
  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between p-4">
        <Link to="/events/new" className="text-blue-600 hover:underline">
          Share New Event
        </Link>
      </header>
      <main className="flex-1 p-4">
        <h1 className="mb-4 text-2xl font-bold">All Events</h1>
        <ul className="space-y-2">
          {events.map((event, index) => (
            <li key={index} className="rounded-lg bg-gray-100 p-3">
              {event.title}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
