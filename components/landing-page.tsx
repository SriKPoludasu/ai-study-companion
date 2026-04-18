"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Brain, FileText, Layers, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";

const features = [
  { icon: FileText, title: "Notes that organize themselves", body: "Upload PDFs, paste notes, or write from scratch. Subjects, folders, and summaries stay tidy." },
  { icon: Brain, title: "AI tutoring from your material", body: "Ask questions grounded in your notes, then turn answers into flashcards, quizzes, and definitions." },
  { icon: Layers, title: "Practice that adapts", body: "Quiz history, weak areas, and study sessions help you spend time where it matters." }
];

export function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(135deg,hsl(var(--background)),hsl(var(--secondary))_55%,rgba(20,184,166,0.16))]">
      <nav className="container flex items-center justify-between py-5">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </span>
          AI Study Companion
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" asChild>
            <Link href="/signin">Sign in</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Start free</Link>
          </Button>
        </div>
      </nav>

      <section className="container grid min-h-[calc(100vh-92px)] items-center gap-10 pb-14 pt-8 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div className="mb-5 inline-flex rounded-full border bg-background/70 px-3 py-1 text-sm text-muted-foreground shadow-sm backdrop-blur">
            Built for students who want calm, sharp study sessions.
          </div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-normal md:text-7xl">
            Your notes become a focused study system.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Summaries, flashcards, quizzes, study plans, and note chat in one polished workspace that feels ready for finals week and demo day.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/signup">
                Build my study workspace <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard">View demo dashboard</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass rounded-lg p-4"
        >
          <div className="rounded-lg border bg-card/80 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today</p>
                <h2 className="text-2xl font-semibold">Biology midterm prep</h2>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">12 day streak</span>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {["24 notes", "186 cards", "82% quiz avg"].map((item) => (
                <div key={item} className="rounded-lg border bg-background/70 p-4 text-sm font-semibold">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-lg bg-secondary/70 p-4">
              <p className="text-sm font-semibold">AI summary</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                GPCRs trigger second messenger cascades, while RTKs drive phosphorylation. Review feedback loops before quiz mode.
              </p>
            </div>
            <div className="mt-5 space-y-3">
              {["Review RTK examples", "Generate mixed quiz", "Plan 45-minute recall sprint"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-lg border bg-background/70 p-3">
                  <span className="text-sm">{item}</span>
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="container grid gap-4 pb-20 md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="glass">
            <CardContent className="p-6">
              <feature.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.body}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
