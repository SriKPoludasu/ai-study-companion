import { Suspense } from "react";
import { AuthCard } from "@/components/auth-card";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,hsl(var(--background)),hsl(var(--secondary))_60%,rgba(20,184,166,0.18))] p-4">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <Suspense fallback={null}>
        <AuthCard mode="signin" />
      </Suspense>
    </main>
  );
}
