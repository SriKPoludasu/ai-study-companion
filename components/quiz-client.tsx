"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { demoQuiz, demoStats } from "@/lib/demo-data";

export function QuizClient() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    return demoQuiz.questions.reduce((total, question) => {
      const answer = answers[question.id]?.trim().toLowerCase();
      return total + (answer === question.answer.toLowerCase() ? 1 : 0);
    }, 0);
  }, [answers]);

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_340px]">
      <Card className="glass">
        <CardHeader>
          <CardTitle>{demoQuiz.title}</CardTitle>
          <p className="text-sm text-muted-foreground">Multiple choice and short answer questions generated from your study material.</p>
        </CardHeader>
        <CardContent className="space-y-5">
          {demoQuiz.questions.map((question, index) => {
            const correct = answers[question.id]?.trim().toLowerCase() === question.answer.toLowerCase();
            return (
              <div key={question.id} className="rounded-lg border bg-background/70 p-5">
                <div className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">{index + 1}</span>
                  <div className="w-full">
                    <p className="font-semibold">{question.prompt}</p>
                    {question.type === "MULTIPLE_CHOICE" ? (
                      <div className="mt-4 grid gap-2 sm:grid-cols-2">
                        {(question.options ?? []).map((option) => (
                          <button
                            key={option}
                            className={`rounded-lg border p-3 text-left text-sm transition hover:bg-muted ${answers[question.id] === option ? "border-primary bg-primary/10" : "bg-background/70"}`}
                            onClick={() => setAnswers((current) => ({ ...current, [question.id]: option }))}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <Input className="mt-4" placeholder="Short answer" value={answers[question.id] ?? ""} onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))} />
                    )}
                    {submitted ? (
                      <div className="mt-4 flex gap-2 rounded-lg bg-muted p-3 text-sm">
                        {correct ? <CheckCircle2 className="h-4 w-4 text-primary" /> : <XCircle className="h-4 w-4 text-destructive" />}
                        <span>{question.explanation}</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
          <Button onClick={() => setSubmitted(true)}>Submit quiz</Button>
        </CardContent>
      </Card>

      <Card className="glass">
        <CardHeader>
          <CardTitle>Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-lg border bg-background/70 p-5 text-center">
            <p className="text-sm text-muted-foreground">Current score</p>
            <p className="mt-2 text-4xl font-semibold">{submitted ? `${score}/${demoQuiz.questions.length}` : "--"}</p>
          </div>
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span>Completion</span>
              <span>{Math.round((Object.keys(answers).length / demoQuiz.questions.length) * 100)}%</span>
            </div>
            <Progress value={(Object.keys(answers).length / demoQuiz.questions.length) * 100} />
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold">Weak areas</p>
            <div className="space-y-2">
              {demoStats.weakAreas.map((area) => (
                <div key={area} className="rounded-lg border bg-background/70 p-3 text-sm text-muted-foreground">
                  {area}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
