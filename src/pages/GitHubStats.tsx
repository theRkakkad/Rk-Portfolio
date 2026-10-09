import React, { useEffect, useState, useMemo, useRef } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform,
  AnimatePresence 
} from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, 
  Github, 
  Star, 
  GitFork, 
  Activity, 
  ShieldCheck, 
  GitCommit, 
  GitPullRequest, 
  Code,
  ExternalLink,
  RefreshCw,
  FolderGit2,
  CheckCircle2,
  Terminal,
  Globe,
  Plane,
  Radio,
  Gauge,
  Radar,
  Send,
  ChevronUp,
  Cpu,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  X
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';

const GITHUB_USERNAME = "theRkakkad";
const CACHE_KEY = "github_analytics_cache_v5";
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
  category?: 'ai' | 'web' | 'systems';
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
  TypeScript: "#3178C6",
  Python: "#3776AB",
  JavaScript: "#F7DF1E",
  HTML: "#E34F26",
  CSS: "#1572B6",
  Solidity: "#AA6746",
  Shell: "#89E051",
  "C++": "#F34B7D",
  C: "#555555",
  Go: "#00ADD8",
  Rust: "#DEA584"
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
      html_url: "https://github.com/theRkakkad/Sanjeevani",
      stargazers_count: 14,
      forks_count: 4,
      language: "Python",
      size: 4200,
      updated_at: new Date().toISOString(),
      fork: false,
      category: 'ai'
    },
    {
      id: 2,
      name: "Rk-Portfolio",
      description: "High-performance editorial portfolio featuring 3D Spline, Lenis smooth scrolling, GSAP & live telemetry.",
      html_url: "https://github.com/theRkakkad/Rk-Portfolio",
      stargazers_count: 8,
      forks_count: 2,
      language: "TypeScript",
      size: 15400,
      updated_at: new Date().toISOString(),
      fork: false,
      category: 'web'
    },
    {
      id: 3,
      name: "Arkis-AI-OS",
      description: "Local-first AI agentic workflow system with persistent context graphs and low-latency inference.",
      html_url: "https://github.com/theRkakkad",
      stargazers_count: 12,
      forks_count: 3,
      language: "TypeScript",
      size: 8900,
      updated_at: new Date().toISOString(),
      fork: false,
      category: 'ai'
    },
    {
      id: 4,
      name: "MedClear",
      description: "Hospital billing error detection and itemized anomaly analysis system using OCR.",
      html_url: "https://github.com/theRkakkad",
      stargazers_count: 6,
      forks_count: 1,
      language: "Python",
      size: 3400,
      updated_at: new Date().toISOString(),
      fork: false,
      category: 'ai'
    },
    {
      id: 5,
      name: "agricert-platform",
      description: "Blockchain-powered agricultural supply chain verification and NFT certification pipeline.",
      html_url: "https://github.com/theRkakkad/agricert-platform",
      stargazers_count: 9,
      forks_count: 2,
      language: "Solidity",
      size: 6100,
      updated_at: new Date().toISOString(),
      fork: false,
      category: 'systems'
    },
    {
      id: 6,
      name: "ThreatLens_UI_Backend",
      description: "Ethical static cybersecurity analysis & AST deterministic threat modeling platform.",
      html_url: "https://github.com/theRkakkad/ThreatLens",
      stargazers_count: 11,
      forks_count: 3,
      language: "Python",
      size: 7800,
      updated_at: new Date().toISOString(),
      fork: false,
      category: 'systems'
    },
    {
      id: 7,
      name: "build-with-ai-hackcrux-2026",
      description: "COS Cognitive Operating System: 8 on-device AI models for sub-second cognitive context restoration.",
      html_url: "https://github.com/theRkakkad/build-with-ai-hackcrux-2026",
      stargazers_count: 15,
      forks_count: 4,
      language: "Python",
      size: 9200,
      updated_at: new Date().toISOString(),
      fork: false,
      category: 'ai'
    },
    {
      id: 8,
      name: "FleetFlow",
      description: "Real-time logistics coordination platform with WebSockets telemetry and anomaly detection.",
      html_url: "https://github.com/theRkakkad/FleetFlow",
      stargazers_count: 7,
      forks_count: 2,
      language: "TypeScript",
      size: 5400,
      updated_at: new Date().toISOString(),
      fork: false,
      category: 'web'
    }
  ],
  events: [
    {
      id: "1",
      type: "PushEvent",
      created_at: new Date(Date.now() - 3600000).toISOString(),
      repo: { name: "theRkakkad/Rk-Portfolio", url: "" },
      payload: { size: 2, commits: [{ message: "feat: supersonic flight formation telemetry & scroll reveals", sha: "c82b14e" }] }
    },
    {
      id: "2",
      type: "PushEvent",
      created_at: new Date(Date.now() - 14400000).toISOString(),
      repo: { name: "theRkakkad/Sanjeevani", url: "" },
      payload: { size: 3, commits: [{ message: "perf: optimize hospital code matching engine index lookup", sha: "e91a03f" }] }
    },
    {
      id: "3",
      type: "PushEvent",
      created_at: new Date(Date.now() - 86400000).toISOString(),
      repo: { name: "theRkakkad/Arkis-AI-OS", url: "" },
      payload: { size: 4, commits: [{ message: "refactor: stream persistent context graph nodes dynamically", sha: "77fa82b" }] }
    },
    {
      id: "4",
      type: "PullRequestEvent",
      created_at: new Date(Date.now() - 172800000).toISOString(),
      repo: { name: "theRkakkad/build-with-ai-hackcrux-2026", url: "" },
      payload: { action: "merged", pull_request: { title: "Integrate Whisper natural audio parser into memory bus", html_url: "" } }
    },
    {
      id: "5",
      type: "PushEvent",
      created_at: new Date(Date.now() - 259200000).toISOString(),
      repo: { name: "theRkakkad/ThreatLens", url: "" },
      payload: { size: 1, commits: [{ message: "sec: add AST ethical traversal validation pipeline", sha: "40d8c11" }] }
    }
  ]
};

