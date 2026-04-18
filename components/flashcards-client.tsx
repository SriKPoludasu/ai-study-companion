"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { demoFlashcards } from "@/lib/demo-data";

export function FlashcardsClient() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [cards, setCards] = useState(demoFlashcards);
  const card = cards[index];
  const mastered = useMemo(() => cards.filter((item) => item.mastered).length, [cards]);

  function rate(masteredNow: boolean) {
    setCards((current) => current.map((item) => (item.id === card.id ? { ...item, mastered: masteredNow } : item)));
    setFlipped(false);
    setIndex((current) => (current + 1) % cards.length);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <Card className="glass min-h-[460px]">
        <CardHeader>
          <CardTitle>Review mode</CardTitle>
          <p className="text-sm text-muted-foreground">{card.subject}</p>
        </CardHeader>
        <CardContent className="flex min-h-[330px] flex-col items-center justify-center">
          <motion.button
            key={`${card.id}-${flipped}`}
            initial={{ opacity: 0, rotateX: -10 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.35 }}
            className="flex min-h-[240px] w-full max-w-2xl items-center justify-center rounded-lg border bg-background/80 p-8 text-center text-2xl font-semibold shadow-soft"
            onClick={() => setFlipped((value) => !value)}
          >
            {flipped ? card.back : card.front}
          </motion.button>
          <p className="mt-4 text-sm text-muted-foreground">Tap the card to reveal the answer.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button variant="outline" onClick={() => setFlipped(false)}>
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Button variant="secondary" onClick={() => rate(false)}>
              Needs work
            </Button>
            <Button onClick={() => rate(true)}>
              Mastered
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Deck health
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span>Mastered</span>
              <span>{Math.round((mastered / cards.length) * 100)}%</span>
            </div>
            <Progress value={(mastered / cards.length) * 100} />
          </div>
          <div className="space-y-2">
            {cards.map((item, itemIndex) => (
              <button
                key={item.id}
                className="flex w-full items-center justify-between rounded-lg border bg-background/70 p-3 text-left text-sm transition hover:bg-muted"
                onClick={() => {
                  setIndex(itemIndex);
                  setFlipped(false);
                }}
              >
                <span>{item.front}</span>
                <span className={item.mastered ? "text-primary" : "text-muted-foreground"}>{item.mastered ? "Ready" : "Review"}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
