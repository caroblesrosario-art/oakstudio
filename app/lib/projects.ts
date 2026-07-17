// ─────────────────────────────────────────────────────────────
// OakStudio — project store, backed by Supabase (shared database).
// Every order/project lives in Supabase so codes work on any device and
// the studio sees them all in /admin. OAK-2049 is a hardcoded demo that
// never hits the database (keeps the real orders list clean).
// ─────────────────────────────────────────────────────────────
import { sbRpc, sbListAuthed, sbUpdateAuthed } from "./supabase";

export type StageKey = "brief" | "design" | "build" | "review" | "launch";
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

export interface Brief {
  type?: string;
  vibe?: string;
  branding?: string;
  goal?: string;
  audience?: string;
  budget?: string;
  references?: string;
  notes?: string;
  moodboard?: string[]; // image URLs
}

export interface Project {
  code: string;
  client: string;
  email?: string;
  plan: string;
  service: string;
  total: number;
  currency: string;
  progress: number;
  startedAt: string;
  eta: string;
  stages: Stage[];
  payments: Payment[];
  updates: Update[];
  files: { name: string; kind: string; date: string }[];
  brief?: Brief;
  previewUrl?: string;
  comments: Comment[];
  createdAt?: string;
}

const DEMO_CODE = "OAK-2049";

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

// A demo project (client-side only) so the dashboard can be previewed.
const demo: Project = {
  code: DEMO_CODE,
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
    { date: "Jul 12, 2026", title: "Homepage & product pages in build", body: "Hero, catalog and checkout flow are wired. Live preview link is in your files below — click through and drop notes anytime." },
    { date: "Jul 05, 2026", title: "Design approved ✓", body: "You signed off on the full UI from the dashboard. Moving straight into build — no call needed." },
    { date: "Jun 28, 2026", title: "Project kicked off", body: "Deposit received and brief locked. Welcome to OakStudio, Marisol." },
  ],
  files: [
    { name: "Live preview — staging", kind: "link", date: "Jul 12" },
    { name: "Full UI — Figma", kind: "design", date: "Jul 05" },
    { name: "Brief & scope.pdf", kind: "doc", date: "Jun 28" },
  ],
  previewUrl: "https://caroblesrosario-art.github.io/oakstudio/",
  brief: { type: "Website", vibe: "Warm & editorial", branding: "Just a logo", goal: "Sell products", audience: "Skincare shoppers, 25–45" },
  comments: [
    { author: "client", date: "Jul 12, 2026", body: "Love the homepage! Could the hero photo feel a little warmer? And the shop button could be bigger 🙂" },
    { author: "studio", date: "Jul 12, 2026", body: "Great notes — warming up the hero and bumping the shop button now. Refresh the preview in a bit!" },
  ],
};

/* ---------- DB row <-> Project mapping ---------- */

type Row = Record<string, unknown>;

function rowToProject(r: Row): Project {
  return {
    code: r.code as string,
    client: r.client as string,
    email: (r.email as string) ?? undefined,
    plan: r.plan as string,
    service: r.service as string,
    total: Number(r.total),
    currency: (r.currency as string) ?? "USD",
    progress: Number(r.progress ?? 0),
    startedAt: (r.started_at as string) ?? "",
    eta: (r.eta as string) ?? "",
    stages: (r.stages as Stage[]) ?? [],
    payments: (r.payments as Payment[]) ?? [],
    updates: (r.updates as Update[]) ?? [],
    files: (r.files as Project["files"]) ?? [],
    brief: (r.brief as Brief) ?? {},
    previewUrl: (r.preview_url as string) ?? undefined,
    comments: (r.comments as Comment[]) ?? [],
    createdAt: (r.created_at as string) ?? undefined,
  };
}

/* ---------- Public API ---------- */

export async function getProject(code: string): Promise<Project | null> {
  const key = code.trim().toUpperCase();
  if (key === DEMO_CODE) return demo;
  const row = await sbRpc<Row>("get_project", { p_code: key });
  // A no-match returns a composite of all-nulls, not null — check the PK.
  return row && row.code ? rowToProject(row) : null;
}

// Admin-only: list every project (requires an authenticated session token).
export async function listProjects(token: string): Promise<Project[]> {
  const rows = await sbListAuthed<Row>(token, "projects");
  return rows.map(rowToProject);
}

export interface NewProjectInput {
  client: string;
  email?: string;
  plan: string;
  service: string;
  total: number;
  brief?: Brief;
  custom?: boolean; // quote-based request (no upfront payment)
}

export async function createProject(input: NewProjectInput): Promise<Project> {
  const deposit = Math.round(input.total / 2);
  const payload = {
    client: input.client,
    email: input.email ?? null,
    plan: input.plan,
    service: input.service,
    total: input.total,
    currency: "USD",
    progress: input.custom ? 0 : 8,
    started_at: today(),
    eta: input.custom ? "Quote in ~2 days" : "~4 weeks",
    stages: (() => {
      const s = baseStages(0);
      s[0].date = "Today";
      return s;
    })(),
    payments: input.custom
      ? [{ label: "Custom quote — pending", amount: 0, status: "scheduled", date: "After we scope it" }]
      : [
          { label: "Deposit — 50% to start", amount: deposit, status: "paid", date: today() },
          { label: "Balance — 50% on launch", amount: input.total - deposit, status: "scheduled", date: "Due at launch" },
        ],
    updates: [
      input.custom
        ? { date: today(), title: "Custom request received 🎉", body: "Thanks! We're reviewing what you need and will send a custom quote shortly. Track it anytime with your code." }
        : { date: today(), title: "Project created 🎉", body: "Your deposit is confirmed and your brief is queued. We'll post your first update here — check back anytime with your code." },
    ],
    files: input.custom ? [] : [{ name: "Brief template.pdf", kind: "doc", date: today() }],
    brief: input.brief ?? {},
    preview_url: null,
  };

  // The database generates a unique OAK-#### code and returns the full row.
  const row = await sbRpc<Row>("create_order", { p: payload });
  if (!row) throw new Error("Could not create project");
  return rowToProject(row);
}

/** Append a client comment to a project and persist it (via RPC). */
export async function addComment(code: string, body: string): Promise<Project | null> {
  const key = code.trim().toUpperCase();
  const trimmed = body.trim();
  if (key === DEMO_CODE) {
    demo.comments = [...demo.comments, { author: "client", date: today(), body: trimmed }];
    return demo;
  }
  const row = await sbRpc<Row>("add_comment", { p_code: key, p_body: trimmed });
  return row && row.code ? rowToProject(row) : null;
}

/** Studio-side: patch a project (progress, updates…). Requires admin session. */
export async function patchProject(
  token: string,
  code: string,
  patch: Record<string, unknown>
): Promise<Project | null> {
  const updated = await sbUpdateAuthed<Row>(token, "projects", "code", code.trim().toUpperCase(), patch);
  return updated ? rowToProject(updated) : null;
}

/* ---------- helpers ---------- */

function today(): string {
  const d = new Date();
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
