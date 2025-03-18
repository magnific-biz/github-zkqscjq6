import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { supabase } from "~/db.server";

export async function loader() {
  const { data: events, error } = await supabase
    .from('events')
    .select('*');

  if (error) throw error;
  return json({ events });
}

export default function EventsPage() {
  const { events } = useLoaderData<typeof loader>();
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map(event => (
          <div key={event.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-gray-600">{event.description}</p>
            <p className="text-sm mt-2">{event.start_time}</p>
            <a href={event.url} className="text-blue-500 hover:underline">
              View Event
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
