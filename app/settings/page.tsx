"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function loadAccount() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setEmail(user.email ?? "");
      setLoading(false);
    }

    loadAccount();
  }, [router]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-zinc-500">Loading your settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="mb-6">
        <span className="text-sm font-bold tracking-wide text-orange-600">EPOXYMETRICS</span>
        <h1 className="text-2xl font-bold text-zinc-900 mt-1">Account Settings</h1>
        <p className="text-zinc-500">Manage your private account info.</p>
      </div>

      {/* Account */}
      <div className="card p-8 mb-6">
        <h2 className="text-lg font-bold text-zinc-900 mb-1">Account</h2>
        <p className="text-sm text-zinc-500 mb-4">The email you log in with.</p>
        <span className="block text-sm font-medium text-zinc-700 mb-1">Email</span>
        <p className="text-zinc-900">{email}</p>
      </div>

      {/* Change password (placeholder) */}
      <div className="card p-8 mb-6">
        <h2 className="text-lg font-bold text-zinc-900 mb-1">Change Password</h2>
        <p className="text-sm text-zinc-500">
          Coming soon. You&apos;ll be able to update your password here.
        </p>
      </div>

      {/* Billing (placeholder) */}
      <div className="card p-8">
        <h2 className="text-lg font-bold text-zinc-900 mb-1">Billing &amp; Membership</h2>
        <p className="text-sm text-zinc-500">
          Coming soon. You&apos;ll manage your subscription and payment here.
        </p>
      </div>
    </div>
  );
}