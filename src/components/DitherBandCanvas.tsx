"use client";

import React, { useEffect, useRef } from "react";
import {
  BAYER_4X4,
  DITHER_PALETTES,
  generateArtField,
  type DitherArtKind,
  type DitherTheme,
  type FieldBuffers,
} from "@/lib/dither";

interface DitherBandCanvasProps {
  art?: DitherArtKind;
  palette?: DitherTheme;
  baseBlock?: number;
  className?: string;
}

/**
 * Quiet, HUD-free Bayer 4x4 dithered canvas with progressive boot resolve
 * and subtle 4px -> 1px pointer lens.
 */
export function DitherBandCanvas({
  art = "eclipse-horizon",
  palette = "eclipse",
  baseBlock = 4,
  className = "",
}: DitherBandCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const stateRef = useRef({
    px: 2,
    w: 0,
    h: 0,
    lum: new Float32Array(0) as FieldBuffers["lum"],
    mask: new Uint8Array(0) as FieldBuffers["mask"],
    img: null as ImageData | null,
    buf: new Uint32Array(0) as Uint32Array<ArrayBufferLike>,
    lx: 0,
    ly: 0,
    tx: 0,
    ty: 0,
    prevLx: NaN,
    prevLy: NaN,
    lastMove: -1e9,
    bootStart: 0,
    dirty: true,
    art,
    palette,
  });

  useEffect(() => {
    const s = stateRef.current;
    s.art = art;
    s.palette = palette;
    if (s.w > 0 && s.h > 0) {
      const { lum, mask } = generateArtField(art, s.w, s.h);
      s.lum = lum;
      s.mask = mask;
      s.dirty = true;
    }
  }, [art, palette]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const rebuild = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width < 4 || rect.height < 4) return;
      const px = Math.max(2, Math.round(window.innerWidth / 640));
      const w = Math.max(24, Math.ceil(rect.width / px));
      const h = Math.max(24, Math.ceil(rect.height / px));

      canvas.width = w;
      canvas.height = h;

      const s = stateRef.current;
      const { lum, mask } = generateArtField(s.art, w, h);
      const img = ctx.createImageData(w, h);

      s.px = px;
      s.w = w;
      s.h = h;
      s.lum = lum;
      s.mask = mask;
      s.img = img;
      s.buf = new Uint32Array(img.data.buffer);

      if (s.lx === 0 && s.ly === 0) {
        s.lx = s.tx = w * 0.34;
        s.ly = s.ty = h * 0.48;
      }
      s.prevLx = NaN;
      s.dirty = true;
    };

    stateRef.current.bootStart = performance.now();
    rebuild();

    const ro = new ResizeObserver(rebuild);
    ro.observe(container);

    let rafId = 0;
    const frame = (now: number) => {
      const s = stateRef.current;
      if (!s.img || s.w === 0 || s.h === 0) {
        rafId = requestAnimationFrame(frame);
        return;
      }

      const t = reduceMotion ? 9 : (now - s.bootStart) / 1000;
      let bo = baseBlock;
      if (!reduceMotion && t < 1.05) {
        if (t < 0.18) bo = 32;
        else if (t < 0.4) bo = 16;
        else if (t < 0.68) bo = 8;
        else bo = baseBlock;
      }

      const lk = Math.min(1, Math.max(0, (t - 0.8) / 0.6));
      const lensK = lk * lk * (3 - 2 * lk);

      if (!reduceMotion && now - s.lastMove > 2800) {
        s.tx = s.w * (0.36 + 0.2 * Math.sin(t * 0.32));
        s.ty = s.h * (0.48 + 0.2 * Math.sin(t * 0.46 + 0.9));
      }

      s.lx += (s.tx - s.lx) * 0.12;
      s.ly += (s.ty - s.ly) * 0.12;

      const moved =
        Math.abs(s.lx - s.prevLx) >= 0.25 || Math.abs(s.ly - s.prevLy) >= 0.25;

      if (s.dirty || moved || t < 1.5) {
        s.dirty = false;
        s.prevLx = s.lx;
        s.prevLy = s.ly;

        const colors = DITHER_PALETTES[s.palette];
        const r1 = lensK * Math.min(s.w, s.h) * 0.2;
        const r2 = r1 * 1.85;
        const a1 = r1 * r1;
        const a2 = r2 * r2;
        const { w, h, lum, mask, buf } = s;

        for (let y = 0; y < h; y++) {
          const dy = y - s.ly;
          const dy2 = dy * dy;
          const row = y * w;
          for (let x = 0; x < w; x++) {
            const dx = x - s.lx;
            const d2 = dx * dx + dy2;

            let bs = bo;
            if (d2 < a1) bs = 1;
            else if (d2 < a2) bs = Math.max(1, bo >> 1);

            const bx = (x / bs) | 0;
            const by = (y / bs) | 0;
            let sx = bx * bs + (bs >> 1);
            let sy = by * bs + (bs >> 1);
            if (sx >= w) sx = w - 1;
            if (sy >= h) sy = h - 1;

            const j = sy * w + sx;
            const threshold = BAYER_4X4[((by & 3) << 2) | (bx & 3)];
            buf[row + x] =
              lum[j] > threshold
                ? mask[j]
                  ? colors.accent
                  : colors.mid
                : colors.bg;
          }
        }
        ctx.putImageData(s.img, 0, 0);
      }

      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [baseBlock]);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const s = stateRef.current;
    s.tx = Math.max(0, Math.min(s.w, (e.clientX - rect.left) / s.px));
    s.ty = Math.max(0, Math.min(s.h, (e.clientY - rect.top) / s.px));
    s.lastMove = performance.now();
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handleMove}
      className={`relative overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="block h-full w-full"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
