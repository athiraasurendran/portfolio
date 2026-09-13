export type SkillSource = 'experience' | 'ai-stock-forecaster' | 'ds-analytics-repo';

export type SkillGroup = {
  id: string;
  title: string;
  skills: string[];
  /** ids of experience/project sources this group connects to, for the optional hover link */
  usedIn: SkillSource[];
};

/**
 * Curated deliberately - only the skills genuinely supported by the resume,
 * the Stock Forecaster project, and the Data Science & Analytics reference
 * repository. Python and SQL are the only two languages by design.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'core',
    title: 'Core Competencies',
    skills: [
      'Data Science',
      'Data Analytics',
      'Statistics',
      'Exploratory Data Analysis (EDA)',
      'Time Series Analysis',
      'Machine Learning',
      'Deep Learning',
    ],
    usedIn: ['experience', 'ai-stock-forecaster', 'ds-analytics-repo'],
  },
  {
    id: 'languages',
    title: 'Languages',
    skills: ['Python', 'SQL'],
    usedIn: ['experience', 'ai-stock-forecaster', 'ds-analytics-repo'],
  },
  {
    id: 'ml-dl',
    title: 'Machine Learning & Deep Learning',
    skills: ['Scikit-learn', 'TensorFlow', 'Keras', 'LSTM'],
    usedIn: ['ai-stock-forecaster', 'ds-analytics-repo'],
  },
  {
    id: 'data-viz',
    title: 'Data & Visualization',
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Plotly', 'Power BI', 'Tableau'],
    usedIn: ['experience', 'ai-stock-forecaster'],
  },
  {
    id: 'frameworks',
    title: 'Frameworks & Tools',
    skills: ['Flask', 'Streamlit', 'Excel'],
    usedIn: ['experience', 'ai-stock-forecaster'],
  },
];
