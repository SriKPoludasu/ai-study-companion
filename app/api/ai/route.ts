import OpenAI from "openai";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  mode: z.enum(["summary", "flashcards", "quiz", "concepts", "plan", "chat"]),
  content: z.string().min(1),
  question: z.string().optional()
});

const fallback = {
  summary:
    "This material centers on the most testable ideas, how they connect, and where confusion usually appears. Review the definitions first, then practice active recall with examples.",
  flashcards: [
    { front: "What is the central idea of this note?", back: "Identify the main mechanism, definition, or argument and explain it in your own words." },
    { front: "How should you study this topic?", back: "Use active recall, compare related terms, and test yourself with mixed questions." }
  ],
  quiz: [
    {
      type: "MULTIPLE_CHOICE",
      prompt: "Which study method best strengthens long-term memory?",
      options: ["Rereading only", "Active recall", "Highlighting everything", "Skipping review"],
      answer: "Active recall",
      explanation: "Retrieving information from memory is more effective than passive review."
    },
    {
      type: "SHORT_ANSWER",
      prompt: "Name one way to find weak areas before an exam.",
      answer: "Take a practice quiz and review missed concepts.",
      explanation: "Missed questions reveal where to focus the next study session."
    }
  ],
  concepts: [
    { term: "Active recall", definition: "A practice method where you retrieve information without looking at notes." },
    { term: "Spaced repetition", definition: "Reviewing material over increasing intervals to improve retention." }
  ],
  plan: [
    { day: "Today", task: "Summarize the note and review key concepts for 30 minutes." },
    { day: "Tomorrow", task: "Complete flashcards and one quiz attempt." },
    { day: "Exam eve", task: "Review weak areas and complete a mixed practice set." }
  ],
  chat: "Based on your notes, focus on the definitions, examples, and the cause-and-effect relationships. The strongest answer will cite the specific mechanism from the uploaded material."
};

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid AI request." }, { status: 400 });
  }

  const { mode, content, question } = parsed.data;
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ result: fallback[mode] });
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const prompt = `You are AI Study Companion. Return concise JSON for mode "${mode}".
Content:
${content}
Question:
${question ?? "N/A"}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Create accurate study outputs from notes. Keep JSON valid and student-friendly." },
      { role: "user", content: prompt }
    ],
    response_format: { type: "json_object" }
  });

  const text = completion.choices[0]?.message.content ?? "{}";
  try {
    return NextResponse.json({ result: JSON.parse(text) });
  } catch {
    return NextResponse.json({ result: text });
  }
}
