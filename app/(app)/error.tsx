"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AppError({ reset }: { reset: () => void }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center pt-14 lg:pt-0">
      <Card className="glass max-w-md">
        <CardHeader>
          <CardTitle>Something needs a quick refresh</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-6 text-muted-foreground">
            The workspace hit a temporary issue. Your local demo data is safe, and a refresh usually clears this.
          </p>
          <Button onClick={reset}>Try again</Button>
        </CardContent>
      </Card>
    </div>
  );
}
