"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [about, setAbout] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("companies")
        .select("name, location, website, about")
        .eq("id", user.id)
        .single();

      if (data) {
        setCompanyName(data.name ?? "");
        setLocation(data.location ?? "");
        setWebsite(data.website ?? "");
        setAbout(data.about ?? "");
      }

      setLoading(false);
    };

    loadProfile();
  }, [router]);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { error } = await supabase
      .from("companies")
      .update({ location: location, website: website, about: about })
      .eq("id", user.id);

    if (error) {
      setMessage("Something went wrong. Please try again.");
    } else {
      setMessage("Saved! Your profile is updated.");
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="bg-zinc-100 py-20 text-center">
        <p className="text-zinc-500">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-100">
      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Page heading */}
        <div className="mb-6">
          <span className="text-sm font-bold tracking-wide text-orange-600">EPOXYMETRICS</span>
          <h1 className="text-2xl font-bold text-zinc-900 mt-1">Company Profile</h1>
          <p className="text-zinc-500">
            This is what job seekers will see about {companyName}.
          </p>
        </div>

        {/* Profile form card */}
        <div className="bg-white rounded-xl border border-zinc-200 p-8 space-y-5">
          {/* Logo placeholder (not working yet) */}
          <div>
            <span className="block text-sm font-medium text-zinc-700 mb-1">Company Logo</span>
            <div className="flex h-24 w-24 items-center justify-center rounded-lg border border-dashed border-zinc-300 px-2 text-center text-xs text-zinc-400">
              Logo upload coming soon
            </div>
          </div>

          {/* Location */}
          <label className="block">
            <span className="block text-sm font-medium text-zinc-700 mb-1">Location</span>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, State"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </label>

          {/* Website */}
          <label className="block">
            <span className="block text-sm font-medium text-zinc-700 mb-1">Website</span>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://yourcompany.com"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </label>

          {/* About Us */}
          <label className="block">
            <span className="block text-sm font-medium text-zinc-700 mb-1">About Us</span>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={5}
              placeholder="Tell job seekers about your company, the work you do, and why they'd want to work with you."
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </label>

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full rounded-lg bg-orange-600 py-2.5 font-semibold text-white hover:bg-orange-700 disabled:opacity-50 transition-colors"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>

          {message && <p className="text-center text-sm text-zinc-700">{message}</p>}
        </div>
      </div>
    </div>
  );
}