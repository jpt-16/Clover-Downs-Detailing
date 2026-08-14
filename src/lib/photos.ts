/**
 * Photo manifest.
 *
 * HOW TO ADD YOUR REAL PHOTOS
 * 1. Drop the image files into `public/photos/`.
 * 2. Fill in the matching `src` below, e.g. src: "/photos/hero.jpg".
 * 3. Write a short, literal `alt` describing what is in the frame.
 *
 * Any entry left with `src: null` renders a labelled placeholder tile
 * instead, so the layout never breaks while you are still shooting.
 */

export type Photo = {
  src: string | null;
  alt: string;
  /** Shown inside the placeholder tile so you know what belongs here. */
  hint: string;
};

export const heroPhoto: Photo = {
  src: null,
  alt: "",
  hint: "Wide hero — dark car, wet paint, low light",
};

/** Portrait for the About section — you at work, or with the kit. */
export const ownerPhoto: Photo = {
  src: null,
  alt: "",
  hint: "Portrait — you working on a car, or with the kit",
};

export type BeforeAfterPair = {
  id: string;
  label: string;
  before: Photo;
  after: Photo;
};

/**
 * Each pair powers one drag-to-compare slider. Shoot the two frames from
 * the same spot with the same framing — the slider only reads well when
 * the before and after line up.
 */
export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    id: "interior",
    label: "Interior detail",
    before: { src: null, alt: "", hint: "Before — interior, seats and carpets soiled" },
    after: { src: null, alt: "", hint: "After — interior, extracted and steamed" },
  },
  {
    id: "exterior",
    label: "Exterior hand wash",
    before: { src: null, alt: "", hint: "Before — exterior, road film and brake dust" },
    after: { src: null, alt: "", hint: "After — exterior, washed and dressed" },
  },
];
