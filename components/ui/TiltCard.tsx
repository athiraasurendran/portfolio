'use client';

import { useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees - kept small so it reads as depth, not a gimmick. */
  intensity?: number;
};

export function TiltCard({ children, className, intensity = 4 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * intensity, y: px * intensity });
  }

  function handleLeave() {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      animate={
        shouldReduceMotion
          ? undefined
          : {
              rotateX: tilt.x,
              rotateY: tilt.y,
              scale: hovered ? 1.008 : 1,
              y: hovered ? -2 : 0,
            }
      }
      transition={{ type: 'spring', stiffness: 220, damping: 22, mass: 0.6 }}
      style={{ transformStyle: 'preserve-3d', transformPerspective: 1000 }}
      className={cn('transition-shadow duration-300', hovered && 'shadow-2xl shadow-black/20', className)}
    >
      {children}
    </motion.div>
  );
}
