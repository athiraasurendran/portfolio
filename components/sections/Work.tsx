import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';
import { featuredProject } from '@/data/projects';
import { dsAnalyticsRepo } from '@/data/dsRepo';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Tag } from '@/components/ui/Tag';
import { SignalChart, NotesGraphic } from '@/components/ui/SignalChart';
import { TiltCard } from '@/components/ui/TiltCard';

export function Work() {
  return (
    <section id="work" className="section-pad scroll-mt-24 border-t border-base-border">
      <div className="container-content">
        <SectionHeading
          eyebrow="Selected Work"
          title="A closer look at how I build"
          description="One deep case study rather than a wall of small cards — because how something was built matters more than how many things there are."
        />

        <Reveal>
          <TiltCard
            intensity={2.5}
            className="overflow-hidden rounded-3xl border border-base-border bg-base-raised"
          >
            <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-8 sm:p-12">
                <p className="eyebrow mb-4">{featuredProject.year} · Featured Project</p>
                <h3 className="font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
                  {featuredProject.title}
                </h3>
                <p className="mt-1 text-ink-muted">{featuredProject.subtitle}</p>

                <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted">
                  {featuredProject.description}
                </p>

                <ul className="mt-6 space-y-2">
                  {featuredProject.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm text-ink-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-2">
                  {featuredProject.tech.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-6">
                  <a
                    href={featuredProject.links.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-signal px-5 py-2.5 text-sm font-medium text-base transition-colors hover:bg-signal-bright"
                  >
                    Live Demo
                    <ArrowUpRight size={15} />
                  </a>
                  <a
                    href={featuredProject.links.sourceCode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-signal"
                  >
                    <Github size={16} />
                    Source Code
                  </a>
                  <Link
                    href={featuredProject.links.caseStudy}
                    className="inline-flex items-center gap-1 border-b border-signal/40 pb-0.5 text-sm font-medium text-signal transition-colors hover:border-signal"
                  >
                    Case Study
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>

              <div className="flex flex-col border-t border-base-border bg-base lg:border-l lg:border-t-0">
                <div className="flex flex-1 items-center justify-center p-6">
                  <SignalChart className="h-auto w-full max-w-xs" />
                </div>
                <div className="grid grid-cols-3 divide-x divide-base-border border-t border-base-border">
                  {featuredProject.metrics.map((m) => (
                    <div key={m.label} className="p-4 text-center sm:p-5">
                      <p className="font-mono text-xl font-medium text-signal sm:text-2xl">
                        {m.value}
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-wide text-ink-faint sm:text-xs">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>
        </Reveal>

        <Reveal delay={0.1}>
          <TiltCard
            intensity={2.5}
            className="mt-6 overflow-hidden rounded-3xl border border-base-border bg-base-raised"
          >
            <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-8 sm:p-12">
                <p className="eyebrow mb-4">Reference Repository</p>
                <h3 className="font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
                  {dsAnalyticsRepo.title}
                </h3>
                <p className="mt-1 text-ink-muted">
                  Statistics, Python, SQL, machine learning &amp; deep learning
                </p>

                <p className="mt-6 max-w-xl text-base leading-relaxed text-ink">
                  {dsAnalyticsRepo.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {dsAnalyticsRepo.topics.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>

                <div className="mt-9 flex flex-wrap items-center gap-6">
                  <a
                    href={dsAnalyticsRepo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-signal px-5 py-2.5 text-sm font-medium text-base transition-colors hover:bg-signal-bright"
                  >
                    <Github size={16} />
                    View Repository
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center border-t border-base-border bg-base p-6 lg:border-l lg:border-t-0">
                <NotesGraphic className="h-auto w-full max-w-xs" />
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
