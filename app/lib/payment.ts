// ─────────────────────────────────────────────────────────────
// PayPal.me payment config
//
// ⚠️  SET THIS to your exact PayPal.me handle — the part after
//     paypal.me/  (e.g. if your link is paypal.me/oakstudio → "oakstudio").
//     A wrong handle sends clients to the wrong/broken payment page.
// ─────────────────────────────────────────────────────────────
export const PAYPALME_USER = "oakstudio";

// ─────────────────────────────────────────────────────────────
// PayPal client-side checkout (JS SDK "Buttons")
//
// This Client ID is PUBLIC — it's meant to live in the frontend.
// Get it from developer.paypal.com → Apps & Credentials → your app.
// Use the Sandbox Client ID to test, the Live one to go live.
//
// ⚠️  NEVER put the "Secret" here — the Secret is server-only and is
//     not needed for this client-side integration.
//
// Leave empty ("") to fall back to the simpler PayPal.me flow.
// ─────────────────────────────────────────────────────────────
export const PAYPAL_CLIENT_ID = "";

export const PAYPAL_ENABLED = PAYPAL_CLIENT_ID.trim().length > 0;

// Currency forced in the link so amounts always match the USD prices on the
// site (PayPal.me otherwise defaults to the account's own currency).
export const PAY_CURRENCY = "USD";

/** Build a PayPal.me link with the amount pre-filled. */
export function paypalMeLink(amount: number): string {
  return `https://www.paypal.com/paypalme/${PAYPALME_USER}/${Math.round(
    amount
  )}${PAY_CURRENCY}`;
}
