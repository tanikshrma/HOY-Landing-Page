import { useState, type CSSProperties } from 'react';
import manifest from '../../assets/img/manifest.json';

/* Vite resolves every derivative at build time so filenames stay hashed. */
const AVIF = import.meta.glob('../../assets/img/*.avif', { eager: true, import: 'default' }) as Record<string, string>;
const WEBP = import.meta.glob('../../assets/img/*.webp', { eager: true, import: 'default' }) as Record<string, string>;
const JPG = import.meta.glob('../../assets/img/*.jpg', { eager: true, import: 'default' }) as Record<string, string>;

export type PhotoKey = keyof typeof manifest;

type Entry = { widths: number[]; width: number; height: number; lqip: string };

function url(map: Record<string, string>, file: string): string | undefined {
  const hit = Object.entries(map).find(([p]) => p.endsWith(`/${file}`));
  return hit?.[1];
}

function srcSet(map: Record<string, string>, key: string, widths: number[], ext: string): string {
  return widths
    .map((w) => {
      const u = url(map, `${key}-${w}.${ext}`);
      return u ? `${u} ${w}w` : '';
    })
    .filter(Boolean)
    .join(', ');
}

interface PhotoProps {
  name: PhotoKey;
  alt: string;
  /** Maps 1:1 to the <img sizes> attribute — get this wrong and the browser over-downloads. */
  sizes: string;
  className?: string;
  /** Set on the hero only. Everything else stays lazy. */
  priority?: boolean;
  /** Tailwind object-position class, e.g. "object-top". */
  position?: string;
}

/**
 * Responsive <picture> with AVIF → WebP → JPEG, intrinsic dimensions to stop
 * layout shift, and a blurred base64 placeholder.
 *
 * The placeholder is the img's own background rather than a separate layer —
 * the decoded image paints over it, so there is nothing to fade out and no
 * wrapper element to disturb the caller's layout.
 */
export function Photo({
  name,
  alt,
  sizes,
  className = '',
  priority = false,
  position = 'object-center',
}: PhotoProps) {
  const entry = (manifest as Record<string, Entry>)[name];
  const [loaded, setLoaded] = useState(false);

  if (!entry) {
    if (import.meta.env.DEV) console.warn(`[Photo] unknown image "${name}" — run npm run images`);
    return null;
  }

  const { widths, width, height, lqip } = entry;
  const fallback = url(JPG, `${name}-${widths[0]}.jpg`);

  const style: CSSProperties = loaded
    ? {}
    : {
        backgroundImage: `url("${lqip}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(AVIF, name, widths, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(WEBP, name, widths, 'webp')} sizes={sizes} />
      <img
        src={fallback}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        // Tells the browser the hero is the LCP candidate.
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={() => setLoaded(true)}
        style={style}
        className={`${className} ${position}`}
      />
    </picture>
  );
}
