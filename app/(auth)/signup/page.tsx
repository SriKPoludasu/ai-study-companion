import { Suspense } from "react";
import { AuthCard } from "@/components/auth-card";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,hsl(var(--background)),hsl(var(--secondary))_60%,rgba(251,191,36,0.16))] p-4">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <Suspense fallback={null}>
        <AuthCard mode="signup" />
      </Suspense>
    </main>
  );
}
