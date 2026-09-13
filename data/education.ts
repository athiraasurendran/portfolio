export type EducationEntry = {
  degree: string;
  concentration?: string;
  institution: string;
  period: string;
  grade: string;
};

export const education: EducationEntry[] = [
  {
    degree: 'Master of Arts in Economics',
    institution: 'Govt. College, Nedumangad · University of Kerala',
    period: '2022–2025',
    grade: 'First Class',
  },
  {
    degree: 'Bachelor of Arts in Economics',
    concentration: 'Mathematics & Statistics',
    institution: 'Bishop Jesudasan CSI Arts & Science College · University of Kerala',
    period: '2018–2021',
    grade: 'First Class',
  },
];
