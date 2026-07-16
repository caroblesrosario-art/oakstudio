// ─────────────────────────────────────────────────────────────
// PayPal.me payment config
//
// ⚠️  SET THIS to your exact PayPal.me handle — the part after
//     paypal.me/  (e.g. if your link is paypal.me/oakstudio → "oakstudio").
//     A wrong handle sends clients to the wrong/broken payment page.
// ─────────────────────────────────────────────────────────────
export const PAYPALME_USER = "oakstudio";

// Currency forced in the link so amounts always match the USD prices on the
// site (PayPal.me otherwise defaults to the account's own currency).
export const PAY_CURRENCY = "USD";

/** Build a PayPal.me link with the amount pre-filled. */
export function paypalMeLink(amount: number): string {
  return `https://www.paypal.com/paypalme/${PAYPALME_USER}/${Math.round(
    amount
  )}${PAY_CURRENCY}`;
}
