import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TECH_ITEMS } from './techStackData';

gsap.registerPlugin(ScrollTrigger);

// Easing helper: smoothstep
function smoothStep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function useTechStackAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitBgRef = useRef<HTMLDivElement>(null);
  const categoryLayoutRef = useRef<HTMLDivElement>(null);
  const bubbleRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const targetSlotsRef = useRef<Map<string, { x: number; y: number }>>(new Map());

  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  const [isSettled, setIsSettled] = useState(false);
  const wasSettledRef = useRef(false);

  // Concentric ring radii
  const [innerRadius, setInnerRadius] = useState(230);
  const [outerRadius, setOuterRadius] = useState(365);

  // Smooth progress dampening refs (Zero React re-render pipeline)
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const orbitTimeRef = useRef(0);
  const isReducedMotionRef = useRef(false);

  // Register bubble ref
  const setBubbleRef = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) {
      bubbleRefs.current.set(id, el);
    } else {
      bubbleRefs.current.delete(id);
    }
  }, []);

  // Measure target slot coordinates from real rendered DOM elements
  const measureTargetSlots = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;

    const slots = containerRef.current.querySelectorAll<HTMLElement>('[data-slot-id]');
    slots.forEach((slot) => {
      const id = slot.getAttribute('data-slot-id');
      if (!id) return;
      const slotRect = slot.getBoundingClientRect();
      const slotCenterX = slotRect.left + slotRect.width / 2;
      const slotCenterY = slotRect.top + slotRect.height / 2;

      targetSlotsRef.current.set(id, {
        x: slotCenterX - centerX,
        y: slotCenterY - centerY,
      });
    });
  }, []);

  // Update concentric radii based on viewport width
  const updateRadii = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) {
      setInnerRadius(115);
      setOuterRadius(180);
    } else if (width < 1024) {
      setInnerRadius(175);
      setOuterRadius(280);
    } else {
      setInnerRadius(230);
      setOuterRadius(365);
    }
  }, []);

  useEffect(() => {
    isReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    updateRadii();
    measureTargetSlots();

    // Debounced resize handler
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateRadii();
        measureTargetSlots();
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    // If reduced motion is requested, snap straight to settled category state
    if (isReducedMotionRef.current) {
      if (orbitBgRef.current) {
        orbitBgRef.current.style.opacity = '0';
        orbitBgRef.current.style.visibility = 'hidden';
      }
      if (categoryLayoutRef.current) {
        categoryLayoutRef.current.style.opacity = '1';
        categoryLayoutRef.current.style.visibility = 'visible';
      }
      setIsSettled(true);
      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimer);
      };
    }

    // GSAP ScrollTrigger for pinned scroll distance with buttery scrub
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 1.0,
        anticipatePin: 1,
        onUpdate: (self) => {
          targetProgressRef.current = self.progress;
        },
      });
    }, sectionRef);

    // RAF Animation Loop for ultra-smooth 60-120fps progress interpolation
    let lastTime = performance.now();
    let animId: number;

    const renderLoop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // ─── Liquid Spring Progress Smoothing (Butter-Smooth Scroll) ────────
      const targetP = targetProgressRef.current;
      // Exponential smoothing ensures zero micro-stutters or abrupt jumps
      currentProgressRef.current += (targetP - currentProgressRef.current) * 0.10;
      const p = currentProgressRef.current;

      // Calculate organization progress t (0 = pure orbit, 1 = settled categories)
      let t = 0;
      if (p < 0.15) {
        t = 0;
      } else if (p <= 0.50) {
        t = smoothStep(0.15, 0.50, p);
      } else if (p <= 0.80) {
        t = 1;
      } else {
        t = 1 - smoothStep(0.80, 1.00, p);
      }

      // Update Opacities directly via DOM elements without React state re-renders
      const orbitOp = Math.max(0, Math.min(1, 1 - t * 1.3));
      const catOp = Math.max(0, Math.min(1, (t - 0.12) / 0.88));

      if (orbitBgRef.current) {
        orbitBgRef.current.style.opacity = `${orbitOp}`;
        orbitBgRef.current.style.visibility = orbitOp <= 0.01 ? 'hidden' : 'visible';
      }

      if (categoryLayoutRef.current) {
        categoryLayoutRef.current.style.opacity = `${catOp}`;
        categoryLayoutRef.current.style.visibility = catOp <= 0.01 ? 'hidden' : 'visible';
      }

      // Trigger settled state boolean only when crossing threshold
      const settled = t > 0.94;
      if (settled !== wasSettledRef.current) {
        wasSettledRef.current = settled;
        setIsSettled(settled);
      }

      // Orbital continuous rotation clock decelerates smoothly when assembling
      const rotationSpeed = (1 - t * 0.96) * 0.12;
      orbitTimeRef.current += dt * rotationSpeed;

      const width = window.innerWidth;
      const curInner = width < 640 ? 115 : width < 1024 ? 175 : 230;
      const curOuter = width < 640 ? 180 : width < 1024 ? 280 : 365;

      // Update positions of all 24 bubbles directly via GPU transform
      TECH_ITEMS.forEach((item, index) => {
        const el = bubbleRefs.current.get(item.id);
        if (!el) return;

        const isOuter = item.orbitTrack === 1;
        const r = isOuter ? curOuter : curInner;

        // Outer ring rotates clockwise (+), Inner ring counter-clockwise (-) for cosmic harmony
        const speed = isOuter ? 0.12 : -0.15;
        const angle = item.orbitAngle + orbitTimeRef.current * speed;

        // 1. Orbital position
        const orbitX = Math.cos(angle) * r;
        const orbitY = Math.sin(angle) * r;

        // 2. Measured target slot position
        const target = targetSlotsRef.current.get(item.id) || { x: 0, y: 0 };

        // 3. Aerodynamic curved bezier trajectory
        const dx = target.x - orbitX;
        const dy = target.y - orbitY;
        const curveFactor = Math.sin(Math.PI * t) * 0.28;
        const dir = index % 2 === 0 ? 1 : -1;
        const perpX = -dy * curveFactor * dir;
        const perpY = dx * curveFactor * dir;

        const currentX = (1 - t) * orbitX + t * target.x + perpX;
        const currentY = (1 - t) * orbitY + t * target.y + perpY;

        // Subtle scale and rotation interpolation
        const orbitScale = isOuter ? 0.98 : 0.92;
        const currentScale = (1 - t) * orbitScale + t * 1.0;

        const orbitRot = Math.sin(angle) * 2.0;
        const currentRot = (1 - t) * orbitRot;

        const currentBubbleOp = (1 - t) * 0.94 + t * 1.0;

        el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotate(${currentRot}deg) scale(${currentScale})`;
        el.style.opacity = `${currentBubbleOp}`;
      });

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
      ctx.revert();
    };
  }, [measureTargetSlots, updateRadii]);

  const handleHoverStart = useCallback((id: string) => {
    setHoveredSkillId(id);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredSkillId(null);
  }, []);

  return {
    sectionRef,
    containerRef,
    orbitBgRef,
    categoryLayoutRef,
    setBubbleRef,
    innerRadius,
    outerRadius,
    isSettled,
    hoveredSkillId,
    handleHoverStart,
    handleHoverEnd,
  };
}
