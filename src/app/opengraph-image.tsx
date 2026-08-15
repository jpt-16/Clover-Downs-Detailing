import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

/** Social share card. Mirrors the Minimal Dark palette and the wheel mark. */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0c0b",
          color: "#f2f3f1",
          padding: 72,
          borderTop: "10px solid #7cc576",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="88" height="88" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="#f2f3f1" strokeWidth="9" />
            <circle cx="50" cy="50" r="33" fill="none" stroke="#4f9154" strokeWidth="3" />
            <g fill="#7cc576" transform="translate(50 50) scale(0.62) translate(-50 -50)">
              <circle cx="38" cy="32" r="18" />
              <circle cx="62" cy="32" r="18" />
              <circle cx="38" cy="56" r="18" />
              <circle cx="62" cy="56" r="18" />
              <rect x="46" y="62" width="8" height="32" rx="4" transform="rotate(7 50 62)" />
            </g>
          </svg>
          <div style={{ display: "flex", flexDirection: "column", borderLeft: "1px solid #2c3029", paddingLeft: 20 }}>
            <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: 4 }}>CLOVER DOWNS</span>
            <span style={{ fontSize: 14, letterSpacing: 10, color: "#7cc576", marginTop: 8 }}>DETAILING</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: 7, color: "#7cc576" }}>WE COME TO YOU</span>
          <span style={{ fontSize: 108, lineHeight: 1.02, letterSpacing: -4, marginTop: 22 }}>Detailing,</span>
          <span style={{ fontSize: 108, lineHeight: 1.02, letterSpacing: -4 }}>delivered.</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #22251f",
            paddingTop: 28,
            fontSize: 22,
            letterSpacing: 4,
            color: "#8e948b",
          }}
        >
          <span>MOBILE DETAILING — BEVERLY, MA</span>
          <span style={{ color: "#7cc576" }}>{site.phone.display}</span>
        </div>
      </div>
    ),
    size,
  );
}
