"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function CompanyDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<{ name: string } | null>(null);

  // The numbers shown in the cards. All 0 for now.
  // To add a new metric later, just add one more line here — that's it.
  const metrics = [
    { label: "Active Jobs", value: 0 },
    { label: "Total Applicants", value: 0 },
    { label: "Job Views", value: 0 },
  ];

  useEffect(() => {
    async function loadCompany() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("companies")
        .select("name")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setCompany(data);
      }
      setLoading(false);
    }

    loadCompany();
  }, [router]);

  if (loading) {
    return (
      <div className="bg-zinc-100 py-20 text-center">
        <p className="text-zinc-500">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-100">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Greeting + main action */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 mb-1">
              Welcome, {company?.name} 👋
            </h1>
            <p className="text-zinc-500">Here&apos;s how your jobs are doing.</p>
          </div>
          <a
            href="/jobs/new"
            className="shrink-0 rounded-lg bg-orange-600 px-5 py-2.5 font-semibold text-white hover:bg-orange-700 transition-colors"
          >
            + Post a New Job
          </a>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-white rounded-xl border border-zinc-200 p-6">
              <p className="text-sm font-medium text-zinc-500">{metric.label}</p>
              <p className="text-3xl font-bold text-zinc-900 mt-1">{metric.value}</p>
            </div>
          ))}
        </div>

        {/* Jobs list (placeholder for now) */}
        <h2 className="text-lg font-bold text-zinc-900 mb-3">Your Jobs</h2>
        <div className="bg-white rounded-xl border border-dashed border-zinc-300 p-10 text-center">
          <p className="text-zinc-600 font-medium mb-1">No jobs yet</p>
          <p className="text-zinc-400 text-sm">
            Once you post a job, it will show up here. We&apos;ll build posting in the next slice.
          </p>
        </div>
      </div>
    </div>
  );
}