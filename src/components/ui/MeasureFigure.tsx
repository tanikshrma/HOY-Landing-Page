/**
 * The five measurements HOY takes, drawn on a figure.
 *
 * The body is built from capsules and a circle so it echoes the logo's own
 * shape language rather than looking like a clipart mannequin. Everything is
 * geometry — no text baked into paths — so it stays crisp at any size and the
 * labels remain real text for screen readers and translation.
 *
 * Proportioned at roughly eight-and-a-half heads, legs longer than the torso.
 * A squarer figure reads as a toy, which undercuts the point the section is
 * making about real bodies.
 */

const GOLD = 'var(--color-gold)';

/** Tick marks at each end of a measurement line. */
function HTick({ x, y }: { x: number; y: number }) {
  return <line x1={x} y1={y - 5} x2={x} y2={y + 5} stroke={GOLD} strokeWidth={1.5} />;
}

interface MeasureLineProps {
  y: number;
  x1: number;
  x2: number;
  label: string;
  /** Where the leader line ends and the label begins. */
  labelX: number;
}

function MeasureLine({ y, x1, x2, label, labelX }: MeasureLineProps) {
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={GOLD} strokeWidth={1.5} />
      <HTick x={x1} y={y} />
      <HTick x={x2} y={y} />
      {/* Leader out to the label, dashed so it reads as an annotation. */}
      <line
        x1={x2}
        y1={y}
        x2={labelX - 8}
        y2={y}
        stroke={GOLD}
        strokeWidth={1}
        strokeDasharray="2 3"
        opacity={0.6}
      />
      <text
        x={labelX}
        y={y + 4}
        fontSize={13}
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
  return (
    <svg
      viewBox="0 0 440 400"
      className={className}
      role="img"
      aria-label="A figure marked with the five measurements HOY takes: height, shoulders, chest, waist and inseam."
    >
      {/* ---- the body ---- */}
      <g
        fill="var(--color-gold-tint)"
        stroke={GOLD}
        strokeOpacity={0.4}
        strokeWidth={1.5}
      >
        <circle cx={170} cy={42} r={19} />
        <rect x={134} y={68} width={72} height={118} rx={30} />
        <rect x={113} y={76} width={14} height={102} rx={7} />
        <rect x={213} y={76} width={14} height={102} rx={7} />
        <rect x={140} y={186} width={26} height={182} rx={13} />
        <rect x={174} y={186} width={26} height={182} rx={13} />
      </g>

      {/* ---- height, down the left ---- */}
      <g>
        <line x1={46} y1={23} x2={46} y2={368} stroke={GOLD} strokeWidth={1.5} />
        <line x1={41} y1={23} x2={51} y2={23} stroke={GOLD} strokeWidth={1.5} />
        <line x1={41} y1={368} x2={51} y2={368} stroke={GOLD} strokeWidth={1.5} />
        {/* Dotted rules tying the axis to the crown and the sole. */}
        <line x1={46} y1={23} x2={170} y2={23} stroke={GOLD} strokeWidth={1} strokeDasharray="2 3" opacity={0.5} />
        <line x1={46} y1={368} x2={200} y2={368} stroke={GOLD} strokeWidth={1} strokeDasharray="2 3" opacity={0.5} />
        <text
          x={30}
          y={196}
          fontSize={13}
          fontWeight={500}
          fill="var(--color-ink-70)"
          fontFamily="var(--font-sans)"
          textAnchor="middle"
          transform="rotate(-90 30 196)"
        >
          Height
        </text>
      </g>

      {/* ---- the horizontals ---- */}
      <MeasureLine y={78} x1={113} x2={227} label="Shoulders" labelX={262} />
      <MeasureLine y={112} x1={134} x2={206} label="Chest" labelX={262} />
      <MeasureLine y={168} x1={134} x2={206} label="Waist" labelX={262} />

      {/* ---- inseam, inner leg ---- */}
      <g>
        <line x1={240} y1={186} x2={240} y2={368} stroke={GOLD} strokeWidth={1.5} />
        <line x1={235} y1={186} x2={245} y2={186} stroke={GOLD} strokeWidth={1.5} />
        <line x1={235} y1={368} x2={245} y2={368} stroke={GOLD} strokeWidth={1.5} />
        <line x1={200} y1={186} x2={240} y2={186} stroke={GOLD} strokeWidth={1} strokeDasharray="2 3" opacity={0.5} />
        <line x1={240} y1={277} x2={254} y2={277} stroke={GOLD} strokeWidth={1} strokeDasharray="2 3" opacity={0.6} />
        <text
          x={262}
          y={281}
          fontSize={13}
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
