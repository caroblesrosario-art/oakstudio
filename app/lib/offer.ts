import type { Plan } from "./plans";

// ─────────────────────────────────────────────────────────────
// Founding-client launch offer.
//
// The first few clients get a founding rate in exchange for a testimonial +
// case-study permission — the discount buys social proof, which is what a
// cold-start studio actually needs.
//
// • Set ACTIVE to false to end the offer (prices snap back everywhere).
// • Drop SPOTS_LEFT by 1 as each founding project comes in. It's shown as
//   scarcity ("2 spots left"); it is NOT auto-enforced, so you stay in control.
// ─────────────────────────────────────────────────────────────
export const FOUNDING = {
  active: true,
  percentOff: 25,
  spotsTotal: 3,
  spotsLeft: 3,
};

/** Does the founding discount apply to this plan? (Custom is quote-based.) */
export function foundingApplies(plan: Plan): boolean {
  return FOUNDING.active && plan.price > 0;
}

/** The price actually charged, after any active founding discount. */
export function foundingPrice(plan: Plan): number {
  if (!foundingApplies(plan)) return plan.price;
  return Math.round((plan.price * (100 - FOUNDING.percentOff)) / 100);
}
