export const personal = {
  name: 'Aditya Dey',
  title: 'Gen AI Engineer',
  location: 'Bengaluru, Karnataka, India',
  email: 'aditya2002dey@gmail.com',
  phone: '+91 6909485604',
  github: 'https://github.com/Aditya-Dey012',
  githubWork: 'https://github.com/adityanexturn',
  linkedin: 'https://linkedin.com/in/aditya-dey-8144b7202',
  instagram: 'https://www.instagram.com/_mr.dey_762',
  bio: "Gen AI Engineer with hands-on experience designing multi-agent RAG pipelines, LLM-integrated analytics systems, and full-stack AI applications. Proficient in LangChain, LangGraph, FAISS, AWS, and modern data engineering tools, with a strong foundation in machine learning, deep learning, and cloud-native development.",
};

export const skills = {
  'AI & ML': [
    'LLMs', 'LangChain', 'LangGraph', 'FAISS', 'FastAPI',
    'Vector Databases', 'MLflow', 'MCP', 'NumPy', 'Pandas', 'Matplotlib',
    'scikit-learn', 'TensorFlow/Keras', 'SentenceTransformers', 'Groq',
  ],
  'Programming & DB': ['Python', 'Scala', 'SQL', 'React', 'Next.js', 'JavaScript'],
  'Data Engineering': [
    'Apache Spark', 'PySpark', 'Databricks', 'Apache Kafka',
    'Hadoop', 'Hive', 'Docker', 'AWS Athena', 'AWS S3',
  ],
  'Tools & Design': ['Git', 'Power BI', 'Figma', 'Adobe Photoshop'],
  'AI Creative Tools': ['Higgsfield AI', 'Google Flow', 'Freepik AI'],
  'OS': ['Linux', 'Windows'],
};

export const experience = [
  {
    company: 'Nexturn',
    role: 'Cloud Engineer, AI/ML',
    period: 'Jan 2026 – Present',
    location: 'Bengaluru',
    slug: 'nexturn-cloud-engineer',
    projects: [
      {
        name: 'AI Analytics RAG System',
        stack: ['LangGraph', 'GPT-4o', 'FAISS', 'AWS Athena', 'React', 'Plotly', 'SSE'],
        bullets: [
          'Core specialty: a production LangGraph multi-agent state machine orchestrating 5 specialized agents — Orchestrator, Context Resolver, Data Agent, Summarization Agent, and Chart Agent — with intent-based routing, fallback recovery, and per-node MLflow tracing',
          'GPT-4o powers all 5 LLM tasks across the pipeline: intent classification (DATA_ONLY / SUMMARIZE / CHART / SUMMARIZE_AND_CHART), follow-up query rewriting, NLP-to-SQL generation, narrative insight summarisation, and executable Plotly chart code generation',
          'Built FAISS-based semantic schema retrieval so agents ground SQL generation against live Athena table metadata',
          'Engineered a React + Plotly dashboard with SSE-based real-time streaming — queries stream results token-by-token into interactive charts',
          'Automated PDF report generation using ReportLab, with AI-generated narrative summaries produced by the Summarization Agent',
        ],
      },
      {
        name: 'AI-Powered Recruitment Management System',
        stack: ['FastAPI', 'React/Vite', 'GPT-4o-mini', 'SharePoint', 'SendGrid'],
        bullets: [
          'Built end-to-end recruitment platform: FastAPI backend with React/Vite frontend, enabling HR teams to manage the full hiring pipeline',
          'Integrated GPT-4o-mini for automated resume parsing, structured candidate scoring, and JD-to-resume match ranking',
          'Implemented PII masking layer that strips sensitive data before any LLM call, ensuring GDPR-compliant processing',
          'Connected SharePoint via Microsoft Graph API for document storage and candidate file management',
          'Automated interview scheduling with SendGrid email delivery and dynamically generated .ics calendar attachments',
        ],
      },
      {
        name: 'SPOC – Smart Power Operations Centre',
        stack: ['FastAPI', 'LangGraph', 'Groq Llama-3.1', 'FAISS', 'Next.js 14', 'MLflow'],
        bullets: [
          'Delivered a production-grade intelligent monitoring platform for the 350 MW Kondapalli Combined Cycle Power Plant, Andhra Pradesh',
          'Designed a 7-agent LangGraph StateGraph pipeline — agents specialise in anomaly detection, root-cause diagnosis, document Q&A, and advisory generation',
          'Built FAISS semantic search over plant engineering manuals (pdfplumber extracted, MiniLM-L6-v2 embedded) enabling grounded, citation-backed answers',
          'Developed a real-time Next.js 14 dashboard with App Router, Tailwind CSS, and shadcn/ui — featuring live sensor streaming, Recharts performance graphs, and an embedded AI chat interface',
          'Deployed physics-based LinearRegression models for GT/ST power output prediction and an IsolationForest for one-sided anomaly detection on turbine residuals',
          'Instrumented every pipeline invocation with MLflow nested experiment tracing for full observability',
        ],
      },
    ],
  },
  {
    company: 'Nexturn',
    role: 'Data & ML Engineer Intern',
    period: 'Feb 2025 – Dec 2025',
    location: 'Hyderabad',
    slug: 'nexturn-intern',
    projects: [
      {
        name: 'ML/DL Model Development',
        stack: ['Python', 'scikit-learn', 'TensorFlow', 'MLflow'],
        bullets: [
          'Developed and benchmarked multiple ML/DL models with precision optimization and systematic performance evaluation',
          'Conducted deep EDA and feature engineering using Matplotlib, Seaborn, and Plotly across structured and time-series datasets',
        ],
      },
      {
        name: 'Music Genre Analysis Pipeline',
        stack: ['Apache Kafka', 'PySpark', 'Random Forest', 'Power BI'],
        bullets: [
          'Built a real-time Kafka ingestion pipeline streaming music metadata at scale, processed with PySpark distributed computing',
          'Trained a Random Forest classifier for genre prediction; visualised genre trends and model insights in interactive Power BI dashboards',
        ],
      },
    ],
  },
];

