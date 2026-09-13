import { Github, Linkedin, Mail, Download, ArrowUpRight } from 'lucide-react';
import { site } from '@/data/site';
import { featuredProject } from '@/data/projects';
import { dsAnalyticsRepo } from '@/data/dsRepo';
import { Reveal } from '@/components/ui/Reveal';
import { MagneticButton } from '@/components/ui/MagneticButton';

const quickLinks = [
  { label: 'LinkedIn', href: site.links.linkedin },
  { label: 'GitHub Profile', href: site.links.github },
  { label: 'Stock Forecaster — Live Demo', href: featuredProject.links.liveDemo },
  { label: 'Stock Forecaster — GitHub', href: featuredProject.links.sourceCode },
  { label: 'Data Science & Analytics — GitHub', href: dsAnalyticsRepo.link },
];

export function Contact() {
  return (
    <section id="contact" className="section-pad scroll-mt-24 border-t border-base-border">
      <div className="container-content">
        <Reveal>
          <p className="eyebrow mb-6">Let&apos;s Connect</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="max-w-2xl text-balance font-display text-4xl font-medium leading-[1.1] text-ink sm:text-6xl">
            Open to data science and ML roles — let&apos;s talk about where I can help.
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <MagneticButton href={`mailto:${site.email}`} variant="solid" external={false}>
              <Mail size={16} />
              {site.email}
            </MagneticButton>
            <MagneticButton href={site.resumeFile} variant="outline" download="Athira_A_S_Resume.pdf">
              <Download size={16} />
              Download Resume
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-14 max-w-md">
            <p className="eyebrow mb-4">Quick Links</p>
            <ul className="divide-y divide-base-border border-y border-base-border">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-3.5 text-sm text-ink-muted transition-colors hover:text-signal"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={14}
                      className="text-ink-faint transition-colors group-hover:text-signal"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-6">
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-signal"
              >
                <Linkedin size={17} />
                LinkedIn
              </a>
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-signal"
              >
                <Github size={17} />
                GitHub
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
