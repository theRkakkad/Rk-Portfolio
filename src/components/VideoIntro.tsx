import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface VideoIntroProps {
  onComplete: () => void;
}

const CLOUDINARY_OPTIMIZED_URL =
  'https://res.cloudinary.com/dr84lv5ym/video/upload/q_auto,vc_h264,w_1920/v1788195156/RK_SIGN_x5ppbu.mp4';

/**
 * VIDEO INTRO – Ultra-smooth, hardware-accelerated signature intro.
 * Auto-advances when the video ends; click, tap, or keypress to skip.
 */
export default function VideoIntro({ onComplete }: VideoIntroProps) {
  const [isSkipped, setIsSkipped] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleSkip = useCallback(() => {
    if (isSkipped) return;
    setIsSkipped(true);
    onComplete();
  }, [isSkipped, onComplete]);

  /* Skip on Escape / Enter / Space */
  useEffect(() => {
    if (isSkipped) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isSkipped, handleSkip]);

  /* Fallback: if video takes too long, auto-advance */
  useEffect(() => {
    if (isSkipped) return;
    const fallback = setTimeout(handleSkip, 8000);
    return () => clearTimeout(fallback);
  }, [isSkipped, handleSkip]);

  if (isSkipped) return null;

  return (
    <motion.div
      onClick={handleSkip}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[10000] bg-[#111111] overflow-hidden flex items-center justify-center cursor-pointer select-none"
    >
      {/* Responsive fullscreen video with hardware acceleration */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onCanPlay={() => setIsReady(true)}
        onEnded={handleSkip}
        onError={handleSkip}
        className={`intro-video ${isReady ? 'opacity-100' : 'opacity-0'}`}
      >
        <source src={CLOUDINARY_OPTIMIZED_URL} type="video/mp4" />
        <source src="/intro.mp4" type="video/mp4" />
      </video>

      {/* "Skip" hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="absolute bottom-6 sm:bottom-8 md:bottom-10 text-white text-[10px] sm:text-[11px] tracking-[0.5em] font-medium uppercase pointer-events-none z-10"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        Click or press any key to skip
      </motion.div>

      <style>{`
        .intro-video {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
          -webkit-transform: translate3d(-50%, -50%, 0);
          min-width: 100%;
          min-height: 100%;
          width: auto;
          height: auto;
          object-fit: cover;
          will-change: transform, opacity;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transition: opacity 0.3s ease;
        }

        /* On very small screens make sure the video still fills */
        @media (max-width: 480px) {
          .intro-video {
            width: 100vw;
            height: 100vh;
            object-fit: cover;
          }
        }

        /* Landscape phones / tablets */
        @media (max-aspect-ratio: 1/1) {
          .intro-video {
            width: auto;
            height: 100vh;
          }
        }

        @media (min-aspect-ratio: 1/1) {
          .intro-video {
            width: 100vw;
            height: auto;
          }
        }
      `}</style>
    </motion.div>
  );
}


