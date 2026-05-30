"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Navbar() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [ready, setReady] = useState(false); // have we finished checking yet?

  useEffect(() => {
    // Check once when the page loads: is someone logged in?
    supabase.auth.getUser().then(({ data: { user } }) => {
      setLoggedIn(!!user);
      setReady(true);
    });

    // Keep watching, so the navbar updates the moment they log in or out
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session);
      setReady(true);
    });

    // Stop watching when the navbar goes away
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <nav className="bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between">
      <a href="/" className="text-xl font-bold tracking-wide text-orange-600">
        EpoxyMetrics
      </a>

      {/* Only show links once we know if they're logged in (stops a flicker) */}
      {ready && (
        <div className="flex items-center gap-5 text-sm font-medium">
          {loggedIn ? (
            <>
              <a href="/dashboard" className="text-zinc-600 hover:text-orange-600 transition-colors">Dashboard</a>
              <a href="/profile" className="text-zinc-600 hover:text-orange-600 transition-colors">Profile</a>
              <a href="/settings" className="text-zinc-600 hover:text-orange-600 transition-colors">Settings</a>
              <button onClick={handleLogout} className="text-zinc-600 hover:text-orange-600 transition-colors">Log out</button>
            </>
          ) : (
            <>
              <a href="/jobs" className="text-zinc-600 hover:text-orange-600 transition-colors">Browse Jobs</a>
              <a href="/signup" className="text-zinc-600 hover:text-orange-600 transition-colors">Post a Job</a>
              <a href="/login" className="text-zinc-600 hover:text-orange-600 transition-colors">Log in</a>
            </>
          )}
        </div>
      )}
    </nav>
  );
}