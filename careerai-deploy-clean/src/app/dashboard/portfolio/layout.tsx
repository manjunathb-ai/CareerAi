import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Generator | Build Your Professional Brand",
  description: "Create a stunning, cinematic portfolio website from your resume effortlessly. Showcase your work with modern, responsive themes.",
  keywords: ["AI Portfolio Generator", "Personal Website Builder", "Professional Portfolio", "Developer Portfolio"],
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
