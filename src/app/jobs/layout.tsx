import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Indian Job Updates | 20 LPA+ Tech Roles",
  description: "Get daily updates on high-paying tech jobs in Bangalore, Hyderabad, Pune, and NCR. AI-curated roles for top engineers.",
  keywords: ["Jobs in Bangalore", "20 LPA Jobs", "Tech Jobs India", "Software Engineer Jobs India"],
};

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
