import type { ReactNode } from 'react';

// Minimal monoline product illustrations. One consistent style across the whole
// catalogue so the store reads as a designed brand rather than mismatched stock
// photos, and nothing depends on an external image host during a recording.
const art: Record<string, ReactNode> = {
  'pour-over': (
    <>
      <path d="M42 46 H78 L68 64 H52 Z" />
      <path d="M38 46 H82" />
      <path d="M60 64 V70" />
      <path d="M49 74 V90 Q49 95 55 95 H65 Q71 95 71 90 V74" />
      <path d="M71 78 Q81 80 79 87 Q78 92 71 92" />
    </>
  ),
  'merino-throw': (
    <>
      <rect x="34" y="50" width="52" height="18" rx="5" />
      <rect x="34" y="70" width="52" height="18" rx="5" />
      <path d="M60 50 V88" />
      <path d="M42 59 Q48 55 54 59" />
      <path d="M66 79 Q72 75 78 79" />
    </>
  ),
  'desk-tray': (
    <>
      <path d="M30 64 H90 L96 84 H24 Z" />
      <path d="M37 68 H83 L87 80 H33 Z" />
      <path d="M60 68 V80" />
    </>
  ),
  'linen-apron': (
    <>
      <path d="M52 40 Q60 31 68 40" />
      <path d="M50 42 H70 L73 57 H47 Z" />
      <path d="M46 57 H74 L79 92 H41 Z" />
      <path d="M47 62 L35 58" />
      <path d="M73 62 L85 58" />
      <rect x="52" y="72" width="16" height="12" rx="2" />
    </>
  ),
  'cast-kettle': (
    <>
      <path d="M42 66 C42 83 49 89 60 89 C71 89 78 83 78 66" />
      <path d="M42 66 H78" />
      <path d="M53 60 H67 L65 66 H55 Z" />
      <circle cx="60" cy="56" r="3" />
      <path d="M42 69 L31 63 L34 72" />
      <path d="M51 60 Q60 47 69 60" />
    </>
  ),
  'wool-slippers': (
    <>
      <ellipse cx="50" cy="76" rx="16" ry="9" />
      <path d="M38 72 Q50 63 62 72" />
      <ellipse cx="72" cy="86" rx="16" ry="9" />
      <path d="M60 82 Q72 73 84 82" />
    </>
  ),
};

export default function ProductArt({ id }: { id: string }) {
  return (
    <svg
      className="art"
      viewBox="0 0 120 120"
      role="img"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse className="art-base" cx="60" cy="99" rx="30" ry="4" />
      {art[id] ?? null}
    </svg>
  );
}
