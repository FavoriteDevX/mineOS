import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  golden?: boolean;
}

// macOS Apple logo parody -> Minecraft Golden Apple
export const IconMinecraftApple: React.FC<IconProps> = ({ className = '', size = 20, golden = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Stem */}
    <rect x="12" y="3" width="2" height="4" fill="#553311" />
    <rect x="14" y="3" width="2" height="2" fill="#225511" />
    {/* Body */}
    <rect x="6" y="7" width="12" height="12" fill={golden ? '#ddaa00' : '#cc2222'} />
    <rect x="5" y="9" width="14" height="8" fill={golden ? '#ddaa00' : '#cc2222'} />
    <rect x="7" y="6" width="10" height="14" fill={golden ? '#ffdd33' : '#ff4444'} />
    {/* Shading */}
    <rect x="8" y="8" width="4" height="4" fill={golden ? '#ffffaa' : '#ffaaaa'} />
    <rect x="13" y="14" width="4" height="4" fill={golden ? '#aa7700' : '#881111'} />
  </svg>
);

// Authentic Minecraft Java Edition 9x9 Heart
export const IconHeart: React.FC<{ type?: 'full' | 'half' | 'empty'; size?: number }> = ({ type = 'full', size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 9 9" fill="none" style={{ imageRendering: 'pixelated' }}>
    {/* Black outline */}
    <path
      d="M1 0h2v1H1V0zm5 0h2v1H6V0zM0 1h1v3H0V1zm8 1h1v3H8V2zM1 4h1v1H1V4zm7 0h1v1H8V4zm-6 1h1v1H2V5zm5 0h1v1H7V5zm-4 1h1v1H3V6zm3 0h1v1H6V6zm-2 1h2v1H4V7zm0 1h1v1H4V8z"
      fill="#000000"
    />
    {/* Dark backing */}
    <rect x="1" y="1" width="7" height="6" fill="#1b1212" />
    <polygon points="1,4 8,4 8,5 7,6 6,7 5,8 4,8 3,7 2,6 1,5" fill="#1b1212" />

    {type === 'full' && (
      <>
        {/* Red Heart Body */}
        <polygon points="1,1 3,1 3,2 6,2 6,1 8,1 8,4 7,5 6,6 5,7 4,7 3,6 2,5 1,4" fill="#e01212" />
        <rect x="2" y="2" width="5" height="2" fill="#ff2222" />
        {/* Specular Glint */}
        <rect x="2" y="2" width="1" height="2" fill="#ffffff" />
        <rect x="3" y="2" width="1" height="1" fill="#ffffff" />
      </>
    )}

    {type === 'half' && (
      <>
        {/* Half Heart Body (Left side only) */}
        <polygon points="1,1 3,1 3,2 4,2 4,7 3,6 2,5 1,4" fill="#e01212" />
        <rect x="2" y="2" width="2" height="2" fill="#ff2222" />
        <rect x="2" y="2" width="1" height="2" fill="#ffffff" />
      </>
    )}
  </svg>
);

// Authentic Minecraft Java Edition 9x9 Hunger Drumstick
export const IconHunger: React.FC<{ type?: 'full' | 'half' | 'empty'; size?: number }> = ({ type = 'full', size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 9 9" fill="none" style={{ imageRendering: 'pixelated' }}>
    {/* Black outline */}
    <path
      d="M3 0h4v1H3V0zM2 1h1v2H2V1zm5 0h1v2H7V1zm1 2h1v3H8V3zM1 3h1v2H1V3zm0 2h1v1H1V5zm0 1h2v1H1V6zm1 1h2v1H2V7zm2 1h4v1H4V8zm4-1h1v1H8V7z"
      fill="#000000"
    />
    {/* Background */}
    <rect x="2" y="1" width="6" height="7" fill="#1b1212" />

    {type !== 'empty' && (
      <>
        {/* Roast meat */}
        <polygon points="3,1 7,1 8,3 8,6 7,7 4,7 3,5 3,3" fill="#8c3e14" />
        <polygon points="4,2 6,2 7,3 7,5 6,6 4,6" fill="#bd5b25" />
        <rect x="4" y="3" width="2" height="2" fill="#e8894d" />
        {/* Bone nub */}
        <rect x="1" y="6" width="2" height="2" fill="#dddddd" />
        <rect x="0" y="7" width="1" height="1" fill="#ffffff" />
      </>
    )}
  </svg>
);

// Authentic Minecraft Java Edition 9x9 Armor Plate
export const IconArmor: React.FC<{ type?: 'full' | 'half' | 'empty'; size?: number }> = ({ type = 'full', size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 9 9" fill="none" style={{ imageRendering: 'pixelated' }}>
    {/* Black outline */}
    <path
      d="M1 0h7v1H1V0zM0 1h1v4H0V1zm8 0h1v4H8V1zm-7 4h1v2H1V5zm6 0h1v2H7V5zm-5 2h1v1H2V7zm4 0h1v1H6V7zm-3 1h2v1H3V8z"
      fill="#000000"
    />
    {/* Dark backing */}
    <rect x="1" y="1" width="7" height="6" fill="#1b1212" />

    {type === 'full' && (
      <>
        {/* Iron Chestplate */}
        <polygon points="1,1 8,1 8,4 7,6 5,7 4,7 2,6 1,4" fill="#888888" />
        <polygon points="2,2 7,2 7,4 6,5 5,6 4,6 3,5 2,4" fill="#bbbbbb" />
        {/* Glint */}
        <rect x="2" y="2" width="2" height="2" fill="#ffffff" />
        <rect x="3" y="1" width="3" height="1" fill="#444444" />
      </>
    )}

    {type === 'half' && (
      <>
        <polygon points="1,1 4,1 4,7 2,6 1,4" fill="#888888" />
        <polygon points="2,2 4,2 4,6 3,5 2,4" fill="#bbbbbb" />
        <rect x="2" y="2" width="1" height="2" fill="#ffffff" />
      </>
    )}
  </svg>
);

// Authentic Minecraft Java Edition 9x9 Oxygen Bubble
export const IconBubble: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 9 9" fill="none" style={{ imageRendering: 'pixelated' }}>
    <rect x="2" y="0" width="5" height="1" fill="#000000" />
    <rect x="2" y="8" width="5" height="1" fill="#000000" />
    <rect x="0" y="2" width="1" height="5" fill="#000000" />
    <rect x="8" y="2" width="1" height="5" fill="#000000" />
    <rect x="1" y="1" width="1" height="1" fill="#000000" />
    <rect x="7" y="1" width="1" height="1" fill="#000000" />
    <rect x="1" y="7" width="1" height="1" fill="#000000" />
    <rect x="7" y="7" width="1" height="1" fill="#000000" />
    {/* Blue Bubble fill */}
    <rect x="1" y="2" width="7" height="5" fill="#1b4d8c" />
    <rect x="2" y="1" width="5" height="7" fill="#2b75d6" />
    {/* Specular Highlight */}
    <rect x="2" y="2" width="2" height="2" fill="#ffffff" />
  </svg>
);
