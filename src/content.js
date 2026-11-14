// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to change everything on the page.
//  Leave a link or image as '' to show a neat placeholder instead.
//  Photos live in src/assets and are imported at the top of this file.
//  In descriptions, wrap words in **double stars** to make them bold.
// ─────────────────────────────────────────────────────────────


import resumePdf from './assets/Surya_Vishakan_Resume.pdf'
import resumePage1 from './assets/resume-1.webp'
import meCut from './assets/me-cut.webp'

export const profile = {
  name: 'Surya',
  fullName: 'Surya Vishakan Shunmuga Sundaram',
  role: 'AI Software Engineer',
  greeting: 'Hello there, welcome in',
  tagline: 'I build **agentic AI** and **distributed backends** that hold up in production.',
  email: 'suryavishakan1209@gmail.com',
  resumePdf, // downloadable PDF
  resumePages: [resumePage1], // images shown in the on-site viewer
  cutout: meCut, // transparent cut-out of you, shown at the right edge of the hero
  bookingUrl: '', // e.g. a Google Calendar / Calendly link. Falls back to email.
  rotate: ['agentic AI', 'distributed backends', 'React products', 'faster LLM serving'],
  heroStats: [
    { v: 3, suf: '+', l: 'years shipping' },
    { v: 25, suf: 'K', l: 'req/s at p99 < 10 ms' },
    { v: 2.1, suf: '×', l: 'LLM throughput', d: 1 },
    { v: 60, suf: '%', l: 'queries auto-resolved' },
  ],
  status: {
    label: 'Available',
    title: 'Open to conversations',
    note: 'Replies within a day. Remote-friendly.',
  },
  now: {
    title: 'Founding engineer at Propense.ai',
    note: 'Shipping an AI cross-selling platform, and an MCP-based agent called Hatfield.',
  },
  social: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/suryavishakan/' },
    { label: 'GitHub', url: 'https://github.com/suryavishakan' },
  ],
}

export const filters = ['All', 'AI', 'Backend', 'Frontend', 'Study']

export const experience = [
  {
    id: 'propense',
    tags: ['AI', 'Backend', 'Frontend'],
    role: 'AI Software Engineer',
    company: 'Propense.ai',
    place: 'Founding team',
    period: 'Jan 2026 – Present',
    color: '#5b3dff',
    logo: '',
    text: 'Founding engineer of an **AI cross-selling SaaS platform**. Built **Hatfield**, an MCP-based agent that turns plain requests into governed queries and actions, with role-based guardrails.',
    metrics: [{ v: '+30%', l: 'user engagement' }, { v: '40%', l: 'faster queries' }, { v: '4', l: 'data workflows unified' }],
    stats: ['+30% engagement', '40% faster queries', '4 data workflows'],
  },
  {
    id: 'ucm',
    tags: ['AI', 'Frontend', 'Study'],
    role: 'Graduate Assistant',
    company: 'University of Central Missouri',
    place: 'Missouri',
    period: 'Jan 2025 – May 2025',
    color: '#0f766e',
    logo: '',
    text: 'Built a **RAG support chatbot** over 1,000+ documents and **role-based learning dashboards** in React and TypeScript.',
    metrics: [{ v: '60%', l: 'queries auto-resolved' }, { v: '50%', l: 'faster responses' }, { v: '135 ms', l: 'UI latency, down from 240' }],
    stats: ['60% auto-resolved', '50% faster replies', '240 → 135 ms UI'],
  },
  {
    id: 'cigna',
    tags: ['Backend'],
    role: 'Software Developer',
    company: 'Cigna',
    place: 'Healthcare',
    period: 'May 2022 – Jul 2024',
    color: '#e0573a',
    logo: '',
    text: 'Designed **Java and Spring Boot microservices** to modernize patient record systems across 8+ hospitals, with secure **FHIR/HL7** integrations.',
    metrics: [{ v: '8+', l: 'hospitals modernized' }, { v: '25%', l: 'fewer duplicate records' }, { v: '20%', l: 'lower API latency' }],
    stats: ['8+ hospitals', '25% fewer duplicates', '20% lower latency'],
  },
]

