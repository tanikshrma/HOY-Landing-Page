import markDark from '../../assets/brand/hoy-mark-dark.png';
import markLight from '../../assets/brand/hoy-mark-light.png';

/**
 * The HOY mark — the H pill, O circle, Y pill and full stop.
 *
 * Cut from the master logo artwork by scripts/build-brand.mjs, which also
 * strips the "HOUSE OF YOU" line baked into the bottom-left of the master.
 * That line renders around 7px even at a 64px lockup, too small to read as
 * words, so where a tagline is wanted it is set in type instead — see
 * `withTagline` below.
 *
 * Intrinsic size is 182x132; width/height are declared so the header does not
 * shift while the image loads.
 */
const INTRINSIC = { width: 182, height: 132 };

interface WordmarkProps {
  /** 'ink' on light backgrounds, 'paper' on dark ones. */
  tone?: 'ink' | 'paper';
  className?: string;
  withTagline?: boolean;
  /** Tailwind height class for the mark itself. */
  size?: string;
}

export function Wordmark({
  tone = 'ink',
  className = '',
  withTagline = false,
  size = 'h-9',
}: WordmarkProps) {
  return (
    <span className={`inline-flex flex-col items-start ${className}`}>
      <img
        src={tone === 'paper' ? markLight : markDark}
        alt="HOY — House of You"
        width={INTRINSIC.width}
        height={INTRINSIC.height}
        className={`${size} w-auto`}
        // The mark is the brand; never let it arrive late.
        loading="eager"
        fetchPriority="high"
        decoding="sync"
      />
      {withTagline && (
        <span
          className={`mt-2.5 text-[0.625rem] font-medium tracking-[0.22em] uppercase ${
            tone === 'paper' ? 'text-paper/55' : 'text-ink-50'
          }`}
        >
          House of You
        </span>
      )}
    </span>
  );
}
