import { NextResponse } from 'next/server';

const indianJobs = [
  {
    title: "Staff Software Engineer, AI",
    company: "Google India",
    location: "Bangalore, KA",
    salary: "₹55,00,000 - ₹85,00,000",
    type: "Full-time",
    posted: "1 hour ago",
    tags: ["Machine Learning", "System Design", "Cloud"],
    applyUrl: "https://www.google.com/about/careers/applications/jobs/results/?location=India"
  },
  {
    title: "Principal Product Designer",
    company: "Zomato",
    location: "Gurgaon, HR",
    salary: "₹45,00,000 - ₹60,00,000",
    type: "Full-time",
    posted: "3 hours ago",
    tags: ["Product Design", "Design Systems", "Mobile"],
    applyUrl: "https://www.zomato.com/careers"
  },
  {
    title: "Backend Architect (Node.js)",
    company: "Razorpay",
    location: "Bangalore, KA (Remote)",
    salary: "₹50,00,000 - ₹70,00,000",
    type: "Full-time",
    posted: "5 hours ago",
    tags: ["Node.js", "Redis", "Microservices"],
    applyUrl: "https://razorpay.com/jobs/"
  },
  {
    title: "Engineering Manager",
    company: "Cred",
    location: "Bangalore, KA",
    salary: "₹65,00,000 - ₹95,00,000",
    type: "Full-time",
    posted: "8 hours ago",
    tags: ["Leadership", "Scalability", "Infrastructure"],
    applyUrl: "https://cred.club/careers"
  },
  {
    title: "SRE / DevOps Lead",
    company: "Flipkart",
    location: "Bangalore, KA",
    salary: "₹40,00,000 - ₹55,00,000",
    type: "Full-time",
    posted: "12 hours ago",
    tags: ["Kubernetes", "AWS", "Terraform"],
    applyUrl: "https://www.flipkartcareers.com/"
  },
  {
    title: "Senior Android Developer",
    company: "Swiggy",
    location: "Bangalore, KA",
    salary: "₹35,00,000 - ₹50,00,000",
    type: "Full-time",
    posted: "1 day ago",
    tags: ["Kotlin", "Jetpack Compose", "MVVM"],
    applyUrl: "https://www.swiggy.com/careers"
  }
];

export async function GET() {
  /**
   * Mock Scraper Delay:
   * Simulates the latency of a real-time extraction job from external 
   * job boards (LinkedIn, Naukri, Glassdoor).
   */
  await new Promise((resolve) => setTimeout(resolve, 800));

  /**
   * Content Refinement: 
   * Shuffles and returns the latest high-LPA roles.
   * In a production environment, this would query the Supabase/PostgreSQL 
   * database for the most recent indexed entries.
   */
  return NextResponse.json({
    jobs: indianJobs.sort(() => Math.random() - 0.5),
    lastUpdate: new Date().toISOString(),
    status: "Live"
  });
}
