import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import * as THREE from 'three';
import { 
  Trophy, 
  Clock, 
  Zap, 
  Star, 
  Target, 
  TrendingUp, 
  Calendar, 
  Award, 
  CheckCircle2, 
  ArrowLeft, 
  ExternalLink,
  Flame,
  Code2,
  BrainCircuit,
  BarChart3,
  Layers,
  Sparkles,
  RefreshCw,
  XCircle,
  AlertCircle,
  Cpu,
  Binary,
  Compass
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { LeetCode } from '../components/Icons';
import { useNavigate, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';

const LEETCODE_USERNAME = 'kUyAWXHOC5';
const CACHE_KEY = 'leetcode_live_stats_v3';
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

interface RecentSubmission {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
}

interface LeetCodeProfile {
  username: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
  submissionCalendar: Record<string, number>;
  recentSubmissions: RecentSubmission[];
}

const FALLBACK_PROFILE: LeetCodeProfile = {
  username: 'kUyAWXHOC5',
  totalSolved: 274,
  totalQuestions: 4041,
  easySolved: 185,
  totalEasy: 962,
  mediumSolved: 75,
  totalMedium: 2109,
  hardSolved: 14,
  totalHard: 970,
  ranking: 565810,
  contributionPoints: 124,
  reputation: 0,
  submissionCalendar: {
    "1775952000": 42,
    "1777161600": 31,
    "1777334400": 22,
    "1778457600": 20,
    "1786579200": 17,
    "1786924800": 17,
    "1786665600": 11,
    "1780617600": 9,
    "1780963200": 7
  },
  recentSubmissions: [
    { title: "Delete Duplicate Emails", titleSlug: "delete-duplicate-emails", timestamp: "1786962270", statusDisplay: "Accepted", lang: "mysql" },
    { title: "Patients With a Condition", titleSlug: "patients-with-a-condition", timestamp: "1786962216", statusDisplay: "Accepted", lang: "mysql" },
    { title: "List the Products Ordered in a Period", titleSlug: "list-the-products-ordered-in-a-period", timestamp: "1786961974", statusDisplay: "Accepted", lang: "mysql" },
    { title: "Second Highest Salary", titleSlug: "second-highest-salary", timestamp: "1786961693", statusDisplay: "Accepted", lang: "mysql" },
    { title: "Flatten a Multilevel Doubly Linked List", titleSlug: "flatten-a-multilevel-doubly-linked-list", timestamp: "1786960162", statusDisplay: "Accepted", lang: "cpp" },
    { title: "Minimum Increment to Make Array Unique", titleSlug: "minimum-increment-to-make-array-unique", timestamp: "1786959174", statusDisplay: "Accepted", lang: "cpp" },
    { title: "Stone Game IX", titleSlug: "stone-game-ix", timestamp: "1786899932", statusDisplay: "Accepted", lang: "cpp" }
  ]
};

// ─── 3D ALGORITHMIC KINETIC CORE (THREE.JS) ──────────────────────────────────
function Interactive3DAlgorithmicCore() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Central Dodecahedron Core
    const coreGeo = new THREE.DodecahedronGeometry(1.2, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xF59E0B,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Ring 1 (Easy - Green)
    const ring1Geo = new THREE.TorusGeometry(1.6, 0.02, 16, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x16A34A,
      transparent: true,
      opacity: 0.6,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    // Ring 2 (Medium - Amber)
    const ring2Geo = new THREE.TorusGeometry(1.9, 0.02, 16, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xD97706,
      transparent: true,
      opacity: 0.5,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    // Ring 3 (Hard - Red)
    const ring3Geo = new THREE.TorusGeometry(2.2, 0.02, 16, 64);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0xDC2626,
      transparent: true,
      opacity: 0.4,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 6;
    scene.add(ring3);

    // Orbiting particle points
    const particleCount = 45;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 0.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x000000,
      size: 0.04,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse tracking
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

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      coreMesh.rotation.y += 0.005;
      coreMesh.rotation.x += 0.003;
      coreMesh.rotation.y += targetX * 0.02;
      coreMesh.rotation.x -= targetY * 0.02;

      ring1.rotation.z += 0.008;
      ring2.rotation.x += 0.006;
      ring3.rotation.y += 0.007;

      particles.rotation.y += 0.004;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      coreGeo.dispose();
      coreMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
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

export default function LeetCodeStats() {
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState<LeetCodeProfile>(FALLBACK_PROFILE);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async (forceRefresh = false) => {
    if (forceRefresh) setRefreshing(true);
    
    try {
      if (!forceRefresh) {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_DURATION) {
            setProfile(parsed.data);
            setIsLive(true);
            setLoading(false);
            return;
          }
        }
      }

      // Fetch live profile from Alfa LeetCode API
      const res = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${LEETCODE_USERNAME}`);
      if (!res.ok) throw new Error('Failed to fetch LeetCode user profile');
      
      const data = await res.json();
      
      const liveProfile: LeetCodeProfile = {
        username: LEETCODE_USERNAME,
        totalSolved: data.totalSolved || data.solvedProblem || 274,
        totalQuestions: data.totalQuestions || 4041,
        easySolved: data.easySolved || 185,
        totalEasy: data.totalEasy || 962,
        mediumSolved: data.mediumSolved || 75,
        totalMedium: data.totalMedium || 2109,
        hardSolved: data.hardSolved || 14,
        totalHard: data.totalHard || 970,
        ranking: data.ranking || 565810,
        contributionPoints: data.contributionPoint || 124,
        reputation: data.reputation || 0,
        submissionCalendar: data.submissionCalendar || FALLBACK_PROFILE.submissionCalendar,
        recentSubmissions: data.recentSubmissions && data.recentSubmissions.length > 0 
          ? data.recentSubmissions 
          : FALLBACK_PROFILE.recentSubmissions
      };

      localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        data: liveProfile
      }));

      setProfile(liveProfile);
      setIsLive(true);
    } catch (error) {
      console.warn('Error fetching live LeetCode stats, using local cache / fallback:', error);
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setProfile(parsed.data);
          setIsLive(true);
        } catch {
          setProfile(FALLBACK_PROFILE);
          setIsLive(false);
        }
      } else {
        setProfile(FALLBACK_PROFILE);
        setIsLive(false);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleReturn = () => {
    window.dispatchEvent(new CustomEvent('trigger-transition', { 
      detail: { name: 'Returning Home', target: 'home' } 
    }));
    const scrollTo = (location.state as any)?.fromSection || 'home';
    setTimeout(() => navigate('/', { state: { skipIntro: true, scrollTo } }), 400);
  };

  const timeAgo = (timestampStr: string) => {
    const ts = parseInt(timestampStr, 10);
    if (isNaN(ts)) return 'recently';
    const seconds = Math.floor(Date.now() / 1000 - ts);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'yesterday';
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    return `${months}mo ago`;
  };

  const totalSubmissionsInCalendar = Object.values(profile.submissionCalendar || {}).reduce((a, b) => a + b, 0);
  const activeDaysCount = Object.keys(profile.submissionCalendar || {}).length;

  return (
    <main className="min-h-screen bg-[#F6F3EE] text-[#1C1C1C] selection:bg-[#B45309] selection:text-white pb-32 overflow-x-hidden relative">
      <Helmet>
        <title>LeetCode Problem Solving Record | Rachit Kakkad</title>
        <meta name="description" content="Live LeetCode algorithm practice record of Rachit Kakkad. Solved 274+ DSA and SQL problems in C++ and MySQL." />
        <link rel="canonical" href="https://rachit-hk-portfolio.vercel.app/leetcode-stats" />
      </Helmet>
      <SEO title="LeetCode Problem Solving Record | Rachit Kakkad" />

      {/* Subtle Background Watermark Typography */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden opacity-[0.02]">
        <span className="text-[26vw] font-black text-black select-none tracking-tighter uppercase font-serif">
          LEETCODE
        </span>
      </div>

      {/* Sticky Editorial Header */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-5 flex items-center justify-between bg-[#F6F3EE]/90 backdrop-blur-xl border-b border-black/10 transition-all shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-[#FFA116]/20 border border-[#FFA116]/40 flex items-center justify-center text-[#B45309] shadow-sm">
            <LeetCode size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#B45309] font-serif">Algorithmic Ledger</span>
            <span className="text-sm md:text-base font-black uppercase tracking-tight text-black">LeetCode Analytics</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchStats(true)}
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

        {/* Newspaper / Editorial Title Banner with Interactive 3D Algorithmic Core */}
        <div className="w-full mb-12 border-b-4 border-black pb-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-black/5 border border-black/10 rounded-full">
                <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-600 animate-pulse' : 'bg-amber-600'}`} />
                <span className="text-[10px] font-black uppercase tracking-widest text-black/70 font-mono">
                  {isLive ? 'Live Sync Active' : 'Cached Feed'} • @{profile.username}
                </span>
              </div>

              <a
                href={`https://leetcode.com/u/${LEETCODE_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B45309] hover:text-black transition-colors"
              >
                <span>View Official Profile</span>
                <ExternalLink size={13} />
              </a>
            </div>

            <h1 className="text-[clamp(2.8rem,7.5vw,84px)] font-black tracking-tight leading-[0.88] text-black uppercase font-serif">
              Algorithmic <span className="text-[#B45309]">Discipline</span>
            </h1>
            <p className="mt-4 max-w-2xl font-serif italic text-sm md:text-base text-black/70 leading-relaxed">
              Real-time telemetry of problem-solving velocity, algorithmic complexity distribution, data structures mastery, and competitive programming streaks.
            </p>
          </div>

          {/* Interactive 3D Algorithmic Core Widget */}
          <div className="lg:col-span-4 flex items-center justify-center relative">
            <div className="relative w-full aspect-square max-w-[280px] bg-white/60 border border-black/10 rounded-3xl p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute top-3 left-4 text-[9px] font-mono font-bold uppercase tracking-widest text-black/40">
                3D Algorithmic Core
              </div>
              <Interactive3DAlgorithmicCore />
              <div className="absolute bottom-3 text-[9px] font-mono text-black/40 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                Kinetic Multi-Tier Matrix
              </div>
            </div>
          </div>
        </div>

        {/* Top Bento Row: Grand Total Hero Card + 3D Difficulty Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          {/* Main Card: Grand Total Solved with 3D Tilt */}
          <Tilt3DCard className="lg:col-span-5 h-full">
            <div className="bg-white/95 border-2 border-black rounded-3xl p-8 md:p-10 shadow-[6px_6px_0px_rgba(0,0,0,0.1)] flex flex-col justify-between h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#FFA116]/10 rounded-bl-[100px] pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-black uppercase tracking-[0.25em] text-black/40 font-mono">Total Solved</span>
                  <div className="px-3 py-1 bg-[#FFA116]/20 border border-[#FFA116]/40 rounded-full text-[#B45309] font-black text-[10px] uppercase tracking-wider">
                    Top {(profile.ranking ? (profile.ranking / 4000000) * 100 : 14.1).toFixed(1)}% Global
                  </div>
                </div>

                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-7xl md:text-8xl font-black tracking-tighter text-black font-serif">
                    {profile.totalSolved}
                  </span>
                  <span className="text-xl md:text-2xl font-serif italic text-black/30">
                    / {profile.totalQuestions}
                  </span>
                </div>

                <p className="text-xs md:text-sm text-black/60 font-serif leading-relaxed mb-6">
                  Active problem solver practicing dynamic programming, graph theory, trees, binary search, and optimized SQL schema queries.
                </p>
              </div>

              <div className="pt-6 border-t border-black/10 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-black/40 font-mono mb-1">Global Ranking</div>
                  <div className="text-xl font-black text-black font-serif">
                    #{profile.ranking ? profile.ranking.toLocaleString() : '565,810'}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-black/40 font-mono mb-1">Contribution</div>
                  <div className="text-xl font-black text-[#B45309] font-serif">
                    {profile.contributionPoints} pts
                  </div>
                </div>
              </div>
            </div>
          </Tilt3DCard>

          {/* Difficulty Breakdown (3 Stacked 3D Tilt Cards) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* EASY */}
            <Tilt3DCard>
              <div className="bg-white/90 border border-black/15 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:border-green-600 hover:shadow-md transition-all h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-green-100 text-green-800 border border-green-200">
                      Easy
                    </span>
                    <span className="text-xs font-mono text-black/40">{Math.round((profile.easySolved / profile.totalSolved) * 100)}%</span>
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-green-700 font-serif mb-1">
                    {profile.easySolved}
                  </div>
                  <div className="text-[11px] font-mono text-black/40 mb-6">of {profile.totalEasy} questions</div>
                </div>
                <div>
                  <div className="w-full h-2.5 bg-black/5 rounded-full overflow-hidden mb-2 p-0.5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(profile.easySolved / profile.totalEasy) * 100}%` }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full bg-green-600 rounded-full shadow-xs"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-black/50 uppercase tracking-widest">Fundamentals & Logic</span>
                </div>
              </div>
            </Tilt3DCard>

            {/* MEDIUM */}
            <Tilt3DCard>
              <div className="bg-white/90 border border-black/15 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:border-amber-600 hover:shadow-md transition-all h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
                      Medium
                    </span>
                    <span className="text-xs font-mono text-black/40">{Math.round((profile.mediumSolved / profile.totalSolved) * 100)}%</span>
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-amber-700 font-serif mb-1">
                    {profile.mediumSolved}
                  </div>
                  <div className="text-[11px] font-mono text-black/40 mb-6">of {profile.totalMedium} questions</div>
                </div>
                <div>
                  <div className="w-full h-2.5 bg-black/5 rounded-full overflow-hidden mb-2 p-0.5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(profile.mediumSolved / profile.totalMedium) * 100}%` }}
                      transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
                      className="h-full bg-amber-500 rounded-full shadow-xs"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-black/50 uppercase tracking-widest">Optimization & DSA</span>
                </div>
              </div>
            </Tilt3DCard>

            {/* HARD */}
            <Tilt3DCard>
              <div className="bg-white/90 border border-black/15 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:border-red-600 hover:shadow-md transition-all h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-100 text-red-800 border border-red-200">
                      Hard
                    </span>
                    <span className="text-xs font-mono text-black/40">{Math.round((profile.hardSolved / profile.totalSolved) * 100)}%</span>
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-red-700 font-serif mb-1">
                    {profile.hardSolved}
                  </div>
                  <div className="text-[11px] font-mono text-black/40 mb-6">of {profile.totalHard} questions</div>
                </div>
                <div>
                  <div className="w-full h-2.5 bg-black/5 rounded-full overflow-hidden mb-2 p-0.5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(profile.hardSolved / profile.totalHard) * 100}%` }}
                      transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                      className="h-full bg-red-600 rounded-full shadow-xs"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-black/50 uppercase tracking-widest">Complex Paradigms</span>
                </div>
              </div>
            </Tilt3DCard>

          </div>
        </div>

        {/* Middle Row: Badges & Activity Summary with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          
          <Tilt3DCard>
            <div className="bg-white/90 border border-black/10 rounded-3xl p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-all h-full">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0 shadow-xs">
                <Award size={32} />
              </div>
              <div>
                <span className="text-[9px] font-black uppercase tracking-widest text-[#B45309] font-mono">Official Badge</span>
                <h3 className="text-lg font-black text-black font-serif">50 Days Badge 2026</h3>
                <p className="text-xs text-black/50 font-serif">Awarded for consistent daily algorithm resolution</p>
              </div>
            </div>
          </Tilt3DCard>

          <Tilt3DCard>
            <div className="bg-white/90 border border-black/10 rounded-3xl p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-all h-full">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0 shadow-xs">
                <Code2 size={32} />
              </div>
              <div>
                <span className="text-[9px] font-black uppercase tracking-widest text-blue-700 font-mono">Specialized Track</span>
                <h3 className="text-lg font-black text-black font-serif">Intro to Pandas</h3>
                <p className="text-xs text-black/50 font-serif">Certified data manipulation & frame analysis</p>
              </div>
            </div>
          </Tilt3DCard>

          <Tilt3DCard>
            <div className="bg-white/90 border border-black/10 rounded-3xl p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-all h-full">
              <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center text-green-700 shrink-0 shadow-xs">
                <Flame size={32} />
              </div>
              <div>
                <span className="text-[9px] font-black uppercase tracking-widest text-green-700 font-mono">Practice Volume</span>
                <h3 className="text-lg font-black text-black font-serif">{totalSubmissionsInCalendar || 511} Submissions</h3>
                <p className="text-xs text-black/50 font-serif">Recorded across {activeDaysCount} active solve days</p>
              </div>
            </div>
          </Tilt3DCard>

        </div>

        {/* Section: Live Recent Submissions Log */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8 border-b-2 border-black/10 pb-4">
            <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center text-xs font-black font-mono shadow-sm">
              §
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-black font-serif uppercase tracking-tight">
              Live Recent <span className="text-[#B45309]">Submissions</span>
            </h2>
            <div className="flex-1 h-px bg-black/10" />
            <span className="text-xs font-mono font-bold text-black/40 uppercase hidden sm:block">
              {profile.recentSubmissions.length} Logged Entries
            </span>
          </div>

          <div className="bg-white/95 border border-black/15 rounded-3xl overflow-hidden shadow-sm">
            <div className="divide-y divide-black/5">
              {profile.recentSubmissions.map((sub, idx) => {
                const isAccepted = sub.statusDisplay === 'Accepted';
                return (
                  <div
                    key={`${sub.titleSlug}-${idx}`}
                    className="p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-black/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border shadow-xs ${isAccepted ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                        {isAccepted ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                      </div>
                      <div>
                        <a
                          href={`https://leetcode.com/problems/${sub.titleSlug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base md:text-lg font-black text-black hover:text-[#B45309] transition-colors font-serif flex items-center gap-2 group"
                        >
                          <span>{sub.title}</span>
                          <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <div className="flex items-center gap-3 mt-1 text-xs font-mono text-black/50">
                          <span className="uppercase font-bold text-[#B45309] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">{sub.lang}</span>
                          <span>•</span>
                          <span>{timeAgo(sub.timestamp)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${isAccepted ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
                        {sub.statusDisplay}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section: Topics & Core Strengths */}
        <div className="bg-white/90 border border-black/15 rounded-3xl p-8 md:p-10 mb-16 shadow-sm">
          <h3 className="text-2xl font-black text-black font-serif uppercase tracking-tight mb-6">
            Domain Focus & Problem Patterns
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Arrays & Hashing', count: '60+ Solved' },
              { name: 'Two Pointers', count: '25+ Solved' },
              { name: 'Binary Search', count: '20+ Solved' },
              { name: 'Dynamic Programming', count: '18+ Solved' },
              { name: 'Trees & Graphs', count: '22+ Solved' },
              { name: 'SQL & Database', count: '45+ Solved' }
            ].map(topic => (
              <div key={topic.name} className="p-4 rounded-2xl bg-[#F6F3EE] border border-black/10 hover:border-[#B45309] transition-all">
                <div className="text-xs font-black text-black font-serif">{topic.name}</div>
                <div className="text-[10px] font-mono text-[#B45309] font-bold mt-1">{topic.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="text-center p-12 md:p-16 bg-white/95 border-2 border-black rounded-3xl shadow-[6px_6px_0px_rgba(0,0,0,0.1)] relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-[#FFA116]/20 border border-[#FFA116]/40 flex items-center justify-center text-[#B45309] mx-auto mb-6 shadow-md">
            <LeetCode size={36} />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-black font-serif uppercase tracking-tight mb-3">
            Inspect Complete Submissions on LeetCode
          </h2>
          <p className="max-w-xl mx-auto text-sm md:text-base text-black/60 font-serif mb-8 leading-relaxed">
            Access complete contest history, individual code submissions in C++ and MySQL, and continuous streak logs directly on LeetCode.
          </p>
          <a
            href={`https://leetcode.com/u/${LEETCODE_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#B45309] hover:bg-black text-white font-serif uppercase text-xs font-black tracking-widest transition-all rounded-xl shadow-md hover:scale-105"
          >
            <span>Open LeetCode Profile (@{profile.username})</span>
            <ExternalLink size={16} />
          </a>
        </div>

      </div>
    </main>
  );
}
