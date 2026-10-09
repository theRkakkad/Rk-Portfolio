import React from 'react';
import {
  ReactIcon,
  NextIcon,
  TypeScriptIcon,
  TailwindIcon,
  NodeIcon,
  PythonIcon,
  FastAPIIcon,
  GoIcon,
  OpenCVIcon,
  YOLOIcon,
  PyTorchIcon,
  ONNXIcon,
  DockerIcon,
  AWSIcon,
  LinuxIcon,
  NginxIcon,
  PostgresIcon,
  MongoIcon,
  RedisIcon,
  SupabaseIcon,
  GitIcon,
  GitHubIcon,
  PostmanIcon,
  FigmaIcon,
  IconProps
} from './TechIcons';

export type CategoryId = 'frontend' | 'backend' | 'ai' | 'cloud' | 'databases' | 'tools';

export interface TechItem {
  id: string;
  name: string;
  category: CategoryId;
  categoryName: string;
  categoryIndex: string;
  icon: React.ComponentType<IconProps>;
  orbitTrack: 0 | 1;   // 0: Inner Circle (10 nodes), 1: Outer Circle (14 nodes)
  orbitIndex: number;  // Exact equidistant index on its ring
  orbitAngle: number;  // Calculated harmonic angle in radians
  tagline: string;
  accentColor: string;
}

export interface CategoryGroupData {
  id: CategoryId;
  index: string;
  title: string;
  subtitle: string;
  items: TechItem[];
}

const OUTER_COUNT = 14;
const INNER_COUNT = 10;

