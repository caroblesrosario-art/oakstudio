"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { PAYPAL_CLIENT_ID, PAYPAL_ENABLED } from "../lib/payment";

// Load the PayPal JS SDK once and reuse the promise across mounts.
let sdkPromise: Promise<PayPalNamespace> | null = null;

interface PayPalNamespace {
  Buttons: (opts: Record<string, unknown>) => { render: (el: HTMLElement) => Promise<void> };
}

function loadSdk(): Promise<PayPalNamespace> {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  const w = window as unknown as { paypal?: PayPalNamespace };
  if (w.paypal) return Promise.resolve(w.paypal);
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=" +
      encodeURIComponent(PAYPAL_CLIENT_ID) +
      "&currency=USD&components=buttons&intent=capture";
    script.onload = () => {
      const ns = (window as unknown as { paypal?: PayPalNamespace }).paypal;
      ns ? resolve(ns) : reject(new Error("PayPal SDK failed to initialise"));
    };
    script.onerror = () => reject(new Error("PayPal SDK failed to load"));
    document.body.appendChild(script);
  });
  return sdkPromise;
}

/**
 * Renders real PayPal buttons for `amount`. On a captured payment, calls
 * `onPaid(orderId)`. If PayPal isn't configured or the SDK can't load,
 * renders `fallback` instead (our PayPal.me flow) so checkout never breaks.
 */
export default function PayPalButtons({
  amount,
  onPaid,
  fallback,
}: {
  amount: number;
  onPaid: (orderId: string) => void;
  fallback: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const renderedRef = useRef(false);
  const [state, setState] = useState<"loading" | "ready" | "error">(
    PAYPAL_ENABLED ? "loading" : "error"
  );

  useEffect(() => {
    if (!PAYPAL_ENABLED) return;
    let active = true;

    loadSdk()
      .then((paypal) => {
        if (!active || !containerRef.current || renderedRef.current) return;
        renderedRef.current = true;
        return paypal
          .Buttons({
            style: { color: "blue", shape: "pill", label: "pay", height: 48 },
            createOrder: (_data: unknown, actions: any) =>
              actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    description: "OakStudio project deposit",
                    amount: { currency_code: "USD", value: amount.toFixed(2) },
                  },
                ],
              }),
            onApprove: (_data: unknown, actions: any) =>
              actions.order.capture().then((details: { id: string }) => {
                if (active) onPaid(details.id);
              }),
            onError: () => {
              if (active) setState("error");
            },
          })
          .render(containerRef.current);
      })
      .then(() => active && setState("ready"))
      .catch(() => active && setState("error"));

    return () => {
      active = false;
    };
    // amount is fixed per checkout; buttons render once.
  }, [amount, onPaid]);

  if (state === "error") return <>{fallback}</>;

  return (
    <div>
      <div ref={containerRef} className="min-h-[52px]" />
      {state === "loading" && (
        <p className="text-center text-xs text-ink/40">Loading secure PayPal checkout…</p>
      )}
    </div>
  );
}
