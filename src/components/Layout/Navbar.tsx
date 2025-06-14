
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Rocket, Globe, BookOpen, Home } from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/simulation", label: "Space Simulation", icon: Globe },
    { href: "/missions", label: "Missions", icon: Rocket },
    { href: "/education", label: "Educational Tools", icon: BookOpen },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Rocket className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold glow-text">Space Explorer</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = router.pathname === item.href;
              
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <Globe className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