export const projects = [
  {
    name: 'AI-Powered Portfolio',
    slug: 'portfolio',
    stack: ['React', 'Vite', 'Three.js', 'React Three Fiber', 'Groq', 'Node.js'],
    description: 'Designed and built this portfolio — a 3D interactive React/Vite site with a RAG-powered AI assistant that answers questions about experience and projects using Groq Llama-3.1-8b-instant.',
    github: 'https://github.com/Aditya-Dey012/Personal-portfolio-.git',
    type: 'side',
    bullets: [
      'Built this portfolio itself — React + Vite frontend with React Three Fiber 3D particle backgrounds, scroll-triggered animations, magnetic UI interactions, and a terminal-style command interface',
      'Embedded a RAG-powered AI assistant (ADBOT): knowledge base is chunked into semantic segments, relevant context is retrieved per query, and Groq\'s Llama-3.1-8b-instant streams answers token-by-token over SSE',
      'The RAG layer ensures grounded, context-accurate responses — the assistant draws only from retrieved portfolio knowledge rather than hallucinating details',
      'Terminal interface supports custom commands (whoami, experience, projects, cat, neofetch, matrix) with tab completion and command history',
    ],
  },
  {
    name: 'Prompt Optimization Engine',
    slug: 'prompt-optimization-engine',
    stack: ['MLflow', 'LangChain', 'FastAPI', 'SQLite', 'Plotly'],
    description: 'LLMOps system that auto-rewrites and evaluates LLM prompts using MLflow GEPA optimizer. Tracks prompt versions, token usage, and cost across iterations with Plotly dashboards.',
    github: 'https://github.com/Aditya-Dey012/mlflow-GenAI.git',
    type: 'side',
  },
  {
    name: 'Movie Recommendation System',
    slug: 'movie-recommendation',
    stack: ['Python', 'Scikit-learn', 'Streamlit', 'TMDB API'],
    description: 'Content-based movie recommender using cosine similarity on NLP-processed features. Interactive Streamlit app with live poster fetching via TMDB API.',
    github: 'https://github.com/Aditya-Dey012/Movie-Recomendation-System-.git',
    type: 'side',
  },
  {
    name: 'Facial Emotion Detection',
    slug: 'facial-emotion-detection',
    stack: ['Keras/TensorFlow', 'OpenCV', 'CNN'],
    description: 'Real-time emotion classifier detecting 7 emotions from webcam feed. CNN trained on Kaggle FER dataset; 70% test accuracy.',
    github: 'https://github.com/Aditya-Dey012/Emotion-Detection-.git',
    type: 'side',
  },
  {
    name: 'Music Genre Classification',
    slug: 'music-genre-classification',
    stack: ['Apache Kafka', 'PySpark', 'Random Forest', 'Power BI'],
    description: 'End-to-end ML pipeline with real-time Kafka streaming, distributed PySpark processing, and interactive Power BI dashboards for genre insights.',
    github: 'https://github.com/Aditya-Dey012/MUSIC-GENRE-ANALYSIS-PREDICTION.git',
    type: 'side',
  },
  {
    name: 'Text Detection System',
    slug: 'text-detection',
    stack: ['OpenCV', 'Pytesseract', 'Python'],
    description: 'OCR system for extracting text from images and live video streams using Haar Cascade preprocessing and Tesseract engine.',
    github: 'https://github.com/Aditya-Dey012/Text-Detection-.git',
    type: 'side',
  },
  {
    name: 'GUI Calculator',
    slug: 'gui-calculator',
    stack: ['Python', 'Tkinter'],
    description: 'Graphical calculator with clean UI supporting arithmetic and mathematical operations.',
    github: 'https://github.com/Aditya-Dey012/Gui-Calculator.git',
    type: 'side',
  },
  {
    name: 'Interactive Dictionary',
    slug: 'interactive-dictionary',
    stack: ['Python', 'JSON'],
    description: 'CLI-based dictionary with definitions, synonyms, and related info powered by a structured JSON store.',
    github: 'https://github.com/Aditya-Dey012/An-Interactive-Dictyionary.git',
    type: 'side',
  },
  {
    name: 'Instagram Profile Analyzer',
    slug: 'instagram-profile-analyzer',
    stack: ['Streamlit', 'Gemini 1.5 Flash', 'Instaloader', 'Plotly', 'Pandas'],
    description: 'AI-powered Instagram analytics tool — scrapes public profiles via Instaloader, runs Gemini 1.5 Flash analysis across content strategy, engagement, and brand identity, and visualises post performance with interactive Plotly charts.',
    github: 'https://github.com/Aditya-Dey012/Instagram_profile_analyzer.git',
    type: 'side',
  },
  {
    name: 'Cinema OS',
    slug: 'cinema-os',
    stack: ['Streamlit', 'Gemini 2.5 Flash', 'RAG', 'Python', 'Google Gemini API'],
    description: 'AI-powered story production studio — dual-panel Streamlit app combining Gemini File Search RAG for document Q&A with cited answers, and Gemini 2.5 Flash for generating multiple cinematic story variations from a single idea.',
    github: 'https://github.com/Aditya-Dey012/cinemaos.git',
    type: 'side',
  },
  {
    name: 'Nike Shopping App — Figma Prototype',
    slug: 'nike-app-figma',
    stack: ['Figma', 'UI/UX Design', 'Prototyping'],
    description: 'High-fidelity mobile shopping app prototype for Nike — covers home, product listings, search, cart, wishlist, and user profile with a clean, modern UI.',
    github: 'https://github.com/Aditya-Dey012/Nike-App-in-Figma.git',
    figma: 'https://www.figma.com/proto/xAoHL4zSCq4xvt8ocRjmHV/app?node-id=0-1&t=zrUmH9fGvH1qhSOR-1',
    type: 'side',
  },
];

