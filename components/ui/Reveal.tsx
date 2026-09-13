'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'span';
};

export function Reveal({ children, delay = 0, y = 18, className, as = 'div' }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? undefined : { opacity: 0, y };
  const whileInView = shouldReduceMotion ? undefined : { opacity: 1, y: 0 };
  const transition = { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const };
  const viewport = { once: true, margin: '-80px' };

  if (as === 'span') {
    return (
      <motion.span
        initial={initial}
        whileInView={whileInView}
        viewport={viewport}
        transition={transition}
        className={className}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
