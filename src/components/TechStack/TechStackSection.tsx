import React from 'react';
import { TECH_ITEMS } from './techStackData';
import { OrbitBackground } from './OrbitBackground';
import { CategoryLayout } from './CategoryLayout';
import { SkillBubble } from './SkillBubble';
import { useTechStackAnimation } from './useTechStackAnimation';

export default function TechStackSection() {
  const {
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
  } = useTechStackAnimation();

  return (
    <section
      ref={sectionRef}
      id="skills-orbit-section"
      className="relative w-full h-screen bg-[#F6F3EE] overflow-hidden select-none"
      aria-label="Technical Ecosystem & Architecture"
    >
      {/* Viewport Center Anchor Container */}
      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center overflow-hidden"
      >
        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#B45309]/[0.03] to-transparent pointer-events-none filter blur-3xl"
          aria-hidden="true"
        />

        {/* 1. Subtle Orbital Boundary, Coordinates & Center Watermark */}
        <OrbitBackground
          ref={orbitBgRef}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
        />

        {/* 2. Structured Editorial Category Layout & Slot Targets */}
        <CategoryLayout ref={categoryLayoutRef} />

        {/* 3. The 26 Real Skill Bubbles (Unified DOM Nodes Traveling Between States) */}
        <div
          className="absolute inset-0 pointer-events-none z-30"
          style={{ willChange: 'transform' }}
        >
          {TECH_ITEMS.map((item) => (
            <div
              key={item.id}
              ref={(el) => setBubbleRef(item.id, el)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
              style={{
                willChange: 'transform, opacity',
              }}
            >
              <SkillBubble
                item={item}
                isSettled={isSettled}
                isHovered={hoveredSkillId === item.id}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