export const hobbies = [
  'Travelling & exploring new places',
  'Listening to music',
  'Gaming — mostly indoor (strategy & RPGs)',
  'Watching films & series',
  'Sketching',
];

export const languages = [
  { name: 'Bengali',  level: 'Native'        },
  { name: 'English',  level: 'Fluent'        },
  { name: 'Hindi',    level: 'Fluent'        },
  { name: 'Mizo',     level: 'Conversational' },
];

export const education = [
  {
    degree: 'M.Tech — Data Science',
    institution: 'NIT Mizoram',
    period: '2023 – 2025',
    location: 'Mizoram, India',
  },
  {
    degree: 'B.Tech',
    institution: 'NIT Mizoram',
    period: '2020 – 2023',
    location: 'Mizoram, India',
  },
  {
    degree: 'Higher Secondary (MBSE)',
    institution: "St. Paul's Higher Secondary School",
    period: '2016 – 2020',
    location: 'Mizoram, India',
  },
];

export const COMMANDS_LIST = [
  { cmd: 'whoami',     desc: 'Identity file' },
  { cmd: 'about',     desc: 'Read about.md' },
  { cmd: 'skills',    desc: 'View skills.json' },
  { cmd: 'experience',desc: 'Browse experience/' },
  { cmd: 'projects',  desc: 'List projects/' },
  { cmd: 'education', desc: 'View education.md' },
  { cmd: 'contact',   desc: 'Get in touch' },
  { cmd: 'ls',        desc: 'List directory' },
  { cmd: 'cat',       desc: 'Read a file (e.g. cat projects/spoc)' },
  { cmd: 'resume',    desc: 'Download CV' },
  { cmd: 'github',    desc: 'Open GitHub' },
  { cmd: 'linkedin',  desc: 'Open LinkedIn' },
  { cmd: 'ai',        desc: 'Launch AI assistant' },
  { cmd: 'matrix',    desc: 'Toggle matrix rain' },
  { cmd: 'neofetch',  desc: 'System info' },
  { cmd: 'clear',     desc: 'Clear terminal' },
  { cmd: 'history',   desc: 'Command history' },
];
