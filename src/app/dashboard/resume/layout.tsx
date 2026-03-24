import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Resume Builder | ATS Optimized Resumes",
  description: "Build a professional, ATS-friendly resume in minutes with CareerAI. Get a compatibility score and optimization tips instantly.",
  keywords: ["AI Resume Builder", "ATS Friendly Resume", "Resume Scorer", "Resume Optimization"],
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
