export type Metric = {
  label: string;
  value: string;
};

export type PipelineStep = {
  number: string;
  title: string;
  description: string;
};

export const featuredProject = {
  slug: 'ai-stock-forecaster',
  title: 'AI Stock Forecaster',
  subtitle: 'Time Series Forecasting Using LSTM',
  description:
    'A deep-learning system that forecasts the next 7 days of closing prices for 25 leading companies and classifies the expected direction of movement, served through an interactive Streamlit application.',
  role: 'A collaborative project with a co-contributor (Akhil V S), as credited in the project repository.',
  year: '2025',
  tech: [
    'Python',
    'Pandas',
    'NumPy',
    'TensorFlow',
    'Keras',
    'LSTM',
    'Scikit-learn',
    'yfinance',
    'Plotly',
    'Streamlit',
    'Time Series Analysis',
  ],
  links: {
    liveDemo: 'https://ai-stock-forecaster.streamlit.app/',
    sourceCode: 'https://github.com/athiraasurendran/Stock-Price-Prediction-LSTM',
    caseStudy: '/work/ai-stock-forecaster',
  },
  highlights: [
    '7-day forecast of stock closing prices, generated company-by-company',
    'Actual-vs-predicted price visualization for each ticker',
    'Directional classification (up / down) alongside the price forecast',
    '25 individually trained LSTM models, one per supported company',
  ],
  metrics: [
    { label: 'Forecast horizon', value: '7 days' },
    { label: 'Companies covered', value: '25' },
    { label: 'Data window', value: '2010–2025' },
  ] satisfies Metric[],
  pipeline: [
    {
      number: '01',
      title: 'Collect',
      description: 'Historical stock data collected using yfinance.',
    },
    {
      number: '02',
      title: 'Clean & Prepare',
      description: 'Prepare closing-price data and handle the time-series structure.',
    },
    {
      number: '03',
      title: 'Create Sequences',
      description: 'Transform historical prices into sequential windows for LSTM training.',
    },
    {
      number: '04',
      title: 'Train',
      description: 'Train an individual LSTM model for each supported company.',
    },
    {
      number: '05',
      title: 'Forecast',
      description: 'Generate the next 7 days of predicted closing prices.',
    },
    {
      number: '06',
      title: 'Classify Direction',
      description: 'Determine expected upward/downward movement.',
    },
    {
      number: '07',
      title: 'Serve',
      description: 'Display forecasts and visualizations through Streamlit.',
    },
  ] satisfies PipelineStep[],
  evaluation: {
    company: 'Amazon (sample model)',
    metrics: [
      { label: 'MSE', value: '7.81' },
      { label: 'MAE', value: '2.05' },
      { label: 'R² Score', value: '0.998' },
    ] satisfies Metric[],
    note: 'As reported for the Amazon model in the project repository. Other companies have their own individually trained models and results may vary by ticker.',
  },
  limitations: [
    'Financial markets are influenced by factors a historical price model cannot capture — news, macroeconomic shifts, and sentiment among them.',
    'This project is built for educational and demonstration purposes. It is not financial advice, and forecasts should not be used for real trading decisions.',
    'Each company has its own independently trained model, so accuracy is not uniform across tickers.',
  ],
};
