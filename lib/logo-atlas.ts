import * as THREE from 'three';
import sheet from './logo-atlas.json';

export const ATLAS_URL = '/prog.webp';

/** Normalised crop rectangle, origin at the image's TOP-LEFT (like pixel coordinates). */
export interface AtlasRect {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  /** Pixel aspect ratio (w / h) of the crop, used to size each card. */
  aspect: number;
}

/** Uniform grid produced by `npm run atlas`. */
function gridAtlas(): AtlasRect[] {
  const cellAspect = 1; // cells are square
  return sheet.logos.map((logo, i) => ({
    id: logo.id,
    label: logo.label,
    x: (i % sheet.columns) / sheet.columns,
    y: Math.floor(i / sheet.columns) / sheet.rows,
    w: 1 / sheet.columns,
    h: 1 / sheet.rows,
    aspect: cellAspect,
  }));
}

/**
 * Irregular layout of the stock sheet (only for a LICENSED, unwatermarked copy).
 * Rects are measured in a 1600×490 reference frame, so any resolution with the same aspect works.
 * The measurements are approximate: tune them on /atlas-debug.
 */
const REF = { w: 1600, h: 490 };
const px = (id: string, label: string, x: number, y: number, w: number, h: number): AtlasRect => ({
  id,
  label,
  x: x / REF.w,
  y: y / REF.h,
  w: w / REF.w,
  h: h / REF.h,
  aspect: w / h,
});

export const STOCK_SHEET_ATLAS: AtlasRect[] = [
  px('javascript', 'JavaScript', 38, 36, 152, 152),
  px('css3', 'CSS3', 228, 12, 132, 186),
  px('html5', 'HTML5', 406, 12, 134, 186),
  px('nodejs', 'Node.js', 982, 30, 146, 160),
  px('go', 'Go', 1138, 50, 282, 104),
  px('csharp', 'C#', 266, 210, 160, 178),
  px('cplusplus', 'C++', 478, 210, 160, 178),
  px('java', 'Java', 690, 168, 118, 214),
  px('python', 'Python', 862, 214, 160, 162),
  px('kotlin', 'Kotlin', 1056, 236, 112, 116),
];

/** Switch to STOCK_SHEET_ATLAS if you use the licensed stock image instead. */
export const ATLAS: AtlasRect[] = gridAtlas();

/**
 * Clone the atlas texture and crop it to one logo via repeat/offset.
 * Clones share the same image source, so the GPU uploads the sheet once.
 * `inset` trims a sliver from each edge to stop mipmap bleed from neighbours.
 */
export function sliceTexture(base: THREE.Texture, r: AtlasRect, inset = 0.002): THREE.Texture {
  const t = base.clone();
  t.repeat.set(r.w - inset * 2, r.h - inset * 2);
  // Textures are flipped (flipY), so V = 0 is the image's BOTTOM edge.
  t.offset.set(r.x + inset, 1 - (r.y + r.h) + inset);
  return t;
}