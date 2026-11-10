import React from 'react';
import { MineFinderIcon } from './MineFinderIcon';

export type MacOsIconType =
  | 'finder'       // Custom Minecraft Dirt & Grass Smiling Face
  | 'safari'       // row 0, col 0
  | 'photos'       // row 0, col 1
  | 'stocks'       // row 0, col 2
  | 'quicktime'    // row 0, col 3
  | 'messages'     // row 0, col 4
  | 'mail'         // row 0, col 5
  | 'home'         // row 1, col 0
  | 'garageband'   // row 1, col 1
  | 'keynote'      // row 1, col 2
  | 'music'        // row 1, col 3
  | 'imovie'       // row 1, col 4
  | 'testflight'   // row 1, col 5
  | 'shortcuts'    // row 2, col 0
  | 'maps'         // row 2, col 1
  | 'pages'        // row 2, col 2
  | 'appstore'     // row 2, col 3
  | 'notes'        // row 2, col 4
  | 'numbers'      // row 2, col 5
  | 'reminders'    // row 3, col 0
  | 'podcasts'     // row 3, col 1
  | 'calendar'     // row 3, col 2
  | 'facetime'     // row 3, col 3
  | 'appletv'      // row 3, col 4
  | 'news'         // row 3, col 5
  | 'phone'
  | 'weather'
  | 'contacts'
  | 'passwords'
  | 'timemachine'
  | 'books'
  | 'voice'
  | 'preview'
  | 'games'
  | 'tips'
  | 'freeform'
  | 'photobooth'
  | 'settings';

interface MacOsIconProps {
  type: MacOsIconType;
  size?: number;
  className?: string;
}

export const MacOsIcon: React.FC<MacOsIconProps> = ({
  type,
  size = 38,
  className = '',
}) => {
  if (type === 'finder') {
    return <MineFinderIcon size={size} className={className} />;
  }

  // Known PNG assets in /public/assets/icons/
  const knownPngIcons = [
    'safari',
    'photos',
    'stocks',
    'quicktime',
    'messages',
    'mail',
    'home',
    'garageband',
    'keynote',
    'music',
    'imovie',
    'testflight',
    'shortcuts',
    'maps',
    'pages',
    'appstore',
    'notes',
    'numbers',
    'reminders',
    'podcasts',
    'calendar',
    'facetime',
    'appletv',
    'news',
  ];

  if (knownPngIcons.includes(type)) {
    return (
      <img
        src={`/assets/icons/${type}.png`}
        alt={type}
        width={size}
        height={size}
        className={`select-none shrink-0 object-contain block mx-auto ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
        draggable={false}
      />
    );
  }

  // High-fidelity SVG renderers for remaining macOS icons
  if (type === 'phone') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={`shrink-0 drop-shadow-sm ${className}`}>
        <rect x="4" y="4" width="92" height="92" rx="22" ry="22" fill="#30d158" />
        <path
          d="M32 30 C32 26 36 24 40 26 L46 32 C49 35 48 39 45 42 L42 45 C45 52 50 57 57 60 L60 57 C63 54 67 53 70 56 L76 62 C78 66 76 70 72 70 C50 70 32 52 32 30 Z"
          fill="white"
        />
      </svg>
    );
  }

  if (type === 'weather') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={`shrink-0 drop-shadow-sm ${className}`}>
        <defs>
          <linearGradient id="weatherGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4aa7f8" />
            <stop offset="100%" stopColor="#1e68d7" />
          </linearGradient>
        </defs>
        <rect x="4" y="4" width="92" height="92" rx="22" ry="22" fill="url(#weatherGrad)" />
        <circle cx="44" cy="42" r="16" fill="#ffcc00" />
        <path
          d="M 32 64 A 12 12 0 0 1 54 58 A 16 16 0 0 1 78 64 A 8 8 0 0 1 76 72 L 32 72 A 8 8 0 0 1 32 64 Z"
          fill="#f0f4f8"
          opacity="0.95"
        />
      </svg>
    );
  }

  if (type === 'passwords') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={`shrink-0 drop-shadow-sm ${className}`}>
        <rect x="4" y="4" width="92" height="92" rx="22" ry="22" fill="#1c1c1e" />
        <circle cx="38" cy="46" r="14" stroke="#ffd60a" strokeWidth="5" fill="none" />
        <path d="M48 46 L74 46 L74 54 L66 54 L66 50 L58 50 L58 54 L48 54" stroke="#ffd60a" strokeWidth="5" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'timemachine') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={`shrink-0 drop-shadow-sm ${className}`}>
        <rect x="4" y="4" width="92" height="92" rx="22" ry="22" fill="#20c997" />
        <circle cx="50" cy="50" r="26" stroke="white" strokeWidth="6" strokeDasharray="130" strokeDashoffset="30" fill="none" strokeLinecap="round" />
        <path d="M50 34 L50 50 L62 50" stroke="white" strokeWidth="5" strokeLinecap="round" />
        <polygon points="34,34 38,22 48,30" fill="white" />
      </svg>
    );
  }

  if (type === 'books') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={`shrink-0 drop-shadow-sm ${className}`}>
        <rect x="4" y="4" width="92" height="92" rx="22" ry="22" fill="#ff9500" />
        <path d="M26 34 C36 32, 48 35, 50 40 C52 35, 64 32, 74 34 L74 68 C64 66, 52 69, 50 74 C48 69, 36 66, 26 68 Z" fill="white" />
      </svg>
    );
  }

  if (type === 'voice') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={`shrink-0 drop-shadow-sm ${className}`}>
        <rect x="4" y="4" width="92" height="92" rx="22" ry="22" fill="#1c1c1e" />
        <line x1="28" y1="50" x2="28" y2="50" stroke="#ff453a" strokeWidth="5" strokeLinecap="round" />
        <line x1="39" y1="36" x2="39" y2="64" stroke="#ff453a" strokeWidth="5" strokeLinecap="round" />
        <line x1="50" y1="24" x2="50" y2="76" stroke="#ff453a" strokeWidth="5" strokeLinecap="round" />
        <line x1="61" y1="38" x2="61" y2="62" stroke="#ff453a" strokeWidth="5" strokeLinecap="round" />
        <line x1="72" y1="46" x2="72" y2="54" stroke="#ff453a" strokeWidth="5" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'preview') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={`shrink-0 drop-shadow-sm ${className}`}>
        <defs>
          <linearGradient id="prevGrad" x1="0" y1="0" x2="0" y2="100">
            <stop offset="0%" stopColor="#80d0c7" />
            <stop offset="100%" stopColor="#13547a" />
          </linearGradient>
        </defs>
        <rect x="4" y="4" width="92" height="92" rx="22" ry="22" fill="url(#prevGrad)" />
        <circle cx="56" cy="46" r="18" stroke="white" strokeWidth="6" fill="none" />
        <line x1="44" y1="58" x2="30" y2="72" stroke="white" strokeWidth="7" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'games') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={`shrink-0 drop-shadow-sm ${className}`}>
        <rect x="4" y="4" width="92" height="92" rx="22" ry="22" fill="#ff2d55" />
        <path d="M42 26 L58 26 L74 68 L26 68 Z" fill="white" opacity="0.9" rx="6" />
        <circle cx="50" cy="44" r="6" fill="#ff2d55" />
      </svg>
    );
  }

  // Default fallback squircle
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={`shrink-0 drop-shadow-sm ${className}`}>
      <rect x="4" y="4" width="92" height="92" rx="22" ry="22" fill="#6366f1" />
      <circle cx="50" cy="50" r="16" fill="white" />
    </svg>
  );
};
