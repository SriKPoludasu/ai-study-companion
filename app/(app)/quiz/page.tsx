import { MotionShell } from "@/components/motion-shell";
import { QuizClient } from "@/components/quiz-client";

export default function QuizPage() {
  return (
    <MotionShell className="space-y-6 pt-14 lg:pt-0">
      <div>
        <p className="text-sm font-medium text-primary">Quiz mode</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal md:text-5xl">Practice with feedback</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">Answer generated questions, save quiz attempts in production, and focus on weak areas.</p>
      </div>
      <QuizClient />
    </MotionShell>
  );
}
