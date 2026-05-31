"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function CompanySignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    setErrorMessage("");
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    const newUser = data.user;
    if (!newUser) {
      setErrorMessage("Something went wrong. Please try again.");
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from("companies").insert({
      id: newUser.id,
      name: name,
      email: email,
    });

    if (insertError) {
      setErrorMessage(insertError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="flex items-center justify-center p-4 py-20">
        <div className="w-full max-w-md card p-8 text-center">
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">
            Account created! 🎉
          </h1>
          <p className="text-zinc-500">
            Your company is now signed up. We'll build the dashboard next.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4 py-20">
      <div className="w-full max-w-md card p-8">
        <span className="text-sm font-bold tracking-wide text-orange-600">
          EPOXYMETRICS
        </span>
        <h1 className="text-2xl font-bold text-zinc-900 mt-1 mb-1">
          Create your company account
        </h1>
        <p className="text-zinc-500 mb-6">
          Post jobs and find epoxy flooring workers.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Company name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="field"
              placeholder="Smith Epoxy Co."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field"
              placeholder="At least 6 characters"
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}

          <button
            onClick={handleSignup}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </div>
      </div>
    </div>
  );
}