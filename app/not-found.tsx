import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4 text-center">
      <div>
        <p className="text-sm font-medium text-primary">404</p>
        <h1 className="mt-2 text-4xl font-semibold">That page is not in this study set.</h1>
        <p className="mt-3 text-muted-foreground">Head back to the dashboard and keep the momentum going.</p>
        <Button className="mt-6" asChild>
          <Link href="/dashboard">Go to dashboard</Link>
        </Button>
      </div>
    </main>
  );
}
