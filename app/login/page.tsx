"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function CompanyLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setErrorMessage("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    setLoading(false);
  }

  if (success) {
    return (
      <div className="flex items-center justify-center p-4 py-20">
        <div className="w-full max-w-md card p-8 text-center">
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-zinc-500">
            You're logged in. We'll send you to your dashboard next.
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
        <h1 className="text-2xl font-bold text-zinc-900 mt-1 mb-1">Log in</h1>
        <p className="text-zinc-500 mb-6">Welcome back to EpoxyMetrics.</p>

        <div className="space-y-4">
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
              placeholder="Your password"
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}