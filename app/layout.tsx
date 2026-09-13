import type { Metadata } from 'next';
import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { site } from '@/data/site';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const title = `${site.name} — AI/ML & Data Science`;
const description =
  'Portfolio of Athira A S — AI/ML and Data Science candidate working with Python, machine learning, deep learning, and data-driven applications.';

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: title,
    template: `%s — ${site.name}`,
  },
  description,
  keywords: [
    'Athira A S',
    'Data Scientist',
    'Data Analyst',
    'Machine Learning',
    'AI Portfolio',
    'LSTM',
    'Python Developer',
    'Kerala',
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: 'website',
    url: site.siteUrl,
    title,
    description,
    siteName: `${site.name} — Portfolio`,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: site.resumeTitle,
    description: site.statement,
    url: site.siteUrl,
    email: `mailto:${site.email}`,
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Kerala',
      addressCountry: 'IN',
    },
    sameAs: [site.links.linkedin, site.links.github],
    knowsAbout: [
      'Machine Learning',
      'Deep Learning',
      'Data Science',
      'Data Analytics',
      'Python',
    ],
  };

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="bg-base font-body text-ink antialiased selection:bg-signal/30 selection:text-ink">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-signal focus:px-4 focus:py-2 focus:text-base focus:font-medium"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
