import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

/**
 * Authentic, High-Definition Official Brand Logos (Optimized for 20px-24px display)
 * All vectors centered in 1:1 proportional viewBoxes with authentic brand colors.
 */

// 1. React — Official Cyan Atom
export const ReactIcon = ({ size = 22, className = '', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="-11.5 -10.23 23 20.46" fill="none" className={className} {...props}>
    <circle cx="0" cy="0" r="2.2" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1.2" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

// 2. Next.js — Official Dark Emblem with Gradient Cutout N
export const NextIcon = ({ size = 22, className = '', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 180 180" fill="none" className={className} {...props}>
    <circle cx="90" cy="90" r="90" fill="#000000" />
    <path d="M149.508 157.086L69.8516 54H54V125.97H66.8125V69.9844L139.999 164.845C143.333 162.457 146.516 159.857 149.508 157.086Z" fill="url(#next_paint0_hd)" />
    <rect x="115" y="54" width="12" height="72" fill="url(#next_paint1_hd)" />
    <defs>
      <linearGradient id="next_paint0_hd" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="next_paint1_hd" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

// 3. TypeScript — Official Blue Squircle with Bold White TS
export const TypeScriptIcon = ({ size = 22, className = '', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className} {...props}>
    <rect width="128" height="128" rx="24" fill="#3178C6" />
    <path d="M68.5 78.5C68.5 86.8 74.4 92 84.1 92C91.6 92 97.4 88.5 100 84.4L91.8 79.4C90.2 82 87.2 83.8 83.8 83.8C80.2 83.8 77.8 81.9 77.8 78.4C77.8 69.8 100.5 73.6 100.5 56.4C100.5 44.5 91.2 38 80.6 38C70.6 38 63.3 43.5 60.4 50.8L68.6 55.4C70.4 51.5 74.5 46.5 80.2 46.5C85.4 46.5 89.9 49.3 89.9 54.4C89.9 63.1 68.5 60 68.5 78.5ZM24.5 46.8H40.2V90.8H49.8V46.8H65.5V39H24.5V46.8Z" fill="#FFFFFF" />
  </svg>
);

// 4. Tailwind CSS — Official Cyan Wave centered
export const TailwindIcon = ({ size = 22, className = '', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} {...props}>
    <g transform="translate(5, 16)">
      <path fillRule="evenodd" clipRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" fill="#38BDF8" />
    </g>
  </svg>
);

// 5. Node.js — Official Hexagonal Green Icon
export const NodeIcon = ({ size = 22, className = '', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 256 289" className={className} {...props}>
    <path fill="#5FA04E" d="M128 0L256 72.3v144.3L128 289 0 216.6V72.3L128 0z" />
    <path fill="#FFFFFF" d="M128 22.3L17.7 84.8v119.4L128 266.7l110.3-62.5V84.8L128 22.3zm0 214.5l-82.6-46.8V99.5L128 52.7l82.6 46.8v90.5L128 236.8z" opacity="0.2" />
    <path fill="#FFFFFF" d="M141.2 110.6c-1.3-.8-3.4-.8-4.7 0l-42 24.3c-2.4 1.4-3.7 3.9-3.7 6.6v48.6c0 1.5 1.1 2.3 2.4 1.6l10.9-6.3c.7-.4 1.1-1.1 1.1-1.9v-42.8c0-.9.6-1.9 1.4-2.4l32.5-18.8c.8-.5 1.9-.5 2.7 0l32.5 18.8c.8.5 1.4 1.5 1.4 2.4v37.6c0 .9-.6 1.9-1.4 2.4l-32.5 18.8c-.8.5-1.9.5-2.7 0l-10.9-6.3c-.7-.4-1.8-.4-2.5 0l-8.4 4.8c-.7.4-1.1 1.1-1.1 1.9 0 .8.4 1.5 1.1 1.9l20.4 11.8c2.4 1.4 5.7 1.4 8.1 0l34.8-20.1c2.4-1.4 3.9-3.9 3.9-6.6V139c0-2.8-1.5-5.3-3.9-6.6l-38.9-21.8z" />
  </svg>
);

// 6. Python — Official Dual-Snake Emblem (Blue & Yellow)
export const PythonIcon = ({ size = 22, className = '', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 110 110" className={className} {...props}>
    <path fill="#3776AB" d="M54.8 2C42.8 2 35.3 7.3 35.3 17.5v9.8h35.8v3.3H24.5C12.5 30.6 2 38.3 2 54.4c0 15.6 9.8 23.4 22.5 23.4h7.5v-10.7c0-12.7 10.7-22.6 23.4-22.6h35.8c9.8 0 17.5-8.1 17.5-17.5V17.5C108.7 7.3 100.8 2 89.2 2H54.8zm-11 9.8c3.6 0 6.6 3 6.6 6.6s-3 6.6-6.6 6.6-6.6-3-6.6-6.6 3-6.6 6.6-6.6z" />
    <path fill="#FFD43B" d="M55.2 108c12 0 19.5-5.3 19.5-15.5v-9.8H38.9v-3.3h46.6c12 0 22.5-7.7 22.5-23.8 0-15.6-9.8-23.4-22.5-23.4h-7.5v10.7c0 12.7-10.7 22.6-23.4 22.6H18.8c-9.8 0-17.5 8.1-17.5 17.5v9.8c0 10.2 7.9 15.2 19.5 15.2h34.4zm11-9.8c-3.6 0-6.6-3-6.6-6.6s3-6.6 6.6-6.6 6.6 3 6.6 6.6-3 6.6-6.6 6.6z" />
  </svg>
);

// 7. FastAPI — Official Teal Badge with White Lightning
export const FastAPIIcon = ({ size = 22, className = '', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className} {...props}>
    <circle cx="64" cy="64" r="64" fill="#05998B" />
    <path d="M68.5 22L36 71h25l-6 35 37-49H67l1.5-35z" fill="#FFFFFF" />
  </svg>
);

// 8. Go — Official Gopher Cyan Round Badge
export const GoIcon = ({ size = 22, className = '', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} {...props}>
    <circle cx="50" cy="50" r="48" fill="#00ADD8" />
    <path fill="#FFFFFF" d="M32 38c-1-3-3-6-6-7.5-5-3-11-3.5-16-1-6 3-10 10-9 16.5 1 7 6.5 12 13.5 13 7.5.8 14.5-4 16.5-11.5H18v-5.5h14V38zm49 3c0-9-7.5-17-17-17s-17 7.5-17 17 7.5 17 17 17 17-7.5 17-17zm-27 0c0-6 4-10.5 10-10.5s10 4.5 10 10.5-4 10.5-10 10.5-10-4.5-10-10.5z" transform="translate(14, 15) scale(0.72)" />
  </svg>
);

// 9. OpenCV — Official RGB Tri-Color Rings centered
export const OpenCVIcon = ({ size = 22, className = '', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 120 120" className={className} {...props}>
    <g transform="translate(9, 2)">
      <path fill="#EA4335" d="M51 0C37.2 0 26 11.2 26 25c0 8.5 4.3 16 10.8 20.4l7.1-12.3C41.1 31.4 39.5 28.4 39.5 25c0-6.4 5.1-11.5 11.5-11.5s11.5 5.1 11.5 11.5c0 3.4-1.6 6.4-4.4 8.1l7.1 12.3C71.7 41 76 33.5 76 25 76 11.2 64.8 0 51 0z" />
      <path fill="#34A853" d="M25 64C11.2 64 0 75.2 0 89s11.2 25 25 25c8.5 0 16-4.3 20.4-10.8L33.1 96.1c-1.7 2.8-4.7 4.4-8.1 4.4-6.4 0-11.5-5.1-11.5-11.5S18.6 77.5 25 77.5c3.4 0 6.4 1.6 8.1 4.4l12.3-7.1C41 68.3 33.5 64 25 64z" />
      <path fill="#4285F4" d="M77 64c-8.5 0-16 4.3-20.4 10.8l12.3 7.1c1.7-2.8 4.7-4.4 8.1-4.4 6.4 0 11.5 5.1 11.5 11.5s-5.1 11.5-11.5 11.5c-3.4 0-6.4-1.6-8.1-4.4l-12.3 7.1C61 109.7 68.5 114 77 114c13.8 0 25-11.2 25-25S90.8 64 77 64z" />
    </g>
  </svg>
);

// 10. YOLO — High-Precision Target Optics Badge
export const YOLOIcon = ({ size = 22, className = '', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} {...props}>
    <rect width="100" height="100" rx="24" fill="#1A1816" />
    <circle cx="50" cy="50" r="34" stroke="#FF6B00" strokeWidth="6" strokeDasharray="36 12" fill="none" />
    <circle cx="50" cy="50" r="15" fill="#FF6B00" />
    <circle cx="50" cy="50" r="5" fill="#FFFFFF" />
  </svg>
);

// 11. PyTorch — Official Red/Orange Flame centered
export const PyTorchIcon = ({ size = 22, className = '', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 160 160" className={className} {...props}>
    <g transform="translate(0, -10)">
      <path fill="#EE4C2C" d="M109.9 14.1L95.5 0 35.8 59.7c-21.7 21.7-21.7 57 0 78.8 21.7 21.7 57 21.7 78.8 0l45.4-45.4-14.4-14.4-40.4 40.4c-13.8 13.8-36.2 13.8-50 0-13.8-13.8-13.8-36.2 0-50l54.7-55z" />
      <circle cx="125" cy="42" r="13" fill="#EE4C2C" />
    </g>
  </svg>
);

// 12. ONNX — Official 4-Node Connected Graph
export const ONNXIcon = ({ size = 22, className = '', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className} {...props}>
    <circle cx="32" cy="32" r="15" fill="#005CED" />
    <circle cx="96" cy="32" r="15" fill="#005CED" />
    <circle cx="32" cy="96" r="15" fill="#005CED" />
    <circle cx="96" cy="96" r="15" fill="#005CED" />
    <line x1="32" y1="32" x2="96" y2="96" stroke="#005CED" strokeWidth="9" />
    <line x1="32" y1="32" x2="32" y2="96" stroke="#005CED" strokeWidth="9" />
    <line x1="96" y1="32" x2="96" y2="96" stroke="#005CED" strokeWidth="9" />
  </svg>
);

// 13. Docker — Official Blue Whale with Stacked Containers
export const DockerIcon = ({ size = 22, className = '', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
    <path fill="#2496ED" d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186zm0 2.714h2.118a.186.186 0 00.186-.185V6.29a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.186v1.887c0 .102.082.185.185.185zm-2.953 0h2.118a.186.186 0 00.186-.185V6.29a.186.186 0 00-.186-.186H8.076a.185.185 0 00-.185.186v1.887c0 .102.082.185.185.185zm0 2.716h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186H8.076a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm-2.954 0h2.119a.186.186 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.122a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185zm-2.954 0h2.12a.186.186 0 00.184-.185V9.006a.185.185 0 00-.185-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185zm8.862-5.43h2.119a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.186.185.186zm2.954 2.716h2.119a.186.186 0 00.186-.186V6.29a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zM23.77 11.9c-.44-.24-1.5-.4-2.47-.07-.36.12-.77.34-1.12.63-.44-.28-.9-.47-1.39-.56-.99-.18-2.02.03-2.88.58-.2-.13-.42-.23-.65-.33l-.2-.08H1.36c-.4 1.34-.6 2.75-.6 4.19 0 4.41 3.59 8 8 8 5.76 0 10.45-3.37 12.35-8.24.63-.09 2.58-.5 2.66-2.58z" />
  </svg>
);

// 14. AWS — Official Navy Squircle with Golden Curved Smile
export const AWSIcon = ({ size = 22, className = '', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} {...props}>
    <rect width="100" height="100" rx="24" fill="#232F3E" />
    <path fill="#FF9900" d="M22 66.5C36 74 64 74 78 66.5c1.5-.8 3 .8 2 2-7.5 7.5-38.5 10-59-1.5-.9-.5-.4-2 1-2.5z" />
    <path fill="#FF9900" d="M74 61c2.5 1 5.5 1.5 7.5 1.5.5 0 .5-.5 0-1-1.5-1.5-3-4-3.5-6-.2-.6-.8-.4-.7.2.4 2.1 1.2 4.3 1.7 5.3h-5z" />
    <path fill="#FFFFFF" d="M33.5 35l6 21.5h-5.5l-1.5-6h-7l-1.5 6h-5L25 35h8.5zm-2.5 11.5l-2-7.5-2 7.5h4zm19.5-11.5l4.5 16 4.5-16h5.5l-7.5 21.5h-5L48 40.5l-4.5 16h-5L31 35h5.5l4.5 16 4.5-16h5zm25.5 6c-3.5 0-5.5 1.5-6.5 3.5l4 2.5c.5-1 1.5-1.5 2.5-1.5s2 .5 2 1.5c0 1-1.5 1.5-3.5 2-4 1-6.5 2.5-6.5 6s2.5 5.5 6 5.5c2.5 0 4.5-1 5.5-2.5v2h5V47c0-4-3-6-8.5-6zm1 11.5c0 1.5-1 2.5-2.5 2.5s-2.5-1-2.5-2.5c0-1.5 1-2 2.5-2.5 1.5-.5 2.5-1 2.5-1.5v4z" />
  </svg>
);

// 15. Linux — Official Tux Penguin
export const LinuxIcon = ({ size = 22, className = '', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} {...props}>
    <ellipse cx="50" cy="58" rx="28" ry="32" fill="#1A1816" />
    <ellipse cx="50" cy="62" rx="18" ry="24" fill="#FFFFFF" />
    <circle cx="50" cy="28" r="16" fill="#1A1816" />
    <circle cx="44" cy="25" r="3.2" fill="#FFFFFF" />
    <circle cx="56" cy="25" r="3.2" fill="#FFFFFF" />
    <circle cx="45" cy="25" r="1.6" fill="#1A1816" />
    <circle cx="55" cy="25" r="1.6" fill="#1A1816" />
    <path fill="#FFC107" d="M44 32c3 4 9 4 12 0l-6 6-6-6z" />
    <ellipse cx="34" cy="88" rx="12" ry="5.5" fill="#FFC107" />
    <ellipse cx="66" cy="88" rx="12" ry="5.5" fill="#FFC107" />
  </svg>
);

// 16. Nginx — Official Green Hexagon with White 'N'
export const NginxIcon = ({ size = 22, className = '', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} {...props}>
    <polygon points="50,4 92,27 92,73 50,96 8,73 8,27" fill="#009639" />
    <path fill="#FFFFFF" d="M34 30v40l18-24v24h8V30L42 54V30h-8z" />
  </svg>
);

// 17. PostgreSQL — Official Slonik Elephant (Slate Blue)
export const PostgresIcon = ({ size = 22, className = '', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 128 128" className={className} {...props}>
    <path fill="#336791" d="M64 12c-28.7 0-52 23.3-52 52 0 14.5 5.9 27.6 15.4 37.1 2.2 2.2 4.6 4.1 7.2 5.8 4.7 3.1 10.1 5.4 15.8 6.7 4.4 1 9 1.6 13.6 1.6s9.2-.6 13.6-1.6c5.7-1.3 11.1-3.6 15.8-6.7 2.6-1.7 5-3.6 7.2-5.8C110.1 91.6 116 78.5 116 64c0-28.7-23.3-52-52-52zm0 8c24.3 0 44 19.7 44 44 0 12.2-5 23.2-13 31.2-1.9 1.9-4 3.5-6.2 4.9-4 2.6-8.5 4.5-13.4 5.6-3.7.8-7.5 1.3-11.4 1.3s-7.7-.5-11.4-1.3c-4.9-1.1-9.4-3-13.4-5.6-2.2-1.4-4.3-3-6.2-4.9C25 87.2 20 76.2 20 64c0-24.3 19.7-44 44-44z" opacity="0.15" />
    <path fill="#336791" d="M64 24c-19.8 0-36 15.8-36 35.4 0 10.5 4.7 19.9 12.3 26.2 1.8 1.5 3.9 2.8 6.1 3.9 3.5 1.7 7.4 2.8 11.6 3.2 2 .2 4 .3 6 .3s4-.1 6-.3c4.2-.4 8.1-1.5 11.6-3.2 2.2-1.1 4.3-2.4 6.1-3.9 7.6-6.3 12.3-15.7 12.3-26.2C100 39.8 83.8 24 64 24zm-6 16c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6zm12 0c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6z" />
  </svg>
);

// 18. MongoDB — Official Emerald Leaf with Central Spine
export const MongoIcon = ({ size = 22, className = '', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} {...props}>
    <path fill="#47A248" d="M50 4C50 4 24 24 24 54c0 18 13 32 26 38 13-6 26-20 26-38C76 24 50 4 50 4z" />
    <path fill="#499D4A" d="M50 4v88c13-6 26-20 26-38C76 24 50 4 50 4z" />
    <path fill="#FFFFFF" d="M50 20c-1 8-1 60 0 68 1-8 1-60 0-68z" opacity="0.65" />
  </svg>
);

// 19. Redis — Official Red Isometric Cache Layers
export const RedisIcon = ({ size = 22, className = '', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} {...props}>
    <path fill="#DC382D" d="M50 10L88 28 50 46 12 28 50 10z" />
    <path fill="#B8261C" d="M12 28l38 18v24L12 52V28z" />
    <path fill="#8F1B14" d="M88 28L50 46v24l38-18V28z" />
    <path fill="#DC382D" d="M50 46l38 18-38 18-38-18 38-18z" />
    <path fill="#B8261C" d="M12 64l38 18v12L12 76V64z" />
    <path fill="#8F1B14" d="M88 64L50 82v12l38-12V64z" />
  </svg>
);

// 20. Supabase — Official Emerald Lightning Emblem
export const SupabaseIcon = ({ size = 22, className = '', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} {...props}>
    <rect width="100" height="100" rx="24" fill="#1C1C1C" />
    <path fill="url(#supa_grad_hd)" d="M53.5 16L24 53h24l-3.5 31L76 47H50l3.5-31z" />
    <defs>
      <linearGradient id="supa_grad_hd" x1="24" y1="16" x2="76" y2="84" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3ECF8E" />
        <stop offset="1" stopColor="#2496ED" />
      </linearGradient>
    </defs>
  </svg>
);

// 21. Git — Official Orange Diamond with Branch Nodes
export const GitIcon = ({ size = 22, className = '', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} {...props}>
    <rect x="14.6" y="14.6" width="70.8" height="70.8" rx="14" transform="rotate(45 50 50)" fill="#F05032" />
    <circle cx="36" cy="50" r="7" fill="#FFFFFF" />
    <circle cx="64" cy="36" r="7" fill="#FFFFFF" />
    <circle cx="64" cy="64" r="7" fill="#FFFFFF" />
    <path stroke="#FFFFFF" strokeWidth="5" fill="none" d="M36 50h14c8 0 14-6 14-14M50 50v14" />
  </svg>
);

// 22. GitHub — Official Sleek Dark Silhouette
export const GitHubIcon = ({ size = 22, className = '', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...props}>
    <path fill="#181717" d="M12 2C6.47 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
  </svg>
);

// 23. Postman — Official Orange Astronaut Badge
export const PostmanIcon = ({ size = 22, className = '', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className} {...props}>
    <circle cx="50" cy="50" r="48" fill="#FF6C37" />
    <path fill="#FFFFFF" d="M30 52l16-18 10 10 16-14-6 24H30z" />
    <circle cx="68" cy="28" r="6" fill="#FFFFFF" />
  </svg>
);

// 24. Figma — Official 5-Color Geometric Lettermark centered
export const FigmaIcon = ({ size = 22, className = '', ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 64 64" className={className} {...props}>
    <g transform="translate(13, 3.5)">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
    </g>
  </svg>
);
