import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

const LEAF =
  "M0,0 C-13,-9 -21,-22 -12,-30 C-6.5,-34.5 -0.5,-31.5 0,-26 C0.5,-31.5 6.5,-34.5 12,-30 C21,-22 13,-9 0,0 Z";

/** Social share card. Mirrors the Minimal Dark palette. */
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
          <svg width="80" height="80" viewBox="0 0 200 200">
            <g transform="translate(100 100) scale(2.1)" fill="#7cc576">
              <path d={LEAF} transform="rotate(45)" />
              <path d={LEAF} transform="rotate(135)" />
              <path d={LEAF} transform="rotate(225)" />
              <path d={LEAF} transform="rotate(315)" />
            </g>
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 26, fontWeight: 600, letterSpacing: 9 }}>CLOVER DOWNS</span>
            <span style={{ fontSize: 15, letterSpacing: 11, color: "#8e948b", marginTop: 6 }}>DETAILING</span>
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
