import { site } from '@/data/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-base-border py-10">
      <div className="container-content flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-lg text-ink">{site.name}</p>
          <p className="text-sm text-ink-faint">{site.positioning}</p>
        </div>
        <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-wide text-ink-faint">
          <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-signal">
            GitHub
          </a>
          <span>·</span>
          <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-signal">
            LinkedIn
          </a>
          <span>·</span>
          <a href={`mailto:${site.email}`} className="hover:text-signal">
            Email
          </a>
          <span>·</span>
          <span>© {year}</span>
        </div>
      </div>
    </footer>
  );
}
