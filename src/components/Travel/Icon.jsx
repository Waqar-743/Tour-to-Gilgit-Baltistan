import React from "react";

// A small, original line-icon family for the places and traditions of the north.
// Keep every glyph on the same optical grid so it reads clearly at 20–32 px.
const glyphs = {
  "arrow-right": (
    <>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </>
  ),
  "arrow-up-right": (
    <>
      <path d="M6 18 18 6M6 6h12v12" />
    </>
  ),
  "arrow-left": (
    <>
      <path d="M20 12H4m6-6-6 6 6 6" />
    </>
  ),
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  menu: <path d="M4 6.5h16M4 12h16M4 17.5h11" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.3 15.3 5.2 5.2" />
    </>
  ),
  pin: (
    <>
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
      <path d="M12 3v2m9 7h-2M12 21v-2M3 12h2" />
    </>
  ),
  mountain: (
    <>
      <path d="m2 20 7.5-15 5 9 2.5-5 5 11H2Z" />
      <path d="m6.8 10.4 2.7 1.8 2.6-2.5m2.4 4.3 2.5 6" />
    </>
  ),
  fort: (
    <>
      <path d="M4 21 5.5 8h13L20 21H4ZM4 8h16M6 8V5h12v3M8 5V3m8 2V3" />
      <path d="M3 11h18v4H3v-4Zm3 0v4m4-4v4m4-4v4m4-4v4M10 21v-3a2 2 0 0 1 4 0v3" />
    </>
  ),
  lake: (
    <>
      <path d="m3 12 5-8 4 6 3-4 6 6M6.2 6.9l1.8 1 1.7-.8M3 16c2-2 4 2 6 0s4 2 6 0 4 2 6 0M3 20c2-2 4 2 6 0s4 2 6 0 4 2 6 0" />
    </>
  ),
  village: (
    <>
      <path d="m2 10 5-5 5 5M3.5 8.5V20H11V8.5M12 13l5-5 5 5m-8.5-1.5V20H21v-8.5M6 20v-5h3v5m7-4h2v2M12 4l3-2 3 2" />
    </>
  ),
  bowl: (
    <>
      <path d="M3 11h18a9 9 0 0 1-18 0Zm4 9h10M2 11h20M7 7c-2-2 2-2 0-4m5 4c-2-2 2-2 0-4m5 4c-2-2 2-2 0-4" />
    </>
  ),
  teapot: (
    <>
      <path d="M7 9h10v7a5 5 0 0 1-10 0V9ZM6 9h12M9 6h6m-3 0V4M7 12l-4-2 1 6 3 1m10-6h1a3 3 0 0 1 0 6h-1M7 21h10" />
    </>
  ),
  craft: (
    <>
      <path d="m12 2 3.5 6.5L22 12l-6.5 3.5L12 22l-3.5-6.5L2 12l6.5-3.5L12 2Z" />
      <path d="m12 7 5 5-5 5-5-5 5-5Zm0-5v5m10 5h-5m-5 10v-5M2 12h5" />
      <path d="m5 5 2 2m10 10 2 2M19 5l-2 2M7 17l-2 2" />
    </>
  ),
  music: (
    <>
      <ellipse cx="12" cy="9" rx="8" ry="3.5" />
      <path d="M4 9v8c0 2 3.6 3.5 8 3.5s8-1.5 8-3.5V9M5 11l4 8 3-6.5 3 6.5 4-8M6 2l7 5M18 2l-3 4" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 3c-7-1-15 2-15 9a6 6 0 0 0 6 6c7 0 10-8 9-15Z" />
      <path d="m4 21 12-12m-6 6v-5m0 5h5" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4m0-14.2-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </>
  ),
  snow: (
    <>
      <path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9 4l3 3 3-3M9 20l3-3 3 3M3.5 10.5l4.1-1.1L6.5 5.3m11 13.4-1.1-4.1 4.1-1.1M6.5 18.7l1.1-4.1-4.1-1.1m17-3-4.1-1.1 1.1-4.1" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4m10-4v4M3 10h18M7 14h2m4 0h2m-8 4h2m4 0h2" />
    </>
  ),
  route: (
    <>
      <circle cx="5" cy="5" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M9 5h7a4 4 0 0 1 0 8H8a3 3 0 0 0 0 6h7" />
    </>
  ),
  walking: (
    <>
      <circle cx="14" cy="4" r="2" />
      <path d="m8 21 3-7 3 3v4M5 12l3-4 4-1 3 5h4m-7-5-2 7m9-2 2 9" />
    </>
  ),
  heart: (
    <path d="M20.4 5.6a5.5 5.5 0 0 0-7.8 0l-.6.6-.6-.6a5.5 5.5 0 0 0-7.8 7.8L12 21l8.4-7.6a5.5 5.5 0 0 0 0-7.8Z" />
  ),
  check: <path d="m5 12 4.5 4.5L19 7" />,
  download: (
    <>
      <path d="M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <path d="M3.6 9h16.8M3.6 15h16.8" />
    </>
  ),
  external: (
    <>
      <path d="M14 3h7v7m0-7L10 14M10 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
    </>
  ),
  book: (
    <>
      <path d="M12 6C9 3 5 3 2 4v15c3-1 7-1 10 2 3-3 7-3 10-2V4c-3-1-7-1-10 2Zm0 0v15M6 8c1.2 0 2.2.3 3 1m-3 3c1.2 0 2.2.3 3 1m6-4c.8-.7 1.8-1 3-1m-3 5c.8-.7 1.8-1 3-1" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 21v-3a6 6 0 0 1 12 0v3m1-17a3 3 0 0 1 0 6m2 4a6 6 0 0 1 3 5v2" />
    </>
  ),
};

export default function Icon({ name, size = 24, className = "", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      {glyphs[name] || glyphs.compass}
    </svg>
  );
}

export function MountainMark({ className = "", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <circle cx="34.5" cy="12.5" r="5.5" fill="currentColor" />
      <path
        d="M3 38 19 8l10 19 5-9 11 20H3Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m13 19 6 4 5-5m5 9 6 11M8 43h32"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
