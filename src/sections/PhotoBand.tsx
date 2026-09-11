import { Photo, type PhotoKey } from '../components/ui/Photo';

interface PhotoBandProps {
  name: PhotoKey;
  alt: string;
  /** Short line set over the image. Keep it to a handful of words. */
  caption?: string;
  position?: string;
}

/**
 * A full-bleed photograph used as a breather between two content sections.
 * Deliberately edge to edge — a band that respected the page gutter would read
 * as just another card.
 */
export function PhotoBand({ name, alt, caption, position = 'object-center' }: PhotoBandProps) {
  return (
    <section className="relative border-b border-line" aria-hidden={caption ? undefined : true}>
      <div className="relative aspect-4/3 w-full sm:aspect-16/9 lg:aspect-[21/7]">
        <Photo
          name={name}
          alt={alt}
          sizes="100vw"
          position={position}
          className="size-full object-cover"
        />

        {caption && (
          <>
            {/* Scrim only under the caption, so the photograph stays readable. */}
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-ink/70 to-transparent" />
            <p
              className="absolute inset-x-0 bottom-0 container-page pb-6 font-display text-lg
                leading-snug font-medium text-paper sm:pb-8 sm:text-xl lg:pb-10 lg:text-2xl"
            >
              {caption}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
