import { education } from '@/data/education';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

export function Education() {
  return (
    <section id="education" className="section-pad scroll-mt-24 border-t border-base-border">
      <div className="container-content">
        <SectionHeading eyebrow="Education" title="Academic foundation" />

        <div className="space-y-0 divide-y divide-base-border border-y border-base-border">
          {education.map((edu, i) => (
            <Reveal key={edu.degree} delay={i * 0.08}>
              <div className="flex flex-col gap-2 py-8 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-display text-xl text-ink sm:text-2xl">{edu.degree}</h3>
                  {edu.concentration && (
                    <p className="mt-0.5 italic text-ink-muted">{edu.concentration}</p>
                  )}
                  <p className="mt-1 text-sm text-ink-muted">{edu.institution}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3 font-mono text-xs uppercase tracking-wide text-ink-faint">
                  <span>{edu.period}</span>
                  <span className="h-1 w-1 rounded-full bg-signal" />
                  <span className="text-signal">{edu.grade}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
