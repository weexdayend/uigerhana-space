import React from "react";
import { BAYER_4X4, generateArtField, type DitherArtKind } from "@/lib/dither";

/**
 * Crisp 16x16 eclipse mark.
 */
export function PixelMark({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={`shrink-0 ${className}`}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect width="8" height="8" fill="currentColor" />
      <rect x="8" width="4" height="4" fill="currentColor" />
      <rect x="12" y="4" width="4" height="4" fill="currentColor" />
      <rect y="8" width="4" height="4" fill="currentColor" />
      <rect x="4" y="12" width="4" height="4" fill="currentColor" />
      <rect x="8" y="8" width="2" height="2" fill="currentColor" />
      <rect x="12" y="8" width="2" height="2" fill="currentColor" />
      <rect x="10" y="10" width="2" height="2" fill="currentColor" />
      <rect x="8" y="12" width="2" height="2" fill="currentColor" />
      <rect x="12" y="12" width="2" height="2" fill="currentColor" />
      <rect x="10" y="14" width="2" height="2" fill="currentColor" />
      <rect x="14" y="10" width="2" height="2" fill="currentColor" />
      <rect x="14" y="14" width="2" height="2" fill="#f0b765" />
    </svg>
  );
}

/**
 * Large pixel-art diagonal north-west arrow (used in Hero bottom cell like nualt.fr).
 */
export function PixelArrowNW({ className = "w-14 h-14" }: { className?: string }) {
  const cells = [
    [0, 0], [1, 0], [2, 0], [3, 0], [4, 0],
    [0, 1], [1, 1],
    [0, 2], [2, 2],
    [0, 3], [3, 3],
    [0, 4], [4, 4],
    [5, 5],
    [6, 6],
  ];
  return (
    <svg
      viewBox="0 0 7 7"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden="true"
    >
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />
      ))}
    </svg>
  );
}

/**
 * Pixel-art opening quotation mark for featured case study.
 */
