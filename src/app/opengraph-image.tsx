import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

/** Social share card. Mirrors the Minimal Dark palette and the v4 badge mark. */
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
            <circle cx="50" cy="50" r="50" fill="#0b0c0b" />
            <circle cx="50" cy="50" r="47.2" fill="none" stroke="#4f9154" strokeWidth="1.6" />
            <g fill="#7cc576" transform="translate(50 50) scale(0.92) translate(-50 -50.5)">
              <circle cx="35" cy="29" r="16" />
              <circle cx="65" cy="29" r="16" />
              <circle cx="35" cy="59" r="16" />
              <circle cx="65" cy="59" r="16" />
              <circle cx="50" cy="44" r="10" />
              <rect x="47.5" y="55" width="5" height="33" rx="2.5" />
            </g>
          </svg>
          <div style={{ display: "flex", flexDirection: "column", borderLeft: "1px solid #2c3029", paddingLeft: 20 }}>
            <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: 4 }}>CLOVER DOWNS</span>
            <span style={{ fontSize: 14, letterSpacing: 10, color: "#7cc576", marginTop: 8 }}>DETAILING</span>
          </div>
        </div>

        {/* Mirrors the hero headline — a share card that promises something
            different from the page it links to is a wasted first impression. */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: 6, color: "#7cc576" }}>
            MOBILE DETAILING — {site.areaLabel.toUpperCase()}
          </span>
          <span style={{ fontSize: 86, lineHeight: 1.04, letterSpacing: -3, marginTop: 22 }}>Your car, detailed</span>
          <span style={{ fontSize: 86, lineHeight: 1.04, letterSpacing: -3 }}>in your driveway.</span>
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
          <span>FREE QUOTES — NO DEPOSIT</span>
          <span style={{ color: "#7cc576" }}>{site.phone.display}</span>
        </div>
      </div>
    ),
    size,
  );
}
