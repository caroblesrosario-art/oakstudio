import { ImageResponse } from "next/og";

// Source for public/og.png — NOT a live route.
//
// Kept out of app/ on purpose: as app/opengraph-image.tsx, Next exports it to
// `out/opengraph-image` with no extension, and a static host (GitHub Pages)
// then serves it as octet-stream, so scrapers skip the image entirely.
//
// To regenerate after editing: move this file to app/opengraph-image.tsx,
// run the build, then `cp out/opengraph-image public/og.png` and move it back.
//
// The preview card people see when the link is shared (WhatsApp, IG, LinkedIn,
// X, Slack). Sharing is the studio's main channel, so this is load-bearing.
export const alt = "OakStudio — Web, App & Brand design studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FBF9F4",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* soft periwinkle wash, top-right */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -140,
            width: 560,
            height: 560,
            borderRadius: 9999,
            backgroundColor: "#E7EDFF",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 90,
            width: 240,
            height: 240,
            borderRadius: 9999,
            backgroundColor: "#D2DEFF",
            display: "flex",
          }}
        />

        {/* label */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 9999,
              backgroundColor: "#6E85E0",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              color: "#141210",
              opacity: 0.55,
              textTransform: "uppercase",
            }}
          >
            Design &amp; Code Studio
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 128,
              fontWeight: 700,
              letterSpacing: -5,
              color: "#141210",
              lineHeight: 1,
              display: "flex",
            }}
          >
            OakStudio
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 40,
              color: "#141210",
              opacity: 0.72,
              lineHeight: 1.3,
              maxWidth: 900,
              display: "flex",
            }}
          >
            Plans, not proposals. Pay 50% to start — track everything from your
            own dashboard.
          </div>
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 14 }}>
            {["Websites", "Apps", "Brand", "CRM", "Ads"].map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  border: "1px solid rgba(20,18,16,0.16)",
                  borderRadius: 9999,
                  padding: "10px 22px",
                  fontSize: 24,
                  color: "#141210",
                  opacity: 0.7,
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 26, color: "#141210", opacity: 0.45, display: "flex" }}>
            oakstudio.cloud
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
