/**
 * The five measurements HOY takes, drawn on a figure.
 *
 * Earlier versions stacked capsules to echo the logo's shape language. It read
 * as a toy robot, which is the wrong register for a page about how clothes sit
 * on a real body — so this is a fashion croquis instead: the pared-back figure
 * outline pattern-cutters actually draw on. Same visual language as tailoring,
 * which is the point the section is making.
 *
 * The outline is one half-path mirrored about the centre line, so the figure
 * is symmetrical by construction. Fill and stroke are drawn separately: the
 * filled halves close across the centre (invisible, since they butt together),
 * while the stroked halves stay open so no seam is drawn down the middle.
 */

const GOLD = 'var(--color-gold)';
const CENTRE = 170;

/**
 * Right half of the silhouette, crown to crotch. Roughly eight-and-a-half
 * heads, arms held slightly away from the body so the shoulder line has
 * somewhere to land.
 */
const HALF = `
  M ${CENTRE} 22
  C 184 22, 193 34, 193 48
  C 193 62, 185 72, 178 75
  L 178 87
  C 190 89, 203 95, 210 105
  C 216 118, 218 135, 218 153
  C 218 172, 216 188, 213 201
  C 212 208, 205 209, 204 202
  C 205 187, 206 171, 206 154
  C 206 136, 204 121, 198 113
  C 194 128, 189 148, 187 166
  C 187 186, 198 198, 202 212
  C 206 234, 204 257, 199 280
  C 196 299, 193 311, 192 323
  C 191 341, 189 352, 188 361
  C 188 366, 194 368, 194 371
  L 175 371
  C 175 362, 177 346, 178 330
  C 179 307, 180 287, 179 267
  C 178 247, 174 230, ${CENTRE} 216
`;

/** Tick marks at each end of a measurement line. */
function Tick({ x, y }: { x: number; y: number }) {
  return <line x1={x} y1={y - 5} x2={x} y2={y + 5} stroke={GOLD} strokeWidth={1.25} />;
}

interface MeasureLineProps {
  y: number;
  /** Half-width of the measurement, taken either side of the centre line. */
  half: number;
  label: string;
  labelX: number;
}

function MeasureLine({ y, half, label, labelX }: MeasureLineProps) {
  const x1 = CENTRE - half;
  const x2 = CENTRE + half;
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={GOLD} strokeWidth={1.25} />
      <Tick x={x1} y={y} />
      <Tick x={x2} y={y} />
      <line
        x1={x2}
        y1={y}
        x2={labelX - 8}
        y2={y}
        stroke={GOLD}
        strokeWidth={1}
        strokeDasharray="2 3"
        opacity={0.55}
      />
      <text
        x={labelX}
        y={y + 4}
        fontSize={12.5}
        fontWeight={500}
        fill="var(--color-ink-70)"
        fontFamily="var(--font-sans)"
      >
        {label}
      </text>
    </g>
  );
}

export function MeasureFigure({ className = '' }: { className?: string }) {
  const mirror = `translate(${CENTRE * 2}, 0) scale(-1, 1)`;

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role="img"
      aria-label="A figure marked with the five measurements HOY takes: height, shoulders, chest, waist and inseam."
    >
      {/* Filled halves — closed across the centre, so they meet seamlessly. */}
      <g fill="var(--color-gold-tint)">
        <path d={`${HALF} Z`} />
        <path d={`${HALF} Z`} transform={mirror} />
      </g>

      {/* Stroked halves — left open, so no line is drawn down the middle. */}
      <g fill="none" stroke={GOLD} strokeOpacity={0.55} strokeWidth={1.5} strokeLinecap="round">
        <path d={HALF} />
        <path d={HALF} transform={mirror} />
      </g>

      {/* ---- height, down the left ---- */}
      <g>
        <line x1={44} y1={22} x2={44} y2={371} stroke={GOLD} strokeWidth={1.25} />
        <Tick x={44} y={22} />
        <Tick x={44} y={371} />
        <line x1={44} y1={22} x2={CENTRE} y2={22} stroke={GOLD} strokeWidth={1} strokeDasharray="2 3" opacity={0.45} />
        <line x1={44} y1={371} x2={175} y2={371} stroke={GOLD} strokeWidth={1} strokeDasharray="2 3" opacity={0.45} />
        <text
          x={28}
          y={195}
          fontSize={12.5}
          fontWeight={500}
          fill="var(--color-ink-70)"
          fontFamily="var(--font-sans)"
          textAnchor="middle"
          transform="rotate(-90 28 195)"
        >
          Height
        </text>
      </g>

      {/* ---- the horizontals, sized off the silhouette ---- */}
      <MeasureLine y={104} half={42} label="Shoulders" labelX={250} />
      <MeasureLine y={134} half={30} label="Chest" labelX={250} />
      <MeasureLine y={168} half={21} label="Waist" labelX={250} />

      {/* ---- inseam, inner leg ---- */}
      <g>
        <line x1={234} y1={216} x2={234} y2={371} stroke={GOLD} strokeWidth={1.25} />
        <Tick x={234} y={216} />
        <Tick x={234} y={371} />
        <line x1={CENTRE} y1={216} x2={234} y2={216} stroke={GOLD} strokeWidth={1} strokeDasharray="2 3" opacity={0.45} />
        <line x1={234} y1={293} x2={242} y2={293} stroke={GOLD} strokeWidth={1} strokeDasharray="2 3" opacity={0.55} />
        <text
          x={250}
          y={297}
          fontSize={12.5}
          fontWeight={500}
          fill="var(--color-ink-70)"
          fontFamily="var(--font-sans)"
        >
          Inseam
        </text>
      </g>
    </svg>
  );
}
