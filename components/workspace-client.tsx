"use client";

import { useMemo, useState, useTransition } from "react";
import { Bot, FileUp, FolderPlus, Loader2, Plus, Search, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { demoNotes, demoSubjects } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

type Note = (typeof demoNotes)[number];

export function WorkspaceClient() {
  const [notes, setNotes] = useState<Note[]>(demoNotes);
  const [selectedId, setSelectedId] = useState(notes[0]?.id);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [title, setTitle] = useState("");
  const [aiMode, setAiMode] = useState<"summary" | "flashcards" | "quiz" | "concepts" | "plan">("summary");
  const [aiResult, setAiResult] = useState<unknown>(null);
  const [chat, setChat] = useState<{ role: "user" | "assistant"; text: string }[]>([
    { role: "assistant", text: "Ask anything from the selected note. I will answer from the material first." }
  ]);
  const [question, setQuestion] = useState("");
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const needle = query.toLowerCase();
    return notes.filter((note) => `${note.title} ${note.subject} ${note.content}`.toLowerCase().includes(needle));
  }, [notes, query]);

  const selected = notes.find((note) => note.id === selectedId) ?? notes[0];

  function addNote() {
    if (!title.trim() || !draft.trim()) return;
    const note = {
      id: crypto.randomUUID(),
      title,
      subject: demoSubjects[0].name,
      content: draft,
      summary: "New note ready for AI summarization.",
      updatedAt: new Date().toISOString(),
      concepts: []
    };
    setNotes((current) => [note, ...current]);
    setSelectedId(note.id);
    setTitle("");
    setDraft("");
  }

  async function uploadFile(file?: File) {
    if (!file) return;
    const text = await file.text();
    const note = {
      id: crypto.randomUUID(),
      title: file.name.replace(/\.(txt|md|pdf)$/i, ""),
      subject: "Uploaded Material",
      content: text || "PDF uploaded. Connect UploadThing and PDF parsing in production for server-side extraction.",
      summary: "Uploaded and ready for study tools.",
      updatedAt: new Date().toISOString(),
      concepts: []
    };
    setNotes((current) => [note, ...current]);
    setSelectedId(note.id);
  }

  function runAI(mode = aiMode) {
    if (!selected) return;
    startTransition(async () => {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, content: selected.content })
      });
      const data = await response.json();
      setAiResult(data.result);
    });
  }

  function ask() {
    if (!selected || !question.trim()) return;
    const nextQuestion = question;
    setQuestion("");
    setChat((current) => [...current, { role: "user", text: nextQuestion }]);
    startTransition(async () => {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "chat", content: selected.content, question: nextQuestion })
      });
      const data = await response.json();
      setChat((current) => [...current, { role: "assistant", text: typeof data.result === "string" ? data.result : JSON.stringify(data.result) }]);
    });
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[320px_1fr_360px]">
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Library
            <FolderPlus className="h-4 w-4 text-primary" />
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search every note" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {filtered.length ? (
            filtered.map((note) => (
              <button
                key={note.id}
                className={cn(
                  "w-full rounded-lg border bg-background/70 p-4 text-left transition hover:-translate-y-0.5 hover:shadow-soft",
                  selected?.id === note.id && "border-primary bg-primary/10"
                )}
                onClick={() => setSelectedId(note.id)}
              >
                <p className="font-semibold">{note.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{note.subject}</p>
              </button>
            ))
          ) : (
            <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
              No notes match that search yet.
            </div>
          )}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <Card className="glass">
          <CardHeader>
            <CardTitle>Create a note</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Lecture title" value={title} onChange={(event) => setTitle(event.target.value)} />
            <Textarea placeholder="Paste lecture notes, reading notes, or study material..." value={draft} onChange={(event) => setDraft(event.target.value)} />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button onClick={addNote}>
                <Plus className="h-4 w-4" />
                Save note
              </Button>
              <label className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border bg-background/70 px-4 text-sm font-semibold transition hover:bg-muted">
                <FileUp className="h-4 w-4" />
                Upload text or PDF
                <input className="sr-only" type="file" accept=".txt,.md,.pdf" onChange={(event) => uploadFile(event.target.files?.[0])} />
              </label>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>{selected?.title ?? "Select a note"}</CardTitle>
            <p className="text-sm text-muted-foreground">{selected?.subject}</p>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground">{selected?.content}</p>
          </CardContent>
        </Card>
      </section>

      <aside className="space-y-4">
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI study tools
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {(["summary", "flashcards", "quiz", "concepts", "plan"] as const).map((mode) => (
                <Button key={mode} variant={aiMode === mode ? "default" : "outline"} size="sm" onClick={() => setAiMode(mode)}>
                  {mode}
                </Button>
              ))}
            </div>
            <Button className="w-full" onClick={() => runAI()} disabled={isPending}>
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Generate
            </Button>
            <div className="min-h-[160px] rounded-lg border bg-background/70 p-4 text-sm leading-6 text-muted-foreground">
              {aiResult ? <pre className="whitespace-pre-wrap font-sans">{JSON.stringify(aiResult, null, 2)}</pre> : "Generate a summary, flashcards, quiz questions, concepts, or a study plan from the selected note."}
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              Chat with note
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="max-h-72 space-y-2 overflow-auto rounded-lg border bg-background/70 p-3">
              {chat.map((message, index) => (
                <div key={`${message.role}-${index}`} className={cn("rounded-lg p-3 text-sm", message.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground")}>
                  {message.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input placeholder="Ask from this note" value={question} onChange={(event) => setQuestion(event.target.value)} onKeyDown={(event) => event.key === "Enter" && ask()} />
              <Button size="icon" onClick={ask} disabled={isPending} aria-label="Ask note">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