export const TECH_ITEMS: TechItem[] = [
  // ─── 01 FRONTEND ARCHITECTURE (4 items) ──────────────────────────
  {
    id: 'react',
    name: 'React.js',
    category: 'frontend',
    categoryName: 'Frontend Architecture',
    categoryIndex: '01',
    icon: ReactIcon,
    orbitTrack: 1,
    orbitIndex: 0,
    orbitAngle: (2 * Math.PI * 0) / OUTER_COUNT,
    tagline: 'Component State & Concurrency',
    accentColor: '#61DAFB'
  },
  {
    id: 'next',
    name: 'Next.js',
    category: 'frontend',
    categoryName: 'Frontend Architecture',
    categoryIndex: '01',
    icon: NextIcon,
    orbitTrack: 1,
    orbitIndex: 1,
    orbitAngle: (2 * Math.PI * 1) / OUTER_COUNT,
    tagline: 'SSR, Edge API & App Router',
    accentColor: '#1A1816'
  },
  {
    id: 'ts',
    name: 'TypeScript',
    category: 'frontend',
    categoryName: 'Frontend Architecture',
    categoryIndex: '01',
    icon: TypeScriptIcon,
    orbitTrack: 1,
    orbitIndex: 2,
    orbitAngle: (2 * Math.PI * 2) / OUTER_COUNT,
    tagline: 'Strict Type-Safe Systems',
    accentColor: '#3178C6'
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    categoryName: 'Frontend Architecture',
    categoryIndex: '01',
    icon: TailwindIcon,
    orbitTrack: 1,
    orbitIndex: 3,
    orbitAngle: (2 * Math.PI * 3) / OUTER_COUNT,
    tagline: 'Fluid Design System Engine',
    accentColor: '#38BDF8'
  },

  // ─── 02 BACKEND & SYSTEMS (4 items) ──────────────────────────────
  {
    id: 'node',
    name: 'Node.js',
    category: 'backend',
    categoryName: 'Backend & Systems',
    categoryIndex: '02',
    icon: NodeIcon,
    orbitTrack: 1,
    orbitIndex: 4,
    orbitAngle: (2 * Math.PI * 4) / OUTER_COUNT,
    tagline: 'High-Concurrency Event Loop',
    accentColor: '#5FA04E'
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend',
    categoryName: 'Backend & Systems',
    categoryIndex: '02',
    icon: PythonIcon,
    orbitTrack: 1,
    orbitIndex: 5,
    orbitAngle: (2 * Math.PI * 5) / OUTER_COUNT,
    tagline: 'AI Pipelines & Microservices',
    accentColor: '#FFD43B'
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'backend',
    categoryName: 'Backend & Systems',
    categoryIndex: '02',
    icon: FastAPIIcon,
    orbitTrack: 1,
    orbitIndex: 6,
    orbitAngle: (2 * Math.PI * 6) / OUTER_COUNT,
    tagline: 'Async High-Speed Python APIs',
    accentColor: '#05998B'
  },
  {
    id: 'go',
    name: 'Go',
    category: 'backend',
    categoryName: 'Backend & Systems',
    categoryIndex: '02',
    icon: GoIcon,
    orbitTrack: 0,
    orbitIndex: 0,
    orbitAngle: (2 * Math.PI * 0) / INNER_COUNT + Math.PI / 10,
    tagline: 'Concurrent Low-Latency Systems',
    accentColor: '#00ADD8'
  },

  // ─── 03 AI & VISION SYSTEMS (4 items) ────────────────────────────
  {
    id: 'opencv',
    name: 'OpenCV',
    category: 'ai',
    categoryName: 'AI & Vision Systems',
    categoryIndex: '03',
    icon: OpenCVIcon,
    orbitTrack: 1,
    orbitIndex: 7,
    orbitAngle: (2 * Math.PI * 7) / OUTER_COUNT,
    tagline: 'Real-Time Edge Computer Vision',
    accentColor: '#EA4335'
  },
  {
    id: 'yolo',
    name: 'YOLO v8/v11',
    category: 'ai',
    categoryName: 'AI & Vision Systems',
    categoryIndex: '03',
    icon: YOLOIcon,
    orbitTrack: 1,
    orbitIndex: 8,
    orbitAngle: (2 * Math.PI * 8) / OUTER_COUNT,
    tagline: 'Sub-15ms Object Detection',
    accentColor: '#FF6B00'
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'ai',
    categoryName: 'AI & Vision Systems',
    categoryIndex: '03',
    icon: PyTorchIcon,
    orbitTrack: 0,
    orbitIndex: 1,
    orbitAngle: (2 * Math.PI * 1) / INNER_COUNT + Math.PI / 10,
    tagline: 'Deep Learning Model Training',
    accentColor: '#EE4C2C'
  },
  {
    id: 'onnx',
    name: 'ONNX Runtime',
    category: 'ai',
    categoryName: 'AI & Vision Systems',
    categoryIndex: '03',
    icon: ONNXIcon,
    orbitTrack: 0,
    orbitIndex: 2,
    orbitAngle: (2 * Math.PI * 2) / INNER_COUNT + Math.PI / 10,
    tagline: 'Hardware-Optimized Inference',
    accentColor: '#005CED'
  },

  // ─── 04 CLOUD & DEVSECOPS (4 items) ──────────────────────────────
  {
    id: 'docker',
    name: 'Docker',
    category: 'cloud',
    categoryName: 'Cloud & DevSecOps',
    categoryIndex: '04',
    icon: DockerIcon,
    orbitTrack: 1,
    orbitIndex: 9,
    orbitAngle: (2 * Math.PI * 9) / OUTER_COUNT,
    tagline: 'Multi-Stage Containerization',
    accentColor: '#2496ED'
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'cloud',
    categoryName: 'Cloud & DevSecOps',
    categoryIndex: '04',
    icon: AWSIcon,
    orbitTrack: 1,
    orbitIndex: 10,
    orbitAngle: (2 * Math.PI * 10) / OUTER_COUNT,
    tagline: 'EC2, S3, Lambda Infrastructure',
    accentColor: '#FF9900'
  },
  {
    id: 'linux',
    name: 'Linux / POSIX',
    category: 'cloud',
    categoryName: 'Cloud & DevSecOps',
    categoryIndex: '04',
    icon: LinuxIcon,
    orbitTrack: 0,
    orbitIndex: 3,
    orbitAngle: (2 * Math.PI * 3) / INNER_COUNT + Math.PI / 10,
    tagline: 'Hardened Kernel & Shell Flow',
    accentColor: '#FFC107'
  },
  {
    id: 'nginx',
    name: 'Nginx',
    category: 'cloud',
    categoryName: 'Cloud & DevSecOps',
    categoryIndex: '04',
    icon: NginxIcon,
    orbitTrack: 0,
    orbitIndex: 4,
    orbitAngle: (2 * Math.PI * 4) / INNER_COUNT + Math.PI / 10,
    tagline: 'Reverse Proxy & TLS Termination',
    accentColor: '#009639'
  },

  // ─── 05 DATABASES & STATE (4 items) ──────────────────────────────
  {
    id: 'postgres',
    name: 'PostgreSQL',
    category: 'databases',
    categoryName: 'Databases & State',
    categoryIndex: '05',
    icon: PostgresIcon,
    orbitTrack: 1,
    orbitIndex: 11,
    orbitAngle: (2 * Math.PI * 11) / OUTER_COUNT,
    tagline: 'ACID Relational Storage & Indexing',
    accentColor: '#336791'
  },
  {
    id: 'mongo',
    name: 'MongoDB',
    category: 'databases',
    categoryName: 'Databases & State',
    categoryIndex: '05',
    icon: MongoIcon,
    orbitTrack: 0,
    orbitIndex: 5,
    orbitAngle: (2 * Math.PI * 5) / INNER_COUNT + Math.PI / 10,
    tagline: 'Document Stores & Aggregation',
    accentColor: '#47A248'
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'databases',
    categoryName: 'Databases & State',
    categoryIndex: '05',
    icon: RedisIcon,
    orbitTrack: 1,
    orbitIndex: 12,
    orbitAngle: (2 * Math.PI * 12) / OUTER_COUNT,
    tagline: 'In-Memory Cache & Pub/Sub',
    accentColor: '#DC382D'
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'databases',
    categoryName: 'Databases & State',
    categoryIndex: '05',
    icon: SupabaseIcon,
    orbitTrack: 0,
    orbitIndex: 6,
    orbitAngle: (2 * Math.PI * 6) / INNER_COUNT + Math.PI / 10,
    tagline: 'Postgres Auth & Real-Time Sync',
    accentColor: '#3ECF8E'
  },

  // ─── 06 DEVELOPER ECOSYSTEM (4 items) ────────────────────────────
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    categoryName: 'Developer Tools',
    categoryIndex: '06',
    icon: GitIcon,
    orbitTrack: 1,
    orbitIndex: 13,
    orbitAngle: (2 * Math.PI * 13) / OUTER_COUNT,
    tagline: 'Atomic Commits & Branch Graphs',
    accentColor: '#F05032'
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'tools',
    categoryName: 'Developer Tools',
    categoryIndex: '06',
    icon: GitHubIcon,
    orbitTrack: 0,
    orbitIndex: 7,
    orbitAngle: (2 * Math.PI * 7) / INNER_COUNT + Math.PI / 10,
    tagline: 'Collaborative PRs & Actions',
    accentColor: '#181717'
  },
  {
    id: 'postman',
    name: 'Postman',
    category: 'tools',
    categoryName: 'Developer Tools',
    categoryIndex: '06',
    icon: PostmanIcon,
    orbitTrack: 0,
    orbitIndex: 8,
    orbitAngle: (2 * Math.PI * 8) / INNER_COUNT + Math.PI / 10,
    tagline: 'API Contract Testing & Mocks',
    accentColor: '#FF6C37'
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'tools',
    categoryName: 'Developer Tools',
    categoryIndex: '06',
    icon: FigmaIcon,
    orbitTrack: 0,
    orbitIndex: 9,
    orbitAngle: (2 * Math.PI * 9) / INNER_COUNT + Math.PI / 10,
    tagline: 'Component Systems & Spec Polish',
    accentColor: '#A259FF'
  }
];

