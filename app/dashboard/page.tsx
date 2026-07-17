"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Logo from "../components/Logo";
import { getProject, addComment, type Project } from "../lib/projects";
import { fmt } from "../lib/plans";
import { paypalMeLink } from "../lib/payment";
import { deliverFeedback } from "../lib/feedback";

export default function DashboardPage() {
  return (
    <Suspense fallback={<Frame><div className="py-24 text-center text-ink/40">Loading…</div></Frame>}>
      <Dashboard />
    </Suspense>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[460px] w-[760px] -translate-x-1/2 rounded-full opacity-50 blur-[130px]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(184,201,255,0.45) 0%, rgba(184,201,255,0) 70%)",
        }}
      />
      <div className="container-x relative py-6">
        <div className="flex items-center justify-between">
          <Logo />
          <Link href="/" className="text-sm text-ink/50 hover:text-ink">
            ← Back to site
          </Link>
        </div>
        {children}
      </div>
    </main>
  );
}

function Dashboard() {
  const params = useSearchParams();
  const [code, setCode] = useState("");
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  // Auto-open if a code is passed in the URL (from /start).
  useEffect(() => {
    const c = params.get("code");
    if (c) {
      const p = getProject(c);
      if (p) {
        setProject(p);
        setCode(c.toUpperCase());
      }
    }
    setReady(true);
  }, [params]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const p = getProject(code);
    if (!p) {
      setError("No project found for that code. Double-check and try again.");
      return;
    }
    setProject(p);
  };

  if (!ready) return <Frame><div className="py-24 text-center text-ink/40">Loading…</div></Frame>;

  if (!project) {
    return (
      <Frame>
        <div className="mx-auto mt-16 max-w-md sm:mt-24">
          <div className="rounded-3xl border border-ink/8 bg-white/70 p-8 shadow-[0_30px_80px_-50px_rgba(11,11,12,0.3)] backdrop-blur-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-paper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M8 10V7a4 4 0 118 0v3" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </div>
            <h1 className="mt-5 text-2xl font-semibold tracking-tight">Track your project</h1>
            <p className="mt-1 text-sm text-ink/50">
              Enter the code you got when you started. No account, no password.
            </p>

            <form onSubmit={submit} className="mt-6">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="OAK-2049"
                className="input text-center font-display text-2xl tracking-wide"
                autoFocus
              />
              {error && <p className="mt-2 text-sm text-rose-500">{error}</p>}
              <button type="submit" className="btn-primary mt-4 w-full">
                View my project
              </button>
            </form>

            <div className="mt-6 rounded-2xl bg-paper p-4 text-center">
              <p className="text-xs text-ink/50">
                Just exploring? Try the demo project
              </p>
              <button
                onClick={() => {
                  setCode("OAK-2049");
                  const p = getProject("OAK-2049");
                  if (p) setProject(p);
                }}
                className="mt-1 text-sm font-medium text-ink underline underline-offset-4"
              >
                OAK-2049
              </button>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-ink/45">
            Don't have a project yet?{" "}
            <Link href="/start" className="font-medium text-ink underline underline-offset-4">
              Start one
            </Link>
          </p>
        </div>
      </Frame>
    );
  }

  return (
    <Frame>
      <ProjectView key={project.code} project={project} onExit={() => { setProject(null); setCode(""); }} />
    </Frame>
  );
}

