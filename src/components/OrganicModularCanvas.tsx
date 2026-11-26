"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type PointerEvent,
} from "react";

export type OrganicMorphControl = {
  value: number;
};

export type OrganicModularCanvasHandle = {
  invalidate: () => void;
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

const MODULE_CENTERS = [0.66, 0.44, 0.3, 0.48];
const MODULE_WIDTHS = [0.14, 0.115, 0.13, 0.105];

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

export const OrganicModularCanvas = forwardRef<
  OrganicModularCanvasHandle,
  OrganicModularCanvasProps
>(function OrganicModularCanvas({ control }, ref) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const invalidateRef = useRef<() => void>(() => {});
  const stateRef = useRef<CanvasState>({
    width: 0,
    height: 0,
    image: null,
    pointerX: 0.5,
    pointerY: 0.5,
    hasPointer: false,
    reducedMotion: false,
  });

  useImperativeHandle(
    ref,
    () => ({
      invalidate: () => invalidateRef.current(),
    }),
    []
  );

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
          const segment = Math.min(
            3,
            Math.max(0, Math.floor((u - 0.57) / 0.108))
          );
          const segmentProgress = smoothstep(0.52, 0.99, u);
          const localMorph = progress * segmentProgress;

          const organicCenter =
            0.54 -
            0.2 * Math.sin(u * 3.95 - 0.55) +
            0.035 * Math.sin(u * 9.2 + 0.6);
          const modularCenter = MODULE_CENTERS[segment];
          let center = lerp(organicCenter, modularCenter, localMorph);

          if (state.hasPointer && !state.reducedMotion) {
            const dx = u - state.pointerX;
            const dy = v - state.pointerY;
            const influence = Math.exp(
              -((dx * dx) / 0.045 + (dy * dy) / 0.07)
            );
            center += Math.sign(center - state.pointerY) * 0.035 * influence;
          }

          const organicWidth = 0.145 + 0.025 * Math.sin(u * 5.4 + 0.9);
          const halfWidth = lerp(
            organicWidth,
            MODULE_WIDTHS[segment],
            localMorph
          );
          const distance = Math.abs(v - center);
          const feather = lerp(0.052, 0.018, localMorph);

          let density =
            1 -
            smoothstep(
              halfWidth - feather,
              halfWidth + feather,
              distance
            );

          // A second, softer current gives the material a fuller silhouette.
          const lowerCurrentCenter = center + 0.12 + 0.025 * Math.sin(u * 8);
          const lowerCurrent =
            0.34 *
            (1 -
              smoothstep(
                0.075,
                0.17,
                Math.abs(v - lowerCurrentCenter)
              ));
          density = Math.max(density, lowerCurrent);

          const leftFade = smoothstep(0.005, 0.16, u);
          const rightFade = 1 - smoothstep(0.94, 1.015, u);
          density *= leftFade * rightFade;

          // The first half remains fluid; the last half resolves into four large steps.
          const modularEdge = smoothstep(0.56, 0.66, u);
          const edgeNoise =
            0.025 * Math.sin(v * 54 + u * 12) * (1 - modularEdge);
          density = clamp(density + edgeNoise, 0, 1);

          const bayerIndex = ((y & 3) << 2) | (x & 3);
          const threshold = BAYER_4X4[bayerIndex];
          let visible = density > threshold;
          let alpha = visible ? 255 : 0;

          // Scattered fragments break away from the organic edge.
          if (!visible && u < 0.42 && distance < halfWidth + 0.18) {
            const noise = fract(
              Math.sin((x + 11) * 127.1 + (y + 3) * 311.7) * 43758.5453
            );
            const fragmentThreshold = 0.989 + smoothstep(0.25, 0.45, u) * 0.008;
            if (noise > fragmentThreshold) {
              visible = true;
              alpha = 175;
            }
          }

          if (!visible) continue;

          const amberCore =
            smoothstep(0.2, 0.5, u) *
            (1 -
              smoothstep(
                0.09,
                0.22,
                Math.abs(v - center)
              ));
          const moduleAccent =
            localMorph > 0.38 && segment % 2 === 0 && v < center
              ? 0.94
              : 0;
          const amberWeight = Math.max(amberCore, moduleAccent);
          const accentThreshold =
            BAYER_4X4[(((y + 1) & 3) << 2) | ((x + 2) & 3)];
          const isAmber = amberWeight > accentThreshold;

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

    invalidateRef.current = invalidate;

    const rebuild = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width < 8 || rect.height < 8) return;

      const pixelSize = window.innerWidth < 640 ? 3.6 : 4.8;
      const width = Math.max(64, Math.ceil(rect.width / pixelSize));
      const height = Math.max(64, Math.ceil(rect.height / pixelSize));

      canvas.width = width;
      canvas.height = height;
      state.width = width;
      state.height = height;
      state.image = context.createImageData(width, height);
      invalidate();
    };

    const resizeObserver = new ResizeObserver(rebuild);
    resizeObserver.observe(container);
    rebuild();

    return () => {
      resizeObserver.disconnect();
      if (frameId !== 0) window.cancelAnimationFrame(frameId);
      invalidateRef.current = () => {};
    };
  }, [control]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const state = stateRef.current;
    if (state.reducedMotion || event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    state.pointerX = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    state.pointerY = clamp((event.clientY - rect.top) / rect.height, 0, 1);
    state.hasPointer = true;
    invalidateRef.current();
  };

  const handlePointerLeave = () => {
    stateRef.current.hasPointer = false;
    invalidateRef.current();
  };

  return (
    <div
      ref={containerRef}
      className="hero-organic__canvas-wrap"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="hero-organic__canvas"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
});
