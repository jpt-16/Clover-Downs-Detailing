import Image from "next/image";
import type { Photo } from "@/lib/photos";

/**
 * Renders a real photo when one is configured, and an honest labelled
 * placeholder when one is not. Placeholders use the same hairline language
 * as the rest of the page so an unfinished gallery still looks deliberate.
 */
export function PhotoSlot({
  photo,
  priority = false,
  sizes = "100vw",
  className,
}: {
  photo: Photo;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  if (photo.src) {
    return (
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${className ?? ""}`}
      />
    );
  }

  return (
    <div
      aria-hidden
      className={`absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink-raised p-6 text-center ${className ?? ""}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, transparent 0 11px, rgba(124,197,118,0.045) 11px 12px)",
      }}
    >
      <span className="h-px w-8 bg-leaf/50" />
      <span className="max-w-[26ch] text-[0.6875rem] leading-relaxed tracking-[0.16em] text-dim uppercase">
        {photo.hint}
      </span>
      <span className="text-[0.625rem] tracking-[0.2em] text-dim/60 uppercase">Photo pending</span>
    </div>
  );
}
