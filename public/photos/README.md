# Photos

Drop your real photos in this folder, then point `src/lib/photos.ts` at them.

## What to shoot

| Slot | What it needs |
| --- | --- |
| `heroPhoto` | One wide shot. A dark car, wet paint, low light. Landscape, at least 2000px wide. |
| `interior` before/after | Same seat or footwell, same angle, same framing. |
| `exterior` before/after | Same panel or quarter view, same angle, same framing. |

The before/after sliders only read well when the two frames line up. Mark
your spot, shoot the before, do the work, then stand in the same spot again.

## Then

```ts
// src/lib/photos.ts
export const heroPhoto: Photo = {
  src: "/photos/hero.jpg",
  alt: "A black sedan with freshly washed paint in a driveway at dusk",
  hint: "Wide hero — dark car, wet paint, low light",
};
```

Write the `alt` as a literal description of the frame — it is what screen
readers announce and what Google reads.

Keep files under ~500 KB each; Next.js handles resizing and WebP conversion
from there.
