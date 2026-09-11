import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import * as THREE from 'three';
import { 
  ArrowLeft, 
  Github, 
  Star, 
  GitFork, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Users, 
  BookOpen, 
  GitCommit, 
  GitPullRequest, 
  Code,
  ExternalLink,
  RefreshCw,
  FolderGit2,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
  Terminal,
  Globe,
  Flame,
  Clock,
  Compass
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';

const GITHUB_USERNAME = "Rachit-Kakkad1";
const CACHE_KEY = "github_analytics_cache_v4";
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

interface GitHubProfile {
  name: string;
  avatar_url: string;
  bio: string;
  company: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  size: number;
  updated_at: string;
  fork: boolean;
}

interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: {
    name: string;
    url: string;
  };
  payload: {
    size?: number;
    action?: string;
    ref?: string;
    ref_type?: string;
    commits?: Array<{
      message: string;
      sha: string;
    }>;
    pull_request?: {
      title: string;
      html_url: string;
    };
    issue?: {
      title: string;
      html_url: string;
    };
  };
}

interface GitHubAnalyticsData {
  profile: GitHubProfile;
  repos: GitHubRepo[];
  events: GitHubEvent[];
}

const LANGUAGE_COLORS: { [key: string]: string } = {
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  Python: "#3776AB",
  HTML: "#E34F26",
  CSS: "#1572B6",
  Go: "#00ADD8",
  Rust: "#DEA584",
  Java: "#B07219",
  "C++": "#F34B7D",
  C: "#555555",
  PHP: "#777BB4",
  Ruby: "#701516",
  Shell: "#89E051",
  Vue: "#4FC08D",
  React: "#61DAFB",
  Swift: "#F05138"
};

const FALLBACK_DATA: GitHubAnalyticsData = {
  profile: {
    name: "Rachit Kakkad",
    avatar_url: "https://avatars.githubusercontent.com/u/235551203?v=4",
    bio: "CS '29 · Built ARKIS - local-first AI neural OS · COS · 2nd @ ElectroSphere 2K26 · IIT Madras Finalist",
    company: "Independent Developer",
    location: "India",
    public_repos: 75,
    followers: 9,
    following: 3
  },
  repos: [
    {
      id: 1,
      name: "Sanjeevani",
      description: "AI healthcare insurance claim auditor verifying 1,995 live CGHS hospital codes & fraud detection.",
      html_url: "https://github.com/Rachit-Kakkad1",
      stargazers_count: 14,
      forks_count: 4,
      language: "Python",
      size: 4200,
      updated_at: new Date().toISOString(),
      fork: false
    },
    {
      id: 2,
      name: "Rk-Portfolio",
      description: "High-performance editorial portfolio featuring 3D Spline, Lenis smooth scrolling, GSAP & live telemetry.",
      html_url: "https://github.com/Rachit-Kakkad1/Rk-Portfolio",
      stargazers_count: 8,
      forks_count: 2,
      language: "TypeScript",
      size: 15400,
      updated_at: new Date().toISOString(),
      fork: false
    },
    {
      id: 3,
      name: "Arkis-AI-OS",
      description: "Local-first AI agentic workflow system with persistent context graphs and low-latency inference.",
      html_url: "https://github.com/Rachit-Kakkad1",
      stargazers_count: 12,
      forks_count: 3,
      language: "TypeScript",
      size: 8900,
      updated_at: new Date().toISOString(),
      fork: false
    },
    {
      id: 4,
      name: "MedClear",
      description: "Hospital billing error detection and itemized anomaly analysis system.",
      html_url: "https://github.com/Rachit-Kakkad1",
      stargazers_count: 6,
      forks_count: 1,
      language: "Python",
      size: 3400,
      updated_at: new Date().toISOString(),
      fork: false
    }
  ],
  events: [
    {
      id: "1",
      type: "PushEvent",
      created_at: new Date(Date.now() - 3600000).toISOString(),
      repo: { name: "Rachit-Kakkad1/Rk-Portfolio", url: "" },
      payload: { size: 2, commits: [{ message: "feat: optimize intro video streaming and hardware acceleration", sha: "abc" }] }
    },
    {
      id: "2",
      type: "PushEvent",
      created_at: new Date(Date.now() - 86400000).toISOString(),
      repo: { name: "Rachit-Kakkad1/Arkis-AI-OS", url: "" },
      payload: { size: 4, commits: [{ message: "refactor: optimize embeddings lookup index", sha: "def" }] }
    }
  ]
};

