import { ImageResponse } from "next/og";

export const alt = "Irvan Gerhana — Product Engineer. From pixel to production.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0b0e11 0%, #182027 100%)",
          color: "#e8e4d8",
          padding: "72px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            color: "#f0b765",
            fontSize: "20px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: "14px", height: "14px", background: "#f0b765" }} />
          UI GERHANA
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "76px", lineHeight: 1, letterSpacing: "-0.065em", fontWeight: 500 }}>
            Irvan Gerhana
          </div>
          <div style={{ marginTop: "24px", fontSize: "27px", color: "#f0b765", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Product Engineer
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(232,228,216,0.25)",
            paddingTop: "24px",
            fontSize: "20px",
            color: "rgba(232,228,216,0.76)",
          }}
        >
          <span>From pixel to production.</span>
          <span>uigerhana.space</span>
        </div>
        <div style={{ position: "absolute", right: "72px", top: "72px", display: "flex", gap: "8px", opacity: 0.45 }}>
          <div style={{ width: "12px", height: "12px", background: "#f0b765" }} />
          <div style={{ width: "12px", height: "12px", background: "#e8e4d8" }} />
          <div style={{ width: "12px", height: "12px", background: "#8c969a" }} />
        </div>
      </div>
    ),
    size
  );
}
