// ─────────────────────────────────────────────────────────────
// OakStudio — client-side project store (mock backend)
// Everything self-service: a unique code is the "login".
// Persisted to localStorage so the demo survives refreshes.
// In production this maps 1:1 to a real API + database.
// ─────────────────────────────────────────────────────────────

export type StageKey =
  | "brief"
  | "design"
  | "build"
  | "review"
  | "launch";

export type StageState = "done" | "active" | "upcoming";

export interface Stage {
  key: StageKey;
  label: string;
  description: string;
  state: StageState;
  date?: string;
}

export interface Payment {
  label: string;
  amount: number;
  status: "paid" | "due" | "scheduled";
  date?: string;
}

export interface Update {
  date: string;
  title: string;
  body: string;
}

export interface Comment {
  author: "client" | "studio";
  date: string;
  body: string;
}

// Guided brief — captured as simple selections so clients don't face a blank box.
export interface Brief {
  type?: string;
  vibe?: string;
  branding?: string;
  goal?: string;
  audience?: string;
  references?: string;
  notes?: string;
}

export interface Project {
  code: string;
  client: string;
  plan: string;
  service: string;
  total: number;
  currency: string;
  progress: number; // 0–100
  startedAt: string;
  eta: string;
  stages: Stage[];
  payments: Payment[];
  updates: Update[];
  files: { name: string; kind: string; date: string }[];
  brief?: Brief;
  previewUrl?: string;
  comments: Comment[];
}

const STORAGE_KEY = "oakstudio.projects.v2";

function baseStages(activeIndex: number): Stage[] {
  const defs: { key: StageKey; label: string; description: string }[] = [
    { key: "brief", label: "Brief & Scope", description: "Goals, references and scope locked in — no meetings required." },
    { key: "design", label: "Design", description: "Visual direction, key screens and the full UI in high fidelity." },
    { key: "build", label: "Build", description: "Development, integrations and content wiring." },
    { key: "review", label: "Review", description: "Your round of feedback, straight from the dashboard." },
    { key: "launch", label: "Launch", description: "Deploy, handoff and the final 50% settled." },
  ];
  return defs.map((d, i) => ({
    ...d,
    state: i < activeIndex ? "done" : i === activeIndex ? "active" : "upcoming",
  }));
}

// A seeded demo project so the dashboard is never empty.
function demoProject(): Project {
  return {
    code: "OAK-2049",
    client: "Marisol — Terra Botanica",
    plan: "Signature Site",
    service: "Website Design & Build",
    total: 4800,
    currency: "USD",
    progress: 62,
    startedAt: "Jun 28, 2026",
    eta: "Jul 29, 2026",
    stages: (() => {
      const s = baseStages(2);
      s[0].date = "Jun 28";
      s[1].date = "Jul 05";
      s[2].date = "In progress";
      return s;
    })(),
    payments: [
      { label: "Deposit — 50% to start", amount: 2400, status: "paid", date: "Jun 28, 2026" },
      { label: "Balance — 50% on launch", amount: 2400, status: "scheduled", date: "Due at launch" },
    ],
    updates: [
      {
        date: "Jul 12, 2026",
        title: "Homepage & product pages in build",
        body: "Hero, catalog and checkout flow are wired. Live preview link is in your files below — click through and drop notes anytime.",
      },
      {
        date: "Jul 05, 2026",
        title: "Design approved ✓",
        body: "You signed off on the full UI from the dashboard. Moving straight into build — no call needed.",
      },
      {
        date: "Jun 28, 2026",
        title: "Project kicked off",
        body: "Deposit received and brief locked. Welcome to OakStudio, Marisol.",
      },
    ],
    files: [
      { name: "Live preview — staging", kind: "link", date: "Jul 12" },
      { name: "Full UI — Figma", kind: "design", date: "Jul 05" },
      { name: "Brief & scope.pdf", kind: "doc", date: "Jun 28" },
    ],
    previewUrl: "https://caroblesrosario-art.github.io/oakstudio/",
    brief: {
      type: "Website",
      vibe: "Warm & editorial",
      branding: "Just a logo",
      goal: "Sell products",
      audience: "Skincare shoppers, 25–45",
    },
    comments: [
      {
        author: "client",
        date: "Jul 12, 2026",
        body: "Love the homepage! Could the hero photo feel a little warmer? And the shop button could be bigger 🙂",
      },
      {
        author: "studio",
        date: "Jul 12, 2026",
        body: "Great notes — warming up the hero and bumping the shop button now. Refresh the preview in a bit!",
      },
    ],
  };
}

function read(): Record<string, Project> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function write(all: Record<string, Project>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

function ensureSeed(all: Record<string, Project>) {
  if (!all["OAK-2049"]) {
    all["OAK-2049"] = demoProject();
    write(all);
  }
}

export function getProject(code: string): Project | null {
  const all = read();
  ensureSeed(all);
  const key = code.trim().toUpperCase();
  return all[key] ?? null;
}

function randomCode(): string {
  // Human-friendly, unambiguous characters.
  const n = Math.floor(1000 + Math.abs(hashNow()) % 9000);
  return `OAK-${n}`;
}

// Avoids Math.random (kept deterministic-ish per call site).
function hashNow(): number {
  const s = `${performance.now()}`;
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}

export interface NewProjectInput {
  client: string;
  plan: string;
  service: string;
  total: number;
  brief?: Brief;
}

export function createProject(input: NewProjectInput): Project {
  const all = read();
  ensureSeed(all);
  let code = randomCode();
  while (all[code]) code = randomCode();

  const project: Project = {
    code,
    client: input.client,
    plan: input.plan,
    service: input.service,
    total: input.total,
    currency: "USD",
    progress: 8,
    startedAt: today(),
    eta: "~4 weeks",
    stages: (() => {
      const s = baseStages(0);
      s[0].date = "Today";
      return s;
    })(),
    payments: [
      { label: "Deposit — 50% to start", amount: Math.round(input.total / 2), status: "paid", date: today() },
      { label: "Balance — 50% on launch", amount: input.total - Math.round(input.total / 2), status: "scheduled", date: "Due at launch" },
    ],
    updates: [
      {
        date: today(),
        title: "Project created 🎉",
        body: "Your deposit is confirmed and your brief is queued. We'll post your first update here — check back anytime with your code.",
      },
    ],
    files: [{ name: "Brief template.pdf", kind: "doc", date: today() }],
    brief: input.brief,
    previewUrl: undefined,
    comments: [],
  };

  all[code] = project;
  write(all);
  return project;
}

/** Append a client comment to a project and persist it. */
export function addComment(code: string, body: string): Project | null {
  const all = read();
  ensureSeed(all);
  const key = code.trim().toUpperCase();
  const project = all[key];
  if (!project) return null;
  if (!project.comments) project.comments = [];
  project.comments.push({ author: "client", date: today(), body: body.trim() });
  write(all);
  return project;
}

function today(): string {
  // Static-safe date formatting without Date.now in module scope.
  const d = new Date();
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
