import type { CertificateAsset } from './experience';

export type CertificateFile = {
  label: string;
  certificate: CertificateAsset;
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  /** Single-file certificates use this. */
  certificate?: CertificateAsset;
  /** Multi-file certificates (e.g. a multi-part course) use this instead. */
  certificates?: CertificateFile[];
};

/**
 * Every entry below is backed by an actual certificate file in
 * /public/certificates, verified against the uploaded PDF. Nothing here
 * is guessed — names, issuers, and years are taken directly off each
 * certificate (the Power BI Workshop year is the one exception, set per
 * explicit confirmation: 2024, not the completion-adjacent 2025 batch).
 *
 * The two "Python for Data Science and Machine Learning" LinkedIn Learning
 * certificates (Part 1 and Part 2) are combined into a single card per
 * request - both files are viewable from the one card.
 */
export const certifications: Certification[] = [
  {
    id: 'ict-data-science-specialist',
    title: 'Certified Specialist in Data Science and Analytics',
    issuer: 'ICT Academy of Kerala',
    year: '2025',
    certificate: {
      fileUrl: '/certificates/ict-data-science-specialist.pdf',
      fileType: 'pdf',
    },
  },
  {
    id: 'linkedin-become-a-data-scientist',
    title: 'Become a Data Scientist',
    issuer: 'LinkedIn Learning',
    year: '2025',
    certificate: {
      fileUrl: '/certificates/linkedin-become-a-data-scientist.pdf',
      fileType: 'pdf',
    },
  },
  {
    id: 'linkedin-python-ds-ml',
    title: 'Python for Data Science and Machine Learning',
    issuer: 'LinkedIn Learning',
    year: '2025',
    certificates: [
      {
        label: 'Part 1',
        certificate: {
          fileUrl: '/certificates/linkedin-python-for-data-science-ml-part1.pdf',
          fileType: 'pdf',
        },
      },
      {
        label: 'Part 2',
        certificate: {
          fileUrl: '/certificates/linkedin-python-for-data-science-ml-part2.pdf',
          fileType: 'pdf',
        },
      },
    ],
  },
  {
    id: 'linkedin-power-bi-microsoft-press',
    title: 'Complete Guide to Power BI for Data Analysts by Microsoft Press',
    issuer: 'LinkedIn Learning',
    year: '2025',
    certificate: {
      fileUrl: '/certificates/linkedin-power-bi-for-data-analysts.pdf',
      fileType: 'pdf',
    },
  },
  {
    id: 'linkedin-tableau-cert-prep',
    title: 'Tableau Certified Data Analyst Cert Prep',
    issuer: 'LinkedIn Learning',
    year: '2025',
    certificate: {
      fileUrl: '/certificates/linkedin-tableau-certified-data-analyst-prep.pdf',
      fileType: 'pdf',
    },
  },
  {
    id: 'neuralnest-power-bi-workshop',
    title: 'Power BI Workshop',
    issuer: 'NeuralNest',
    year: '2024',
    certificate: {
      fileUrl: '/certificates/neuralnest-power-bi-workshop.pdf',
      fileType: 'pdf',
    },
  },
];
