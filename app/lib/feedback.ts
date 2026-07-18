// ─────────────────────────────────────────────────────────────
// Studio notifications — new orders + client feedback.
//
// Since the site is static (no server), we deliver to the studio via a free
// Formspree form (https://formspree.io). Paste the form endpoint below and
// every new order and every feedback message is emailed to you automatically.
//
// Leave empty ("") to fall back to a pre-filled mailto: to STUDIO_EMAIL.
// ─────────────────────────────────────────────────────────────
export const FORM_ENDPOINT = "https://formspree.io/f/xlgqbrng";
export const STUDIO_EMAIL = "oakstudio.do@gmail.com";

// Back-compat alias.
export const FEEDBACK_FORM_ENDPOINT = FORM_ENDPOINT;

async function post(payload: Record<string, unknown>): Promise<boolean> {
  if (!FORM_ENDPOINT) return false;
  try {
    await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    return true;
  } catch {
    return false;
  }
}

function mailto(subject: string, body: string) {
  if (typeof window === "undefined") return;
  window.open(
    `mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    "_blank"
  );
}

interface OrderInfo {
  code: string;
  client: string;
  email?: string;
  plan: string;
  service: string;
  deposit: number;
  total: number;
  brief?: Record<string, unknown>;
}

/** Notify the studio of a new paid order. */
export async function deliverOrder(order: OrderInfo): Promise<boolean> {
  const briefLines = order.brief
    ? Object.entries(order.brief)
        .filter(([, v]) => v)
        .map(([k, v]) => `  ${k}: ${v}`)
        .join("\n")
    : "  (none)";

  const sent = await post({
    _subject: `🌳 New order ${order.code} — ${order.plan}`,
    type: "NEW ORDER",
    code: order.code,
    client: order.client,
    email: order.email || "",
    plan: order.plan,
    service: order.service,
    deposit: order.deposit,
    total: order.total,
    brief: order.brief || {},
  });

  if (!sent) {
    mailto(
      `New order ${order.code} — ${order.plan}`,
      `NEW ORDER\n\nCode: ${order.code}\nClient: ${order.client}\nEmail: ${
        order.email || "—"
      }\nPlan: ${order.plan} (${order.service})\nDeposit paid: $${order.deposit}\nTotal: $${
        order.total
      }\n\nBrief:\n${briefLines}`
    );
  }
  return sent;
}

/**
 * A client who lost their code asks the studio to resend it.
 *
 * Deliberately does NOT look the code up on the page: the code unlocks a
 * private dashboard, and anyone could type someone else's email. Instead the
 * request reaches the studio, who confirms the email is on file and sends the
 * code back to that address — so the code only ever goes to its owner's inbox.
 */
export async function requestCodeRecovery(email: string): Promise<boolean> {
  const clean = email.trim();
  const sent = await post({
    _subject: `🔑 Code recovery request — ${clean}`,
    type: "CODE RECOVERY",
    email: clean,
    note: "Client lost their tracking code. Look them up in /admin and reply with it.",
  });
  if (!sent) {
    mailto(
      "I lost my project code",
      `Hi OakStudio,\n\nI can't find my project tracking code. Could you resend it?\n\nThe email I used to start the project: ${clean}\n\nThanks!`
    );
  }
  return sent;
}

/** Deliver a client comment to the studio. */
export async function deliverFeedback(
  code: string,
  client: string,
  body: string
): Promise<boolean> {
  const sent = await post({
    _subject: `Feedback on ${code}`,
    type: "FEEDBACK",
    project: code,
    client,
    message: body,
  });
  if (!sent) {
    mailto(`Feedback on project ${code}`, `Project: ${code}\nFrom: ${client}\n\n${body}`);
  }
  return sent;
}
