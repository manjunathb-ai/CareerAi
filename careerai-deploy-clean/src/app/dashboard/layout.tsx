import Link from "next/link";
import { LayoutDashboard, FileText, Monitor, Mic, Settings, MessageSquare } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg-deep flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-white/5 flex flex-col pt-6 hidden md:flex shrink-0">
        <div className="px-6 mb-10">
          <Link href="/" className="text-2xl font-bold tracking-tight inline-block hover:opacity-80 transition-opacity">
            Career<span className="text-accent-cyan">AI</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-white transition-colors group">
            <LayoutDashboard className="w-5 h-5 text-text-muted group-hover:text-accent-cyan transition-colors" />
            <span className="font-medium">Overview</span>
          </Link>
          <Link href="/dashboard/resume" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-text-muted hover:text-white transition-colors group">
            <FileText className="w-5 h-5 text-text-muted group-hover:text-primary-indigo transition-colors" />
            <span className="font-medium">Resume Builder</span>
          </Link>
          <Link href="/dashboard/portfolio" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-text-muted hover:text-white transition-colors group">
            <Monitor className="w-5 h-5 text-text-muted group-hover:text-primary-indigo transition-colors" />
            <span className="font-medium">Portfolio AI</span>
          </Link>
          <Link href="/dashboard/interview" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-text-muted hover:text-white transition-colors group">
            <Mic className="w-5 h-5 text-text-muted group-hover:text-accent-cyan transition-colors" />
            <span className="font-medium">Interview Coach</span>
          </Link>
          <Link href="/dashboard/feedback" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-text-muted hover:text-white transition-colors group">
            <MessageSquare className="w-5 h-5 text-text-muted group-hover:text-accent-cyan transition-colors" />
            <span className="font-medium">User Feedback</span>
          </Link>
        </nav>

        <div className="p-4 mt-auto">
          <div className="glass-card p-4 rounded-xl mb-4 bg-gradient-to-b from-white/5 to-transparent border-white/10">
            <div className="text-xs uppercase font-bold tracking-wider text-text-muted mb-2">Plan</div>
            <div className="font-semibold text-white">Free Tier</div>
            <div className="mt-3 bg-white/10 h-1.5 rounded-full overflow-hidden">
               <div className="bg-accent-cyan w-1/3 h-full rounded-full" />
            </div>
            <div className="text-xs text-text-muted mt-2">1/3 AI Actions left</div>
            <Link href="/pricing" className="block text-center text-xs font-semibold text-primary-indigo mt-3 hover:text-white transition-colors">
              Upgrade to Pro
            </Link>
          </div>

          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-text-muted hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span className="font-medium text-sm">Return to Home</span>
          </Link>

          <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-text-muted hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium text-sm">Settings</span>
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-colors mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            <span className="font-medium text-sm">Log out</span>
          </button>
        </div>
      </aside>

      {/* Right side area: TopNav + Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Dashboard Top Nav */}
        <header className="h-16 border-b border-white/5 bg-bg-deep/50 backdrop-blur-xl flex items-center justify-between px-8 z-20">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-medium text-text-muted transition-all">Dashboard / <span className="text-white italic">Portal</span></h2>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xs font-semibold text-text-muted hover:text-white transition-colors flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              Go to Landing
            </Link>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-indigo to-accent-cyan p-[1px]">
               <div className="w-full h-full rounded-full bg-bg-deep flex items-center justify-center text-[10px] font-bold text-white">
                 JD
               </div>
            </div>
          </div>
        </header>

        {/* Main Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
