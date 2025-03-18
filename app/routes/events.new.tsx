import { Form, useActionData } from "@remix-run/react";
import { ActionFunction, json } from "@remix-run/node";
import { supabase } from "~/db.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const event = {
    title: formData.get("title"),
    description: formData.get("description"),
    start_time: formData.get("startTime"),
    end_time: formData.get("endTime"),
    location: formData.get("location"),
    url: formData.get("url"),
    user_id: "current-user-id" // Replace with actual user ID from session
  };

  const { data, error } = await supabase
    .from('events')
    .insert([event]);

  if (error) return json({ error: error.message }, { status: 500 });
  return json({ success: true });
};

export default function NewEventPage() {
  const actionData = useActionData();
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Event</h1>
      <Form method="post" className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-2">Title</label>
          <input 
            type="text" 
            name="title"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {/* Add other form fields similarly */}
        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Event
        </button>
        {actionData?.success && (
          <p className="text-green-500">Event added successfully!</p>
        )}
        {actionData?.error && (
          <p className="text-red-500">{actionData.error}</p>
        )}
      </Form>
    </div>
  );
}
