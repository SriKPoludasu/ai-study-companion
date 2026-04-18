export const demoUser = {
  id: "demo-user",
  name: "Kay Poludasu",
  email: "demo@aistudy.dev",
  streak: 12
};

export const demoSubjects = [
  {
    id: "bio",
    name: "Molecular Biology",
    color: "#0f766e",
    description: "Cell signaling, genetics, and exam review.",
    progress: 76
  },
  {
    id: "econ",
    name: "Behavioral Economics",
    color: "#7c3aed",
    description: "Decision-making models and research notes.",
    progress: 58
  },
  {
    id: "cs",
    name: "Data Structures",
    color: "#2563eb",
    description: "Graphs, trees, and implementation drills.",
    progress: 84
  }
];

export const demoNotes = [
  {
    id: "note-1",
    title: "Cell Signaling Pathways",
    subject: "Molecular Biology",
    content:
      "Signal transduction converts extracellular messages into cellular responses. GPCRs activate second messengers like cAMP, while receptor tyrosine kinases trigger phosphorylation cascades. Feedback loops regulate pathway intensity.",
    summary:
      "Cells use receptors and signaling cascades to convert outside signals into targeted responses. GPCRs and RTKs are high-yield exam pathways.",
    updatedAt: "2026-04-16T14:00:00.000Z",
    concepts: [
      { term: "GPCR", definition: "Membrane receptor that activates G proteins and second messengers." },
      { term: "RTK", definition: "Receptor that dimerizes and phosphorylates tyrosine residues." }
    ]
  },
  {
    id: "note-2",
    title: "Prospect Theory",
    subject: "Behavioral Economics",
    content:
      "People evaluate outcomes relative to a reference point. Loss aversion means losses feel larger than equivalent gains, and probability weighting explains why rare outcomes can be overvalued.",
    summary:
      "Prospect theory explains risk behavior through reference points, loss aversion, and nonlinear probability weighting.",
    updatedAt: "2026-04-15T18:30:00.000Z",
    concepts: [
      { term: "Loss aversion", definition: "Losses tend to feel more intense than equal-sized gains." },
      { term: "Reference point", definition: "The baseline people use to judge gains and losses." }
    ]
  },
  {
    id: "note-3",
    title: "Graph Traversal Patterns",
    subject: "Data Structures",
    content:
      "Breadth-first search explores by distance from the source and is useful for shortest paths in unweighted graphs. Depth-first search explores deep branches first and powers topological sorting.",
    summary:
      "BFS is best for layers and unweighted shortest paths; DFS is best for dependency order and connected structure.",
    updatedAt: "2026-04-14T10:15:00.000Z",
    concepts: [
      { term: "BFS", definition: "Queue-based traversal that visits nodes in increasing distance." },
      { term: "DFS", definition: "Stack or recursion-based traversal that explores deeply before backtracking." }
    ]
  }
];

export const demoFlashcards = [
  {
    id: "fc-1",
    front: "What does a GPCR activate after ligand binding?",
    back: "A G protein, often leading to second messengers such as cAMP.",
    subject: "Molecular Biology",
    mastered: false
  },
  {
    id: "fc-2",
    front: "What is loss aversion?",
    back: "The tendency for losses to feel more intense than equivalent gains.",
    subject: "Behavioral Economics",
    mastered: true
  },
  {
    id: "fc-3",
    front: "When is BFS preferred over DFS?",
    back: "When you need shortest paths in unweighted graphs or level-order exploration.",
    subject: "Data Structures",
    mastered: false
  }
];

export const demoQuiz = {
  id: "quiz-1",
  title: "Mixed Study Check",
  questions: [
    {
      id: "q1",
      type: "MULTIPLE_CHOICE",
      prompt: "Which pathway commonly uses cAMP as a second messenger?",
      options: ["GPCR", "RTK", "BFS", "Prospect theory"],
      answer: "GPCR",
      explanation: "GPCR activation often triggers second messenger cascades including cAMP.",
      skill: "Cell signaling"
    },
    {
      id: "q2",
      type: "SHORT_ANSWER",
      prompt: "What traversal finds shortest paths in unweighted graphs?",
      answer: "BFS",
      explanation: "Breadth-first search explores by distance from the source.",
      skill: "Graphs"
    }
  ]
};

export const demoStats = {
  notes: 24,
  flashcards: 186,
  averageQuizScore: 82,
  studyHours: 18,
  weakAreas: ["RTK details", "Probability weighting", "Topological sort"],
  progress: [
    { subject: "Biology", value: 76 },
    { subject: "Economics", value: 58 },
    { subject: "CS", value: 84 }
  ],
  quizHistory: [
    { day: "Mon", score: 72 },
    { day: "Tue", score: 78 },
    { day: "Wed", score: 81 },
    { day: "Thu", score: 80 },
    { day: "Fri", score: 86 },
    { day: "Sat", score: 88 }
  ],
  sessions: [
    { id: "s1", title: "Active recall sprint", subject: "Molecular Biology", startsAt: "2026-04-17T18:00:00.000Z", duration: 45 },
    { id: "s2", title: "Prospect theory review", subject: "Behavioral Economics", startsAt: "2026-04-18T20:30:00.000Z", duration: 30 },
    { id: "s3", title: "Graph quiz repair", subject: "Data Structures", startsAt: "2026-04-19T15:00:00.000Z", duration: 50 }
  ]
};
