/* ═══════════════════════════════════════════════════════════════
   ADITYA DEY — COMPLETE KNOWLEDGE BASE
   Used by the RAG system in /api/chat.js
   ═══════════════════════════════════════════════════════════════ */

export const KNOWLEDGE_CHUNKS = [
  {
    id: 'personal',
    tags: ['personal', 'who', 'name', 'about', 'contact', 'location', 'email', 'phone', 'dob', 'born', 'age'],
    content: `
PERSONAL INFORMATION
Name: Aditya Dey
Born: 2002 (Bengaluru, India is current base)
Current Role: Gen AI Engineer at Nexturn
Location: Bengaluru, Karnataka, India
Email: aditya2002dey@gmail.com
Phone: +91 6909485604
GitHub (Personal): https://github.com/Aditya-Dey012
GitHub (Work): https://github.com/adityanexturn
LinkedIn: https://linkedin.com/in/aditya-dey-8144b7202

Bio: Aditya is a Gen AI Engineer with deep expertise in building multi-agent RAG systems,
LLM-powered analytics platforms, and full-stack AI applications. He thrives at the intersection
of AI research and production engineering — turning cutting-edge LLM capabilities into reliable,
scalable systems that actually ship. He is passionate about LangGraph orchestration, FAISS-based
retrieval, and cloud-native AI deployment.
    `.trim(),
  },
  {
    id: 'education',
    tags: ['education', 'degree', 'college', 'university', 'nit', 'mizoram', 'mtech', 'btech', 'school', 'academic', 'gpa', 'qualification'],
    content: `
EDUCATION
1. M.Tech in Data Science
   Institution: NIT Mizoram (National Institute of Technology, Mizoram)
   Duration: 2023 – 2025
   Highlights: Specialized in machine learning, deep learning, and data engineering.
               Developed strong foundations in statistical learning, NLP, and distributed computing.

2. B.Tech
   Institution: NIT Mizoram (National Institute of Technology, Mizoram)
   Duration: 2020 – 2023
   Notes: Completed B.Tech before transitioning to M.Tech at the same institution.
          Core computer science fundamentals, algorithms, data structures, and software engineering.

3. Higher Secondary (Class 11–12)
   Institution: St. Paul's Higher Secondary School
   Location: Mizoram, India
   Board: MBSE (Mizoram Board of School Education)
   Duration: 2016 – 2020

NIT Mizoram is one of the 31 National Institutes of Technology in India — premier technical
institutes funded by the Government of India, equivalent in stature to top engineering universities.
    `.trim(),
  },
  {
    id: 'experience-nexturn-cloud',
    tags: ['nexturn', 'experience', 'work', 'job', 'cloud', 'engineer', 'current', 'ai', 'ml', 'bengaluru', 'present', '2026'],
    content: `
WORK EXPERIENCE — CURRENT ROLE
Company: Nexturn
Role: Cloud Engineer, AI/ML
Period: January 2026 – Present
Location: Bengaluru, Karnataka, India
Type: Full-time

At Nexturn, Aditya leads the development of production-grade AI systems. Three major systems:

--- PROJECT 1: AI Analytics RAG System ---
Stack: LangGraph · FAISS · AWS Athena · GPT-4o · React · Plotly · SSE · FastAPI
Description: Core specialty is a production LangGraph multi-agent state machine orchestrating 5
specialized GPT-4o-powered agents that convert natural language business questions into SQL,
charts, and narrative insights against an AWS Athena data warehouse.
Key contributions:
- Architected the LangGraph multi-agent state machine with 5 specialized agents: Orchestrator
  (intent classification), Context Resolver (query rewriting), Data Agent (NL-to-SQL),
  Summarization Agent (narrative insights), and Chart Agent (Plotly code generation)
- GPT-4o powers all 5 LLM tasks: intent classification (DATA_ONLY / SUMMARIZE / CHART /
  SUMMARIZE_AND_CHART), follow-up query rewriting, NLP-to-SQL generation, narrative insight
  summarisation, and executable Plotly chart code generation
- Built FAISS-based semantic schema retrieval — agents ground SQL generation against live Athena
  table metadata fetched and indexed at startup
- Engineered a React + Plotly dashboard with SSE-based real-time streaming — queries stream
  results token-by-token into interactive, metric-aware charts (bar, line, scatter auto-selected)
- Automated PDF report generation using ReportLab with AI-generated narrative summaries from
  the Summarization Agent; designed LangGraph state machine with fallback routing and per-node
  MLflow tracing for full observability

--- PROJECT 2: AI-Powered Recruitment Management System ---
Stack: FastAPI · React/Vite · GPT-4o-mini · SharePoint · Microsoft Graph API · SendGrid
Description: Full-stack recruitment platform automating the entire hiring pipeline.
Key contributions:
- Built end-to-end recruitment platform: FastAPI backend with React/Vite frontend, enabling
  HR teams to manage job postings, candidates, and interviews in one dashboard
- Integrated GPT-4o-mini for automated resume parsing, structured candidate scoring, and
  JD-to-resume match ranking with explainable scoring breakdowns
- Implemented PII masking layer that strips sensitive data (Aadhaar, PAN, phone) before any
  LLM call, ensuring GDPR/DPDP-compliant processing
- Connected SharePoint via Microsoft Graph API for document storage and candidate file management
- Automated interview scheduling with SendGrid email delivery and dynamically generated .ics
  calendar attachments — interviewers and candidates receive calendar invites automatically

--- PROJECT 3: SPOC – Smart Power Operations Centre ---
Stack: FastAPI · LangGraph · Groq Llama-3.1-8b-instant · FAISS · Next.js 14 · MLflow · SQLite
GitHub: https://github.com/adityanexturn/spoc_v-3
Facility: Kondapalli Combined Cycle Power Plant (CCPP), 350 MW, Andhra Pradesh, India
Description: Production-grade intelligent monitoring and advisory system for a major power plant.
Key contributions:
- Delivered a production-grade real-time monitoring platform integrating ML prediction, semantic
  document retrieval, anomaly detection, and conversational AI into a single unified dashboard
- Designed a 7-agent LangGraph StateGraph pipeline — agents specialise in intent classification
  (off-topic guard), anomaly detection, root-cause diagnosis, document Q&A, performance forecasting,
  corrective action recommendation, and report generation
- Built FAISS semantic search over plant engineering manuals extracted with pdfplumber, embedded
  with SentenceTransformers all-MiniLM-L6-v2 — enables grounded, citation-backed answers
- Developed a real-time Next.js 14 dashboard with App Router, Tailwind CSS, and shadcn/ui —
  features live 5-second sensor data streaming, interactive Recharts performance graphs
  (24h/7d/30d/custom), and an embedded multi-session AI chat interface
- Deployed physics-based LinearRegression models for GT (Gas Turbine) and ST (Steam Turbine)
  power output prediction from ambient temperature, humidity, and pressure
- Implemented IsolationForest for one-sided anomaly detection on GT/ST residuals with
  automatic root-cause diagnosis and corrective action generation
- Instrumented every pipeline invocation with MLflow nested experiment tracing for full
  observability and audit trail
    `.trim(),
  },
  {
    id: 'experience-nexturn-intern',
    tags: ['nexturn', 'intern', 'internship', 'hyderabad', 'data', 'ml', 'engineer', '2025', 'kafka', 'pyspark', 'music'],
    content: `
WORK EXPERIENCE — INTERNSHIP
Company: Nexturn
Role: Data & ML Engineer Intern
Period: February 2025 – December 2025 (11 months)
Location: Hyderabad, India
Type: Internship → converted to full-time

Key contributions:
- Developed and benchmarked multiple ML/DL models across classification, regression, and
  anomaly detection tasks with systematic precision optimization and performance evaluation
- Conducted deep exploratory data analysis (EDA) and feature engineering using Matplotlib,
  Seaborn, and Plotly across structured and time-series datasets

Music Genre Analysis Pipeline (Capstone Project):
Stack: Apache Kafka · PySpark · Random Forest · Power BI
- Designed and built a real-time data streaming pipeline using Apache Kafka for music metadata ingestion
- Processed streams at scale with PySpark distributed computing on a local cluster
- Trained a Random Forest classifier for music genre prediction with feature engineering on
  audio metadata features
- Built interactive Power BI dashboards visualising genre trends, model performance, and
  streaming throughput metrics
    `.trim(),
  },
  {
    id: 'skills',
    tags: ['skills', 'tech', 'stack', 'technology', 'tools', 'programming', 'language', 'framework', 'library', 'python', 'langchain', 'langgraph', 'faiss', 'fastapi', 'react', 'aws', 'spark', 'kafka', 'docker'],
    content: `
TECHNICAL SKILLS

AI & Machine Learning:
- LLMs: GPT-4o-mini, Groq Llama-3.1-8b-instant, open-source models
- Orchestration: LangChain, LangGraph (multi-agent StateGraph pipelines)
- Retrieval: FAISS (vector store, ANN search), SentenceTransformers, RAG systems
- APIs: FastAPI (async Python REST), MCP (Model Context Protocol)
- Experiment Tracking: MLflow (LLMOps, GEPA optimizer, nested tracing)
- Classical ML: scikit-learn (LinearRegression, RandomForest, IsolationForest, XGBoost)
- Deep Learning: TensorFlow/Keras, CNN, LSTM
- Data: NumPy, Pandas, Matplotlib, Seaborn, Plotly, Power BI

Programming Languages:
- Python (primary, expert-level)
- Scala (Spark/data engineering)
- SQL (complex queries, AWS Athena, Hive)
- JavaScript/TypeScript (React, Next.js)

Frontend:
- React 18, Next.js 14 (App Router), Vite
- Tailwind CSS, shadcn/ui, Recharts, Plotly.js
- SSE (Server-Sent Events) for real-time streaming

Data Engineering:
- Apache Spark, PySpark (distributed processing)
- Databricks
- Apache Kafka (real-time streaming)
- Hadoop, Hive
- Docker (containerization)

Cloud & Infrastructure:
- AWS: Athena, S3, and related services
- Vercel (frontend deployment)

Tools:
- Git, GitHub (version control)
- Power BI (dashboards)
- Figma, Adobe Photoshop (design)
- Linux (preferred development OS)

Aditya's strongest areas: LangGraph multi-agent systems, FAISS-based RAG, FastAPI backend
development, and building full-stack AI applications from scratch to production deployment.
    `.trim(),
  },
  {
    id: 'projects-side',
    tags: ['project', 'side', 'personal', 'github', 'movie', 'emotion', 'music', 'text', 'detection', 'calculator', 'dictionary', 'recommendation', 'ocr', 'streamlit', 'tmdb', 'opencv', 'nlp', 'cosine'],
    content: `
SIDE PROJECTS (Personal / Academic)

1. Prompt Optimization Engine
   Stack: MLflow · LangChain · FastAPI · SQLite · Plotly
   LLMOps system that auto-rewrites and evaluates LLM prompts using the MLflow GEPA (Generative
   Prompt Auto-optimization) optimizer. Tracks prompt versions, token usage, latency, and cost
   across optimization iterations with interactive Plotly dashboards. Built to solve the real
   problem of manual prompt tuning at scale.

2. Movie Recommendation System
   Stack: Python · Scikit-learn · Streamlit · TMDB API
   Content-based movie recommender using cosine similarity computed over NLP-processed feature
   vectors (genre, cast, keywords, overview). Interactive Streamlit web app with live TMDB API
   integration for real-time poster fetching and movie metadata display.

3. Facial Emotion Detection
   Stack: Keras/TensorFlow · OpenCV · CNN
   Real-time emotion classifier that detects 7 emotions (angry, disgust, fear, happy, neutral,
   sad, surprise) from live webcam feed. CNN architecture trained on the Kaggle FER-2013 dataset.
   Achieved 70% test accuracy. Uses OpenCV for face detection and frame capture.

4. Music Genre Classification
   Stack: Apache Kafka · PySpark · Random Forest · Power BI
   End-to-end ML pipeline: Kafka streams music metadata in real time, PySpark handles distributed
   feature processing, Random Forest classifies genres, Power BI visualises insights and model
   performance. Demonstrates full data engineering + ML pipeline capability.

5. Text Detection System
   Stack: OpenCV · Pytesseract · Python
   OCR system for extracting text from both static images and live video streams. Uses Haar Cascade
   preprocessing for ROI detection and Google Tesseract engine for text recognition.

6. GUI Calculator
   Stack: Python · Tkinter
   Graphical calculator with clean visual interface supporting arithmetic and mathematical
   operations. Built as a desktop application with responsive layout.

7. Interactive Dictionary
   Stack: Python · JSON
   CLI-based dictionary application with definitions, synonyms, antonyms, and related information
   lookup powered by a structured JSON data store with fuzzy search.
    `.trim(),
  },
  {
    id: 'strengths-hiring',
    tags: ['hire', 'strength', 'why', 'value', 'senior', 'best', 'recommend', 'good', 'impressive', 'top'],
    content: `
WHY HIRE ADITYA DEY

Aditya is an exceptional Gen AI Engineer for the following reasons:

1. PRODUCTION RAG SYSTEMS AT SCALE
   Aditya has built multiple production LangGraph multi-agent pipelines deployed for real enterprise
   clients — not toy demos. He understands the nuances of multi-agent orchestration: routing logic,
   fallback handling, state management, and observability with MLflow tracing.

2. FULL-STACK AI OWNERSHIP
   He owns the entire stack: FastAPI backend, React/Next.js frontend, LLM integration, FAISS vector
   stores, AWS data infrastructure, and deployment. Rare to find engineers who can ship an entire
   AI product solo.

3. DOMAIN BREADTH
   Power plants (SPOC), recruitment automation, business analytics — Aditya has applied AI across
   diverse, high-stakes domains. He understands that AI must be grounded, reliable, and explainable.

4. NIT MIZORAM M.TECH DATA SCIENCE
   Strong theoretical foundation in ML, statistical learning, and data engineering from a premier
   NIT institution, complemented by immediate real-world application at Nexturn.

5. FAST LEARNER AND BUILDER
   Went from intern to Cloud Engineer AI/ML at Nexturn — demonstrating rapid skill growth and
   ability to deliver in high-accountability roles.

6. OPEN-SOURCE MINDSET
   His work repos include the full SPOC system (github.com/adityanexturn/spoc_v-3), reflecting
   engineering transparency and documentation practices valued at top companies.

Contact: aditya2002dey@gmail.com | +91 6909485604
LinkedIn: linkedin.com/in/aditya-dey-8144b7202
    `.trim(),
  },
];

