/**
 * The HOY wordmark, set in type rather than shipped as a bitmap.
 *
 * The original assets were 1.5MB PNGs of white letters baked onto a solid
 * black rectangle — they could not sit on a light background, had no
 * transparency, and blurred on retina. Outfit at wide tracking matches the
 * geometric, rounded letterforms of the mark.
 */
interface WordmarkProps {
  /** 'ink' on light backgrounds, 'paper' on dark ones. */
  tone?: 'ink' | 'paper';
  className?: string;
  withTagline?: boolean;
}

export function Wordmark({ tone = 'ink', className = '', withTagline = false }: WordmarkProps) {
  const colour = tone === 'paper' ? 'text-paper' : 'text-ink';

  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span
        className={`font-display font-semibold text-[1.35rem] sm:text-[1.5rem] tracking-[0.34em] ${colour}`}
        // The wide tracking adds a trailing gap after the Y; pull it back so
        // the mark is optically centred against anything beside it.
        style={{ marginRight: '-0.34em' }}
      >
        HOY
      </span>
      {withTagline && (
        <span
          className={`mt-1 text-[0.5rem] font-medium uppercase tracking-[0.24em] ${
            tone === 'paper' ? 'text-paper/55' : 'text-ink-50'
          }`}
        >
          House of You
        </span>
      )}
    </span>
  );
}
