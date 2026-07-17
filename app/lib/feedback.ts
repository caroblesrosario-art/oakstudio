// Where client feedback is delivered.
//
// Easiest path (works with zero setup): a mailto: to the studio — the client's
// comment opens a pre-filled email to STUDIO_EMAIL.
//
// Nicer path (in-app, no email client): create a free form at formspree.io and
// paste its endpoint here — feedback is POSTed silently in the background.
export const FEEDBACK_FORM_ENDPOINT = ""; // e.g. "https://formspree.io/f/abcdwxyz"
export const STUDIO_EMAIL = "oakstudio.do@gmail.com";

/** Deliver a client comment to the studio. Returns true if sent via Formspree. */
export async function deliverFeedback(
  code: string,
  client: string,
  body: string
): Promise<boolean> {
  if (FEEDBACK_FORM_ENDPOINT) {
    try {
      await fetch(FEEDBACK_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ project: code, client, message: body }),
      });
      return true;
    } catch {
      /* fall through to mailto */
    }
  }
  // Fallback: open a pre-filled email to the studio.
  const subject = encodeURIComponent(`Feedback on project ${code}`);
  const emailBody = encodeURIComponent(`Project: ${code}\nFrom: ${client}\n\n${body}`);
  if (typeof window !== "undefined") {
    window.open(`mailto:${STUDIO_EMAIL}?subject=${subject}&body=${emailBody}`, "_blank");
  }
  return false;
}
