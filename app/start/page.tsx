"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Logo from "../components/Logo";
import { plans, planById, customPlan, fmt } from "../lib/plans";
import { FOUNDING, foundingApplies, foundingPrice } from "../lib/offer";
import { createProject, type Project } from "../lib/projects";
import { paypalMeLink } from "../lib/payment";
import { deliverOrder } from "../lib/feedback";
import { uploadMoodboardImage } from "../lib/supabase";
import PayPalButtons from "../components/PayPalButtons";

export default function StartPage() {
  return (
    <Suspense fallback={<Shell><div className="py-20 text-center text-ink/40">Loading…</div></Shell>}>
      <StartFlow />
    </Suspense>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full opacity-60 blur-[130px]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(184,201,255,0.5) 0%, rgba(184,201,255,0) 70%)",
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

type Step = 0 | 1 | 2 | 3;

function StartFlow() {
  const params = useSearchParams();
  const initialPlan = params.get("plan") || "signature";

  const [step, setStep] = useState<Step>(0);
  const [planId, setPlanId] = useState(initialPlan);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [brief, setBrief] = useState("");
  // Guided brief selections (so clients never face a blank box)
  const [bType, setBType] = useState("");
  const [bVibe, setBVibe] = useState("");
  const [bBranding, setBBranding] = useState("");
  const [bGoal, setBGoal] = useState("");
  const [refs, setRefs] = useState("");
  const [moodboard, setMoodboard] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [sessionId] = useState(() => "mb-" + Math.random().toString(36).slice(2, 10));
  const [processing, setProcessing] = useState(false);
  const [initiated, setInitiated] = useState(false);
  const [created, setCreated] = useState<Project | null>(null);
  const [bBudget, setBBudget] = useState("");

  useEffect(() => {
    if (planById(initialPlan)) setPlanId(initialPlan);
  }, [initialPlan]);

  const plan = planById(planId) ?? plans.find((p) => p.best) ?? plans[0];
  const custom = plan.id === "custom";
  // The founding offer discounts the price actually charged, not just the
  // marketing — deposit, balance, total and the PayPal amount all use it.
  const price = foundingPrice(plan);
  const discounted = foundingApplies(plan);
  const deposit = Math.round(price / 2);
  const balance = price - deposit;

  const canContinueDetails = name.trim().length > 1 && /\S+@\S+\.\S+/.test(email);

  const [minting, setMinting] = useState(false);

  const uploadFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    for (const file of Array.from(files).slice(0, 8)) {
      if (!file.type.startsWith("image/")) continue;
      const url = await uploadMoodboardImage(file, sessionId);
      if (url) setMoodboard((m) => [...m, url]);
    }
    setUploading(false);
  };

  const mintProject = async () => {
    if (minting) return;
    setMinting(true);
    const briefData = {
      type: bType || undefined,
      vibe: bVibe || undefined,
      branding: bBranding || undefined,
      goal: bGoal || undefined,
      budget: custom ? bBudget || undefined : undefined,
      references: refs.trim() || undefined,
      notes: brief.trim() || undefined,
      moodboard: moodboard.length ? moodboard : undefined,
    };
    const project = await createProject({
      client: name.trim(),
      email: email.trim() || undefined,
      plan: plan.name,
      service: plan.service,
      total: price,
      brief: briefData,
      custom,
    });
    // Notify the studio of the new order (email via Formspree, or mailto fallback).
    void deliverOrder({
      code: project.code,
      client: name.trim(),
      email: email.trim(),
      plan: plan.name,
      service: plan.service,
      deposit,
      total: price,
      brief: briefData,
    });
    setCreated(project);
    setMinting(false);
    setStep(3);
  };

  // Real PayPal checkout captured the payment — mint the code right away.
  const onPaidWithPayPal = () => {
    void mintProject();
  };

  // ── PayPal.me fallback (used only if the PayPal SDK can't load) ──
  // 1) Open PayPal.me with the deposit amount pre-filled (new tab).
  const openPayPal = () => {
    window.open(paypalMeLink(deposit), "_blank", "noopener,noreferrer");
    setInitiated(true);
  };
  // 2) Client confirms they paid, then we mint the code.
  const confirmPaid = () => {
    setProcessing(true);
    void mintProject().finally(() => setProcessing(false));
  };

  return (
    <Shell>
      {step < 3 && <Steps step={step} custom={custom} />}

      <div className="mx-auto mt-8 max-w-3xl">
        {step === 0 && (
          <Card
            title="Choose your plan"
            subtitle="Fixed scope, fixed price. You can change this before you pay."
          >
            <div className="grid gap-3">
              {plans.map((p) => {
                const active = p.id === planId;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPlanId(p.id)}
                    className={`flex items-center justify-between rounded-2xl border p-5 text-left transition-all ${
                      active
                        ? "border-ink bg-white shadow-[0_20px_50px_-30px_rgba(11,11,12,0.4)]"
                        : "border-ink/10 bg-white/50 hover:border-ink/25"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                          active ? "border-ink bg-ink" : "border-ink/25"
                        }`}
                      >
                        {active && <span className="h-2 w-2 rounded-full bg-white" />}
                      </span>
                      <div>
                        <p className="font-semibold">
                          {p.name}{" "}
                          {p.best && (
                            <span className="ml-1 rounded-full bg-periwinkle-100 px-2 py-0.5 text-[10px] font-medium text-periwinkle-500">
                              Popular
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-ink/50">{p.tagline}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {foundingApplies(p) && (
                          <span className="mr-1.5 text-xs font-normal text-ink/35 line-through">{fmt(p.price)}</span>
                        )}
                        {fmt(foundingPrice(p))}
                      </p>
                      <p className="text-xs text-ink/40">{fmt(foundingPrice(p) / 2)} to start</p>
                    </div>
                  </button>
                );
              })}

              {/* Custom / not sure */}
              <button
                onClick={() => setPlanId("custom")}
                className={`flex items-center justify-between rounded-2xl border border-dashed p-5 text-left transition-all ${
                  custom
                    ? "border-ink bg-white shadow-[0_20px_50px_-30px_rgba(11,11,12,0.4)]"
                    : "border-ink/25 bg-white/40 hover:border-ink/40"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${custom ? "border-ink bg-ink" : "border-ink/25"}`}>
                    {custom && <span className="h-2 w-2 rounded-full bg-white" />}
                  </span>
                  <div>
                    <p className="font-semibold">Custom / Not sure</p>
                    <p className="text-sm text-ink/50">Something exact that isn't listed, or you're just exploring.</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-periwinkle-500">Get a quote</p>
                  <p className="text-xs text-ink/40">No upfront payment</p>
                </div>
              </button>
            </div>
            <FooterBar>
              <span className="text-sm text-ink/50">
                {plan.name} · {plan.timeline}
              </span>
              <button className="btn-primary" onClick={() => setStep(1)}>
                Continue
              </button>
            </FooterBar>
          </Card>
        )}

        {step === 1 && (
          <Card
            title="Let's shape your brief — together"
            subtitle="Not sure what to write? Just tap what fits. There are no wrong answers — we'll refine the rest with you."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Your name">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Marisol Peña"
                  className="input"
                />
              </Field>
              <Field label="Email">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  type="email"
                  className="input"
                />
              </Field>
            </div>

            <div className="mt-6 space-y-6">
              <ChipGroup
                label="What do you need?"
                value={bType}
                onChange={setBType}
                options={["Website", "Web app", "Mobile app", "CRM / internal tool", "Ads & branding", "Not sure yet"]}
              />
              <ChipGroup
                label="What vibe are you going for?"
                value={bVibe}
                onChange={setBVibe}
                options={["Minimal & premium", "Warm & editorial", "Bold & colorful", "Clean & corporate", "Playful", "Show me options"]}
              />
              <ChipGroup
                label="Do you have branding?"
                value={bBranding}
                onChange={setBBranding}
                options={["Full brand kit", "Just a logo", "Nothing yet — need it"]}
              />
              <ChipGroup
                label="What's the main goal?"
                value={bGoal}
                onChange={setBGoal}
                options={["Get more clients", "Sell products", "Look more credible", "Launch something fast", "Replace an old site"]}
              />

              {custom && (
                <ChipGroup
                  label="Rough budget? (helps us scope it right)"
                  value={bBudget}
                  onChange={setBBudget}
                  options={["Under $1k", "$1k–3k", "$3k–6k", "$6k–10k", "$10k+", "Not sure yet"]}
                />
              )}

              <Field label="Any sites or brands you love?" hint="Optional — paste links or names">
                <input
                  value={refs}
                  onChange={(e) => setRefs(e.target.value)}
                  placeholder="e.g. aery.com, that clean skincare brand you saw…"
                  className="input"
                />
              </Field>
              <Field label="Anything else on your mind?" hint="Optional">
                <textarea
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder="A must-have feature, a deadline, colors you love or hate — whatever's in your head."
                  rows={3}
                  className="input resize-none"
                />
              </Field>

              {/* Moodboard */}
              <div>
                <span className="mb-2 flex items-center justify-between text-sm font-medium text-ink/70">
                  Your moodboard
                  <span className="text-xs font-normal text-ink/35">Optional — drag in images that inspire you</span>
                </span>
                <label
                  className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-ink/20 bg-white/50 px-6 py-8 text-center transition-colors hover:border-ink/40 hover:bg-white"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    void uploadFiles(e.dataTransfer.files);
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => void uploadFiles(e.target.files)}
                  />
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-periwinkle-500">
                    <path d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm text-ink/60">
                    {uploading ? "Uploading…" : "Drop images here or click to upload"}
                  </span>
                  <span className="text-xs text-ink/35">Screenshots, photos, color palettes — up to 8</span>
                </label>

                {moodboard.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {moodboard.map((url, i) => (
                      <div key={i} className="group relative h-20 w-20 overflow-hidden rounded-xl border border-ink/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={url} alt={`Moodboard ${i + 1}`} className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setMoodboard((m) => m.filter((_, j) => j !== i))}
                          className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink/70 text-[11px] text-white opacity-0 transition-opacity group-hover:opacity-100"
                          aria-label="Remove image"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <p className="rounded-2xl bg-periwinkle-50 px-4 py-3 text-sm text-ink/60">
                💡 This is just a starting point. Once you're in, we turn it into a
                clear scope and you approve everything from your dashboard.
              </p>
            </div>
            <FooterBar>
              <button className="text-sm text-ink/50 hover:text-ink" onClick={() => setStep(0)}>
                ← Back
              </button>
              <button
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
                disabled={!canContinueDetails}
                onClick={() => setStep(2)}
              >
                {custom ? "Continue to request" : "Continue to deposit"}
              </button>
            </FooterBar>
          </Card>
        )}

        {step === 2 && minting && (
          <Card
            title={custom ? "Sending your request…" : "Confirming your payment…"}
            subtitle="Hang tight — we're creating your project and code."
          >
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-ink/50">
              <Spinner />
              <p className="text-sm">Setting things up…</p>
            </div>
          </Card>
        )}

        {/* Custom request — no upfront payment */}
        {step === 2 && !minting && custom && (
          <Card
            title="Send your custom request"
            subtitle="No payment now — we'll review what you need and send a custom quote."
          >
            <div className="rounded-2xl bg-paper p-5">
              <p className="text-xs text-ink/40">Request summary</p>
              <p className="mt-1 font-semibold">Custom project</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {[bType, bVibe, bGoal, bBudget].filter(Boolean).map((v) => (
                  <span key={v} className="rounded-full border border-ink/10 bg-white px-3 py-1 text-ink/60">{v}</span>
                ))}
                {moodboard.length > 0 && (
                  <span className="rounded-full border border-ink/10 bg-white px-3 py-1 text-ink/60">
                    {moodboard.length} moodboard image{moodboard.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-4 rounded-2xl border border-ink/10 p-5">
              <p className="text-sm text-ink/60">
                We'll get your request instantly and send a custom quote to{" "}
                <span className="font-medium text-ink">{email.trim() || "your email"}</span>{" "}
                — usually within a couple of days. You'll get a code to track it right away.
              </p>
              <button onClick={() => void mintProject()} className="btn-primary mt-4 w-full">
                Send my request
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <p className="mt-3 text-center text-xs text-ink/40">
                Free · No commitment until you approve the quote.
              </p>
            </div>
            <FooterBar>
              <button className="text-sm text-ink/50 hover:text-ink" onClick={() => setStep(1)}>
                ← Back
              </button>
              <span />
            </FooterBar>
          </Card>
        )}

        {step === 2 && !minting && !custom && (
          <Card title="Pay your 50% deposit" subtitle="This starts your project and creates your code.">
            <div className="grid gap-6 sm:grid-cols-5">
              {/* summary */}
              <div className="sm:col-span-2">
                <div className="rounded-2xl bg-paper p-5">
                  <p className="text-xs text-ink/40">Order summary</p>
                  <p className="mt-1 font-semibold">{plan.name} plan</p>
                  <p className="text-sm text-ink/50">{plan.service}</p>
                  <div className="mt-4 space-y-2 border-t border-ink/8 pt-4 text-sm">
                    <Row
                      label={discounted ? `Project total (−${FOUNDING.percentOff}% founding)` : "Project total"}
                      value={
                        discounted ? (
                          <span className="flex items-center gap-2">
                            <span className="text-ink/40 line-through">{fmt(plan.price)}</span>
                            {fmt(price)}
                          </span>
                        ) : (
                          fmt(price)
                        )
                      }
                    />
                    <Row label="Due today (50%)" value={fmt(deposit)} strong />
                    <Row label="On launch (50%)" value={fmt(balance)} muted />
                  </div>
                </div>
                <p className="mt-3 text-xs text-ink/40">
                  You only ever pay half up front. The balance is due when your
                  project launches — never before.
                </p>
              </div>

              {/* PayPal checkout */}
              <div className="sm:col-span-3">
                <div className="rounded-2xl border border-ink/10 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Pay securely with PayPal</p>
                    <PayPalWordmark />
                  </div>

                  <p className="mt-3 text-sm text-ink/55">
                    Pay the <span className="font-medium text-ink">{fmt(deposit)}</span>{" "}
                    deposit with PayPal or card. Your project code is created the
                    moment the payment clears.
                  </p>

                  <div className="mt-4">
                    <PayPalButtons
                      amount={deposit}
                      onPaid={onPaidWithPayPal}
                      fallback={
                        !initiated ? (
                          <button
                            onClick={openPayPal}
                            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0070E0] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0060c0]"
                          >
                            Pay {fmt(deposit)} with PayPal
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M4 12L12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        ) : (
                          <>
                            <div className="rounded-xl bg-periwinkle-50 p-4">
                              <p className="text-sm font-medium text-ink">PayPal opened in a new tab.</p>
                              <p className="mt-1 text-sm text-ink/55">
                                Complete the {fmt(deposit)} payment there, then
                                come back and confirm below.
                              </p>
                            </div>
                            <button
                              onClick={confirmPaid}
                              disabled={processing}
                              className="btn-primary mt-4 w-full disabled:opacity-70"
                            >
                              {processing ? (
                                <span className="inline-flex items-center gap-2">
                                  <Spinner /> Creating your project…
                                </span>
                              ) : (
                                <>I've completed my payment</>
                              )}
                            </button>
                            <button
                              onClick={openPayPal}
                              className="mt-2 w-full text-center text-xs text-ink/45 hover:text-ink"
                            >
                              Re-open PayPal
                            </button>
                          </>
                        )
                      }
                    />
                  </div>

                  <p className="mt-3 text-center text-xs text-ink/40">
                    Payments go to OakStudio via PayPal. Secure checkout.
                  </p>
                </div>
              </div>
            </div>
            <FooterBar>
              <button className="text-sm text-ink/50 hover:text-ink" onClick={() => setStep(1)}>
                ← Back
              </button>
              <span />
            </FooterBar>
          </Card>
        )}

        {step === 3 && created && <Success project={created} deposit={deposit} />}
      </div>
    </Shell>
  );
}

function Success({ project, deposit }: { project: Project; deposit: number }) {
  const custom = project.plan === "Custom" || project.total === 0;
  return (
    <div className="mx-auto max-w-xl text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ink text-white">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12.5l4 4 10-10.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight">
        {custom ? "Request sent 🎉" : "You're all set 🎉"}
      </h1>
      <p className="mt-3 text-ink/55">
        {custom ? (
          <>
            Thanks! We've got your custom request and we're reviewing it now.
            We'll send a quote to your email soon. Save your code — you can track
            the status anytime.
          </>
        ) : (
          <>
            Thanks for your {fmt(deposit)} deposit! Your project is live — save
            your code, it's how you'll track everything. We'll confirm your
            PayPal payment and get started right away.
          </>
        )}
      </p>

      <div className="mt-8 rounded-3xl border border-ink/10 bg-white p-8 shadow-[0_30px_70px_-40px_rgba(11,11,12,0.35)]">
        <p className="text-xs uppercase tracking-widest text-ink/40">Your project code</p>
        <p className="mt-2 font-display text-5xl font-light tracking-tight">{project.code}</p>
        <p className="mt-2 text-sm text-ink/50">{project.plan} · {project.service}</p>
        <Link href={`/dashboard?code=${project.code}`} className="btn-primary mt-6 w-full">
          Open my dashboard
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
      <p className="mt-4 text-xs text-ink/40">
        We've also (conceptually) emailed your code to your inbox.
      </p>
    </div>
  );
}

/* ---------- little building blocks ---------- */

function Steps({ step, custom }: { step: Step; custom?: boolean }) {
  const labels = ["Plan", "Brief", custom ? "Request" : "Deposit"];
  return (
    <div className="mx-auto mt-10 flex max-w-md items-center justify-between">
      {labels.map((l, i) => (
        <div key={l} className="flex flex-1 items-center">
          <div className="flex items-center gap-2">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors ${
                i <= step ? "bg-ink text-white" : "bg-ink/8 text-ink/40"
              }`}
            >
              {i < step ? "✓" : i + 1}
            </span>
            <span className={`text-sm ${i <= step ? "text-ink" : "text-ink/40"}`}>{l}</span>
          </div>
          {i < labels.length - 1 && (
            <span
              className={`mx-3 h-px flex-1 ${i < step ? "bg-ink" : "bg-ink/10"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-ink/8 bg-white/70 p-7 shadow-[0_30px_80px_-50px_rgba(11,11,12,0.3)] backdrop-blur-sm sm:p-9">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-1 text-sm text-ink/50">{subtitle}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function FooterBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-7 flex items-center justify-between border-t border-ink/8 pt-6">
      {children}
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-sm font-medium text-ink/70">
        {label}
        {hint && <span className="text-xs font-normal text-ink/35">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

function Row({
  label,
  value,
  strong,
  muted,
}: {
  label: string;
  value: React.ReactNode;
  strong?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={muted ? "text-ink/40" : "text-ink/60"}>{label}</span>
      <span className={strong ? "font-semibold" : muted ? "text-ink/50" : ""}>{value}</span>
    </div>
  );
}

function ChipGroup({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div>
      <p className="mb-2.5 text-sm font-medium text-ink/70">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(active ? "" : opt)}
              className={`rounded-full border px-4 py-2 text-sm transition-all duration-200 ${
                active
                  ? "border-ink bg-ink text-white"
                  : "border-ink/12 bg-white/60 text-ink/70 hover:border-ink/30 hover:text-ink"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PayPalWordmark() {
  return (
    <span className="select-none text-sm font-bold italic tracking-tight">
      <span className="text-[#003087]">Pay</span>
      <span className="text-[#0070E0]">Pal</span>
    </span>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