export const education = [
  {
    tag: 'Study',
    school: 'Sri Ramachandra Engineering and Technology',
    place: 'Chennai, India',
    degree: 'B.E., Computer Science',
    years: 'Aug 2020 – Jun 2024',
    note: 'Where the foundations began: data structures, systems and a first taste of shipping real software.',
    icon: 'layers',
  },
  {
    tag: 'Work',
    school: 'Cigna',
    place: 'Healthcare',
    degree: 'Software Developer',
    years: 'May 2022 – Jul 2024',
    note: 'Java and Spring Boot microservices modernizing patient records across 8+ hospitals, with FHIR/HL7 integrations.',
    icon: 'brief',
  },
  {
    tag: 'Study',
    school: 'University of Central Missouri',
    place: 'Missouri, USA',
    degree: 'M.S., Computer Science',
    years: 'Aug 2024 – May 2026',
    note: 'Graduate assistant building a RAG support chatbot, plus research on faster LLM inference.',
    icon: 'cap',
  },
  {
    tag: 'Work',
    school: 'Propense.ai',
    place: 'Founding team',
    degree: 'AI Software Engineer',
    years: 'Jan 2026 – Present',
    note: 'Founding engineer taking everything learned into production.',
    icon: 'spark',
  },
]

export const skills = [
  { group: 'Languages & Frameworks', color: '#5b3dff', items: ['Python', 'Java', 'TypeScript', 'JavaScript', 'SQL', 'FastAPI', 'Spring Boot', 'Django', 'Node.js', 'React', 'Next.js'] },
  { group: 'Data & Messaging', color: '#0f766e', items: ['PostgreSQL', 'DynamoDB', 'MongoDB', 'Redis', 'Apache Kafka', 'SQLAlchemy', 'REST APIs', 'FHIR', 'HL7'] },
  { group: 'Cloud & DevOps', color: '#e0573a', items: ['AWS S3', 'Glue', 'Lambda', 'RDS', 'ECS', 'IAM', 'Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD', 'Prometheus'] },
  { group: 'Engineering', color: '#1d4ed8', items: ['Distributed Systems', 'Microservices', 'Event-Driven Architecture', 'System Design', 'Multi-Tenant SaaS', 'RBAC', 'Load Testing'] },
  { group: 'AI & LLM', color: '#c026d3', items: ['Agentic AI', 'MCP', 'Tool Calling', 'RAG', 'Embeddings', 'Prompt Engineering', 'vLLM', 'PyTorch', 'CUDA'] },
]

export const projects = [
  { title: 'Hatfield: MCP agent platform', art: 'hatfield', tag: 'AI', image: '', url: '', g: ['#6a4cff', '#9b7bff'], text: 'Natural language to governed queries, with role-based guardrails.' },
  { title: 'Distributed rate limiter & API gateway', art: 'gateway', tag: 'Backend', image: '', url: '', g: ['#0f766e', '#34d399'], text: '25K req/s at p99 under 10 ms on Redis Cluster.' },
  { title: 'KV-cache reuse for agent workloads', art: 'kv', tag: 'Research', image: '', url: '', g: ['#ff7a45', '#ffb36b'], text: '2.1x throughput and 47% faster first token on vLLM.' },
  { title: 'RAG support chatbot', art: 'rag', tag: 'AI', image: '', url: '', g: ['#1d4ed8', '#60a5fa'], text: 'Resolved 60% of support queries over 1,000+ documents.' },
]

export const process = [
  { icon: 'bulb', title: 'Understand the system', text: 'Start with the real constraints: data, users, load and who is allowed to do what.' },
  { icon: 'zoom', title: 'Measure first', text: 'Benchmark, trace and load test so every optimization is backed by numbers.' },
  { icon: 'trend', title: 'Ship and iterate', text: 'Small reviewed releases, clear docs, and fixes driven by what production shows.' },
]

export const services = [
  { art: 'hatfield', tint: '#ede9ff', ink: '#5b3dff', g: ['#6a4cff', '#9b7bff'], title: 'Agentic AI & RAG', text: 'Assistants that call tools safely, cite their sources and respect permissions.', points: ['MCP tool calling with role-based guardrails', 'RAG over your own documents', 'LLM serving that is fast and affordable'] },
  { art: 'gateway', tint: '#ffe9d6', ink: '#e0573a', g: ['#0f766e', '#34d399'], title: 'Backend & distributed systems', text: 'APIs, event streaming and caching built to stay fast under load.', points: ['FastAPI and Spring Boot services', 'Kafka, Redis and PostgreSQL tuning', 'Load tested before it ships'] },
  { art: 'ui', tint: '#dcf7e6', ink: '#1f9d5c', g: ['#ff7a45', '#ffb36b'], title: 'Full-stack product', text: 'React interfaces and multi-tenant SaaS from first screen to release.', points: ['Reusable React and TypeScript components', 'Secure multi-tenant architecture on AWS', 'Reviews, CI/CD and calm releases'] },
]

export const tags = ['Agentic AI', 'Load testing', 'Coffee', 'Flow state', 'Clear docs', 'Code review']
