import { Zap, Code, FileText, Palette, Globe, BookOpen, Mic } from "lucide-react";

export interface Affiliate {
  id: string;
  title: string;
  description: string;
  link: string;
  icon: any;
  category: "design" | "skills" | "hosting" | "tools" | "interview";
  roles?: string[];
}

export const affiliateData: Affiliate[] = [
  {
    id: "canva-resume",
    title: "Improve Your Resume Design 🎨",
    description: "Use Canva Pro templates to make your resume stand out to world-class recruiters.",
    link: "https://www.canva.com/pro/",
    icon: Palette,
    category: "design"
  },
  {
    id: "coursera-data",
    title: "Master Data Analytics",
    description: "Get certified by Google in Data Analytics and boost your hiring chances by 40%.",
    link: "https://www.coursera.org/professional-certificates/google-data-analytics",
    icon: BookOpen,
    category: "skills",
    roles: ["data analyst", "fresher"]
  },
  {
    id: "udemy-sde",
    title: "Advance Your SDE Skills",
    description: "Master System Design and Scalability with top-rated courses on Udemy.",
    link: "https://www.udemy.com/topic/system-design/",
    icon: Code,
    category: "skills",
    roles: ["developer", "architect"]
  },
  {
    id: "bluehost-portfolio",
    title: "Get Your Professional Domain",
    description: "Launch your portfolio on a custom domain with 70% off on Bluehost hosting.",
    link: "https://www.bluehost.com/",
    icon: Globe,
    category: "hosting"
  },
  {
    id: "interviewing-io",
    title: "FAANG Mock Interviews",
    description: "Practice anonymously with engineers from Google, Amazon, and Meta.",
    link: "https://interviewing.io/",
    icon: Mic,
    category: "interview"
  },
  {
    id: "grammarly-ai",
    title: "Perfect Your Communication",
    description: "Ensure your emails and applications are error-free with Grammarly AI.",
    link: "https://www.grammarly.com/",
    icon: FileText,
    category: "tools"
  }
];

/**
 * Dynamic Recommendation Engine:
 * Returns the best affiliate matches based on user role and current context.
 */
export function getRecommendations(role?: string, category?: string): Affiliate[] {
  let filtered = affiliateData;

  if (category) {
    filtered = filtered.filter(a => a.category === category);
  }

  if (role) {
    const roleLower = role.toLowerCase();
    filtered = filtered.filter(a => !a.roles || a.roles.includes(roleLower));
  }

  // Shuffle and return top 2
  return filtered.sort(() => Math.random() - 0.5).slice(0, 2);
}
