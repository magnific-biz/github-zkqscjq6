import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Event Sharing App" },
    { name: "description", content: "Share and discover events" },
  ];
};

export default function Index() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between p-4">
        <Link to="/login" className="text-blue-600 hover:underline">
          Login/Signup
        </Link>
      </header>
      <main className="flex-1 p-4">
        <h1 className="mb-4 text-2xl font-bold">Shared Events</h1>
        {loading ? (
          <p>Loading events...</p>
        ) : events.length > 0 ? (
          <ul className="space-y-2">
            {events.map((event, index) => (
              <li key={index} className="rounded-lg bg-gray-100 p-3">
                {event.title}
              </li>
            ))}
          </ul>
        ) : (
          <p>No events found.</p>
        )}
      </main>
    </div>
  );
}
