import React, { memo } from 'react';
import { TechItem } from './techStackData';

interface SkillBubbleProps {
  item: TechItem;
  isSettled: boolean;
  isHovered: boolean;
  onHoverStart: (id: string) => void;
  onHoverEnd: () => void;
}

export const SkillBubble = memo(function SkillBubble({
  item,
  isSettled,
  isHovered,
  onHoverStart,
  onHoverEnd,
}: SkillBubbleProps) {
  const Icon = item.icon;

  return (
    <div
      onMouseEnter={() => onHoverStart(item.id)}
      onMouseLeave={onHoverEnd}
      onTouchStart={() => onHoverStart(item.id)}
      onTouchEnd={onHoverEnd}
      className={`group relative select-none cursor-pointer flex items-center justify-between w-[146px] sm:w-[168px] h-[38px] sm:h-[42px] px-2.5 sm:px-3 rounded-full transition-all duration-300 ${
        isHovered
          ? 'scale-105 z-50 bg-[#1A1816] text-[#F6F3EE] shadow-[0_16px_36px_rgba(0,0,0,0.28)]'
          : isSettled
          ? 'bg-white/95 text-[#1A1816] border border-black/[0.09] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-black/30'
          : 'bg-white/90 backdrop-blur-md text-[#1A1816] border border-black/[0.09] shadow-[0_4px_16px_rgba(0,0,0,0.06)]'
      }`}
      style={{
        willChange: 'transform, opacity',
        borderColor: isHovered ? item.accentColor : undefined,
      }}
    >
      {/* Left cluster: Official Brand Logo Stage + Tech Name */}
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <span
          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
            isHovered
              ? 'bg-white/10 scale-105'
              : 'bg-black/[0.03] group-hover:bg-black/[0.06]'
          }`}
        >
          <Icon size={18} className="sm:hidden" />
          <Icon size={20} className="hidden sm:block" />
        </span>

        <span className="font-mono font-bold text-[11px] sm:text-[12px] tracking-tight truncate">
          {item.name}
        </span>
      </div>

      {/* Right cluster: Harmonic State Indicator Dot */}
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0 ml-1.5 transition-colors duration-300"
        style={{
          backgroundColor: isHovered
            ? item.accentColor
            : isSettled
            ? 'rgba(0,0,0,0.25)'
            : item.accentColor,
        }}
      />

      {/* Floating Tooltip with Category & Tagline */}
      {isHovered && (
        <div className="absolute -top-11 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#1A1816] text-[#F6F3EE] text-[9.5px] font-mono tracking-wider uppercase rounded-xl shadow-2xl whitespace-nowrap pointer-events-none z-[100] border border-white/15 flex items-center gap-2 animate-in fade-in zoom-in-95 duration-150">
          <span className="text-[#B45309] font-bold">{item.categoryIndex}</span>
          <span className="text-white/40">/</span>
          <span className="font-semibold text-white/95">{item.tagline}</span>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1A1816] rotate-45 border-r border-b border-white/15" />
        </div>
      )}
    </div>
  );
});
