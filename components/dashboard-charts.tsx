"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function ProgressChart({ data }: { data: { subject: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="subject" tickLine={false} axisLine={false} />
        <YAxis hide domain={[0, 100]} />
        <Tooltip cursor={{ fill: "hsl(var(--muted))" }} contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))" }} />
        <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 4, 4]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function QuizTrendChart({ data }: { data: { day: string; score: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="quiz" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} />
        <YAxis hide domain={[50, 100]} />
        <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))" }} />
        <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" fill="url(#quiz)" strokeWidth={3} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
