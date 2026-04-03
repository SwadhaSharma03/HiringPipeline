
import Dashboard from "../components/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Candidate Pipeline | TalentFlow SaaS",
  description: "Manage your recruitment pipeline with ease and efficiency.",
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Dashboard />
    </div>
  );
}
