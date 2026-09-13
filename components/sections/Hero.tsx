'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, ArrowDown } from 'lucide-react';
import { site } from '@/data/site';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { FocusTags } from '@/components/ui/FocusTags';

// The 3D scene is client-only and heavy relative to the rest of the page,
// so it is code-split and streamed in after the critical hero copy paints.
const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => <div className="h-full w-full" aria-hidden />,
});

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  // Gentle parallax: the 3D scene drifts slightly slower than the page scrolls.
  const sceneY = useTransform(scrollYProgress, [0, 1], ['0%', shouldReduceMotion ? '0%' : '18%']);

  return (
    <section ref={sectionRef} className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
      <motion.div style={{ y: sceneY }} className="pointer-events-none absolute inset-0 z-0 opacity-90">
        <HeroScene />
      </motion.div>

      <div className="container-content relative z-10">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow mb-6"
          >
            {site.positioning}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance font-display text-6xl font-medium leading-[0.98] tracking-tight text-ink sm:text-7xl lg:text-8xl"
          >
            {site.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-xl text-balance text-lg leading-relaxed text-ink-muted sm:text-xl"
          >
            {site.statement}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6"
          >
            <FocusTags />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#work" external={false} variant="solid">
              Explore My Work
            </MagneticButton>
            <MagneticButton href="#contact" external={false} variant="outline">
              Let&apos;s Connect
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-14 flex items-center gap-5 text-ink-faint"
          >
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="transition-colors hover:text-signal"
            >
              <Github size={20} />
            </a>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="transition-colors hover:text-signal"
            >
              <Linkedin size={20} />
            </a>
            <span className="font-mono text-xs uppercase tracking-wide">{site.location}</span>
          </motion.div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-ink-faint transition-colors hover:text-signal"
      >
        <ArrowDown size={18} className="animate-bounce motion-reduce:animate-none" />
      </a>
    </section>
  );
}
