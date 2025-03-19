import { Form, redirect } from "@remix-run/react";
import { supabase } from "~/db.server";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");

  const { data, error } = await supabase
    .from("events")
    .insert([{ title }])
    .select();

  if (error) {
    throw new Response(error.message, { status: 500 });
  }

  return redirect("/events");
};

export default function NewEvent() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold">Share New Event</h1>
        <Form method="post" className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Share Event
          </button>
        </Form>
      </div>
    </div>
  );
}
