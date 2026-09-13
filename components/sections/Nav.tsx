'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { site } from '@/data/site';
import { SECTIONS, cn, type SectionId } from '@/lib/utils';

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<SectionId>('about');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id as SectionId);
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'py-3' : 'py-6'
      )}
    >
      <div className="container-content">
        <div
          className={cn(
            'flex items-center justify-between rounded-full border transition-all duration-500',
            scrolled
              ? 'border-base-border-strong bg-base/80 px-5 py-2.5 backdrop-blur-md'
              : 'border-transparent px-1 py-1'
          )}
        >
          <a
            href={isHome ? '#about' : '/'}
            className="font-display text-base font-medium tracking-tight text-ink transition-colors hover:text-signal sm:text-lg"
          >
            {site.name}
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={hrefFor(section.id)}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm transition-colors',
                  isHome && active === section.id
                    ? 'text-signal'
                    : 'text-ink-muted hover:text-ink'
                )}
              >
                {section.label}
                {isHome && active === section.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-signal"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="rounded-full p-2 text-ink md:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-base/98 backdrop-blur-md md:hidden"
          >
            <div className="container-content flex items-center justify-between py-6">
              <span className="font-mono text-sm text-ink-muted">Menu</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="rounded-full p-2 text-ink"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="container-content flex flex-col gap-2 pt-8">
              {SECTIONS.map((section, i) => (
                <motion.a
                  key={section.id}
                  href={hrefFor(section.id)}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-base-border py-5 font-display text-3xl text-ink"
                >
                  {section.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
