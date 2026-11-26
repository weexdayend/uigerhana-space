"use client";

import { useEffect, useRef, type PointerEvent } from "react";

export type OrganicMorphControl = {
  value: number;
  invalidate?: () => void;
};

type OrganicModularCanvasProps = {
  control: { current: OrganicMorphControl };
};

type CanvasState = {
  width: number;
  height: number;
  image: ImageData | null;
  pointerX: number;
  pointerY: number;
  hasPointer: boolean;
  reducedMotion: boolean;
};

const BAYER_4X4 = [
  0, 8, 2, 10,
  12, 4, 14, 6,
  3, 11, 1, 9,
  15, 7, 13, 5,
].map((value) => (value + 0.5) / 16);

const MODULE_CENTERS = [0.69, 0.57, 0.39, 0.5, 0.29, 0.43, 0.22, 0.32];
const MODULE_WIDTHS = [0.105, 0.09, 0.12, 0.1, 0.115, 0.085, 0.12, 0.095];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function fract(value: number) {
  return value - Math.floor(value);
}

export function OrganicModularCanvas({ control }: OrganicModularCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef<CanvasState>({
    width: 0,
    height: 0,
    image: null,
    pointerX: 0.5,
    pointerY: 0.5,
    hasPointer: false,
    reducedMotion: false,
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const state = stateRef.current;
    state.reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let frameId = 0;

    const draw = () => {
      const { width, height, image } = state;
      if (!image || width === 0 || height === 0) return;

      const progress = clamp(control.current.value, 0, 1);
      const pixels = image.data;
      pixels.fill(0);

      for (let y = 0; y < height; y++) {
        const v = (y + 0.5) / height;
        const row = y * width;

        for (let x = 0; x < width; x++) {
          const u = (x + 0.5) / width;
          const segment = Math.min(7, Math.floor(u * 8));
          const localMorph = smoothstep(0.16, 0.98, u) * progress;
          const moduleU = (segment + 0.5) / 8;
          const sampleU = lerp(u, moduleU, localMorph);

          const organicCenter =
            0.5 +
            0.19 * Math.sin(sampleU * 6 - 1.05) +
            0.05 * Math.sin(sampleU * 15.2 + 0.4);

          let center = lerp(
            organicCenter,
            MODULE_CENTERS[segment],
            localMorph
          );

          if (state.hasPointer && !state.reducedMotion) {
            const dx = u - state.pointerX;
            const dy = v - state.pointerY;
            const influence = Math.exp(
              -((dx * dx) / 0.035 + (dy * dy) / 0.055)
            );
            center += Math.sign(center - state.pointerY) * 0.026 * influence;
          }

          const organicWidth = 0.092 + 0.024 * Math.sin(sampleU * 8.5 + 0.7);
          const halfWidth = lerp(
            organicWidth,
            MODULE_WIDTHS[segment],
            localMorph
          );
          const distance = Math.abs(v - center);
          const feather = lerp(0.07, 0.012, localMorph);

          let density =
            1 -
            smoothstep(
              halfWidth - feather,
              halfWidth + feather,
              distance
            );

          const startFade = smoothstep(0.005, 0.12, u);
          const endFade = 1 - smoothstep(0.9, 1.02, u);
          const materialVariation =
            0.91 + 0.09 * Math.sin(u * 19 + v * 5);

          density *= startFade * endFade * materialVariation;

          const bayerIndex = ((y & 3) << 2) | (x & 3);
          const threshold = BAYER_4X4[bayerIndex];
          let visible = density > threshold;
          let alpha = visible ? 255 : 0;

          // A restrained fragment trail gives the organic side a sense of emergence.
          if (
            !visible &&
            u < 0.32 &&
            distance > halfWidth &&
            distance < halfWidth + 0.095
          ) {
            const noise = fract(
              Math.sin((x + 11) * 127.1 + (y + 3) * 311.7) * 43758.5453
            );
            if (noise > 0.992 + progress * 0.002) {
              visible = true;
              alpha = 150;
            }
          }

          if (!visible) continue;

          const accentField =
            smoothstep(0.34, 0.76, u) *
            (0.78 + 0.22 * Math.sin(v * 22 + u * 6));
          const accentThreshold =
            BAYER_4X4[(((y + 1) & 3) << 2) | ((x + 2) & 3)];
          const isAmber = accentField > accentThreshold;

          const index = (row + x) * 4;
          if (isAmber) {
            pixels[index] = 240;
            pixels[index + 1] = 183;
            pixels[index + 2] = 101;
          } else {
            pixels[index] = 232;
            pixels[index + 1] = 228;
            pixels[index + 2] = 216;
          }
          pixels[index + 3] = alpha;
        }
      }

      context.putImageData(image, 0, 0);
    };

    const invalidate = () => {
      if (frameId !== 0) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        draw();
      });
    };

    const rebuild = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width < 8 || rect.height < 8) return;

      const pixelSize = window.innerWidth < 640 ? 3.6 : 4.6;
      const width = Math.max(64, Math.ceil(rect.width / pixelSize));
      const height = Math.max(64, Math.ceil(rect.height / pixelSize));

      canvas.width = width;
      canvas.height = height;
      state.width = width;
      state.height = height;
      state.image = context.createImageData(width, height);
      invalidate();
    };

    control.current.invalidate = invalidate;

    const resizeObserver = new ResizeObserver(rebuild);
    resizeObserver.observe(container);
    rebuild();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", rebuild);
      if (frameId !== 0) window.cancelAnimationFrame(frameId);
      if (control.current.invalidate === invalidate) {
        delete control.current.invalidate;
      }
    };
  }, [control]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const state = stateRef.current;
    if (state.reducedMotion || event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    state.pointerX = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    state.pointerY = clamp((event.clientY - rect.top) / rect.height, 0, 1);
    state.hasPointer = true;
    control.current.invalidate?.();
  };

  const handlePointerLeave = () => {
    stateRef.current.hasPointer = false;
    control.current.invalidate?.();
  };

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
