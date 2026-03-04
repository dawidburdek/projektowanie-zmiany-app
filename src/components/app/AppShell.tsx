"use client";

import { usePathname } from "next/navigation";
import { FolderKanban, LogOut } from "lucide-react";
import { Sidebar } from "@/components/ui/Sidebar";
import { BottomNav } from "@/components/ui/BottomNav";
import { Button } from "@/components/ui/Button";
import { logout } from "@/actions/auth";

interface AppShellProps {
  children: React.ReactNode;
  userEmail: string;
}

export function AppShell({ children, userEmail }: AppShellProps) {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Projekty",
      href: "/projects",
      icon: <FolderKanban size={18} />,
      active: pathname.startsWith("/projects"),
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar z sekcją użytkownika na dole */}
      <div className="hidden lg:flex flex-col h-full">
        <Sidebar
          items={navItems}
          logo={
            <span className="text-small font-semibold text-text-primary px-1">
              Design MGMT
            </span>
          }
          className="flex-1"
        />
        <div className="hidden lg:flex flex-col border-r border-border w-60 px-3 py-3 gap-2 border-t">
          <p className="text-caption text-text-muted truncate">{userEmail}</p>
          <form action={logout}>
            <Button type="submit" variant="ghost" size="sm" className="w-full justify-start gap-2">
              <LogOut size={14} />
              Wyloguj
            </Button>
          </form>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-16 lg:pb-0">{children}</main>

      {/* Bottom nav mobile */}
      <BottomNav items={navItems} />
    </div>
  );
}
