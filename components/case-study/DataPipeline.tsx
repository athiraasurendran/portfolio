'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { PipelineStep } from '@/data/projects';

type DataPipelineProps = {
  steps: PipelineStep[];
};

export function DataPipeline({ steps }: DataPipelineProps) {
  const containerRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current || !lineRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // The connecting line grows with scroll — purely decorative, so text
      // content is never gated behind this animation succeeding.
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 65%',
            scrub: 0.6,
          },
        }
      );

      // Step dots light up as the line passes them — again, a visual
      // accent only. The step number/title/description are always
      // fully opaque and legible regardless of scroll or JS state.
      dotRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { backgroundColor: 'rgba(11,10,8,1)', borderColor: 'rgba(240,236,228,0.18)' },
          {
            backgroundColor: '#c9a876',
            borderColor: '#c9a876',
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 78%',
              end: 'top 55%',
              scrub: 0.4,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <ol ref={containerRef} className="relative list-none pl-12 sm:pl-16">
      <div
        aria-hidden
        className="absolute left-[9px] top-2 h-[calc(100%-16px)] w-px bg-base-border sm:left-[13px]"
      />
      <div
        ref={lineRef}
        aria-hidden
        className="absolute left-[9px] top-2 h-[calc(100%-16px)] w-px bg-signal sm:left-[13px]"
      />

      <div className="space-y-10">
        {steps.map((step, i) => (
          <li key={step.number} className="relative">
            <span
              ref={(el) => (dotRefs.current[i] = el)}
              aria-hidden
              className="absolute -left-12 top-1 flex h-5 w-5 items-center justify-center rounded-full border border-base-border-strong bg-base sm:-left-16"
            />
            <p className="font-mono text-sm text-signal">
              {step.number} — {step.title}
            </p>
            <p className="mt-1.5 max-w-md text-base leading-relaxed text-ink-muted">
              {step.description}
            </p>
          </li>
        ))}
      </div>
    </ol>
  );
}