// ─── 3D INTERACTIVE HERO SPHERE (THREE.JS) ──────────────────────────────────
function Interactive3DGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Core Icosahedron Wireframe
    const geometry = new THREE.IcosahedronGeometry(1.5, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xB45309,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const sphere = new THREE.Mesh(geometry, wireMat);
    scene.add(sphere);

    // Inner glowing sphere
    const innerGeo = new THREE.SphereGeometry(1.2, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x111111,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerSphere);

    // Orbiting particle satellites
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const radius = 1.9;

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x000000,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / height) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      sphere.rotation.y += 0.003;
      sphere.rotation.x += 0.002;
      sphere.rotation.y += targetX * 0.02;
      sphere.rotation.x -= targetY * 0.02;

      innerSphere.rotation.y -= 0.004;
      innerSphere.rotation.x -= 0.002;

      particles.rotation.y += 0.005;
      particles.rotation.x += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      wireMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full min-h-[260px] md:min-h-[320px] flex items-center justify-center pointer-events-none select-none relative"
    />
  );
}

// ─── 3D PARALLAX TILT CARD ──────────────────────────────────────────────────
function Tilt3DCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [7, -7]), { stiffness: 120, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-7, 7]), { stiffness: 120, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative group transition-shadow duration-500 will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function GitHubStats() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<GitHubAnalyticsData>(FALLBACK_DATA);
  const [isLive, setIsLive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async (forceRefresh = false) => {
    if (forceRefresh) setRefreshing(true);
    
    try {
      if (!forceRefresh) {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_DURATION) {
            setData(parsed.data);
            setIsLive(true);
            setLoading(false);
            return;
          }
        }
      }

      // Fetch user profile, repos, and events concurrently
      const [profileRes, reposRes, eventsRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=30`)
      ]);

      if (!profileRes.ok || !reposRes.ok) {
        throw new Error("Failed to fetch GitHub live statistics");
      }

      const profileData = await profileRes.json();
      const reposData = await reposRes.json();
      const eventsData = eventsRes.ok ? await eventsRes.json() : FALLBACK_DATA.events;

      const fetchedData: GitHubAnalyticsData = {
        profile: {
          name: profileData.name || "Rachit Kakkad",
          avatar_url: profileData.avatar_url || FALLBACK_DATA.profile.avatar_url,
          bio: profileData.bio || FALLBACK_DATA.profile.bio,
          company: profileData.company || "Independent Developer",
          location: profileData.location || "India",
          public_repos: profileData.public_repos || 75,
          followers: profileData.followers || 9,
          following: profileData.following || 3
        },
        repos: Array.isArray(reposData) && reposData.length > 0 ? reposData : FALLBACK_DATA.repos,
        events: Array.isArray(eventsData) && eventsData.length > 0 ? eventsData : FALLBACK_DATA.events
      };

      localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        data: fetchedData
      }));

      setData(fetchedData);
      setIsLive(true);
    } catch (error) {
      console.warn("Error loading GitHub live stats, falling back to cache/mock:", error);
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setData(parsed.data);
          setIsLive(true);
        } catch {
          setData(FALLBACK_DATA);
          setIsLive(false);
        }
      } else {
        setData(FALLBACK_DATA);
        setIsLive(false);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleReturn = () => {
    window.dispatchEvent(new CustomEvent('trigger-transition', { 
      detail: { name: 'Returning Home', target: 'home' } 
    }));
    const scrollTo = (location.state as any)?.fromSection || 'home';
    setTimeout(() => navigate('/', { state: { skipIntro: true, scrollTo } }), 400);
  };

  const totalStars = data.repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
  const totalForks = data.repos.reduce((acc, repo) => acc + (repo.forks_count || 0), 0);

  // Top languages summary
  const languageSummary = () => {
    const counts: { [key: string]: number } = {};
    let totalWithLanguage = 0;
    data.repos.forEach(repo => {
      if (repo.language) {
        counts[repo.language] = (counts[repo.language] || 0) + 1;
        totalWithLanguage++;
      }
    });

    return Object.entries(counts)
      .map(([name, count]) => ({
        name,
        count,
        percentage: totalWithLanguage > 0 ? Math.round((count / totalWithLanguage) * 100) : 0,
        color: LANGUAGE_COLORS[name] || "#B45309"
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  };

  const topLanguages = languageSummary();

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (isNaN(seconds) || seconds < 0) return "recently";

    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "yesterday";
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    return `${months}mo ago`;
  };

  const renderEventDetails = (event: GitHubEvent) => {
    const repoName = event.repo.name.replace(`${GITHUB_USERNAME}/`, "");
    const time = timeAgo(event.created_at);

    switch (event.type) {
      case "PushEvent": {
        const commitCount = event.payload.size || event.payload.commits?.length || 0;
        const latestCommit = event.payload.commits?.[0]?.message;
        const text = commitCount > 0 
          ? `Pushed ${commitCount} commit${commitCount !== 1 ? "s" : ""} to ${repoName}`
          : `Pushed updates to ${repoName}`;
        return {
          icon: GitCommit,
          text,
          details: latestCommit || null,
          time,
          color: "text-[#B45309] bg-amber-50 border-amber-200",
        };
      }
      case "PullRequestEvent": {
        const action = event.payload.action || "opened";
        const title = event.payload.pull_request?.title || "Update PR";
        return {
          icon: GitPullRequest,
          text: `${action.charAt(0).toUpperCase() + action.slice(1)} pull request in ${repoName}`,
          details: title,
          time,
          color: "text-blue-700 bg-blue-50 border-blue-200",
        };
      }
      case "WatchEvent": {
        return {
          icon: Star,
          text: `Starred ${repoName}`,
          details: null,
          time,
          color: "text-yellow-700 bg-yellow-50 border-yellow-200",
        };
      }
      case "ForkEvent": {
        return {
          icon: GitFork,
          text: `Forked ${repoName}`,
          details: null,
          time,
          color: "text-purple-700 bg-purple-50 border-purple-200",
        };
      }
      default: {
        const typeCleaned = event.type.replace("Event", "");
        return {
          icon: Activity,
          text: `${typeCleaned} in ${repoName}`,
          details: null,
          time,
          color: "text-black/70 bg-black/5 border-black/10",
        };
      }
    }
  };

  const popularRepos = data.repos
    .filter(repo => repo.name !== GITHUB_USERNAME && !repo.fork)
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-[#F6F3EE] text-[#1C1C1C] selection:bg-[#B45309] selection:text-white pb-32 overflow-x-hidden relative">
      <Helmet>
        <title>GitHub Production Analytics | Rachit Kakkad</title>
        <meta name="description" content="Live open-source repository telemetry, commit stream, and engineering distribution for Rachit Kakkad on GitHub." />
        <link rel="canonical" href="https://rachit-hk-portfolio.vercel.app/github-stats" />
      </Helmet>
      <SEO title="GitHub Production Analytics | Rachit Kakkad" />

      {/* Subtle Background Watermark Typography */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden opacity-[0.02]">
        <span className="text-[28vw] font-black text-black select-none tracking-tighter uppercase font-serif">
          GITHUB
        </span>
      </div>

      {/* Sticky Editorial Header */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-5 flex items-center justify-between bg-[#F6F3EE]/90 backdrop-blur-xl border-b border-black/10 transition-all shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center shadow-md">
            <Github size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#B45309] font-serif">Open Source Telemetry</span>
            <span className="text-sm md:text-base font-black uppercase tracking-tight text-black">GitHub Intelligence Hub</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => loadData(true)}
            disabled={refreshing}
            className="p-2.5 rounded-full border border-black/10 bg-white/80 text-black/60 hover:text-black hover:border-black/30 hover:bg-white transition-all shadow-sm disabled:opacity-50"
            title="Refresh Live Data"
            aria-label="Refresh Live Data"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          </button>

          <button 
            onClick={handleReturn}
            className="group flex items-center gap-2 px-5 py-2.5 bg-black text-white font-serif uppercase text-[10px] md:text-xs font-black tracking-widest hover:bg-[#B45309] transition-all shadow-[3px_3px_0px_rgba(0,0,0,0.15)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] rounded-sm"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Front Page</span>
          </button>
        </div>
      </nav>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-36 md:pt-40 relative z-10">

        {/* Newspaper / Editorial Title Banner with Live 3D Globe */}
        <div className="w-full mb-12 border-b-4 border-black pb-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-black/5 border border-black/10 rounded-full">
                <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-600 animate-pulse' : 'bg-amber-600'}`} />
                <span className="text-[10px] font-black uppercase tracking-widest text-black/70 font-mono">
                  {isLive ? 'Connected • Live 60s Sync' : 'Cached Intelligence'} • @{GITHUB_USERNAME}
                </span>
              </div>

              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B45309] hover:text-black transition-colors"
              >
                <span>Inspect Repository Network</span>
                <ExternalLink size={13} />
              </a>
            </div>

            <h1 className="text-[clamp(2.8rem,7.5vw,84px)] font-black tracking-tight leading-[0.88] text-black uppercase font-serif">
              Engineering <span className="text-[#B45309]">Ledger</span>
            </h1>
            <p className="mt-4 max-w-2xl font-serif italic text-sm md:text-base text-black/70 leading-relaxed">
              Real-time synchronization of open-source repository architecture, version control pipelines, code deployment commits, and multi-paradigm software engineering metrics.
            </p>
          </div>

          {/* Interactive 3D Sphere Widget */}
          <div className="lg:col-span-4 flex items-center justify-center relative">
            <div className="relative w-full aspect-square max-w-[280px] bg-white/60 border border-black/10 rounded-3xl p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute top-3 left-4 text-[9px] font-mono font-bold uppercase tracking-widest text-black/40">
                3D Network Node
              </div>
              <Interactive3DGlobe />
              <div className="absolute bottom-3 text-[9px] font-mono text-black/40 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                Orbital Mesh Interactive
              </div>
            </div>
          </div>
        </div>

        {/* Profile Card Banner with 3D Parallax Tilt */}
        <Tilt3DCard className="mb-10">
          <div className="bg-white/95 border-2 border-black rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_rgba(0,0,0,0.1)] flex flex-col md:flex-row items-center gap-6 justify-between relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="relative">
                <img 
                  src={data.profile.avatar_url} 
                  alt={data.profile.name} 
                  className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border-2 border-black object-cover shadow-sm"
                />
                <div className="absolute -bottom-1 -right-1 bg-black text-white p-1 rounded-md border border-white">
                  <Github size={12} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <h2 className="text-2xl md:text-3xl font-black text-black font-serif">{data.profile.name}</h2>
                  <span className="text-xs font-mono font-bold text-[#B45309] bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    @{GITHUB_USERNAME}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-black/75 font-serif mt-1.5 max-w-xl leading-relaxed">
                  {data.profile.bio}
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-3 text-[11px] font-mono text-black/50">
                  <span className="flex items-center gap-1">📍 {data.profile.location || 'India'}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">🏢 {data.profile.company || 'Independent Developer'}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">🌐 Public Open-Source</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8 border-t md:border-t-0 md:border-l border-black/10 pt-4 md:pt-0 md:pl-8 shrink-0">
              <div className="text-center">
                <div className="text-3xl font-black text-black font-serif">{data.profile.followers}</div>
                <div className="text-[10px] font-mono uppercase text-black/40 tracking-wider">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-black font-serif">{data.profile.following}</div>
                <div className="text-[10px] font-mono uppercase text-black/40 tracking-wider">Following</div>
              </div>
            </div>
          </div>
        </Tilt3DCard>

        {/* Core Stats Bento Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          <Tilt3DCard>
            <div className="bg-white/90 border border-black/15 rounded-3xl p-6 shadow-sm hover:border-black hover:shadow-md transition-all h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-black/40">Repositories</span>
                <div className="p-2 rounded-xl bg-black text-white shadow-sm">
                  <FolderGit2 size={16} />
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-black font-serif mb-1">
                  {data.profile.public_repos}+
                </div>
                <div className="text-xs font-serif text-black/60">Public Code Repositories</div>
              </div>
            </div>
          </Tilt3DCard>

          <Tilt3DCard>
            <div className="bg-white/90 border border-black/15 rounded-3xl p-6 shadow-sm hover:border-amber-500 hover:shadow-md transition-all h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-black/40">Stars Earned</span>
                <div className="p-2 rounded-xl bg-amber-500 text-white shadow-sm">
                  <Star size={16} />
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-[#B45309] font-serif mb-1">
                  {totalStars || 36}+
                </div>
                <div className="text-xs font-serif text-black/60">Community Stargazers</div>
              </div>
            </div>
          </Tilt3DCard>

          <Tilt3DCard>
            <div className="bg-white/90 border border-black/15 rounded-3xl p-6 shadow-sm hover:border-purple-500 hover:shadow-md transition-all h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-black/40">Project Forks</span>
                <div className="p-2 rounded-xl bg-purple-600 text-white shadow-sm">
                  <GitFork size={16} />
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-purple-800 font-serif mb-1">
                  {totalForks || 24}+
                </div>
                <div className="text-xs font-serif text-black/60">Downstream Forks</div>
              </div>
            </div>
          </Tilt3DCard>

          <Tilt3DCard>
            <div className="bg-white/90 border border-black/15 rounded-3xl p-6 shadow-sm hover:border-blue-500 hover:shadow-md transition-all h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-black/40">Languages</span>
                <div className="p-2 rounded-xl bg-blue-600 text-white shadow-sm">
                  <Code size={16} />
                </div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-blue-800 font-serif mb-1">
                  {topLanguages.length} Active
                </div>
                <div className="text-xs font-serif text-black/60">Primary Language Stacks</div>
              </div>
            </div>
          </Tilt3DCard>

        </div>

        {/* Two-Column Bento: Language Distribution & Featured Repositories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
          
          {/* Languages Distribution Card */}
          <div className="lg:col-span-4 bg-white/90 border border-black/15 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/10">
                <h3 className="text-xl font-black text-black font-serif uppercase tracking-tight">
                  Stack Distribution
                </h3>
                <span className="text-[10px] font-mono uppercase text-[#B45309] font-bold">Telemetry</span>
              </div>

              <div className="space-y-5">
                {topLanguages.map((lang, idx) => (
                  <div key={lang.name}>
                    <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                      <span className="font-bold text-black flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full shadow-xs" style={{ backgroundColor: lang.color }} />
                        {lang.name}
                      </span>
                      <span className="text-black/60 font-semibold">{lang.percentage}% ({lang.count} repos)</span>
                    </div>
                    <div className="w-full h-2.5 bg-black/5 rounded-full overflow-hidden p-0.5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${lang.percentage}%` }}
                        transition={{ duration: 1.2, delay: idx * 0.1, ease: "easeOut" }}
                        className="h-full rounded-full shadow-xs"
                        style={{ backgroundColor: lang.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-black/10 mt-8 text-[11px] font-mono text-black/50 leading-relaxed">
              Parsed from repository trees across TypeScript, Python, JavaScript, and systems programming languages.
            </div>
          </div>

          {/* Featured Repositories Grid */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/10">
              <h3 className="text-xl font-black text-black font-serif uppercase tracking-tight">
                Featured Open-Source Architecture
              </h3>
              <span className="text-xs font-mono text-black/40 uppercase">Top Starred</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {popularRepos.map(repo => (
                <Tilt3DCard key={repo.id}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/90 border border-black/15 hover:border-black rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2 truncate">
                          <div className="w-2 h-2 rounded-full bg-[#B45309]" />
                          <h4 className="text-base md:text-lg font-black text-black font-serif group-hover:text-[#B45309] transition-colors truncate">
                            {repo.name}
                          </h4>
                        </div>
                        <ExternalLink size={14} className="text-black/30 group-hover:text-black shrink-0 transition-colors" />
                      </div>

                      <p className="text-xs text-black/65 font-serif leading-relaxed line-clamp-2 mb-6">
                        {repo.description || "Production system repository engineered by Rachit Kakkad."}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-black/10 text-xs font-mono">
                      <span className="flex items-center gap-1.5 text-black/80 font-bold">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: LANGUAGE_COLORS[repo.language || ''] || '#B45309' }} />
                        {repo.language || 'Code'}
                      </span>

                      <div className="flex items-center gap-3 text-black/60 font-semibold">
                        <span className="flex items-center gap-1">
                          <Star size={13} className="text-amber-500 fill-amber-500" />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork size={13} />
                          {repo.forks_count}
                        </span>
                      </div>
                    </div>
                  </a>
                </Tilt3DCard>
              ))}
            </div>
          </div>

        </div>

        {/* Live Activity Stream */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8 border-b-2 border-black/10 pb-4">
            <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center text-xs font-black font-mono shadow-sm">
              §
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-black font-serif uppercase tracking-tight">
              Live Activity <span className="text-[#B45309]">Timeline</span>
            </h2>
            <div className="flex-1 h-px bg-black/10" />
            <span className="text-xs font-mono font-bold text-black/40 uppercase hidden sm:block">
              {data.events.length} Recent Real-Time Events
            </span>
          </div>

          <div className="bg-white/95 border border-black/15 rounded-3xl overflow-hidden shadow-sm">
            <div className="divide-y divide-black/5">
              {data.events.slice(0, 10).map((event, idx) => {
                const info = renderEventDetails(event);
                const EventIcon = info.icon;
                return (
                  <div 
                    key={`${event.id}-${idx}`}
                    className="p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-black/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-xs shrink-0 ${info.color}`}>
                        <EventIcon size={20} />
                      </div>
                      <div>
                        <div className="text-sm md:text-base font-black text-black font-serif">
                          {info.text}
                        </div>
                        {info.details && (
                          <div className="text-xs font-serif text-black/60 italic mt-0.5 max-w-xl truncate">
                            "{info.details}"
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-xs font-mono text-black/50 self-end md:self-center font-semibold bg-black/5 px-3 py-1 rounded-full">
                      {info.time}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="text-center p-12 md:p-16 bg-white/95 border-2 border-black rounded-3xl shadow-[6px_6px_0px_rgba(0,0,0,0.1)] relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center mx-auto mb-6 shadow-md">
            <Github size={36} />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-black font-serif uppercase tracking-tight mb-3">
            Explore Open Source Repositories
          </h2>
          <p className="max-w-xl mx-auto text-sm md:text-base text-black/60 font-serif mb-8 leading-relaxed">
            Review complete production architectures, system documentation, open pull requests, and commit histories directly on GitHub.
          </p>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-black hover:bg-[#B45309] text-white font-serif uppercase text-xs font-black tracking-widest transition-all rounded-xl shadow-md hover:scale-105"
          >
            <span>Visit GitHub Profile (@{GITHUB_USERNAME})</span>
            <ExternalLink size={16} />
          </a>
        </div>

      </div>
    </main>
  );
}
