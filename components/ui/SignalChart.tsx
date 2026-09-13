'use client';

import { motion, useReducedMotion } from 'framer-motion';

type VisualProps = {
  className?: string;
};

/**
 * Abstract stock-forecast visual: muted historical candlesticks flowing into
 * a glowing, animated projected line — evokes time-series forecasting
 * without being a literal (and cluttered) screenshot of a stock chart.
 * Purely decorative - the project's factual content/metrics live elsewhere.
 */
export function SignalChart({ className }: VisualProps) {
  const shouldReduceMotion = useReducedMotion();
  // Deterministic bar heights so the SVG is static markup on the server.
  const bars = [38, 52, 44, 61, 49, 66, 58, 72, 63, 80, 70, 90];
  const barWidth = 14;
  const gap = 8;
  const chartHeight = 140;
  const baseline = 170;
  const divider = bars.length * (barWidth + gap) + 10;
  const forecastPath = `M ${divider} 96 C ${divider + 30} 88, ${divider + 45} 60, ${
    divider + 80
  } 50 S ${divider + 130} 40, ${divider + 160} 30`;

  return (
    <svg
      viewBox="0 0 420 220"
      className={className}
      role="img"
      aria-label="Abstract visualization of historical price bars flowing into a projected forecast line"
    >
      <defs>
        <linearGradient id="signalFade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c9a876" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#e4c896" stopOpacity="0.95" />
        </linearGradient>
        <filter id="signalGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* historical bars - a gentle staggered rise-in on first view */}
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={12 + i * (barWidth + gap)}
          width={barWidth}
          rx={2}
          fill="#a8a39a"
          opacity={0.16 + (i / bars.length) * 0.22}
          initial={shouldReduceMotion ? undefined : { height: 0, y: baseline }}
          whileInView={shouldReduceMotion ? undefined : { height: h, y: baseline - h }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
          {...(shouldReduceMotion ? { height: h, y: baseline - h } : {})}
        />
      ))}

      {/* divider between "history" and "forecast" */}
      <line
        x1={divider}
        y1={30}
        x2={divider}
        y2={baseline}
        stroke="#f0ece4"
        strokeOpacity={0.12}
        strokeDasharray="3 5"
      />

      {/* projected forecast line - draws in, then holds a slow, subtle pulse */}
      <motion.path
        d={forecastPath}
        fill="none"
        stroke="url(#signalFade)"
        strokeWidth={2.5}
        strokeLinecap="round"
        filter="url(#signalGlow)"
        initial={shouldReduceMotion ? undefined : { pathLength: 0, opacity: 0.4 }}
        whileInView={shouldReduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.circle
        cx={divider + 160}
        cy={30}
        r={4}
        fill="#e4c896"
        filter="url(#signalGlow)"
        animate={
          shouldReduceMotion
            ? undefined
            : { opacity: [0.6, 1, 0.6], scale: [1, 1.15, 1] }
        }
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <text
        x={12}
        y={chartHeight + 58}
        fill="#6e6a62"
        fontSize="10"
        letterSpacing="0.08em"
        fontFamily="var(--font-mono)"
      >
        HISTORICAL
      </text>
      <text
        x={divider + 8}
        y={chartHeight + 58}
        fill="#c9a876"
        fontSize="10"
        letterSpacing="0.08em"
        fontFamily="var(--font-mono)"
      >
        FORECAST
      </text>
    </svg>
  );
}

/**
 * Premium abstract visual for the Data Science & Analytics reference
 * repository: a small distribution histogram, a scatter of data points, and
 * a fitted trend line — evoking statistics, EDA, and machine learning
 * without a literal screenshot. Matches the Stock Forecaster's visual
 * language (same palette, same soft-glow treatment) so the two cards read
 * as one consistent system.
 */
export function NotesGraphic({ className }: VisualProps) {
  const shouldReduceMotion = useReducedMotion();
  const histogram = [22, 38, 54, 44, 30, 18];
  const barWidth = 12;
  const gap = 6;
  const baseline = 150;

  const scatter = [
    [190, 96], [206, 78], [222, 88], [238, 62], [254, 70],
    [270, 48], [286, 56], [302, 34],
  ];

  const trendPath = 'M 186 100 C 210 84, 240 66, 270 50 S 300 34, 308 28';

  return (
    <svg
      viewBox="0 0 320 220"
      className={className}
      role="img"
      aria-label="Abstract visualization of a data distribution, scattered data points, and a fitted trend line"
    >
      <defs>
        <linearGradient id="analyticsFade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c9a876" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#e4c896" stopOpacity="0.95" />
        </linearGradient>
        <filter id="analyticsGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* baseline */}
      <line x1={14} y1={baseline} x2={306} y2={baseline} stroke="#f0ece4" strokeOpacity={0.1} />

      {/* distribution histogram */}
      {histogram.map((h, i) => (
        <motion.rect
          key={i}
          x={14 + i * (barWidth + gap)}
          width={barWidth}
          rx={2}
          fill="#a8a39a"
          opacity={0.3}
          initial={shouldReduceMotion ? undefined : { height: 0, y: baseline }}
          whileInView={shouldReduceMotion ? undefined : { height: h, y: baseline - h }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          {...(shouldReduceMotion ? { height: h, y: baseline - h } : {})}
        />
      ))}

      {/* scattered data points */}
      {scatter.map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r={2.6}
          fill="#e4c896"
          initial={shouldReduceMotion ? undefined : { opacity: 0 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 0.85 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
          {...(shouldReduceMotion ? { opacity: 0.85 } : {})}
        />
      ))}

      {/* fitted trend line */}
      <motion.path
        d={trendPath}
        fill="none"
        stroke="url(#analyticsFade)"
        strokeWidth={2.25}
        strokeLinecap="round"
        filter="url(#analyticsGlow)"
        initial={shouldReduceMotion ? undefined : { pathLength: 0 }}
        whileInView={shouldReduceMotion ? undefined : { pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <text
        x={14}
        y={196}
        fill="#6e6a62"
        fontSize="10"
        letterSpacing="0.08em"
        fontFamily="var(--font-mono)"
      >
        DISTRIBUTION
      </text>
      <text
        x={190}
        y={196}
        fill="#c9a876"
        fontSize="10"
        letterSpacing="0.08em"
        fontFamily="var(--font-mono)"
      >
        TREND
      </text>
    </svg>
  );
}
