import React from 'react';

interface MineFinderIconProps {
  size?: number;
  className?: string;
}

export const MineFinderIcon: React.FC<MineFinderIconProps> = ({ size = 38, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none shrink-0 drop-shadow-sm ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <defs>
        {/* Dirt brown gradient on left half */}
        <linearGradient id="finderDirtGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7c5537" />
          <stop offset="45%" stopColor="#5f3d23" />
          <stop offset="100%" stopColor="#3d2311" />
        </linearGradient>

        {/* Grass green gradient on right face half */}
        <linearGradient id="finderGrassGrad" x1="50" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1ae733" />
          <stop offset="40%" stopColor="#02d623" />
          <stop offset="100%" stopColor="#00a81b" />
        </linearGradient>

        {/* Squircle clip mask with classic macOS curvature */}
        <clipPath id="squircleClip">
          <rect x="4" y="4" width="92" height="92" rx="22" ry="22" />
        </clipPath>

        {/* Subtle drop shadow for the face nose seam */}
        <filter id="seamShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="-1.2" dy="0" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Outer rounded squircle background - Dirt Brown base */}
      <rect x="4" y="4" width="92" height="92" rx="22" ry="22" fill="url(#finderDirtGrad)" />

      {/* Subtle outer dark border */}
      <rect x="4" y="4" width="92" height="92" rx="22" ry="22" stroke="#251609" strokeWidth="1.5" opacity="0.5" />

      {/* Cliped Inner Face Profile */}
      <g clipPath="url(#squircleClip)">
        {/* Right Green Half with classic Finder Nose Profile extending to the left */}
        <path
          d="M 53 4
             L 96 4
             L 96 96
             L 50 96
             L 50 56
             C 47 56, 42 56, 40 55.5
             C 38 54.5, 37.5 52, 39 49.5
             C 42 43, 46 30, 52 14
             C 53 10, 53 4, 53 4
             Z"
          fill="url(#finderGrassGrad)"
          filter="url(#seamShadow)"
        />

        {/* Crisp face seam divider line */}
        <path
          d="M 53 4
             C 53 10, 52 14, 52 14
             C 46 30, 42 43, 39 49.5
             C 37.5 52, 38 54.5, 40 55.5
             C 42 56, 47 56, 50 56
             L 50 96"
          stroke="#4aff67"
          strokeWidth="1.2"
          fill="none"
          opacity="0.85"
        />

        {/* Left Eye (Blue vertical pill on brown side) */}
        <rect
          x="26"
          y="31"
          width="7"
          height="17"
          rx="3.5"
          fill="#142a45"
          stroke="#0c192a"
          strokeWidth="0.5"
        />

        {/* Right Eye (Blue vertical pill on green side) */}
        <rect
          x="67"
          y="31"
          width="7"
          height="17"
          rx="3.5"
          fill="#142a45"
          stroke="#0c192a"
          strokeWidth="0.5"
        />

        {/* Friendly Curved Smile Mouth across both brown and green halves */}
        <path
          d="M 22 66 C 29 78, 45 81, 50 81 C 55 81, 71 78, 78 66"
          stroke="#142a45"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  );
};