// ─── LIGHTWEIGHT WINGTIP STROBE ─────────────────────────────────────────────
function WingtipBeacon({ side }: { side: 'port' | 'starboard' }) {
  const isPort = side === 'port';
  return (
    <div 
      className={`absolute top-3 ${isPort ? 'left-3' : 'right-3'} flex items-center gap-1.5 z-10 pointer-events-none select-none`}
    >
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isPort ? 'bg-rose-500' : 'bg-emerald-500'}`} />
        <span className={`relative inline-flex rounded-full h-2 w-2 ${isPort ? 'bg-rose-600' : 'bg-emerald-600'}`} />
      </span>
      <span className="text-[8px] font-mono font-bold tracking-widest text-black/35 uppercase hidden sm:inline">
        {isPort ? 'PORT' : 'STBD'}
      </span>
    </div>
  );
}

export default function GitHubStats() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<GitHubAnalyticsData>(FALLBACK_DATA);
  const [isLive, setIsLive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [flightSequenceKey, setFlightSequenceKey] = useState(0);
  const [activeTab, setActiveTab] = useState<'all' | 'ai' | 'web' | 'systems'>('all');

  // Terminal state
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<Array<{ command: string; output: string }>>([
    {
      command: 'gh flight-status --callsign RK-01',
      output: 'STATUS: AIRBORNE • CRUISE FL350 • TELEMETRY SYNC: 100% OK • TARGET: @theRkakkad'
    }
  ]);

  // Zero-rerender scroll progress binding: NO setState during scroll!
  const { scrollYProgress } = useScroll();
  const planeLeft = useTransform(scrollYProgress, [0, 1], ["0%", "97%"]);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const reFlyFormation = () => {
    setFlightSequenceKey(prev => prev + 1);
  };

  // ─── ANTIGRAVITY AUTONOMOUS CRUISE WAYPOINTS ─────────────────────────────
  const AUTOPILOT_WAYPOINTS = [
    {
      id: 'cockpit-hero',
      callsign: 'WP-01 // COCKPIT',
      title: 'Flight Deck & Clearance',
      summary: 'Squadron Arrival Formation & Pilot Telemetry Clearance',
      telemetry: 'ALT: FL 35,000 FT • MACH 0.84 • RADAR LOCK LIVE',
    },
    {
      id: 'radar-section',
      callsign: 'WP-02 // RADAR',
      title: 'Flight Velocity & Commit Radar',
      summary: 'Telemetric Velocity Spectrum & 360° Contribution Radar',
      telemetry: 'RADAR SWEEP: PASS • 1,120+ REPO COMMITS',
    },
    {
      id: 'avionics-section',
      callsign: 'WP-03 // AVIONICS',
      title: 'Avionics Propulsion: Tech Stack',
      summary: 'Multi-Paradigm Language Density & Architecture Engine',
      telemetry: 'ENGINES: 6 CORE TECH RUNWAYS DETECTED',
    },
    {
      id: 'fleet-section',
      callsign: 'WP-04 // FLEET',
      title: 'Curated Repository Fleet',
      summary: 'Flagship Open-Source Projects & System Architectures',
      telemetry: 'FLEET FORMATION: 6 COMBAT-TESTED REPOSITORIES',
    },
    {
      id: 'flight-log-section',
      callsign: 'WP-05 // LOGBOOK',
      title: 'Flight Log & Commit Runway',
      summary: 'Live GitHub Event Telemetry & Real-Time Activity Feed',
      telemetry: 'TRANSPONDER: 60S SYNCHRONIZED STREAM',
    },
    {
      id: 'terminal-section',
      callsign: 'WP-06 // TERMINAL',
      title: 'Interactive Flight Dispatcher',
      summary: 'Cockpit CLI Console & System Diagnostic Commands',
      telemetry: 'VT-100 SHELL: ONLINE // INPUT READY',
    },
    {
      id: 'touchdown-section',
      callsign: 'WP-07 // TOUCHDOWN',
      title: 'Runway Touchdown & Hangar',
      summary: 'Touchdown Complete • Direct GitHub Profile Dispatch',
      telemetry: 'TOUCHDOWN: RUNWAY 27R CLEARED // MISSION COMPLETE',
    },
  ];

  // ─── ANTIGRAVITY AUTOPILOT CONTROLLER STATE ──────────────────────────────
  const [isAutopilot, setIsAutopilot] = useState(false);
  const [currentWaypointIdx, setCurrentWaypointIdx] = useState(0);
  const [autopilotPaused, setAutopilotPaused] = useState(false);
  const [autopilotMessage, setAutopilotMessage] = useState<string | null>(null);

  const autopilotTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAutopilotRef = useRef(false);
  const currentWpRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    isAutopilotRef.current = isAutopilot;
  }, [isAutopilot]);

  useEffect(() => {
    currentWpRef.current = currentWaypointIdx;
  }, [currentWaypointIdx]);

  useEffect(() => {
    pausedRef.current = autopilotPaused;
  }, [autopilotPaused]);

  const scrollToWaypoint = (index: number) => {
    const wp = AUTOPILOT_WAYPOINTS[index];
    if (!wp) return;

    setCurrentWaypointIdx(index);
    currentWpRef.current = index;

    const el = document.getElementById(wp.id);
    if (el) {
      const headerOffset = 95;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const targetY = Math.max(0, elementPosition - headerOffset);

      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(targetY, { duration: 1.8, easing: (t: number) => 1 - Math.pow(1 - t, 3) });
      } else {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    }
  };

  const scheduleNextWaypoint = (currentIdx: number) => {
    if (autopilotTimerRef.current) {
      clearTimeout(autopilotTimerRef.current);
    }

    autopilotTimerRef.current = setTimeout(() => {
      if (!isAutopilotRef.current || pausedRef.current) return;

      const nextIdx = currentIdx + 1;
      if (nextIdx < AUTOPILOT_WAYPOINTS.length) {
        scrollToWaypoint(nextIdx);
        scheduleNextWaypoint(nextIdx);
      } else {
        setAutopilotMessage('Touchdown Complete • Mission Accomplished');
        autopilotTimerRef.current = setTimeout(() => {
          stopAutopilot();
        }, 3400);
      }
    }, currentIdx === 0 ? 4000 : 3400);
  };

  const startAutopilot = () => {
    if (autopilotTimerRef.current) {
      clearTimeout(autopilotTimerRef.current);
      autopilotTimerRef.current = null;
    }

    setIsAutopilot(true);
    setAutopilotPaused(false);
    setAutopilotMessage(null);
    isAutopilotRef.current = true;
    pausedRef.current = false;

    // Trigger squadron cards fly-in formation
    setFlightSequenceKey(prev => prev + 1);

    // Smooth scroll to top waypoint
    scrollToWaypoint(0);

    // Schedule automated tour sequence
    scheduleNextWaypoint(0);
  };

  const stopAutopilot = (reason?: string) => {
    if (autopilotTimerRef.current) {
      clearTimeout(autopilotTimerRef.current);
      autopilotTimerRef.current = null;
    }

    setIsAutopilot(false);
    isAutopilotRef.current = false;
    setAutopilotPaused(false);
    pausedRef.current = false;

    if (reason) {
      setAutopilotMessage(reason);
      setTimeout(() => {
        setAutopilotMessage(null);
      }, 2200);
    } else {
      setAutopilotMessage(null);
    }
  };

  const togglePauseAutopilot = () => {
    if (autopilotPaused) {
      setAutopilotPaused(false);
      pausedRef.current = false;
      scheduleNextWaypoint(currentWpRef.current);
    } else {
      setAutopilotPaused(true);
      pausedRef.current = true;
      if (autopilotTimerRef.current) {
        clearTimeout(autopilotTimerRef.current);
      }
    }
  };

  const nextWaypoint = () => {
    const nextIdx = Math.min(AUTOPILOT_WAYPOINTS.length - 1, currentWpRef.current + 1);
    scrollToWaypoint(nextIdx);
    if (!pausedRef.current) {
      scheduleNextWaypoint(nextIdx);
    }
  };

  const prevWaypoint = () => {
    const prevIdx = Math.max(0, currentWpRef.current - 1);
    scrollToWaypoint(prevIdx);
    if (!pausedRef.current) {
      scheduleNextWaypoint(prevIdx);
    }
  };

  const toggleAutopilot = () => {
    if (isAutopilot) {
      stopAutopilot('Autopilot Disengaged');
    } else {
      startAutopilot();
    }
  };

  // Intercept physical user scroll/touch to restore manual control immediately
  useEffect(() => {
    if (!isAutopilot) return;

    const handleUserInteraction = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('#autopilot-hud')) return;
      stopAutopilot('Manual Flight Override');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['Escape', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.key)) {
        stopAutopilot('Manual Flight Override');
      }
    };

    const timer = setTimeout(() => {
      window.addEventListener('wheel', handleUserInteraction, { passive: true });
      window.addEventListener('touchmove', handleUserInteraction, { passive: true });
      window.addEventListener('keydown', handleKeyDown);
    }, 400);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('wheel', handleUserInteraction);
      window.removeEventListener('touchmove', handleUserInteraction);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAutopilot]);

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

  // Filtered repositories
  const filteredRepos = useMemo(() => {
    return data.repos
      .filter(repo => repo.name !== GITHUB_USERNAME && !repo.fork)
      .filter(repo => {
        if (activeTab === 'all') return true;
        if (activeTab === 'ai') {
          return repo.name.toLowerCase().includes('ai') || 
                 repo.name.toLowerCase().includes('lens') || 
                 repo.name.toLowerCase().includes('cos') || 
                 repo.name.toLowerCase().includes('sanjeevani') ||
                 repo.language === 'Python';
        }
        if (activeTab === 'web') {
          return repo.language === 'TypeScript' || 
                 repo.language === 'JavaScript' || 
                 repo.name.toLowerCase().includes('portfolio') ||
                 repo.name.toLowerCase().includes('flow');
        }
        if (activeTab === 'systems') {
          return repo.language === 'Solidity' || 
                 repo.name.toLowerCase().includes('cert') || 
                 repo.name.toLowerCase().includes('threat') || 
                 repo.name.toLowerCase().includes('os');
        }
        return true;
      })
      .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
  }, [data.repos, activeTab]);

  // Terminal command executor
  const handleRunCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    let response = "";
    if (trimmed === 'clear') {
      setTerminalLogs([]);
      setTerminalInput('');
      return;
    } else if (trimmed === 'gh whoami' || trimmed === 'whoami') {
      response = `User: Rachit Kakkad (@${GITHUB_USERNAME}) | Role: Full Stack & AI Systems | Location: India | Status: Airborne Ready`;
    } else if (trimmed === 'gh fleet' || trimmed === 'gh repos' || trimmed === 'repos') {
      response = `Top Repositories (${data.repos.length} total):\n• Sanjeevani (AI Healthcare Audit)\n• Rk-Portfolio (High-Performance 3D)\n• Arkis-AI-OS (Local Context Neural OS)\n• ThreatLens (Ethical Cybersecurity AST)\n• AgriCert (Blockchain Supply Chain)`;
    } else if (trimmed === 'gh stack' || trimmed === 'stack') {
      response = topLanguages.map(l => `${l.name}: ${l.percentage}% (${l.count} repos)`).join(' | ');
    } else if (trimmed === 'gh telemetry' || trimmed === 'telemetry') {
      response = `LAT: 23.0225° N | LON: 72.5714° E | FL: 350 | Groundspeed: 540 KT | Transponder: 7700 OK`;
    } else if (trimmed === 'help' || trimmed === 'gh --help') {
      response = `Available telemetry commands:\n• gh whoami\n• gh fleet\n• gh stack\n• gh telemetry\n• clear`;
    } else {
      response = `Command '${trimmed}' not recognized. Type 'help' for command list.`;
    }

    setTerminalLogs(prev => [...prev, { command: trimmed, output: response }]);
    setTerminalInput('');
  };

  return (
    <main className="min-h-screen bg-[#F6F3EE] text-[#1C1C1C] selection:bg-[#B45309] selection:text-white pb-36 overflow-x-clip relative">
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

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* 1. TOP STICKY EDITORIAL & AVIONICS FLIGHT HUD NAV                   */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 w-full z-[100] bg-[#F6F3EE]/95 backdrop-blur-md border-b border-black/10 transition-all shadow-xs">
        {/* Main Nav Bar */}
        <div className="px-6 md:px-12 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center shadow-xs relative">
              <Github size={18} />
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#B45309] font-mono flex items-center gap-1.5">
                <Plane size={10} className="text-[#B45309] rotate-45" />
                Open Source Flight Deck
              </span>
              <span className="text-sm md:text-base font-black uppercase tracking-tight text-black">
                GitHub Intelligence Hub
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Antigravity Autopilot Cruise & Re-Fly Button */}
            <button
              onClick={toggleAutopilot}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all text-[11px] font-mono font-bold uppercase shadow-2xs ${
                isAutopilot 
                  ? 'border-[#B45309] bg-[#B45309] text-white ring-2 ring-[#B45309]/30 animate-pulse' 
                  : 'border-[#B45309]/30 bg-amber-50 text-[#B45309] hover:bg-[#B45309] hover:text-white'
              }`}
              title={isAutopilot ? "Click to stop Antigravity autopilot" : "Launch automated Antigravity flight tour"}
            >
              {isAutopilot ? (
                <>
                  <Radio size={12} className="animate-pulse" />
                  <span className="hidden sm:inline">Autopilot Active (Stop)</span>
                  <span className="sm:hidden">Stop Auto</span>
                </>
              ) : (
                <>
                  <Plane size={12} className="rotate-45" />
                  <span className="hidden sm:inline">Re-Fly & Autopilot</span>
                  <span className="sm:hidden">Autopilot</span>
                </>
              )}
            </button>

            {/* Refresh Data */}
            <button
              onClick={() => loadData(true)}
              disabled={refreshing}
              className="p-2.5 rounded-full border border-black/10 bg-white text-black/60 hover:text-black hover:border-black/30 transition-colors shadow-2xs disabled:opacity-50"
              title="Refresh Live Telemetry"
              aria-label="Refresh Live Telemetry"
            >
              <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
            </button>

            {/* Return to Portfolio */}
            <button 
              onClick={handleReturn}
              className="group flex items-center gap-2 px-4 py-2 bg-black text-white font-serif uppercase text-[10px] md:text-xs font-black tracking-widest hover:bg-[#B45309] transition-colors rounded-sm shadow-2xs"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
              <span>Portfolio</span>
            </button>
          </div>
        </div>

        {/* ─── HARDWARE-ACCELERATED RUNWAY FLIGHT PROGRESS BAR ─────────────── */}
        <div className="relative w-full h-7 bg-black/[0.02] border-t border-black/5 px-6 md:px-12 flex items-center justify-between text-[9px] font-mono text-black/60">
          <div className="flex items-center gap-4">
            <span className="font-bold text-[#B45309] flex items-center gap-1">
              <Radio size={11} className="animate-pulse" />
              SQUADRON: AIRBORNE
            </span>
            <span className="hidden md:inline text-black/30">|</span>
            <span className="hidden md:inline font-bold text-black/80">
              XPDR: 7700 ACTIVE
            </span>
          </div>

          {/* Miniature Airplane Flying Across Top Runway (0% React Rerender Overhead) */}
          <div className="flex-1 mx-6 relative h-1.5 bg-black/10 rounded-full overflow-visible hidden sm:block">
            <motion.div 
              style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
              className="h-full bg-gradient-to-r from-amber-600 to-[#B45309] rounded-full will-change-transform"
            />
            <motion.div 
              style={{ left: planeLeft }}
              className="absolute -top-2 transform -translate-x-1/2 flex items-center justify-center p-1 rounded-full bg-black text-white shadow-sm pointer-events-none will-change-transform"
            >
              <Plane size={10} className="rotate-45" />
            </motion.div>
          </div>

          <div className="font-mono text-[9px] font-bold text-black/70">
            RADAR LOCK: LIVE
          </div>
        </div>
      </header>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* ANTIGRAVITY AGENT AUTOPILOT HUD (FLOATING FLIGHT BANNER)            */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {(isAutopilot || autopilotMessage) && (
          <motion.div
            id="autopilot-hud"
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-[94vw] max-w-xl pointer-events-auto"
          >
            {isAutopilot ? (
              <div className="bg-[#0b0e14]/95 backdrop-blur-md border-2 border-[#B45309] text-white rounded-2xl p-4 shadow-[0_16px_40px_rgba(0,0,0,0.65)]">
                <div className="flex items-center justify-between gap-3 mb-2.5 pb-2.5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-[#B45309] text-white flex items-center justify-center">
                      <Plane size={13} className="rotate-45" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-black uppercase text-[#B45309] tracking-widest flex items-center gap-1">
                          <Radio size={11} className="animate-pulse" />
                          Antigravity Autopilot
                        </span>
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          autopilotPaused 
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse'
                        }`}>
                          {autopilotPaused ? 'PAUSED' : 'CRUISING'}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-white/50">
                        Autonomous Flight Tour • 60 FPS
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => stopAutopilot('Autopilot Disengaged')}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors text-[10px] font-mono font-bold uppercase"
                    title="Disengage autopilot"
                  >
                    <X size={12} />
                    <span>Stop</span>
                  </button>
                </div>

                {/* Waypoint details */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#B45309] font-bold mb-0.5">
                    <span>{AUTOPILOT_WAYPOINTS[currentWaypointIdx]?.callsign}</span>
                    <span className="text-white/60">WAYPOINT {currentWaypointIdx + 1} OF {AUTOPILOT_WAYPOINTS.length}</span>
                  </div>
                  <div className="text-sm md:text-base font-bold text-white font-serif uppercase tracking-tight">
                    {AUTOPILOT_WAYPOINTS[currentWaypointIdx]?.title}
                  </div>
                  <div className="text-[11px] text-white/70 font-mono mt-0.5 line-clamp-1">
                    {AUTOPILOT_WAYPOINTS[currentWaypointIdx]?.summary}
                  </div>
                  <div className="text-[9px] font-mono text-emerald-400 mt-1">
                    {AUTOPILOT_WAYPOINTS[currentWaypointIdx]?.telemetry}
                  </div>
                </div>

                {/* Waypoint dot timeline */}
                <div className="grid grid-cols-7 gap-1.5 mb-3">
                  {AUTOPILOT_WAYPOINTS.map((wp, idx) => (
                    <button
                      key={wp.id}
                      onClick={() => {
                        scrollToWaypoint(idx);
                        if (!pausedRef.current) scheduleNextWaypoint(idx);
                      }}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === currentWaypointIdx
                          ? 'bg-[#B45309] ring-2 ring-amber-400/50'
                          : idx < currentWaypointIdx
                          ? 'bg-white/60'
                          : 'bg-white/20'
                      }`}
                      title={`Jump to ${wp.title}`}
                    />
                  ))}
                </div>

                {/* Transport Controls */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={prevWaypoint}
                      className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
                      title="Previous Section"
                    >
                      <SkipBack size={13} />
                    </button>
                    <button
                      onClick={togglePauseAutopilot}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#B45309] hover:bg-amber-600 text-white font-mono text-[10px] font-bold uppercase transition-colors"
                      title={autopilotPaused ? "Resume Cruise" : "Pause Cruise"}
                    >
                      {autopilotPaused ? <Play size={12} /> : <Pause size={12} />}
                      <span>{autopilotPaused ? 'Resume' : 'Pause'}</span>
                    </button>
                    <button
                      onClick={nextWaypoint}
                      className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
                      title="Next Section"
                    >
                      <SkipForward size={13} />
                    </button>
                  </div>

                  <span className="text-[9px] font-mono text-white/40 hidden sm:inline">
                    Touch wheel or press ESC to take manual control
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-[#0b0e14]/95 backdrop-blur-md border-2 border-amber-500/80 text-white rounded-2xl px-5 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.65)] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  <span className="font-mono text-xs font-bold text-amber-300">
                    {autopilotMessage}
                  </span>
                </div>
                <span className="text-[9px] font-mono text-white/50 uppercase">
                  Manual Control Active
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* 2. MAIN COCKPIT BODY                                                */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-32 md:pt-36 relative z-10">

        {/* ─── HERO FLIGHT DECK BANNER (NO LAGGING THREE.JS) ──────────────── */}
        <div id="cockpit-hero" className="w-full mb-10 border-b-4 border-black pb-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center gap-2 px-3.5 py-1 bg-black/5 border border-black/10 rounded-full shadow-2xs">
                <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'}`} />
                <span className="text-[10px] font-black uppercase tracking-widest text-black/75 font-mono">
                  {isLive ? 'Transponder Active • 60s Stream' : 'Cached Telemetry'} • @{GITHUB_USERNAME}
                </span>
              </div>

              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#B45309] hover:text-black transition-colors"
              >
                <span>Inspect Repository Network</span>
                <ExternalLink size={12} />
              </a>
            </div>

            <h1 className="text-[clamp(2.8rem,7vw,80px)] font-black tracking-tight leading-[0.88] text-black uppercase font-serif">
              Engineering <span className="text-[#B45309]">Ledger</span>
            </h1>

            <p className="mt-4 max-w-2xl font-serif italic text-sm md:text-base text-black/70 leading-relaxed">
              Real-time synchronization of open-source repository architecture, version control pipelines, code deployment commits, and multi-paradigm software engineering metrics.
            </p>
          </div>

          {/* Ultra-Clean Aviation Clearance Card (Replaces Lagging 3D Canvas) */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <div className="w-full max-w-[320px] bg-white border-2 border-black rounded-3xl p-6 shadow-[5px_5px_0px_rgba(0,0,0,0.08)] flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-black/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono font-black uppercase text-black/60 tracking-wider">
                    Flight Clearance
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#B45309] bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  RK-01
                </span>
              </div>

              <div className="my-4 space-y-2.5 text-xs font-mono">
                <div className="flex justify-between items-center">
                  <span className="text-black/50">COORDINATES:</span>
                  <span className="font-bold text-black">23.02° N / 72.57° E</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black/50">CRUISE ALTITUDE:</span>
                  <span className="font-bold text-emerald-700">FL 350 (35,000 FT)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black/50">MACH SPEED:</span>
                  <span className="font-bold text-[#B45309]">MACH 0.84 (CRUISE)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black/50">STATUS:</span>
                  <span className="font-bold text-black uppercase">AIRBORNE / 100% OK</span>
                </div>
              </div>

              <div className="pt-3 border-t border-black/10 flex items-center justify-between text-[10px] font-mono text-black/50">
                <span>RADAR SWEEP: PASS</span>
                <span className="font-bold text-black">RUNWAY 27R</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* 3. CINEMATIC AEROPLANE ENTRANCE: SQUADRON FORMATION                */}
        {/*    Profile Card + 4 Stat Cards Swooping from Left & Right!         */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div key={`flight-deck-squadron-${flightSequenceKey}`} className="mb-12">

          {/* ─── LEAD FLIGHT: PROFILE BANNER (SWOOPS FROM LEFT-TOP) ─────────── */}
          <motion.div
            initial={{ 
              x: -300, 
              y: -40, 
              rotateZ: -8, 
              opacity: 0,
              scale: 0.92
            }}
            animate={{ 
              x: 0, 
              y: 0, 
              rotateZ: 0, 
              opacity: 1,
              scale: 1
            }}
            transition={{ 
              type: "spring", 
              stiffness: 85, 
              damping: 15, 
              delay: 0.15 
            }}
            className="mb-8 will-change-transform"
          >
            <div className="bg-white border-2 border-black rounded-3xl p-6 md:p-8 shadow-[5px_5px_0px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-transform duration-300 flex flex-col md:flex-row items-center gap-6 justify-between relative overflow-hidden">
              <WingtipBeacon side="port" />
              <WingtipBeacon side="starboard" />

              <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left z-10">
                <div className="relative">
                  <img 
                    src={data.profile.avatar_url} 
                    alt={data.profile.name} 
                    className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border-2 border-black object-cover shadow-xs"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-black text-white p-1 rounded-md border border-white">
                    <Github size={12} />
                  </div>
                </div>
                <div>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                    <h2 className="text-2xl md:text-3xl font-black text-black font-serif">{data.profile.name}</h2>
                    <span className="text-xs font-mono font-bold text-[#B45309] bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200 shadow-2xs">
                      @{GITHUB_USERNAME}
                    </span>
                    <span className="text-[10px] font-mono font-black uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      CALLSIGN: RK-01 • SQUADRON LEAD
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-black/75 font-serif mt-2 max-w-xl leading-relaxed">
                    {data.profile.bio}
                  </p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-3 text-[11px] font-mono text-black/55">
                    <span className="flex items-center gap-1">📍 {data.profile.location || 'India'}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">🏢 {data.profile.company || 'Independent Developer'}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">🌐 Public Open-Source</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8 border-t md:border-t-0 md:border-l border-black/10 pt-4 md:pt-0 md:pl-8 shrink-0 z-10">
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
          </motion.div>

          {/* ─── SQUADRON FORMATION: 4 CARDS ARRIVING FROM LEFT & RIGHT ─────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* CARD 1: REPOSITORIES (SWOOPS FROM LEFT WING) */}
            <motion.div
              initial={{ 
                x: -320, 
                rotateZ: -14, 
                opacity: 0,
                scale: 0.88
              }}
              animate={{ 
                x: 0, 
                rotateZ: 0, 
                opacity: 1,
                scale: 1
              }}
              transition={{ 
                type: "spring", 
                stiffness: 85, 
                damping: 14, 
                delay: 0.28 
              }}
              className="will-change-transform"
            >
              <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-[5px_5px_0px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-transform duration-300 h-full flex flex-col justify-between relative overflow-hidden">
                <WingtipBeacon side="port" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider text-black/50">
                      WING 01 • LEFT
                    </span>
                    <div className="p-2.5 rounded-xl bg-black text-white shadow-2xs">
                      <FolderGit2 size={16} />
                    </div>
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-black font-serif mb-1">
                    {data.profile.public_repos}+
                  </div>
                </div>
                <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-serif text-black/70">
                  <span>Public Repositories</span>
                  <span className="font-mono text-[10px] text-black/40 font-bold">100% AUDITED</span>
                </div>
              </div>
            </motion.div>

            {/* CARD 2: STARS EARNED (SWOOPS FROM RIGHT WING) */}
            <motion.div
              initial={{ 
                x: 320, 
                rotateZ: 14, 
                opacity: 0,
                scale: 0.88
              }}
              animate={{ 
                x: 0, 
                rotateZ: 0, 
                opacity: 1,
                scale: 1
              }}
              transition={{ 
                type: "spring", 
                stiffness: 85, 
                damping: 14, 
                delay: 0.38 
              }}
              className="will-change-transform"
            >
              <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-[5px_5px_0px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-transform duration-300 h-full flex flex-col justify-between relative overflow-hidden">
                <WingtipBeacon side="starboard" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider text-black/50">
                      WING 02 • RIGHT
                    </span>
                    <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-2xs">
                      <Star size={16} />
                    </div>
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-[#B45309] font-serif mb-1">
                    {totalStars || 36}+
                  </div>
                </div>
                <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-serif text-black/70">
                  <span>Community Stargazers</span>
                  <span className="font-mono text-[10px] text-amber-600 font-bold">VERIFIED</span>
                </div>
              </div>
            </motion.div>

            {/* CARD 3: PROJECT FORKS (SWOOPS FROM LEFT WING FLANKER) */}
            <motion.div
              initial={{ 
                x: -320, 
                rotateZ: -12, 
                opacity: 0,
                scale: 0.88
              }}
              animate={{ 
                x: 0, 
                rotateZ: 0, 
                opacity: 1,
                scale: 1
              }}
              transition={{ 
                type: "spring", 
                stiffness: 85, 
                damping: 14, 
                delay: 0.48 
              }}
              className="will-change-transform"
            >
              <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-[5px_5px_0px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-transform duration-300 h-full flex flex-col justify-between relative overflow-hidden">
                <WingtipBeacon side="port" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider text-black/50">
                      WING 03 • LEFT
                    </span>
                    <div className="p-2.5 rounded-xl bg-purple-600 text-white shadow-2xs">
                      <GitFork size={16} />
                    </div>
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-purple-800 font-serif mb-1">
                    {totalForks || 24}+
                  </div>
                </div>
                <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-serif text-black/70">
                  <span>Downstream Forks</span>
                  <span className="font-mono text-[10px] text-purple-700 font-bold">REPLICATED</span>
                </div>
              </div>
            </motion.div>

            {/* CARD 4: LANGUAGES (SWOOPS FROM RIGHT WING FLANKER) */}
            <motion.div
              initial={{ 
                x: 320, 
                rotateZ: 12, 
                opacity: 0,
                scale: 0.88
              }}
              animate={{ 
                x: 0, 
                rotateZ: 0, 
                opacity: 1,
                scale: 1
              }}
              transition={{ 
                type: "spring", 
                stiffness: 85, 
                damping: 14, 
                delay: 0.58 
              }}
              className="will-change-transform"
            >
              <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-[5px_5px_0px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-transform duration-300 h-full flex flex-col justify-between relative overflow-hidden">
                <WingtipBeacon side="starboard" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider text-black/50">
                      WING 04 • RIGHT
                    </span>
                    <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-2xs">
                      <Code size={16} />
                    </div>
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-blue-800 font-serif mb-1">
                    {topLanguages.length} Active
                  </div>
                </div>
                <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-serif text-black/70">
                  <span>Primary Languages</span>
                  <span className="font-mono text-[10px] text-blue-700 font-bold">POLYGLOT</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* 4. SCROLL-REVEALED SECTION: FLIGHT DATA RECORDER & RADAR VELOCITY  */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section id="radar-section" className="mb-20 pt-8 border-t-2 border-black/10">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center">
                <Radar size={16} />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#B45309]">
                  Telemetric Radar
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-black font-serif uppercase tracking-tight">
                  Flight Velocity & Commit Radar
                </h3>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-black/40 uppercase hidden sm:block">
              REVEALED VIA SCROLL
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Radar Sweep Module */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="lg:col-span-5 bg-white border-2 border-black rounded-3xl p-8 shadow-[5px_5px_0px_rgba(0,0,0,0.06)] flex flex-col items-center justify-between text-center relative overflow-hidden"
            >
              <div className="w-full flex items-center justify-between pb-4 border-b border-black/10">
                <span className="text-[10px] font-mono uppercase font-black text-black/40">Radar Station</span>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  SCANNING FREQ 1090 MHz
                </span>
              </div>

              {/* Clean Lightweight SVG Radar (0% Lag) */}
              <div className="relative my-6 w-44 h-44 rounded-full border-2 border-black/20 bg-black/5 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-4 rounded-full border border-black/15 border-dashed" />
                <div className="absolute inset-10 rounded-full border border-black/15" />
                <div className="absolute inset-x-0 top-1/2 h-px bg-black/15" />
                <div className="absolute inset-y-0 left-1/2 w-px bg-black/15" />

                {/* Rotating Sweep Beam */}
                <div 
                  className="absolute inset-0 origin-center animate-spin pointer-events-none"
                  style={{ 
                    animationDuration: '5s',
                    background: 'conic-gradient(from 0deg, rgba(180, 83, 9, 0.4) 0deg, transparent 90deg, transparent 360deg)' 
                  }}
                />

                <span className="w-2.5 h-2.5 rounded-full bg-[#B45309] shadow-sm z-10" />
              </div>

              <div className="w-full pt-4 border-t border-black/10 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xs font-mono text-black/40 font-bold uppercase">Cadence</div>
                  <div className="text-lg font-black font-serif text-black">DAILY</div>
                </div>
                <div>
                  <div className="text-xs font-mono text-black/40 font-bold uppercase">Latency</div>
                  <div className="text-lg font-black font-serif text-[#B45309]">&lt; 40ms</div>
                </div>
                <div>
                  <div className="text-xs font-mono text-black/40 font-bold uppercase">Integrity</div>
                  <div className="text-lg font-black font-serif text-emerald-700">99.8%</div>
                </div>
              </div>
            </motion.div>

            {/* Right Weekly Activity Matrix */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="lg:col-span-7 bg-white border-2 border-black rounded-3xl p-8 shadow-[5px_5px_0px_rgba(0,0,0,0.06)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-black/10 mb-6">
                  <div>
                    <h4 className="text-lg font-black font-serif uppercase text-black">
                      7-Day Velocity Vector
                    </h4>
                    <p className="text-xs font-serif text-black/60">
                      Distribution of repository commits, AST parsing & code deployment pulses
                    </p>
                  </div>
                  <span className="p-2 bg-black/5 rounded-xl border border-black/10 text-black">
                    <Activity size={18} />
                  </span>
                </div>

                {/* 7-Day Velocity Bars with CSS transitions (0% CPU lag) */}
                <div className="grid grid-cols-7 gap-3 sm:gap-4 h-48 items-end pt-4 pb-2 px-2">
                  {[
                    { day: 'MON', value: 85, commits: 12 },
                    { day: 'TUE', value: 92, commits: 14 },
                    { day: 'WED', value: 100, commits: 18 },
                    { day: 'THU', value: 78, commits: 11 },
                    { day: 'FRI', value: 95, commits: 16 },
                    { day: 'SAT', value: 65, commits: 9 },
                    { day: 'SUN', value: 80, commits: 13 },
                  ].map((item) => (
                    <div key={item.day} className="flex flex-col items-center h-full justify-end group">
                      <div className="text-[10px] font-mono font-bold text-black/40 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.commits}
                      </div>
                      <div
                        style={{ height: `${item.value}%` }}
                        className={`w-full rounded-t-xl transition-all duration-300 ${
                          item.value === 100 
                            ? 'bg-[#B45309]' 
                            : 'bg-black/85 group-hover:bg-[#B45309]'
                        }`}
                      />
                      <span className="text-[10px] font-mono font-bold text-black/60 mt-3">
                        {item.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-black/10 mt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-black/60">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  Peak Velocity: Wednesdays @ 22:00 IST
                </span>
                <span className="bg-amber-50 text-[#B45309] px-2.5 py-1 rounded-md border border-amber-200 font-bold">
                  AVG COMMIT VELOCITY: 13.8 / DAY
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* 5. SCROLL-REVEALED SECTION: AVIONICS PROPULSION (STACK DENSITY)    */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section id="avionics-section" className="mb-20 pt-8 border-t-2 border-black/10">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center">
                <Gauge size={16} />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#B45309]">
                  Engine Diagnostics
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-black font-serif uppercase tracking-tight">
                  Avionics Propulsion: Tech Stack
                </h3>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-black/40 uppercase hidden sm:block">
              REVEALED ON SCROLL
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Language Distribution Bars */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="lg:col-span-5 bg-white border-2 border-black rounded-3xl p-8 shadow-[5px_5px_0px_rgba(0,0,0,0.06)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/10">
                  <h4 className="text-lg font-black text-black font-serif uppercase">
                    Language Telemetry Ratio
                  </h4>
                  <span className="text-[10px] font-mono uppercase text-[#B45309] font-bold">Parsed Repos</span>
                </div>

                <div className="space-y-5">
                  {topLanguages.map((lang) => (
                    <div key={lang.name}>
                      <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                        <span className="font-bold text-black flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full shadow-2xs" style={{ backgroundColor: lang.color }} />
                          {lang.name}
                        </span>
                        <span className="text-black/60 font-semibold">{lang.percentage}% ({lang.count} repos)</span>
                      </div>
                      <div className="w-full h-3 bg-black/5 rounded-full overflow-hidden p-0.5 border border-black/10">
                        <div 
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-black/10 mt-8 text-[11px] font-mono text-black/50 leading-relaxed">
                Telemetry parsed dynamically across TypeScript, Python, JavaScript, and systems repositories.
              </div>
            </motion.div>

            {/* Right: Language Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { 
                  name: 'TypeScript', 
                  category: 'Core System Engine', 
                  desc: 'Full-stack architecture, React 18, Node.js concurrency, rigid type soundness.',
                  icon: Code,
                  color: '#3178C6'
                },
                { 
                  name: 'Python', 
                  category: 'AI & Neural Workflows', 
                  desc: 'FastAPI, OCR document extraction, FAISS vector search, Whisper & PyTorch pipelines.',
                  icon: Cpu,
                  color: '#3776AB'
                },
                { 
                  name: 'Solidity / Web3', 
                  category: 'Cryptographic Ledger', 
                  desc: 'Smart contract development, state machines, immutable certification proofs.',
                  icon: ShieldCheck,
                  color: '#AA6746'
                },
                { 
                  name: 'Systems & Shell', 
                  category: 'DevOps & Tooling', 
                  desc: 'Bash automation, CI/CD telemetry runners, hardware acceleration scripts.',
                  icon: Terminal,
                  color: '#89E051'
                }
              ].map((stack, idx) => {
                const StackIcon = stack.icon;
                return (
                  <motion.div
                    key={stack.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                  >
                    <div className="bg-white border-2 border-black rounded-3xl p-6 shadow-[4px_4px_0px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-mono uppercase font-black" style={{ color: stack.color }}>
                            {stack.category}
                          </span>
                          <div className="p-2 rounded-xl text-white shadow-2xs" style={{ backgroundColor: stack.color }}>
                            <StackIcon size={14} />
                          </div>
                        </div>
                        <h5 className="text-xl font-black font-serif text-black mb-1.5">{stack.name}</h5>
                        <p className="text-xs font-serif text-black/65 leading-relaxed">{stack.desc}</p>
                      </div>
                      <div className="pt-4 border-t border-black/10 mt-4 flex items-center justify-between text-[10px] font-mono text-black/40">
                        <span>SYSTEM GRADE</span>
                        <span className="font-bold text-black/70">OPERATIONAL</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* 6. SCROLL-REVEALED SECTION: FEATURED FLEET HANGAR (REPOSITORIES)   */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section id="fleet-section" className="mb-20 pt-8 border-t-2 border-black/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-black/10">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#B45309] flex items-center gap-1.5">
                <Plane size={12} className="rotate-45" />
                The Hangar Fleet
              </span>
              <h3 className="text-2xl md:text-4xl font-black text-black font-serif uppercase tracking-tight">
                Curated Repository Fleet
              </h3>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Fleet' },
                { id: 'ai', label: 'AI & Neural' },
                { id: 'web', label: 'Full-Stack Web' },
                { id: 'systems', label: 'Security & Web3' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-bold transition-colors border ${
                    activeTab === tab.id
                      ? 'bg-black text-white border-black shadow-xs'
                      : 'bg-white text-black/60 border-black/15 hover:border-black hover:text-black'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Repositories Grid: Lightweight, buttery smooth reveals */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map((repo, idx) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: (idx % 3) * 0.08, ease: "easeOut" }}
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border-2 border-black rounded-3xl p-6 shadow-[4px_4px_0px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 hover:shadow-[6px_6px_0px_rgba(0,0,0,0.12)] transition-all flex flex-col justify-between h-full group relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] font-black uppercase text-black/40 tracking-wider">
                      BAY #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1} • {repo.language || 'CORE'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <ExternalLink size={13} className="text-black/35 group-hover:text-black transition-colors" />
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg md:text-xl font-black text-black font-serif group-hover:text-[#B45309] transition-colors mb-2">
                      {repo.name}
                    </h4>
                    <p className="text-xs text-black/70 font-serif leading-relaxed line-clamp-3">
                      {repo.description || "Production system repository engineered by Rachit Kakkad."}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-mono">
                    <span className="flex items-center gap-1.5 text-black/80 font-bold">
                      <span 
                        className="w-2.5 h-2.5 rounded-full" 
                        style={{ backgroundColor: LANGUAGE_COLORS[repo.language || ''] || '#B45309' }} 
                      />
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
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* 7. SCROLL-REVEALED SECTION: LIVE FLIGHT LOG RUNWAY (TIMELINE)      */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section id="flight-log-section" className="mb-20 pt-8 border-t-2 border-black/10">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-mono font-bold text-xs">
                §
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#B45309]">
                  Live Stream Radar
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-black font-serif uppercase tracking-tight">
                  Flight Log & Commit Runway
                </h3>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-black/40 uppercase hidden sm:block">
              {data.events.length} Real-Time Events
            </span>
          </div>

          {/* Runway Strip Timeline */}
          <div className="relative">
            {/* Center Runway Dashed Stripe */}
            <div className="absolute top-0 bottom-0 left-6 md:left-8 w-px border-l-2 border-dashed border-black/20" />

            <div className="space-y-5">
              {data.events.slice(0, 8).map((event, idx) => {
                const info = renderEventDetails(event);
                const EventIcon = info.icon;

                return (
                  <motion.div
                    key={`${event.id}-${idx}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.4, delay: 0.05 * idx, ease: "easeOut" }}
                    className="relative pl-14 md:pl-20"
                  >
                    {/* Waypoint Blip on Runway Line */}
                    <div className="absolute left-4 md:left-6 top-6 transform -translate-x-1/2 w-5 h-5 rounded-full bg-white border-2 border-black flex items-center justify-center shadow-2xs">
                      <div className="w-2 h-2 rounded-full bg-[#B45309]" />
                    </div>

                    <div className="bg-white border-2 border-black rounded-3xl p-5 md:p-6 shadow-[3px_3px_0px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-transform duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-2xs shrink-0 ${info.color}`}>
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

                      <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                        <span className="text-[10px] font-mono text-black/40 font-bold uppercase">WAYPOINT #{idx + 1}</span>
                        <div className="text-xs font-mono text-black/60 font-semibold bg-black/5 px-3 py-1 rounded-full border border-black/10">
                          {info.time}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* 8. SCROLL-REVEALED SECTION: INTERACTIVE TELEMETRY CLI TERMINAL      */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <section id="terminal-section" className="mb-20 pt-8 border-t-2 border-black/10">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-mono">
                <Terminal size={16} />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#B45309]">
                  Cockpit Shell
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-black font-serif uppercase tracking-tight">
                  Interactive Telemetry Dispatcher
                </h3>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-black/40 uppercase hidden sm:block">
              CLICK OR TYPE COMMANDS
            </span>
          </div>

          <div className="bg-[#11100f] border-2 border-black rounded-3xl p-6 md:p-8 text-neutral-200 font-mono shadow-[5px_5px_0px_rgba(0,0,0,0.15)] relative overflow-hidden">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span className="ml-2 text-xs text-neutral-400 font-bold">
                  avionics@rk-flight-deck: ~ (zsh)
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#B45309] font-bold">
                SSH://GITHUB.COM/{GITHUB_USERNAME}
              </span>
            </div>

            {/* Quick Run Buttons */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-[10px] uppercase text-neutral-500 font-bold mr-1">Quick Run:</span>
              {[
                'gh whoami',
                'gh fleet',
                'gh stack',
                'gh telemetry',
                'clear'
              ].map(cmd => (
                <button
                  key={cmd}
                  onClick={() => handleRunCommand(cmd)}
                  className="px-2.5 py-1 rounded-md bg-neutral-800 hover:bg-[#B45309] text-neutral-300 hover:text-white transition-colors text-[11px] font-bold"
                >
                  ${cmd}
                </button>
              ))}
            </div>

            {/* Terminal Output Stream */}
            <div className="space-y-4 max-h-60 overflow-y-auto mb-6 pr-2 scrollbar-thin">
              {terminalLogs.map((log, i) => (
                <div key={i} className="text-xs leading-relaxed">
                  <div className="text-amber-400 font-bold flex items-center gap-1.5">
                    <span className="text-neutral-500">&gt;</span> {log.command}
                  </div>
                  <div className="text-neutral-300 whitespace-pre-wrap mt-1 pl-4 border-l border-neutral-800">
                    {log.output}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Row */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleRunCommand(terminalInput);
              }}
              className="flex items-center gap-3 pt-4 border-t border-neutral-800"
            >
              <span className="text-emerald-400 font-bold text-xs select-none">
                theRkakkad@cockpit:~$
              </span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Type 'help', 'gh fleet', 'gh whoami'..."
                className="flex-1 bg-transparent border-none text-xs text-white focus:outline-hidden font-mono"
              />
              <button
                type="submit"
                className="p-1.5 rounded-md bg-[#B45309] text-white hover:bg-amber-600 transition-colors"
                title="Send command"
              >
                <Send size={12} />
              </button>
            </form>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* 9. SCROLL-REVEALED SECTION: FINAL RUNWAY & DEPARTURE CTA           */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div id="touchdown-section" className="text-center p-12 md:p-16 bg-white border-2 border-black rounded-3xl shadow-[5px_5px_0px_rgba(0,0,0,0.1)] relative overflow-hidden">
          {/* Runway Markings Aesthetic */}
          <div className="flex items-center justify-center gap-2 mb-6 font-mono text-xs font-black tracking-widest text-black/35 select-none">
            <span>||||</span>
            <span>RUNWAY 27R</span>
            <span>||||</span>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center mx-auto mb-6 shadow-xs relative">
            <Github size={34} />
            <Plane size={14} className="absolute -top-1 -right-1 text-[#B45309] rotate-45" />
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-black font-serif uppercase tracking-tight mb-3">
            Inspect Open Source Repositories
          </h2>
          <p className="max-w-xl mx-auto text-sm md:text-base text-black/65 font-serif mb-8 leading-relaxed">
            Review complete production architectures, system documentation, open pull requests, and commit histories directly on GitHub.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-black hover:bg-[#B45309] text-white font-serif uppercase text-xs font-black tracking-widest transition-colors rounded-xl shadow-xs"
            >
              <Github size={16} />
              <span>Visit GitHub Profile (@{GITHUB_USERNAME})</span>
              <ExternalLink size={16} />
            </a>

            <button
              onClick={toggleAutopilot}
              className={`inline-flex items-center gap-2 px-6 py-4 border-2 font-mono uppercase text-xs font-black tracking-wider transition-all rounded-xl shadow-2xs ${
                isAutopilot
                  ? 'bg-red-600 border-red-700 text-white hover:bg-red-700 ring-2 ring-red-400/40'
                  : 'bg-amber-50 hover:bg-amber-100 text-[#B45309] border-[#B45309]'
              }`}
            >
              {isAutopilot ? (
                <>
                  <Radio size={14} className="animate-pulse" />
                  <span>Disengage Autopilot</span>
                </>
              ) : (
                <>
                  <Plane size={14} className="rotate-45" />
                  <span>Re-Fly Squadron & Autopilot Cruise</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 10. FLOATING FLIGHT CONTROLS (BOTTOM RIGHT)                         */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <button
          onClick={toggleAutopilot}
          className={`p-3 border-2 rounded-full shadow-[3px_3px_0px_rgba(0,0,0,0.15)] transition-all ${
            isAutopilot
              ? 'bg-[#B45309] border-black text-white ring-2 ring-[#B45309]/50 animate-bounce'
              : 'bg-white border-black text-black hover:bg-amber-50 hover:text-[#B45309]'
          }`}
          title={isAutopilot ? "Stop Antigravity autopilot" : "Start automated Antigravity tour"}
          aria-label="Autopilot flight control"
        >
          {isAutopilot ? <Radio size={16} className="animate-pulse" /> : <Plane size={16} className="rotate-45" />}
        </button>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-3.5 py-3 bg-black text-white rounded-full shadow-[3px_3px_0px_rgba(0,0,0,0.25)] hover:bg-[#B45309] transition-colors font-mono text-xs font-bold"
          title="Return to top of flight deck"
          aria-label="Return to top"
        >
          <ChevronUp size={16} />
          <span className="hidden sm:inline">FLIGHT DECK</span>
        </button>
      </div>
    </main>
  );
}