export const CATEGORIES: CategoryGroupData[] = [
  {
    id: 'frontend',
    index: '01',
    title: 'Frontend Architecture',
    subtitle: 'Modular component systems, strict typings, fluid layouts',
    items: TECH_ITEMS.filter(item => item.category === 'frontend')
  },
  {
    id: 'backend',
    index: '02',
    title: 'Backend & Systems',
    subtitle: 'High-concurrency microservices, async handlers, resilient APIs',
    items: TECH_ITEMS.filter(item => item.category === 'backend')
  },
  {
    id: 'ai',
    index: '03',
    title: 'AI & Vision Systems',
    subtitle: 'Edge inference, sub-15ms object detection, neural workflows',
    items: TECH_ITEMS.filter(item => item.category === 'ai')
  },
  {
    id: 'cloud',
    index: '04',
    title: 'Cloud & DevSecOps',
    subtitle: 'Containerized deployments, automated CI gates, hardened Linux',
    items: TECH_ITEMS.filter(item => item.category === 'cloud')
  },
  {
    id: 'databases',
    index: '05',
    title: 'Databases & State',
    subtitle: 'Relational integrity, distributed cache, real-time sync',
    items: TECH_ITEMS.filter(item => item.category === 'databases')
  },
  {
    id: 'tools',
    index: '06',
    title: 'Developer Tools',
    subtitle: 'Atomic versioning, automated contract tests, interface specs',
    items: TECH_ITEMS.filter(item => item.category === 'tools')
  }
];
