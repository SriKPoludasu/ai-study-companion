# AI Study Companion

AI Study Companion is a full-stack study app I built to keep notes, review tools, and AI help in one place.

It lets students organize class material, generate summaries, make flashcards and quizzes, plan exam prep, and ask questions about their uploaded notes.

## Features

- Account sign up and sign in
- Protected dashboard
- Subject and folder organization
- Manual note creation
- Text and PDF upload flow
- Search across notes
- AI summaries
- AI-generated flashcards
- AI-generated quizzes
- Key concepts and definitions
- Study plan generation
- Chat with notes
- Flashcard review mode
- Quiz scoring and weak-area tracking
- Light and dark mode
- Responsive dashboard and workspace

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui-style components
- Framer Motion
- Prisma
- PostgreSQL
- NextAuth
- OpenAI API
- UploadThing
- Recharts

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Demo Login

The app includes a demo account for local development:

```txt
Email: demo@aistudy.dev
Password: demo1234
```

## Environment Variables

Create a `.env` file in the root of the project. I included `.env.example` as a reference.

```bash
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL="http://localhost:3000"
OPENAI_API_KEY=
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```

- `DATABASE_URL` is the PostgreSQL connection string.
- `NEXTAUTH_SECRET` is used by NextAuth for authentication.
- `NEXTAUTH_URL` should be `http://localhost:3000` when running locally.
- `OPENAI_API_KEY` is used for the AI study features.
- `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID` are used for file uploads.

The app can still run locally in demo mode before connecting all of these services.

## Database

Generate the Prisma client:

```bash
npm run db:generate
```

Push the schema to your database:

```bash
npm run db:push
```

Seed demo data:

```bash
npm run db:seed
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

## Deployment

Live app:

```txt
https://ai-study-companion-self.vercel.app
```

This project is deployed on Vercel.

If you want to deploy your own version, these are the steps:

1. Link the project:

```bash
npx vercel link --yes --project ai-study-companion
```

2. Add the auth secret for production:

```bash
npx vercel env add NEXTAUTH_SECRET production
```

3. Deploy:

```bash
npx vercel --prod
```

For the current demo-mode deployment, `NEXTAUTH_SECRET` is the only required production variable.

If you want full production features later, add these in Vercel as well:

- `DATABASE_URL` for PostgreSQL
- `OPENAI_API_KEY` for AI responses
- `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID` for uploads
