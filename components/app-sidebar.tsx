"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { BookOpen, Brain, FileText, LayoutDashboard, LogOut, Menu, Sparkles, Trophy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/workspace", label: "Workspace", icon: FileText },
  { href: "/flashcards", label: "Flashcards", icon: BookOpen },
  { href: "/quiz", label: "Quiz", icon: Trophy },
  { href: "/workspace?chat=true", label: "Note chat", icon: Brain }
];

export function AppSidebar({ user }: { user: { name?: string | null; email?: string | null } }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const content = (
    <aside className="flex h-full flex-col">
      <Link href="/dashboard" className="mb-8 flex items-center gap-2 font-semibold">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles className="h-4 w-4" />
        </span>
        AI Study
      </Link>
      <nav className="space-y-1">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground",
              pathname === item.href.split("?")[0] && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
            )}
            onClick={() => setOpen(false)}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto space-y-4">
        <div className="rounded-lg border bg-background/70 p-3">
          <p className="text-sm font-semibold">{user.name ?? "Demo Student"}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </div>
        <div className="flex gap-2">
          <ThemeToggle />
          <Button variant="outline" className="flex-1" onClick={() => signOut({ callbackUrl: "/" })}>
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      <div className="fixed left-4 top-4 z-40 lg:hidden">
        <Button variant="outline" size="icon" onClick={() => setOpen((value) => !value)} aria-label="Open navigation">
          <Menu className="h-4 w-4" />
        </Button>
      </div>
      <div className="sticky top-0 hidden h-screen w-72 shrink-0 p-4 lg:block">
        <div className="glass h-full rounded-lg p-5">{content}</div>
      </div>
      {open ? (
        <div className="fixed inset-0 z-30 bg-background/70 p-4 backdrop-blur lg:hidden">
          <div className="glass h-full max-w-xs rounded-lg p-5">{content}</div>
        </div>
      ) : null}
    </>
  );
}
