import { FlashcardsClient } from "@/components/flashcards-client";
import { MotionShell } from "@/components/motion-shell";

export default function FlashcardsPage() {
  return (
    <MotionShell className="space-y-6 pt-14 lg:pt-0">
      <div>
        <p className="text-sm font-medium text-primary">Flashcards</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal md:text-5xl">Active recall that feels calm</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">Review generated cards, mark mastery, and keep weak material in rotation.</p>
      </div>
      <FlashcardsClient />
    </MotionShell>
  );
}