export const TECH_SYSTEM_PROMPT = `You are ADBOT v1.0, embedded in Aditya Dey's portfolio.
A visitor clicked a technology tag. Give a VERY short answer — 2 to 3 bullet points max.

Format (strictly):
• **What it is** — one sentence
• **Key use case** — one sentence
• **Aditya uses it for** — one sentence referencing his actual projects

No intro, no outro. Bullets only. Under 60 words total.`;

export const SYSTEM_PROMPT = `You are ADBOT v1.0, the personal AI assistant embedded in Aditya Dey's portfolio website.
Your job is to help recruiters, managers, and engineers learn about Aditya Dey accurately and impressively.

TONE: Confident, knowledgeable, slightly enthusiastic about Aditya's work. Be concise but detailed when asked.
Use terminal-style formatting where appropriate: **bold** for emphasis, \`code\` for tech terms.
Never make up information not in the knowledge base. If asked something you don't know, say so.

CONTEXT WINDOW: You will receive relevant chunks of Aditya's knowledge base. Use them to answer accurately.
Always answer from Aditya's perspective (third person) unless the user says otherwise.`;

export function retrieveRelevantChunks(query) {
  const q = query.toLowerCase();
  const scored = KNOWLEDGE_CHUNKS.map(chunk => {
    let score = 0;
    for (const tag of chunk.tags) {
      if (q.includes(tag)) score += 3;
    }
    /* word overlap with content */
    const words = q.split(/\W+/).filter(w => w.length > 3);
    for (const word of words) {
      if (chunk.content.toLowerCase().includes(word)) score += 1;
    }
    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);

  /* always include personal info + top 3 relevant */
  const personal = scored.find(s => s.chunk.id === 'personal');
  const top = scored.filter(s => s.score > 0 && s.chunk.id !== 'personal').slice(0, 3);

  const selected = personal ? [personal.chunk, ...top.map(t => t.chunk)] : top.slice(0, 4).map(t => t.chunk);

  /* deduplicate */
  const seen = new Set();
  return selected.filter(c => {
    if (seen.has(c.id)) return false;
    seen.add(c.id);
    return true;
  });
}
