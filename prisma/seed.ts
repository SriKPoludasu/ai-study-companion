import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("demo1234", 10);

  const user = await prisma.user.upsert({
    where: { email: "demo@aistudy.dev" },
    update: {},
    create: {
      name: "Kay Poludasu",
      email: "demo@aistudy.dev",
      passwordHash,
      streak: 12
    }
  });

  const biology = await prisma.subject.create({
    data: {
      name: "Molecular Biology",
      color: "#0f766e",
      description: "Cell signaling, genetics, and exam review.",
      userId: user.id
    }
  });

  const econ = await prisma.subject.create({
    data: {
      name: "Behavioral Economics",
      color: "#7c3aed",
      description: "Decision-making models and research notes.",
      userId: user.id
    }
  });

  const bioFolder = await prisma.folder.create({
    data: { name: "Midterm 2", subjectId: biology.id }
  });

  const note = await prisma.note.create({
    data: {
      title: "Cell Signaling Pathways",
      content:
        "Signal transduction converts extracellular messages into cellular responses. GPCRs activate second messengers like cAMP, while receptor tyrosine kinases trigger phosphorylation cascades. Feedback loops regulate pathway intensity.",
      summary:
        "Cells use receptors and signaling cascades to convert outside signals into targeted responses. GPCRs and RTKs are high-yield exam pathways.",
      keyConcepts: [
        { term: "GPCR", definition: "Membrane receptor that activates G proteins and second messengers." },
        { term: "RTK", definition: "Receptor that dimerizes and phosphorylates tyrosine residues." }
      ],
      userId: user.id,
      subjectId: biology.id,
      folderId: bioFolder.id
    }
  });

  await prisma.flashcard.createMany({
    data: [
      {
        front: "What does a GPCR activate after ligand binding?",
        back: "A G protein, often leading to second messengers such as cAMP.",
        difficulty: "MEDIUM",
        userId: user.id,
        subjectId: biology.id,
        noteId: note.id
      },
      {
        front: "Why are feedback loops important in signaling?",
        back: "They tune pathway strength and prevent runaway responses.",
        difficulty: "EASY",
        mastered: true,
        userId: user.id,
        subjectId: biology.id,
        noteId: note.id
      }
    ]
  });

  const quiz = await prisma.quiz.create({
    data: {
      title: "Cell Signaling Checkpoint",
      userId: user.id,
      subjectId: biology.id,
      noteId: note.id,
      questions: {
        create: [
          {
            type: "MULTIPLE_CHOICE",
            prompt: "Which receptor class commonly dimerizes after ligand binding?",
            options: ["GPCR", "RTK", "Ion channel", "Nuclear receptor"],
            answer: "RTK",
            explanation: "RTKs dimerize and autophosphorylate tyrosine residues.",
            skill: "Signal receptors"
          },
          {
            type: "SHORT_ANSWER",
            prompt: "Name one second messenger used by GPCR pathways.",
            answer: "cAMP",
            explanation: "cAMP is a common second messenger downstream of GPCR activation.",
            skill: "Second messengers"
          }
        ]
      }
    }
  });

  await prisma.quizAttempt.create({
    data: {
      userId: user.id,
      quizId: quiz.id,
      score: 8,
      total: 10,
      weakAreas: ["RTK phosphorylation details", "Second messenger examples"]
    }
  });

  await prisma.studySession.createMany({
    data: [
      {
        title: "Active recall sprint",
        startsAt: new Date(Date.now() + 1000 * 60 * 60 * 5),
        duration: 45,
        userId: user.id,
        subjectId: biology.id
      },
      {
        title: "Prospect theory review",
        startsAt: new Date(Date.now() + 1000 * 60 * 60 * 28),
        duration: 30,
        userId: user.id,
        subjectId: econ.id
      }
    ]
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
