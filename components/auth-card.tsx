"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AuthCard({ mode }: { mode: "signin" | "signup" }) {
  const router = useRouter();
  const search = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    if (mode === "signup") {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: String(formData.get("name")), email, password })
      });
      if (!response.ok) {
        const body = await response.json();
        setError(body.error ?? "Could not create your account.");
        setLoading(false);
        return;
      }
    }

    const result = await signIn("credentials", { email, password, redirect: false });
    if (result?.error) {
      setError(mode === "signup" ? "Account created. Sign in after configuring Postgres, or use the demo account." : "Invalid email or password.");
      setLoading(false);
      return;
    }

    router.push(getSafeCallbackPath(search.get("callbackUrl")));
    router.refresh();
  }

  return (
    <Card className="glass w-full max-w-md">
      <CardHeader>
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles className="h-5 w-5" />
        </div>
        <CardTitle className="text-2xl">{mode === "signin" ? "Welcome back" : "Create your workspace"}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {mode === "signin" ? "Use demo@aistudy.dev with demo1234 for instant access." : "Demo mode signs in with demo@aistudy.dev and demo1234 until Postgres is configured."}
        </p>
      </CardHeader>
      <CardContent>
        <form action={onSubmit} className="space-y-4">
          {mode === "signup" ? (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Kay Poludasu" required />
            </div>
          ) : null}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" defaultValue={mode === "signin" ? "demo@aistudy.dev" : ""} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" defaultValue={mode === "signin" ? "demo1234" : ""} minLength={8} required />
          </div>
          {error ? <p className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</p> : null}
          <Button className="w-full" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {mode === "signin" ? "Sign in" : "Create account"}
          </Button>
        </form>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          {mode === "signin" ? "New here? " : "Already studying here? "}
          <Link className="font-medium text-primary" href={mode === "signin" ? "/signup" : "/signin"}>
            {mode === "signin" ? "Create an account" : "Sign in"}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

function getSafeCallbackPath(callbackUrl: string | null) {
  if (!callbackUrl) return "/dashboard";

  try {
    const url = new URL(callbackUrl);
    return `${url.pathname}${url.search}${url.hash}` || "/dashboard";
  } catch {
    return callbackUrl.startsWith("/") ? callbackUrl : "/dashboard";
  }
}
