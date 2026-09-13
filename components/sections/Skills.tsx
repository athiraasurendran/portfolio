import { skillGroups } from '@/data/skills';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

export function Skills() {
  return (
    <section className="section-pad scroll-mt-24 border-t border-base-border">
      <div className="container-content">
        <SectionHeading
          eyebrow="Technical Skills"
          title="What I build with"
          description="Grouped by how the tools are actually used, not ranked by arbitrary percentages."
        />

        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.id} delay={i * 0.05}>
              <div>
                <p className="eyebrow mb-4">{group.title}</p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-base-border px-3.5 py-1.5 text-sm text-ink-muted transition-colors duration-200 hover:border-base-border-strong"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
