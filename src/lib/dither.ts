export type DitherTheme = "eclipse" | "stone";

export type DitherArtKind =
  | "eclipse-horizon"
  | "grid-waves"
  | "isometric-cubes"
  | "matrix-orbit"
  | "signal-bars";

export const BAYER_4X4 = [
  0, 8, 2, 10,
  12, 4, 14, 6,
  3, 11, 1, 9,
  15, 7, 13, 5,
].map((v) => (v + 0.5) / 16);

const packRGBA = (r: number, g: number, b: number): number =>
  ((255 << 24) | (b << 16) | (g << 8) | r) >>> 0;

export interface DitherPalette {
  bg: number;
  mid: number;
  accent: number;
}

export const DITHER_PALETTES: Record<DitherTheme, DitherPalette> = {
  eclipse: {
    bg: packRGBA(11, 14, 17), // #0b0e11
    mid: packRGBA(232, 228, 216), // #e8e4d8 bone
    accent: packRGBA(240, 183, 101), // #f0b765 amber
  },
  stone: {
    bg: packRGBA(242, 239, 231), // #f2efe7
    mid: packRGBA(18, 21, 24), // #121518 ink
    accent: packRGBA(184, 104, 12), // #b8680c burnished amber
  },
};

export interface FieldBuffers {
  lum: Float32Array<ArrayBufferLike>;
  mask: Uint8Array<ArrayBufferLike>;
}

/**
 * Deterministic scalar luminance + accent mask generators for quiet Bayer-dithered artwork.
 */
export function generateArtField(
  kind: DitherArtKind,
  w: number,
  h: number
): FieldBuffers {
  const lum = new Float32Array(w * h);
  const mask = new Uint8Array(w * h);

  if (kind === "eclipse-horizon") {
    // Stepped architectural dither terrain + eclipsed solar sphere
    const r = Math.min(w, h) * 0.36;
    const cx = w * 0.34;
    const cy = h * 0.48;
    const lx = -0.62;
    const ly = -0.5;
    const lz = 0.6;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = y * w + x;
        const u = x / w;
        const v = y / h;
        const dx = (x - cx) / r;
        const dy = (y - cy) / r;
        const d2 = dx * dx + dy * dy;

        // Sweeping quantized horizon wave across the right half
        const wave = 0.68 - 0.24 * Math.sin(u * 4.4 - 0.5) - 0.1 * u;
        let val = v > wave ? Math.max(0.06, 0.55 - (v - wave) * 1.1) : 0.02;
        let m = 0;

        // Subtle diagonal atmospheric ribbon
        const ribbon = Math.exp(-Math.pow((u * 0.7 + v * 0.55 - 0.52) * 3.4, 2));
        val = Math.max(val, 0.12 * ribbon);

        if (d2 < 1) {
          const dz = Math.sqrt(1 - d2);
          const dot = dx * lx + dy * ly + dz * lz;
          const ring = 0.06 * Math.sin(dy * 9 + Math.sin(dx * 4) * 1.2);
          val = Math.pow(Math.max(dot, 0), 0.85) + ring * Math.max(dot, 0) + 0.04;
          m = 1;
        } else if (d2 < 1.38) {
          const d = Math.sqrt(d2);
          const g = 1 - (d - 1) / 0.17;
          const lit = Math.max(0, ((dx * lx + dy * ly) / (d * 0.78)) * 0.8 + 0.2);
          const corona = g * g * lit * 0.6;
          if (corona > val) {
            val = corona;
            m = 1;
          }
        }

        lum[i] = val;
        mask[i] = m;
      }
    }
    return { lum, mask };
  }

  if (kind === "grid-waves") {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = y * w + x;
        const nx = x / w;
        const ny = y / h;
        const w1 = Math.sin(nx * 10 + Math.cos(ny * 6) * 1.4) * 0.5 + 0.5;
        const band = Math.exp(-Math.pow((ny - 0.52) * 2.4, 2));
        lum[i] = w1 * band * 0.85;
        mask[i] = w1 > 0.72 && band > 0.45 ? 1 : 0;
      }
    }
    return { lum, mask };
  }

  if (kind === "isometric-cubes") {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = y * w + x;
        const nx = (x / w - 0.5) * 2.4;
        const ny = (y / h - 0.5) * 2.4;
        const manhattan = Math.abs(nx) + Math.abs(ny);
        const rings = Math.sin(manhattan * 7) * 0.5 + 0.5;
        const fade = Math.exp(-manhattan * 0.75);
        lum[i] = rings * fade * 0.9;
        mask[i] = manhattan < 0.75 ? 1 : 0;
      }
    }
    return { lum, mask };
  }

  if (kind === "matrix-orbit") {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = y * w + x;
        const dx = x / w - 0.5;
        const dy = y / h - 0.5;
        const r = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx);
        const spiral = Math.sin(r * 26 - angle * 2) * 0.5 + 0.5;
        const env = Math.exp(-r * 2.8);
        lum[i] = spiral * env * 0.95;
        mask[i] = r < 0.16 || (r > 0.25 && r < 0.3 && spiral > 0.5) ? 1 : 0;
      }
    }
    return { lum, mask };
  }

  // "signal-bars"
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      const nx = x / w;
      const ny = y / h;
      const col = Math.floor(nx * 12);
      const colHeight = 0.22 + 0.58 * Math.abs(Math.sin(col * 1.3 + 0.4));
      const inBar = ny > 1 - colHeight && ((nx * 12) % 1) < 0.72;
      lum[i] = inBar ? (1 - ny) * 0.9 + 0.15 : 0.04;
      mask[i] = inBar && col % 4 === 1 ? 1 : 0;
    }
  }
  return { lum, mask };
}
