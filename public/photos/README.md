# Photos

Drop image files in this folder, then point `src/lib/photos.ts` at them.

## What is in here now

| File | Used for |
| --- | --- |
| `rear-seat-before.jpg` / `rear-seat-after.jpg` | "Rear bench" pair in the gallery |
| `footwell-before.jpg` / `footwell-after.jpg` | "Driver's area" pair in the gallery |
| `footwell-after.jpg` | Also the hero, cropped to a letterbox |

All four were re-encoded to progressive JPEG and stripped of EXIF metadata,
which removes any GPS coordinates the phone attached.

## Still needed

- **A wide hero shot.** A dark car with wet paint in low light, shot
  **landscape**. The hero crops to a letterbox, so a portrait original loses
  most of its frame. The current hero is a cropped interior standing in.
- **An exterior before/after pair.** Everything here is interior work.

The About section is deliberately text-only — there is no owner portrait, and
a placeholder tile there read as a broken image rather than a held space. If
a portrait turns up later, add it back as its own left-hand column in the
About section rather than reusing the heading column.

## Two ways a pair can be shown

Each pair in `beforeAfterPairs` sets a `mode`:

- **`"split"`** — side by side. Works with any framing. This is what the
  current pairs use, because their before and after were shot from different
  positions.
- **`"slider"`** — the two frames stack behind a drag handle, so a visitor
  wipes between them. Much more striking, but it **only works when the two
  frames line up**. Different angles read as a glitch rather than a reveal.

To get slider-ready pairs: mark where you are standing, shoot the before, do
the work, then stand in exactly the same spot and shoot the after. Same
distance, same angle, same height. Then set `mode: "slider"`.

## Adding a photo

```ts
// src/lib/photos.ts
export const heroPhoto: Photo = {
  src: "/photos/hero.jpg",
  alt: "A black sedan with freshly washed paint in a driveway at dusk",
  hint: "Wide hero — dark car, wet paint, low light",
};
```

Write `alt` as a literal description of the frame — it is what screen readers
announce and what Google reads. Any entry left at `src: null` renders a
labelled placeholder instead of breaking the layout.

Keep files under ~500 KB; Next.js handles resizing and WebP conversion from
there. Send originals straight off the phone rather than through a messaging
app, which recompresses them.
