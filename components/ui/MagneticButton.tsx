'use client';

import { useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  variant?: 'solid' | 'outline';
  className?: string;
  external?: boolean;
  download?: boolean | string;
};

export function MagneticButton({
  href,
  children,
  variant = 'solid',
  className,
  external = true,
  download,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  function handleMove(e: MouseEvent<HTMLAnchorElement>) {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.25, y: y * 0.35 });
  }

  function handleLeave() {
    setPos({ x: 0, y: 0 });
  }

  const isInternal = href.startsWith('#') || href.startsWith('/');

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 12, mass: 0.4 }}
      target={!isInternal && external ? '_blank' : undefined}
      rel={!isInternal && external ? 'noopener noreferrer' : undefined}
      download={download}
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300',
        variant === 'solid'
          ? 'bg-signal text-base hover:bg-signal-bright'
          : 'border border-base-border-strong text-ink hover:border-signal hover:text-signal',
        className
      )}
    >
      {children}
    </motion.a>
  );
}