function ProjectView({ project, onExit }: { project: Project; onExit: () => void }) {
  const paidToDate = project.payments
    .filter((p) => p.status === "paid")
    .reduce((s, p) => s + p.amount, 0);
  const outstanding = project.total - paidToDate;

  const [comments, setComments] = useState(project.comments ?? []);
  const [commentText, setCommentText] = useState("");
  const [sending, setSending] = useState(false);
  const [sentNote, setSentNote] = useState("");

  const sendFeedback = async () => {
    const text = commentText.trim();
    if (!text || sending) return;
    setSending(true);
    const updated = addComment(project.code, text);
    if (updated) setComments(updated.comments);
    setCommentText("");
    await deliverFeedback(project.code, project.client, text);
    setSending(false);
    setSentNote("Sent to OakStudio ✓");
    window.setTimeout(() => setSentNote(""), 2600);
  };

  return (
    <div className="mx-auto mt-8 max-w-5xl pb-20">
      {/* header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-ink px-3 py-1 font-mono text-xs tracking-wider text-white">
              {project.code}
            </span>
            <span className="rounded-full bg-periwinkle-100 px-3 py-1 text-xs font-medium text-periwinkle-500">
              On track
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">{project.client}</h1>
          <p className="text-ink/50">{project.plan} · {project.service}</p>
        </div>
        <button
          onClick={onExit}
          className="self-start rounded-full border border-ink/12 px-4 py-2 text-sm text-ink/60 hover:border-ink/25 hover:text-ink"
        >
          Switch project
        </button>
      </div>

      {/* top stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Progress" value={`${project.progress}%`}>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink/6">
            <div
              className="h-full rounded-full bg-gradient-to-r from-periwinkle-400 to-periwinkle-500 transition-all duration-700"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </Stat>
        <Stat label="Estimated launch" value={project.eta}>
          <p className="mt-3 text-xs text-ink/40">Started {project.startedAt}</p>
        </Stat>
        <Stat label="Paid to date" value={fmt(paidToDate)}>
          <p className="mt-3 text-xs text-ink/40">of {fmt(project.total)} total</p>
        </Stat>
      </div>

      {/* Live preview */}
      <div className="mt-6">
        <PreviewPanel url={project.previewUrl} progress={project.progress} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* stages + conversation */}
        <div className="space-y-6 lg:col-span-2">
          <Panel title="Project stages">
            <ol className="relative ml-2">
              {project.stages.map((s, i) => (
                <li key={s.key} className="relative flex gap-4 pb-7 last:pb-0">
                  {i < project.stages.length - 1 && (
                    <span
                      className={`absolute left-[11px] top-7 h-full w-px ${
                        s.state === "done" ? "bg-ink" : "bg-ink/10"
                      }`}
                    />
                  )}
                  <span
                    className={`z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] ${
                      s.state === "done"
                        ? "bg-ink text-white"
                        : s.state === "active"
                        ? "bg-periwinkle-300 text-ink ring-4 ring-periwinkle-100"
                        : "bg-ink/8 text-ink/40"
                    }`}
                  >
                    {s.state === "done" ? "✓" : i + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={`font-medium ${s.state === "upcoming" ? "text-ink/40" : "text-ink"}`}>
                        {s.label}
                      </p>
                      {s.date && (
                        <span className={`text-xs ${s.state === "active" ? "text-periwinkle-500" : "text-ink/40"}`}>
                          {s.date}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-ink/50">{s.description}</p>
                    {s.state === "active" && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button className="rounded-full bg-ink px-4 py-1.5 text-xs font-medium text-white hover:opacity-90">
                          Approve stage
                        </button>
                        <button className="rounded-full border border-ink/12 px-4 py-1.5 text-xs text-ink/60 hover:border-ink/25">
                          Leave a note
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </Panel>

          <Panel title="Updates & feedback">
            {/* Studio updates */}
            <div className="space-y-5">
              {project.updates.map((u, i) => (
                <div key={i} className="relative flex gap-4">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-periwinkle-400" />
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="font-medium">{u.title}</p>
                      <span className="text-xs text-ink/40">{u.date}</span>
                    </div>
                    <p className="mt-1 text-sm text-ink/55">{u.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Two-way conversation */}
            {comments.length > 0 && (
              <div className="mt-6 space-y-3 border-t border-ink/8 pt-6">
                {comments.map((c, i) => (
                  <div
                    key={i}
                    className={`flex ${c.author === "client" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                        c.author === "client"
                          ? "bg-ink text-white"
                          : "bg-paper text-ink"
                      }`}
                    >
                      <p className="mb-0.5 text-[10px] uppercase tracking-wider opacity-50">
                        {c.author === "client" ? "You" : "OakStudio"} · {c.date}
                      </p>
                      {c.body}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Composer */}
            <div className="mt-6 border-t border-ink/8 pt-5">
              <label className="mb-2 block text-sm font-medium text-ink/70">
                Leave feedback anytime
              </label>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Tell us what you think of the preview — what to change, what you love…"
                rows={3}
                className="input resize-none"
              />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-emerald-600">{sentNote}</span>
                <button
                  onClick={sendFeedback}
                  disabled={sending || !commentText.trim()}
                  className="btn-primary !py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {sending ? "Sending…" : "Send feedback"}
                </button>
              </div>
            </div>
          </Panel>
        </div>

        {/* payments + files */}
        <div className="space-y-6">
          <Panel title="Payments">
            <div className="space-y-4">
              {project.payments.map((p, i) => (
                <div key={i} className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium">{fmt(p.amount)}</p>
                    <p className="text-xs text-ink/45">{p.label}</p>
                    {p.date && <p className="mt-0.5 text-xs text-ink/35">{p.date}</p>}
                  </div>
                  <PayBadge status={p.status} />
                </div>
              ))}
              <div className="border-t border-ink/8 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink/50">Total</span>
                  <span className="font-semibold">{fmt(project.total)}</span>
                </div>
              </div>
              {outstanding > 0 && (
                <a
                  href={paypalMeLink(outstanding)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0070E0] px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0060c0]"
                >
                  Pay {fmt(outstanding)} balance with PayPal
                </a>
              )}
            </div>
          </Panel>

          <Panel title="Files & links">
            <div className="space-y-2">
              {project.files.map((f, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center justify-between rounded-xl border border-ink/8 bg-white/60 px-4 py-3 transition-colors hover:border-ink/20"
                >
                  <span className="flex items-center gap-3 text-sm">
                    <FileIcon kind={f.kind} />
                    {f.name}
                  </span>
                  <span className="text-xs text-ink/35">{f.date}</span>
                </a>
              ))}
            </div>
          </Panel>

          <div className="rounded-3xl border border-ink/8 bg-ink p-6 text-white">
            <p className="font-medium">Need to talk to a human?</p>
            <p className="mt-1 text-sm text-white/55">
              Everything runs async — but we're one message away when you want us.
            </p>
            <a
              href={`mailto:oakstudio.do@gmail.com?subject=About%20project%20${project.code}`}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink hover:-translate-y-0.5"
            >
              Message the studio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewPanel({ url, progress }: { url?: string; progress: number }) {
  const [nonce, setNonce] = useState(0);
  return (
    <div className="rounded-3xl border border-ink/8 bg-white/70 p-6 backdrop-blur-sm sm:p-7">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium uppercase tracking-wider text-ink/45">Live preview</h2>
          <p className="mt-0.5 text-xs text-ink/40">
            A real, always-current view of your site as we build it.
          </p>
        </div>
        {url && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setNonce((n) => n + 1)}
              className="rounded-full border border-ink/12 px-3 py-1.5 text-xs text-ink/60 hover:border-ink/25 hover:text-ink"
            >
              ↻ Refresh
            </button>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-ink/12 px-3 py-1.5 text-xs text-ink/60 hover:border-ink/25 hover:text-ink"
            >
              Open ↗
            </a>
          </div>
        )}
      </div>

      {url ? (
        <div className="overflow-hidden rounded-2xl border border-ink/10 bg-cream shadow-[0_20px_50px_-30px_rgba(20,18,16,0.35)]">
          <div className="flex items-center gap-2 border-b border-ink/6 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
            <div className="ml-3 truncate rounded-full bg-paper px-3 py-1 text-[11px] text-ink/40">
              {url.replace(/^https?:\/\//, "")}
            </div>
          </div>
          <iframe
            key={nonce}
            src={url}
            title="Project live preview"
            loading="lazy"
            className="h-[300px] w-full bg-white sm:h-[440px]"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink/15 bg-paper/60 px-6 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="#6E85E0" strokeWidth="1.6" />
              <path d="M3 9h18" stroke="#6E85E0" strokeWidth="1.6" />
            </svg>
          </div>
          <p className="mt-4 font-medium text-ink">Your live preview is on its way</p>
          <p className="mt-1 max-w-sm text-sm text-ink/50">
            As soon as we start on your design, a working preview of your site
            appears right here — refresh anytime to watch it come together
            ({progress}% so far).
          </p>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, children }: { label: string; value: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-ink/8 bg-white/70 p-6 backdrop-blur-sm">
      <p className="text-xs uppercase tracking-wider text-ink/40">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
      {children}
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-ink/8 bg-white/70 p-6 backdrop-blur-sm sm:p-7">
      <h2 className="mb-5 text-sm font-medium uppercase tracking-wider text-ink/45">{title}</h2>
      {children}
    </div>
  );
}

function PayBadge({ status }: { status: "paid" | "due" | "scheduled" }) {
  const map = {
    paid: { t: "Paid", c: "bg-emerald-50 text-emerald-600" },
    due: { t: "Due", c: "bg-amber-50 text-amber-600" },
    scheduled: { t: "On launch", c: "bg-ink/5 text-ink/50" },
  }[status];
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${map.c}`}>{map.t}</span>
  );
}

function FileIcon({ kind }: { kind: string }) {
  const stroke = "#6E85E0";
  if (kind === "link")
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6.5 9.5l3-3M7 4l1-1a3 3 0 014 4l-1 1M9 12l-1 1a3 3 0 01-4-4l1-1" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  if (kind === "design")
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="5.5" stroke={stroke} strokeWidth="1.4" />
        <circle cx="8" cy="8" r="2" fill={stroke} />
      </svg>
    );
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 2h5l3 3v9H4z" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M9 2v3h3" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}
