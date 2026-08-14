/**
 * Photo manifest.
 *
 * HOW TO ADD MORE PHOTOS
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

/**
 * Full-bleed hero. Currently the cleaned driver's area — it is the most
 * "finished car" frame available. Swap in a wide exterior shot (dark car,
 * wet paint, low light) when there is one; the hero crops to a letterbox,
 * so a landscape original will always beat a portrait one here.
 */
export const heroPhoto: Photo = {
  src: "/photos/footwell-after.jpg",
  alt: "The driver's area of a Nissan after a full interior detail — clean dashboard, steering wheel, seat and floor mat",
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
  /**
   * "slider" overlays the two frames behind a drag handle. It only reads
   * well when the before and after are shot from the same spot with the
   * same framing — otherwise dragging looks like a glitch rather than a
   * reveal. "split" shows them side by side and works with any framing.
   */
  mode: "slider" | "split";
  before: Photo;
  after: Photo;
};

export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    id: "rear-seat",
    label: "Rear bench — interior detail",
    mode: "split",
    before: {
      src: "/photos/rear-seat-before.jpg",
      alt: "A black leather rear bench seat before detailing, its surface dulled by dried-on dirt and dust",
      hint: "Before — interior, seats and carpets soiled",
    },
    after: {
      src: "/photos/rear-seat-after.jpg",
      alt: "The same rear bench seat after detailing, the leather clean and an even black, with clean floor mats behind it",
      hint: "After — interior, extracted and steamed",
    },
  },
  {
    id: "driver-area",
    label: "Driver's area — interior detail",
    mode: "split",
    before: {
      src: "/photos/footwell-before.jpg",
      alt: "A driver's seat and footwell before detailing, with dirt and debris ground into the floor mat",
      hint: "Before — driver's footwell, dirt ground in",
    },
    after: {
      src: "/photos/footwell-after.jpg",
      alt: "The same driver's seat and footwell after detailing, the mat and surrounding trim clean",
      hint: "After — driver's footwell, cleaned",
    },
  },
];
