import { Form, redirect, useActionData } from "@remix-run/react";
import { supabase } from "~/db.server";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    // First try to sign in
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.toString(),
      password: password.toString(),
    });

    if (signInError) {
      // If sign in fails, try to sign up
      const { error: signUpError } = await supabase.auth.signUp({
        email: email.toString(),
        password: password.toString(),
      });

      if (signUpError) {
        return { error: signUpError.message };
      }

      // If sign up is successful, redirect to events
      return redirect("/events");
    }

    // If sign in is successful, redirect to events
    return redirect("/events");
  } catch (error) {
    return { error: error.message };
  }
};

export default function Login() {
  const actionData = useActionData();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold">Login / Signup</h1>
        {actionData?.error && (
          <div className="mb-4 rounded-md bg-red-100 p-2 text-red-600">
            {actionData.error}
          </div>
        )}
        <Form method="post" className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Continue
          </button>
        </Form>
      </div>
    </div>
  );
}
