"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "../components/Logo";
import { listProjects, patchProject, type Project } from "../lib/projects";
import { fmt } from "../lib/plans";
import { ADMIN_PASSCODE } from "../lib/admin";

const AUTH_KEY = "oakstudio.admin.ok";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(AUTH_KEY) === "1") {
      setAuthed(true);
    }
  }, []);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === ADMIN_PASSCODE) {
      sessionStorage.setItem(AUTH_KEY, "1");
      setAuthed(true);
    } else {
      setErr("Wrong passcode.");
    }
  };

  if (!authed) {
    return (
      <Shell>
        <div className="mx-auto mt-20 max-w-sm">
          <div className="rounded-3xl border border-ink/8 bg-white/70 p-8 backdrop-blur-sm">
            <h1 className="text-2xl font-semibold tracking-tight">Studio admin</h1>
            <p className="mt-1 text-sm text-ink/50">Enter your passcode to see all orders.</p>
            <form onSubmit={login} className="mt-6">
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Passcode"
                className="input"
                autoFocus
              />
              {err && <p className="mt-2 text-sm text-rose-500">{err}</p>}
              <button type="submit" className="btn-primary mt-4 w-full">
                Enter
              </button>
            </form>
          </div>
        </div>
      </Shell>
    );
  }

  return <AdminBoard />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen">
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

function AdminBoard() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [selected, setSelected] = useState<Project | null>(null);

  const load = async () => setProjects(await listProjects());

  useEffect(() => {
    void load();
  }, []);

  const paidOf = (p: Project) =>
    p.payments.filter((x) => x.status === "paid").reduce((s, x) => s + x.amount, 0);

  return (
    <Shell>
      <div className="mt-6 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Orders</h1>
          <p className="text-sm text-ink/50">
            {projects ? `${projects.length} project${projects.length === 1 ? "" : "s"}` : "Loading…"}
          </p>
        </div>
        <button onClick={() => void load()} className="btn-ghost !py-2 text-sm">
          ↻ Refresh
        </button>
      </div>

      {projects && projects.length === 0 && (
        <div className="mt-10 rounded-3xl border border-dashed border-ink/15 bg-paper/60 py-20 text-center text-ink/50">
          No orders yet. New projects will appear here the moment a client pays.
        </div>
      )}

      <div className="mt-6 space-y-3">
        {projects?.map((p) => (
          <button
            key={p.code}
            onClick={() => setSelected(p)}
            className="flex w-full flex-col gap-2 rounded-2xl border border-ink/8 bg-white/70 p-5 text-left transition-colors hover:border-ink/20 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-ink px-3 py-1 font-mono text-xs text-white">{p.code}</span>
              <div>
                <p className="font-medium">{p.client}</p>
                <p className="text-xs text-ink/50">
                  {p.plan} · {p.brief?.type || p.service}
                  {p.brief?.vibe ? ` · ${p.brief.vibe}` : ""}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm font-semibold">{fmt(paidOf(p))}<span className="text-ink/40"> / {fmt(p.total)}</span></p>
                <p className="text-xs text-ink/40">{p.progress}% · {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : p.startedAt}</p>
              </div>
              <span className="text-ink/30">→</span>
            </div>
          </button>
        ))}
      </div>

      {selected && <Detail project={selected} onClose={() => setSelected(null)} onSaved={load} />}
    </Shell>
  );
}

function Detail({
  project,
  onClose,
  onSaved,
}: {
  project: Project;
  onClose: () => void;
  onSaved: () => Promise<void>;
}) {
  const [progress, setProgress] = useState(project.progress);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);
  const b = project.brief || {};

  const today = () => new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const saveProgress = async () => {
    setSaving(true);
    await patchProject(project.code, { progress });
    setSaving(false);
    await onSaved();
  };

  const postUpdate = async () => {
    if (!title.trim()) return;
    setSaving(true);
    const updates = [{ date: today(), title: title.trim(), body: body.trim() }, ...project.updates];
    await patchProject(project.code, { updates });
    setTitle("");
    setBody("");
    setSaving(false);
    await onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/40 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="my-8 w-full max-w-2xl rounded-3xl border border-ink/8 bg-cream p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <span className="rounded-full bg-ink px-3 py-1 font-mono text-xs text-white">{project.code}</span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">{project.client}</h2>
            <p className="text-sm text-ink/50">{project.plan} · {project.service}</p>
            {project.email && <p className="text-sm text-ink/50">{project.email}</p>}
          </div>
          <button onClick={onClose} className="rounded-full border border-ink/12 px-3 py-1.5 text-sm text-ink/60">Close</button>
        </div>

        {/* Brief */}
        <div className="mt-6 rounded-2xl bg-white/70 p-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-ink/45">What they asked for</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <BriefItem label="Needs" value={b.type} />
            <BriefItem label="Vibe" value={b.vibe} />
            <BriefItem label="Branding" value={b.branding} />
            <BriefItem label="Goal" value={b.goal} />
            <BriefItem label="References" value={b.references} />
            <BriefItem label="Notes" value={b.notes} />
          </div>
          {b.moodboard && b.moodboard.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-ink/45">Moodboard</p>
              <div className="flex flex-wrap gap-2">
                {b.moodboard.map((url, i) => (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="h-20 w-20 overflow-hidden rounded-xl border border-ink/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={`Moodboard ${i + 1}`} className="h-full w-full object-cover" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Payments */}
        <div className="mt-4 rounded-2xl bg-white/70 p-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-ink/45">Payments</p>
          {project.payments.map((p, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-ink/60">{p.label}</span>
              <span className={p.status === "paid" ? "font-medium text-emerald-600" : "text-ink/50"}>
                {fmt(p.amount)} · {p.status}
              </span>
            </div>
          ))}
        </div>

        {/* Update progress */}
        <div className="mt-4 rounded-2xl bg-white/70 p-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-ink/45">Update project</p>
          <label className="text-sm text-ink/60">Progress: {progress}%</label>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="mt-2 w-full accent-black"
          />
          <button onClick={() => void saveProgress()} disabled={saving} className="btn-ghost mt-2 !py-2 text-sm">
            Save progress
          </button>

          <div className="mt-5 border-t border-ink/8 pt-4">
            <p className="mb-2 text-sm font-medium text-ink/70">Post an update (client sees it)</p>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Update title" className="input" />
            <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="What's new…" rows={2} className="input mt-2 resize-none" />
            <button onClick={() => void postUpdate()} disabled={saving || !title.trim()} className="btn-primary mt-2 !py-2.5 text-sm disabled:opacity-40">
              {saving ? "Saving…" : "Post update"}
            </button>
          </div>
        </div>

        {/* Feedback thread */}
        {project.comments.length > 0 && (
          <div className="mt-4 rounded-2xl bg-white/70 p-5">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-ink/45">Client feedback</p>
            <div className="space-y-2">
              {project.comments.map((c, i) => (
                <div key={i} className="text-sm">
                  <span className="text-ink/40">{c.author === "client" ? "Client" : "You"} · {c.date}: </span>
                  {c.body}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BriefItem({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wider text-ink/40">{label}</p>
      <p className="text-sm text-ink/80">{value || "—"}</p>
    </div>
  );
}
