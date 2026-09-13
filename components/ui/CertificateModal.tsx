'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ZoomIn, ZoomOut, ExternalLink } from 'lucide-react';
import type { CertificateAsset } from '@/data/experience';
import type { CertificateFile } from '@/data/certifications';
import { cn } from '@/lib/utils';

type CertificateModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  issuer: string;
  /** Single-file certificate. Provide this OR `certificates`, not both. */
  certificate?: CertificateAsset;
  /** Multi-file certificate (e.g. a two-part course) - renders a tab switcher. */
  certificates?: CertificateFile[];
};

export function CertificateModal({
  open,
  onClose,
  title,
  issuer,
  certificate,
  certificates,
}: CertificateModalProps) {
  const [zoomed, setZoomed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const files: CertificateFile[] = certificates ?? [
    { label: title, certificate: certificate ?? {} },
  ];
  const active = files[activeIndex] ?? files[0]!;
  const activeCertificate = active.certificate;

  useEffect(() => {
    if (!open) return;
    setZoomed(false);
    setActiveIndex(0);
    closeButtonRef.current?.focus();

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener('keydown', handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} certificate`}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.button
            aria-label="Close certificate viewer"
            className="absolute inset-0 bg-base/90 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            ref={dialogRef}
            className="relative z-10 flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-base-border-strong bg-base-raised shadow-2xl"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-base-border px-6 py-4">
              <div>
                <h3 className="font-display text-lg text-ink">{title}</h3>
                <p className="text-sm text-ink-muted">{issuer}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {activeCertificate.fileUrl && activeCertificate.fileType === 'image' && (
                  <button
                    type="button"
                    onClick={() => setZoomed((z) => !z)}
                    className="rounded-full border border-base-border p-2 text-ink-muted transition-colors hover:border-signal hover:text-signal"
                    aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
                  >
                    {zoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
                  </button>
                )}
                {activeCertificate.fileUrl && (
                  <a
                    href={activeCertificate.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-base-border p-2 text-ink-muted transition-colors hover:border-signal hover:text-signal"
                    aria-label="Open original file in a new tab"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-base-border p-2 text-ink-muted transition-colors hover:border-signal hover:text-signal"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {files.length > 1 && (
              <div
                role="tablist"
                aria-label="Certificate parts"
                className="flex gap-1 border-b border-base-border px-6 pt-3"
              >
                {files.map((f, i) => (
                  <button
                    key={f.label}
                    type="button"
                    role="tab"
                    aria-selected={i === activeIndex}
                    onClick={() => {
                      setActiveIndex(i);
                      setZoomed(false);
                    }}
                    className={cn(
                      'rounded-t-lg px-4 py-2 text-sm font-medium transition-colors',
                      i === activeIndex
                        ? 'border-b-2 border-signal text-signal'
                        : 'border-b-2 border-transparent text-ink-muted hover:text-ink'
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}

            <div className="flex-1 overflow-auto bg-base p-6">
              {activeCertificate.fileUrl ? (
                activeCertificate.fileType === 'pdf' ? (
                  <iframe
                    src={activeCertificate.fileUrl}
                    title={`${title} — ${active.label} certificate PDF`}
                    className="h-[60vh] w-full rounded-lg border border-base-border"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={activeCertificate.fileUrl}
                    alt={`${title} certificate issued by ${issuer}`}
                    className={`mx-auto rounded-lg border border-base-border transition-transform duration-300 ${
                      zoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                    }`}
                    onClick={() => setZoomed((z) => !z)}
                  />
                )
              ) : (
                <div className="flex h-56 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-base-border text-center">
                  <p className="text-sm text-ink-muted">Certificate file coming soon.</p>
                  <p className="max-w-xs text-xs text-ink-faint">
                    This entry is verified but the certificate image hasn&apos;t been added to the
                    project yet.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
