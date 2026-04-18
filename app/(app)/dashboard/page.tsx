import { BookOpen, CalendarDays, Flame, Layers, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MotionShell } from "@/components/motion-shell";
import { ProgressChart, QuizTrendChart } from "@/components/dashboard-charts";
import { demoNotes, demoStats, demoSubjects } from "@/lib/demo-data";
import { formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const statCards = [
    { label: "Study streak", value: `${demoUserSafe.streak} days`, icon: Flame },
    { label: "Notes", value: demoStats.notes, icon: Layers },
    { label: "Flashcards", value: demoStats.flashcards, icon: BookOpen },
    { label: "Quiz average", value: `${demoStats.averageQuizScore}%`, icon: Trophy }
  ];

  return (
    <MotionShell className="space-y-6 pt-14 lg:pt-0">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium text-primary">Good evening, Kay</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal md:text-5xl">Your study command center</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">Pick up where you left off, repair weak areas, and keep the next session focused.</p>
        </div>
        <div className="rounded-lg border bg-card/70 px-4 py-3 text-sm shadow-sm backdrop-blur">
          <span className="font-semibold">{demoStats.studyHours}h</span> focused this week
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.label} className="glass">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-3 text-primary">
                <stat.icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Progress by subject</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressChart data={demoStats.progress} />
          </CardContent>
        </Card>
        <Card className="glass">
          <CardHeader>
            <CardTitle>Quiz performance</CardTitle>
          </CardHeader>
          <CardContent>
            <QuizTrendChart data={demoStats.quizHistory} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="glass xl:col-span-1">
          <CardHeader>
            <CardTitle>Recent notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoNotes.map((note) => (
              <div key={note.id} className="rounded-lg border bg-background/70 p-4 transition hover:-translate-y-0.5 hover:shadow-soft">
                <p className="font-semibold">{note.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{note.subject}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Subject momentum</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {demoSubjects.map((subject) => (
              <div key={subject.id}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">{subject.name}</span>
                  <span className="text-muted-foreground">{subject.progress}%</span>
                </div>
                <Progress value={subject.progress} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Upcoming sessions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoStats.sessions.map((session) => (
              <div key={session.id} className="flex gap-3 rounded-lg border bg-background/70 p-4">
                <CalendarDays className="mt-1 h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium">{session.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {session.subject} · {formatDate(session.startsAt)} · {session.duration} min
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </MotionShell>
  );
}

const demoUserSafe = { streak: 12 };
