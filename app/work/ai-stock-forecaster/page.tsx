import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { featuredProject } from '@/data/projects';
import { Nav } from '@/components/sections/Nav';
import { Footer } from '@/components/sections/Footer';
import { Reveal } from '@/components/ui/Reveal';
import { Tag } from '@/components/ui/Tag';
import { DataPipeline } from '@/components/case-study/DataPipeline';

export const metadata: Metadata = {
  title: 'AI Stock Forecaster — Case Study',
  description:
    'How the AI Stock Forecaster uses LSTM deep learning to forecast 7-day stock price movement for 25 companies, from data pipeline to Streamlit application.',
};

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-base-border py-16 sm:py-20">
      <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:gap-16">
        <Reveal>
          <div>
            <p className="eyebrow mb-2">{eyebrow}</p>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">{title}</h2>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="max-w-2xl space-y-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            {children}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function CaseStudyPage() {
  return (
    <>
      <Nav />
      <main id="main" className="grain pt-32">
        <div className="container-content">
          <Reveal>
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-signal"
            >
              <ArrowLeft size={15} />
              Back to work
            </Link>
          </Reveal>

          <div className="mt-8 max-w-3xl">
            <Reveal delay={0.05}>
              <p className="eyebrow mb-4">Case Study · {featuredProject.year}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-balance font-display text-5xl font-medium leading-[1.05] text-ink sm:text-6xl">
                {featuredProject.title}
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-5 text-lg text-ink-muted">{featuredProject.subtitle}</p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-6">
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
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-8 flex flex-wrap gap-2">
                {featuredProject.tech.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </Reveal>
          </div>

          <Section eyebrow="01 · Overview" title="What it does">
            <p>{featuredProject.description}</p>
            <p className="text-sm text-ink-faint">{featuredProject.role}</p>
          </Section>

          <Section eyebrow="02 · Problem" title="What it's solving for">
            <p>
              Reading raw historical price charts doesn&apos;t give a clear read on
              short-term direction. The goal was a tool that turns historical daily prices
              into a concrete, near-term forecast — the next 7 days — for a defined set of
              companies, along with a simple up/down read on direction, so the output is
              usable without a statistics background.
            </p>
          </Section>

          <Section eyebrow="03 · Data" title="Source & window">
            <p>
              All historical price data comes from Yahoo Finance via the{' '}
              <code className="rounded bg-base-raised px-1.5 py-0.5 font-mono text-sm text-signal">
                yfinance
              </code>{' '}
              library, covering a 2010–2025 window across the 25 supported companies.
            </p>
          </Section>

          <section className="border-t border-base-border py-16 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
              <Reveal>
                <div>
                  <p className="eyebrow mb-2">04 · Data Pipeline</p>
                  <h2 className="font-display text-2xl text-ink sm:text-3xl">
                    From raw prices to forecast
                  </h2>
                </div>
              </Reveal>
              <DataPipeline steps={featuredProject.pipeline} />
            </div>
          </section>

          <Section eyebrow="05 · Why LSTM" title="Built for sequential data">
            <p>
              Stock prices are sequential — each day&apos;s value carries information from
              the days before it. Long Short-Term Memory (LSTM) networks are built for
              exactly that kind of data: they retain relevant patterns across a sequence
              while letting less-relevant signal fade, which makes them a reasonable
              choice for modeling short-term price movement.
            </p>
            <p>
              This doesn&apos;t mean the model can predict the future with certainty — see
              Limitations below — but it is a well-suited architecture for the type of
              time-series problem this project is solving.
            </p>
          </Section>

          <Section eyebrow="06 · Evaluation" title="Sample model performance">
            <p>
              Metrics below are reported for the {featuredProject.evaluation.company} model
              in the project repository.
            </p>
            <div className="flex flex-wrap gap-6 pt-2">
              {featuredProject.evaluation.metrics.map((m) => (
                <div key={m.label}>
                  <p className="font-mono text-2xl text-signal">{m.value}</p>
                  <p className="text-xs uppercase tracking-wide text-ink-faint">{m.label}</p>
                </div>
              ))}
            </div>
            <p className="pt-2 text-sm text-ink-faint">{featuredProject.evaluation.note}</p>
          </Section>

          <Section eyebrow="07 · Streamlit Application" title="The interface">
            <p>
              The trained models are served through a Streamlit web application, where a
              company can be selected to view its 7-day forecast, an actual-vs-predicted
              price chart, and the predicted direction of movement — all generated from the
              latest data pulled through yfinance.
            </p>
          </Section>

          <Section eyebrow="08 · Limitations" title="What this isn't">
            <ul className="space-y-3">
              {featuredProject.limitations.map((l) => (
                <li key={l} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}
