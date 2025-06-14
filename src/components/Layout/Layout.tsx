
import React from "react";
import Navbar from "./Navbar";
import StarField from "./StarField";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <StarField />
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}
