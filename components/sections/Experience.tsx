'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { experience } from '@/data/experience';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Tag } from '@/components/ui/Tag';
import { CertificateModal } from '@/components/ui/CertificateModal';
import { TiltCard } from '@/components/ui/TiltCard';

export function Experience() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="experience" className="section-pad scroll-mt-24 border-t border-base-border">
      <div className="container-content">
        <SectionHeading eyebrow="Experience" title="Where I've applied this" />

        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-16">
          <div>
            <Reveal>
              <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-display text-2xl text-ink sm:text-3xl">
                    {experience.role}
                  </h3>
                  <p className="mt-1 text-ink-muted">
                    {experience.org}, {experience.orgLocation}
                  </p>
                </div>
                <p className="font-mono text-xs uppercase tracking-wide text-ink-faint">
                  {experience.start} — {experience.end}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
                {experience.summary}
              </p>
            </Reveal>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {experience.highlights.map((h, i) => (
                <Reveal key={h.label} delay={0.08 + i * 0.05}>
                  <div className="border-l border-base-border pl-4">
                    <p className="eyebrow mb-1.5">{h.label}</p>
                    <p className="text-sm leading-relaxed text-ink-muted">{h.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-2">
                {experience.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.36}>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="mt-8 inline-flex items-center gap-2 border-b border-signal/40 pb-0.5 text-sm font-medium text-signal transition-colors hover:border-signal"
              >
                View Internship Certificate
                <ExternalLink size={14} />
              </button>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <TiltCard intensity={3} className="rounded-2xl border border-base-border bg-base-raised p-8 lg:w-64">
              <p className="font-mono text-4xl font-medium text-signal">{experience.stat.value}</p>
              <p className="mt-2 text-sm text-ink-muted">{experience.stat.label}</p>
            </TiltCard>
          </Reveal>
        </div>
      </div>

      <CertificateModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="IT Solution Intern — Data Science & Analytics"
        issuer={experience.org}
        certificate={experience.certificate}
      />
    </section>
  );
}
