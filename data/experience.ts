export type CertificateAsset = {
  /** Path under /public, or undefined if the file has not been supplied yet. */
  fileUrl?: string;
  fileType?: 'image' | 'pdf';
};

export const experience = {
  role: 'IT Solution Intern — Data Science & Analytics',
  org: 'ICT Academy of Kerala',
  orgLocation: 'Technopark, Trivandrum',
  start: 'Sep 2025',
  end: 'Jan 2026',
  summary:
    'Engineered and Analyzed a high-volume, confidential dataset for the ICT Paatshala LMS, then built a Flask-based analytics dashboard to track learner engagement and program performance across the platform.',
  highlights: [
    {
      label: 'Scale',
      detail: 'Worked with 32M+ records from the ICT Paatshala Learning Management System.',
    },
    {
      label: 'Engineering',
      detail:
        'Structured and processed large-scale, confidential datasets using Python into clean, analysis-ready pipelines.',
    },
    {
      label: 'Delivery',
      detail:
        'Built an interactive analytics dashboard in Flask to surface learner engagement and program performance metrics.',
    },
    {
      label: 'Impact',
      detail:
        'Outputs supported structured, institutional-level decision-making for the program.',
    },
  ],
  stat: {
    value: '32M+',
    label: 'LMS records processed',
  },
  // Exactly the technologies specified — no SQL here by design.
  stack: ['Excel', 'Python', 'Pandas', 'NumPy', 'Matplotlib', 'Flask', 'HTML', 'CSS', 'JavaScript'],
  certificate: {
    fileUrl: '/certificates/internship-ict-academy.pdf',
    fileType: 'pdf',
  } as CertificateAsset,
};
