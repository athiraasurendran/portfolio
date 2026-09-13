'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { certifications } from '@/data/certifications';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { CertificateModal } from '@/components/ui/CertificateModal';
import { TiltCard } from '@/components/ui/TiltCard';

export function Certifications() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = certifications.find((c) => c.id === openId);

  return (
    <section
      id="certifications"
      className="section-pad scroll-mt-24 border-t border-base-border"
    >
      <div className="container-content">
        <SectionHeading eyebrow="Certifications" title="Credentials" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <Reveal key={cert.id} delay={i * 0.06}>
              <TiltCard intensity={2} className="h-full rounded-2xl">
                <button
                  type="button"
                  onClick={() => setOpenId(cert.id)}
                  className="group flex h-full w-full flex-col justify-between rounded-2xl border border-base-border bg-base-raised p-6 text-left transition-colors duration-300 hover:border-signal/50"
                >
                  <div>
                    <h3 className="font-display text-lg leading-snug text-ink">{cert.title}</h3>
                    <p className="mt-2 text-sm text-ink-muted">{cert.issuer}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wide text-ink-faint">
                      {cert.year}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-signal opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                      View Certificate
                      <ExternalLink size={13} />
                    </span>
                  </div>
                </button>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      {active && (
        <CertificateModal
          open={!!active}
          onClose={() => setOpenId(null)}
          title={active.title}
          issuer={active.issuer}
          certificate={active.certificate}
          certificates={active.certificates}
        />
      )}
    </section>
  );
}
