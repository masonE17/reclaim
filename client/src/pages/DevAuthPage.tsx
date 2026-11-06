import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function DevAuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function signIn() {
    setMessage("Signing in...");

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    setMessage(
      error
        ? error.message
        : `Signed in as ${data.user.email}`
    );
    setPassword("");
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    setMessage(
      error ? error.message : "Signed out successfully."
    );
  }

  return (
    <main className="mx-auto max-w-md space-y-4 p-8">
      <h1 className="text-2xl font-bold">
        ReClaim Authentication Test
      </h1>

      <p>Development testing only.</p>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded border p-3"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded border p-3"
      />

      <button
        onClick={() => void signIn()}
        className="rounded bg-green-700 p-3 text-white"
      >
        Sign In
      </button>

      <button
        onClick={() => void signOut()}
        className="ml-3 rounded border p-3"
      >
        Sign Out
      </button>

      <p role="status">{message}</p>
    </main>
  );
}