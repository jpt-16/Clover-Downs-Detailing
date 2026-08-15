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
            <circle cx="50" cy="50" r="50" fill="#101210" />
            <circle cx="50" cy="50" r="47.2" fill="none" stroke="#4f9154" strokeWidth="1.6" />
            <circle cx="50" cy="50" r="44.4" fill="none" stroke="#f2f3f1" strokeOpacity="0.14" strokeWidth="0.7" />
            <g fill="#7cc576" transform="translate(50 47) scale(0.86) translate(-50 -55.5)">
              <circle cx="36" cy="30" r="15" />
              <circle cx="64" cy="30" r="15" />
              <circle cx="36" cy="58" r="15" />
              <circle cx="64" cy="58" r="15" />
              <rect x="36" y="30" width="28" height="28" rx="12" />
              <rect x="46" y="64" width="8" height="30" rx="4" transform="rotate(7 50 64)" />
            </g>
            <g transform="translate(50 47) scale(0.86) translate(-50 -55.5)">
              <g transform="rotate(-32 36 30)" fill="#f2f3f1" fillOpacity="0.5">
                <rect x="30.6" y="21" width="4.6" height="17" rx="2.3" />
                <rect x="37.4" y="24" width="2.2" height="11" rx="1.1" />
              </g>
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
