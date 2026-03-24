"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Define routes that should NOT have the global Navbar/Footer
  const isDashboard = pathname?.startsWith("/dashboard");
  const isAuth = pathname?.startsWith("/login") || pathname?.startsWith("/register");
  
  const hideGlobalUI = isDashboard || isAuth;

  return (
    <>
      {!hideGlobalUI && <Navbar />}
      <main className={!hideGlobalUI ? "pt-0" : ""}>{children}</main>
      {!hideGlobalUI && <Footer />}
    </>
  );
}