export function PixelQuote({ className = "w-9 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 9 7"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M1 0h2v1H2v2h2v3H0V2h1V0zm5 0h2v1H7v2h2v3H5V2h1V0z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * True Pixel-3D Isometric Stacked Slabs with Bayer-dithered top faces and extruded 3D walls.
 * Synchronized to scroll-lock progress (0..3) so layers stagger and lock into a 3D stack.
 */
export function Pixel3DStack({
  activeStep,
  progress,
  className = "w-full h-auto",
}: {
  activeStep: number;
  progress: number;
  className?: string;
}) {
  // 4 slabs ordered top-to-bottom (0..3) so index matches the left-side service cards 1:1.
  // Render back-to-front (bottom slab 3 first -> top slab 0 last) for correct 3D painter's order.
  const slabs = [
    { index: 3, baseY: 278, label: "DESIGN" },
    { index: 2, baseY: 214, label: "COMMERCE" },
    { index: 1, baseY: 150, label: "AGENTIC AI" },
    { index: 0, baseY: 86, label: "SAAS" },
  ];

  // Pixel-stepped isometric slab path helper centered at x=230
  const halfW = 148;
  const halfH = 44;
  const depth = 22;

  return (
    <svg
      viewBox="0 0 460 400"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Crisp 4px Bayer-inspired pixel dither pattern for active slab top face */}
        <pattern
          id="pixel-dither-amber"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <rect width="4" height="4" fill="#f0b765" fillOpacity="0.16" />
          <rect x="0" y="0" width="2" height="2" fill="#f0b765" fillOpacity="0.52" />
          <rect x="2" y="2" width="2" height="2" fill="#f0b765" fillOpacity="0.34" />
        </pattern>
        <pattern
          id="pixel-dither-bone"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <rect width="4" height="4" fill="#e8e4d8" fillOpacity="0.04" />
          <rect x="0" y="0" width="1" height="1" fill="#e8e4d8" fillOpacity="0.22" />
          <rect x="2" y="2" width="1" height="1" fill="#e8e4d8" fillOpacity="0.16" />
        </pattern>
      </defs>

      {/* Background pixel axis ticks */}
      <line
        x1="230"
        y1="26"
        x2="230"
        y2="372"
        stroke="#e8e4d8"
        strokeOpacity="0.12"
        strokeDasharray="2 4"
      />
      <rect x="228" y="22" width="4" height="4" fill="#f0b765" fillOpacity="0.7" />

      {slabs.map((slab) => {
        // Compute per-layer stagger lock progress:
        // Slab 0 starts locked; slabs 1..3 drop into their stacked 3D position as scroll advances.
        const localUnlock =
          slab.index === 0
            ? 1
            : Math.max(
                0,
                Math.min(1, (progress - (slab.index * 0.25 - 0.14)) / 0.14)
              );
        const isActive = slab.index === activeStep;
        const isLocked = slab.index <= activeStep;

        // Quantized pixel-stepped vertical offset: upcoming slabs hover higher & faded before locking down
        const dropOffset = (1 - localUnlock) * -28;
        const activeLift = isActive ? -6 : 0;
        const ty = Math.round((slab.baseY + dropOffset + activeLift) / 2) * 2;
        const opacity = isLocked ? 1 : 0.26 + localUnlock * 0.45;

        const cx = 230;
        const top = `${cx},${ty - halfH}`;
        const right = `${cx + halfW},${ty}`;
        const bottom = `${cx},${ty + halfH}`;
        const left = `${cx - halfW},${ty}`;

        const leftBot = `${cx - halfW},${ty + depth}`;
        const centerBot = `${cx},${ty + halfH + depth}`;
        const rightBot = `${cx + halfW},${ty + depth}`;

        const strokeColor = isActive ? "#f0b765" : "#e8e4d8";
        const strokeOp = isActive ? 1 : isLocked ? 0.45 : 0.22;

        return (
          <g
            key={slab.label}
            style={{
              opacity,
              transition: "opacity 220ms steps(4, end)",
            }}
          >
            {/* Left 3D extruded wall */}
            <polygon
              points={`${left} ${bottom} ${centerBot} ${leftBot}`}
              fill={isActive ? "#3b2e1b" : "#141920"}
              stroke={strokeColor}
              strokeOpacity={strokeOp}
              strokeWidth="1"
            />

            {/* Right 3D extruded wall (deeper shadow) */}
            <polygon
              points={`${bottom} ${right} ${rightBot} ${centerBot}`}
              fill={isActive ? "#261e12" : "#0e1217"}
              stroke={strokeColor}
              strokeOpacity={strokeOp}
              strokeWidth="1"
            />

            {/* Top isometric face with Bayer pixel-dither fill */}
            <polygon
              points={`${top} ${right} ${bottom} ${left}`}
              fill={isActive ? "url(#pixel-dither-amber)" : "url(#pixel-dither-bone)"}
              stroke={strokeColor}
              strokeOpacity={strokeOp}
              strokeWidth="1"
            />

            {/* Crisp stepped pixel bevel nodes on the isometric corners */}
            <rect
              x={cx - 2}
              y={ty + halfH - 2}
              width="4"
              height="4"
              fill={isActive ? "#f0b765" : "#e8e4d8"}
              fillOpacity={isActive ? 1 : 0.45}
            />
            <rect
              x={cx + halfW - 3}
              y={ty - 2}
              width="4"
              height="4"
              fill={isActive ? "#f0b765" : "#e8e4d8"}
              fillOpacity={isActive ? 1 : 0.35}
            />
            <rect
              x={cx - halfW - 1}
              y={ty - 2}
              width="4"
              height="4"
              fill={isActive ? "#f0b765" : "#e8e4d8"}
              fillOpacity={isActive ? 1 : 0.35}
            />

            {/* Subtle internal pixel-circuit detail on active top face */}
            {isActive && (
              <>
                <rect x={cx - 24} y={ty - 2} width="4" height="4" fill="#f0b765" />
                <rect x={cx - 12} y={ty - 2} width="24" height="2" fill="#f0b765" fillOpacity="0.8" />
                <rect x={cx + 20} y={ty - 2} width="4" height="4" fill="#f0b765" />
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/**
 * Isometric 3-cube metric stack for the featured case study (like Nualt's Maison Kameur left cell).
 */
export function MetricCube({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="relative flex flex-col items-center justify-center border border-dashed border-[#121518]/25 bg-[#f2efe7]/90 px-4 py-4 text-center">
      <div className="font-pixel text-2xl font-bold leading-none text-[#121518]">
        {value}
      </div>
      <div className="mt-1.5 text-xs text-[#585f5e]">{label}</div>
    </div>
  );
}

/**
 * Crisp 1px isometric envelope illustration for the Work CTA cell.
 */
export function EnvelopeWireframe({ className = "w-28 h-24" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 96" fill="none" className={className} aria-hidden="true">
      <polygon
        points="16,30 78,12 104,58 42,76"
        stroke="currentColor"
        strokeOpacity="0.6"
        strokeWidth="1"
      />
      <polyline
        points="16,30 61,50 78,12"
        stroke="#f0b765"
        strokeWidth="1"
      />
      <line
        x1="42"
        y1="76"
        x2="55"
        y2="47"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeDasharray="2 2"
      />
      <line
        x1="104"
        y1="58"
        x2="68"
        y2="45"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeDasharray="2 2"
      />
    </svg>
  );
}

/**
 * Clean 1px line icons for the 4 Process steps.
 */
export function ProcessIcon({ id }: { id: string }) {
  switch (id) {
    case "scoping":
      return (
        <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden="true">
          <path d="M5 11V5h6M21 5h6v6M27 21v6h-6M11 27H5v-6" stroke="currentColor" strokeWidth="1.25" />
          <rect x="13" y="13" width="6" height="6" fill="#b8680c" />
        </svg>
      );
    case "development":
      return (
        <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden="true">
          <path d="M11 9L4 16l7 7M21 9l7 7-7 7" stroke="currentColor" strokeWidth="1.25" />
          <line x1="18" y1="7" x2="14" y2="25" stroke="#b8680c" strokeWidth="1.25" />
        </svg>
      );
    case "delivery":
      return (
        <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden="true">
          <polygon points="16,4 27,10 27,22 16,28 5,22 5,10" stroke="currentColor" strokeWidth="1.25" />
          <polyline points="5,10 16,16 27,10" stroke="currentColor" strokeWidth="1.25" />
          <line x1="16" y1="16" x2="16" y2="28" stroke="#b8680c" strokeWidth="1.25" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7" aria-hidden="true">
          <rect x="6" y="7" width="20" height="14" stroke="currentColor" strokeWidth="1.25" />
          <line x1="16" y1="21" x2="16" y2="26" stroke="currentColor" strokeWidth="1.25" />
          <line x1="10" y1="26" x2="22" y2="26" stroke="currentColor" strokeWidth="1.25" />
          <rect x="10" y="11" width="4" height="4" fill="#b8680c" />
        </svg>
      );
  }
}

/**
 * Deterministic server-renderable SVG Bayer 4x4 dithered thumbnail for editorial note cards.
 * Zero client canvas overhead for static article cards while sharing the exact Bayer 4x4 math.
 */
export function DitherArtThumbnail({
  art,
  featured = false,
}: {
  art: DitherArtKind;
  featured?: boolean;
}) {
  const cols = featured ? 56 : 44;
  const rows = featured ? 30 : 22;
  const { lum, mask } = generateArtField(art, cols, rows);

  const inkRects: string[] = [];
  const accentRects: string[] = [];

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const idx = y * cols + x;
      const threshold = BAYER_4X4[((y & 3) << 2) | (x & 3)];
      if (lum[idx] > threshold) {
        const cmd = `M${x} ${y}h1v1h-1z`;
        if (mask[idx]) accentRects.push(cmd);
        else inkRects.push(cmd);
      }
    }
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0b0e11]">
      <svg
        viewBox={`0 0 ${cols} ${rows}`}
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="crispEdges"
        className="block h-full w-full"
        aria-hidden="true"
      >
        <path d={inkRects.join("")} fill="#e8e4d8" fillOpacity="0.68" />
        <path d={accentRects.join("")} fill="#f0b765" />
      </svg>
    </div>
  );
}
