import React from 'react';

interface BlockIconProps {
  size?: number;
  className?: string;
}

/**
 * High-fidelity, authentic Minecraft 16x16 pixel art SVG icons for Blocks & Resources.
 */

// 1. Grass Block (Iconic 3D perspective or flat block face)
export const BlockGrass: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Dirt base */}
    <rect width="16" height="16" fill="#866043" />
    <rect x="2" y="7" width="2" height="2" fill="#573d26" />
    <rect x="6" y="11" width="3" height="2" fill="#573d26" />
    <rect x="11" y="8" width="2" height="3" fill="#573d26" />
    <rect x="12" y="13" width="2" height="2" fill="#573d26" />
    <rect x="3" y="13" width="2" height="1" fill="#a07452" />
    <rect x="9" y="9" width="1" height="2" fill="#a07452" />
    {/* Grass Top */}
    <rect width="16" height="4" fill="#4c8522" />
    <rect x="0" y="0" width="16" height="2" fill="#699f38" />
    {/* Drips of grass down into dirt */}
    <rect x="1" y="4" width="2" height="2" fill="#4c8522" />
    <rect x="4" y="4" width="2" height="3" fill="#4c8522" />
    <rect x="5" y="6" width="1" height="1" fill="#4c8522" />
    <rect x="8" y="4" width="1" height="2" fill="#4c8522" />
    <rect x="11" y="4" width="3" height="3" fill="#4c8522" />
    <rect x="14" y="4" width="2" height="1" fill="#4c8522" />
    {/* Grass highlights */}
    <rect x="2" y="1" width="3" height="1" fill="#88c352" />
    <rect x="9" y="0" width="4" height="1" fill="#88c352" />
    {/* Dark border outline */}
    <rect width="16" height="1" fill="#2d4215" opacity="0.4" />
  </svg>
);

// 2. Crafting Table
export const BlockCraftingTable: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Oak wood body */}
    <rect width="16" height="16" fill="#a07444" />
    {/* Corner dark brackets */}
    <rect width="16" height="1" fill="#4a2e12" />
    <rect y="15" width="16" height="1" fill="#4a2e12" />
    <rect width="1" height="16" fill="#4a2e12" />
    <rect x="15" width="1" height="16" fill="#4a2e12" />
    {/* Top Grid Plate */}
    <rect x="2" y="2" width="12" height="3" fill="#6b4623" />
    {/* Mini tools on side: Saw & Pincers */}
    <rect x="3" y="6" width="4" height="2" fill="#d0d0d0" />
    <rect x="4" y="8" width="2" height="5" fill="#4a2e12" />
    <rect x="9" y="6" width="4" height="6" fill="#553316" />
    <rect x="10" y="7" width="2" height="4" fill="#a0a0a0" />
    {/* Rivets */}
    <rect x="2" y="2" width="1" height="1" fill="#111111" />
    <rect x="13" y="2" width="1" height="1" fill="#111111" />
    <rect x="2" y="13" width="1" height="1" fill="#111111" />
    <rect x="13" y="13" width="1" height="1" fill="#111111" />
  </svg>
);

// 3. Furnace
export const BlockFurnace: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Cobblestone body */}
    <rect width="16" height="16" fill="#696969" />
    <rect x="1" y="1" width="14" height="14" fill="#757575" />
    {/* Cobble shading */}
    <rect x="2" y="2" width="3" height="2" fill="#505050" />
    <rect x="11" y="2" width="3" height="2" fill="#8f8f8f" />
    {/* Furnace Face Opening */}
    <rect x="3" y="3" width="10" height="4" fill="#222222" />
    <rect x="4" y="9" width="8" height="5" fill="#111111" />
    {/* Fire glowing inside mouth */}
    <rect x="5" y="11" width="6" height="3" fill="#ff3300" />
    <rect x="6" y="12" width="4" height="2" fill="#ff9900" />
    <rect x="7" y="12" width="2" height="1" fill="#ffff55" />
  </svg>
);

// 4. TNT Block
export const BlockTNT: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Red Dynamite Sticks */}
    <rect width="16" height="16" fill="#b82a18" />
    <rect width="16" height="2" fill="#7d1a0d" />
    <rect y="14" width="16" height="2" fill="#7d1a0d" />
    {/* White Paper Band */}
    <rect y="6" width="16" height="5" fill="#f0ede6" />
    {/* 'TNT' text pixelated */}
    {/* T */}
    <rect x="2" y="7" width="3" height="1" fill="#111111" />
    <rect x="3" y="8" width="1" height="2" fill="#111111" />
    {/* N */}
    <rect x="6" y="7" width="1" height="3" fill="#111111" />
    <rect x="7" y="8" width="1" height="1" fill="#111111" />
    <rect x="8" y="7" width="1" height="3" fill="#111111" />
    {/* T */}
    <rect x="10" y="7" width="3" height="1" fill="#111111" />
    <rect x="11" y="8" width="1" height="2" fill="#111111" />
  </svg>
);

// 5. Diamond Block
export const BlockDiamond: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    <rect width="16" height="16" fill="#30b5b5" />
    {/* Dark crystal bevel */}
    <rect width="16" height="1" fill="#6fe3e3" />
    <rect width="1" height="16" fill="#6fe3e3" />
    <rect x="15" width="1" height="16" fill="#197a7a" />
    <rect y="15" width="16" height="1" fill="#197a7a" />
    {/* Crystal Facets */}
    <rect x="2" y="2" width="12" height="12" fill="#40cccc" />
    <rect x="3" y="3" width="4" height="4" fill="#a4f5f5" />
    <rect x="8" y="4" width="5" height="3" fill="#2aa3a3" />
    <rect x="4" y="9" width="4" height="4" fill="#2aa3a3" />
    <rect x="10" y="9" width="3" height="3" fill="#a4f5f5" />
    <rect x="4" y="4" width="1" height="1" fill="#ffffff" />
  </svg>
);

// 6. Chest (Classic Oak Chest)
export const BlockChest: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    <rect width="16" height="16" fill="#754b24" />
    {/* Outer frame */}
    <rect width="16" height="1" fill="#38220d" />
    <rect y="15" width="16" height="1" fill="#38220d" />
    <rect width="1" height="16" fill="#38220d" />
    <rect x="15" width="1" height="16" fill="#38220d" />
    {/* Lid split line */}
    <rect y="6" width="16" height="1" fill="#2a1807" />
    {/* Wood grain */}
    <rect x="2" y="2" width="12" height="3" fill="#996331" />
    <rect x="2" y="8" width="12" height="6" fill="#996331" />
    {/* Silver latch in center */}
    <rect x="7" y="5" width="2" height="3" fill="#333333" />
    <rect x="7" y="5" width="2" height="2" fill="#d9d9d9" />
  </svg>
);

// 7. Ender Chest (Obsidian with Eye of Ender)
export const BlockEnderChest: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    <rect width="16" height="16" fill="#0c1719" />
    <rect x="1" y="1" width="14" height="14" fill="#14282c" />
    <rect y="6" width="16" height="1" fill="#070c0d" />
    {/* Mystical teal shading */}
    <rect x="2" y="2" width="12" height="3" fill="#1c3e45" />
    <rect x="2" y="8" width="12" height="6" fill="#1c3e45" />
    {/* Eye of Ender latch in center */}
    <rect x="7" y="5" width="2" height="3" fill="#00ff99" />
    <rect x="7" y="6" width="2" height="1" fill="#800040" />
  </svg>
);

// 8. Command Block
export const BlockCommandBlockItem: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    <rect width="16" height="16" fill="#4d2f6d" />
    <rect x="1" y="1" width="14" height="14" fill="#66408f" />
    {/* Corner rivets */}
    <rect x="2" y="2" width="2" height="2" fill="#9d73cb" />
    <rect x="12" y="2" width="2" height="2" fill="#9d73cb" />
    <rect x="2" y="12" width="2" height="2" fill="#9d73cb" />
    <rect x="12" y="12" width="2" height="2" fill="#9d73cb" />
    {/* Core */}
    <rect x="6" y="6" width="4" height="4" fill="#11071f" />
    <rect x="7" y="7" width="2" height="2" fill="#00ffff" />
    {/* Arrows */}
    <rect x="7" y="4" width="2" height="1" fill="#55ffff" />
    <rect x="7" y="11" width="2" height="1" fill="#55ffff" />
  </svg>
);

// 9. Bookshelf
export const BlockBookshelf: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    <rect width="16" height="16" fill="#754b24" />
    {/* Wood shelves */}
    <rect width="16" height="2" fill="#4a2e12" />
    <rect y="7" width="16" height="2" fill="#4a2e12" />
    <rect y="14" width="16" height="2" fill="#4a2e12" />
    {/* Top shelf books */}
    <rect x="1" y="2" width="2" height="5" fill="#a82525" />
    <rect x="4" y="3" width="2" height="4" fill="#256fa8" />
    <rect x="7" y="2" width="3" height="5" fill="#25a84e" />
    <rect x="11" y="3" width="2" height="4" fill="#a88525" />
    <rect x="14" y="2" width="1" height="5" fill="#7525a8" />
    {/* Bottom shelf books */}
    <rect x="1" y="9" width="3" height="5" fill="#256fa8" />
    <rect x="5" y="10" width="2" height="4" fill="#a82525" />
    <rect x="8" y="9" width="2" height="5" fill="#7525a8" />
    <rect x="11" y="10" width="4" height="4" fill="#25a84e" />
  </svg>
);

// 10. Redstone Lamp
export const BlockRedstoneLamp: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    <rect width="16" height="16" fill="#3b2011" />
    <rect x="1" y="1" width="14" height="14" fill="#57311c" />
    {/* Glowing filigree glow */}
    <rect x="3" y="3" width="10" height="10" fill="#cc6600" />
    <rect x="5" y="5" width="6" height="6" fill="#ffaa33" />
    <rect x="7" y="7" width="2" height="2" fill="#ffff88" />
  </svg>
);

// 11. Resource: Diamond Gemstone
export const ResourceDiamond: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Diamond gem outline */}
    <rect x="5" y="2" width="6" height="2" fill="#000000" />
    <rect x="3" y="4" width="10" height="2" fill="#000000" />
    <rect x="2" y="6" width="12" height="3" fill="#000000" />
    <rect x="4" y="9" width="8" height="3" fill="#000000" />
    <rect x="6" y="12" width="4" height="2" fill="#000000" />
    <rect x="7" y="14" width="2" height="1" fill="#000000" />
    {/* Aqua fill */}
    <rect x="6" y="3" width="4" height="1" fill="#4deded" />
    <rect x="4" y="5" width="8" height="1" fill="#4deded" />
    <rect x="3" y="6" width="10" height="2" fill="#25b7b7" />
    <rect x="5" y="8" width="6" height="3" fill="#1b8585" />
    <rect x="7" y="11" width="2" height="2" fill="#1b8585" />
    {/* High-glint reflection */}
    <rect x="6" y="4" width="2" height="2" fill="#ffffff" />
    <rect x="5" y="6" width="2" height="1" fill="#ffffff" />
  </svg>
);

// 12. Resource: Emerald Gemstone
export const ResourceEmerald: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    <rect x="5" y="2" width="6" height="12" fill="#003811" />
    <rect x="3" y="4" width="10" height="8" fill="#003811" />
    <rect x="6" y="3" width="4" height="10" fill="#00bb3f" />
    <rect x="4" y="5" width="8" height="6" fill="#00bb3f" />
    <rect x="7" y="4" width="2" height="8" fill="#55ff88" />
    <rect x="5" y="6" width="6" height="4" fill="#55ff88" />
    <rect x="7" y="6" width="2" height="2" fill="#ffffff" />
  </svg>
);

// 13. Resource: Netherite Ingot
export const ResourceNetherite: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    <rect x="3" y="4" width="10" height="8" fill="#18131c" />
    <rect x="4" y="5" width="8" height="6" fill="#443a49" />
    <rect x="5" y="6" width="6" height="4" fill="#65566c" />
    <rect x="5" y="6" width="4" height="1" fill="#93819c" />
  </svg>
);

// 14. Resource: Redstone Dust
export const ResourceRedstone: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    <rect x="4" y="8" width="8" height="5" fill="#4a0404" />
    <rect x="5" y="6" width="6" height="6" fill="#aa0000" />
    <rect x="6" y="7" width="4" height="4" fill="#ff2222" />
    <rect x="7" y="8" width="2" height="2" fill="#ff9999" />
    <rect x="2" y="11" width="2" height="2" fill="#ff2222" />
    <rect x="12" y="11" width="2" height="2" fill="#ff2222" />
  </svg>
);

// 15. Item: Diamond Sword
export const ItemDiamondSword: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Blade Tip */}
    <rect x="12" y="2" width="2" height="2" fill="#2cb3b3" />
    <rect x="11" y="3" width="2" height="2" fill="#4deded" />
    <rect x="10" y="4" width="2" height="2" fill="#4deded" />
    <rect x="9" y="5" width="2" height="2" fill="#4deded" />
    <rect x="8" y="6" width="2" height="2" fill="#4deded" />
    <rect x="7" y="7" width="2" height="2" fill="#4deded" />
    <rect x="6" y="8" width="2" height="2" fill="#2cb3b3" />
    <rect x="12" y="2" width="1" height="1" fill="#ffffff" />
    <rect x="11" y="3" width="1" height="1" fill="#ffffff" />
    {/* Crossguard */}
    <rect x="4" y="9" width="3" height="2" fill="#302217" />
    <rect x="5" y="8" width="2" height="3" fill="#302217" />
    {/* Handle Hilt */}
    <rect x="3" y="11" width="2" height="2" fill="#664422" />
    <rect x="2" y="12" width="2" height="2" fill="#664422" />
    {/* Pommel */}
    <rect x="1" y="14" width="2" height="1" fill="#302217" />
  </svg>
);

// 16. Item: Golden Apple
export const ItemGoldenApple: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Stem */}
    <rect x="8" y="2" width="1" height="3" fill="#402810" />
    <rect x="9" y="2" width="2" height="1" fill="#2d4a13" />
    {/* Golden Apple Body */}
    <rect x="4" y="5" width="8" height="8" fill="#b88300" />
    <rect x="3" y="6" width="10" height="6" fill="#b88300" />
    <rect x="5" y="4" width="6" height="9" fill="#ffdd33" />
    <rect x="4" y="6" width="8" height="6" fill="#ffdd33" />
    {/* Highlighting */}
    <rect x="5" y="5" width="3" height="3" fill="#ffffaa" />
    <rect x="6" y="6" width="1" height="1" fill="#ffffff" />
  </svg>
);

// 17. Item: Ender Pearl
export const ItemEnderPearl: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    <rect x="4" y="3" width="8" height="10" fill="#082b26" />
    <rect x="3" y="4" width="10" height="8" fill="#082b26" />
    <rect x="5" y="4" width="6" height="8" fill="#005e4d" />
    <rect x="4" y="5" width="8" height="6" fill="#005e4d" />
    <rect x="6" y="5" width="4" height="4" fill="#00a884" />
    <rect x="6" y="6" width="2" height="2" fill="#55ffcc" />
    <rect x="7" y="6" width="1" height="1" fill="#ffffff" />
  </svg>
);

// 18. Item: Totem of Undying
export const ItemTotem: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Golden wings */}
    <rect x="1" y="6" width="14" height="3" fill="#bb8800" />
    {/* Head & Body */}
    <rect x="5" y="2" width="6" height="12" fill="#ddaa00" />
    <rect x="6" y="3" width="4" height="10" fill="#ffcc22" />
    {/* Emerald green eyes */}
    <rect x="5" y="4" width="2" height="1" fill="#00ff66" />
    <rect x="9" y="4" width="2" height="1" fill="#00ff66" />
    {/* Base nose / mouth */}
    <rect x="7" y="6" width="2" height="2" fill="#885500" />
    <rect x="6" y="12" width="4" height="2" fill="#bb8800" />
  </svg>
);

// 19. Item: Paper / Scroll
export const ItemPaper: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    <rect x="3" y="2" width="10" height="12" fill="#302820" />
    <rect x="4" y="3" width="8" height="10" fill="#eae3d2" />
    <rect x="4" y="3" width="8" height="1" fill="#ffffff" />
    {/* Faint written script lines */}
    <rect x="5" y="5" width="6" height="1" fill="#a89a80" />
    <rect x="5" y="7" width="5" height="1" fill="#a89a80" />
    <rect x="5" y="9" width="6" height="1" fill="#a89a80" />
    <rect x="5" y="11" width="4" height="1" fill="#a89a80" />
    {/* Folded bottom-right dog-ear corner */}
    <rect x="10" y="11" width="2" height="2" fill="#c4bba8" />
  </svg>
);

// 20. Item: Book and Quill
export const ItemBookAndQuill: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Leather Book */}
    <rect x="2" y="4" width="10" height="10" fill="#1f110b" />
    <rect x="3" y="5" width="8" height="8" fill="#5c2e17" />
    <rect x="4" y="6" width="6" height="6" fill="#874726" />
    {/* Pages edge */}
    <rect x="11" y="6" width="1" height="6" fill="#f0ebd8" />
    <rect x="10" y="5" width="1" height="8" fill="#d9ceb2" />
    {/* Quill Feather */}
    <rect x="12" y="1" width="2" height="3" fill="#ffffff" />
    <rect x="10" y="3" width="3" height="3" fill="#ffffff" />
    <rect x="8" y="5" width="3" height="3" fill="#e0e0e0" />
    <rect x="7" y="7" width="2" height="2" fill="#a0a0a0" />
    <rect x="6" y="9" width="1" height="2" fill="#111111" />
  </svg>
);

// 21. Item: Written Book (Enchanted with Gold Seal)
export const ItemWrittenBook: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    <rect x="2" y="3" width="11" height="11" fill="#1c0f2b" />
    <rect x="3" y="4" width="9" height="9" fill="#4d1b5a" />
    <rect x="4" y="5" width="7" height="7" fill="#752b87" />
    {/* Gold emblem */}
    <rect x="6" y="7" width="3" height="3" fill="#ffdd33" />
    <rect x="7" y="8" width="1" height="1" fill="#ffffff" />
    {/* Pages */}
    <rect x="12" y="5" width="1" height="7" fill="#ffffea" />
  </svg>
);

// 22. Item: Lava Bucket
export const ItemLavaBucket: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Iron Bucket Rim & Body */}
    <rect x="3" y="4" width="10" height="2" fill="#2c2c2c" />
    <rect x="3" y="6" width="2" height="6" fill="#888888" />
    <rect x="11" y="6" width="2" height="6" fill="#888888" />
    <rect x="5" y="12" width="6" height="2" fill="#888888" />
    {/* Molten Lava */}
    <rect x="5" y="5" width="6" height="3" fill="#ff5500" />
    <rect x="6" y="6" width="4" height="3" fill="#ffaa00" />
    <rect x="7" y="6" width="2" height="2" fill="#ffff55" />
    <rect x="5" y="8" width="6" height="3" fill="#d93800" />
  </svg>
);

// 23. Item: Water Bucket
export const ItemWaterBucket: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    <rect x="3" y="4" width="10" height="2" fill="#2c2c2c" />
    <rect x="3" y="6" width="2" height="6" fill="#888888" />
    <rect x="11" y="6" width="2" height="6" fill="#888888" />
    <rect x="5" y="12" width="6" height="2" fill="#888888" />
    {/* Crystal Blue Water */}
    <rect x="5" y="5" width="6" height="4" fill="#1b58b8" />
    <rect x="6" y="6" width="4" height="3" fill="#3888ff" />
    <rect x="7" y="6" width="2" height="1" fill="#88ccff" />
    <rect x="5" y="9" width="6" height="2" fill="#0d3575" />
  </svg>
);

// 24. Item: Compass
export const ItemCompass: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Gold Casing */}
    <rect x="4" y="2" width="8" height="12" fill="#4a3b10" />
    <rect x="2" y="4" width="12" height="8" fill="#4a3b10" />
    <rect x="4" y="3" width="8" height="10" fill="#ccaa33" />
    <rect x="3" y="4" width="10" height="8" fill="#ccaa33" />
    {/* Dial face */}
    <rect x="4" y="4" width="8" height="8" fill="#1a1a1a" />
    {/* Red Needle pointing North */}
    <rect x="7" y="5" width="2" height="3" fill="#ff2222" />
    <rect x="7" y="8" width="2" height="1" fill="#ffffff" />
    <rect x="7" y="9" width="2" height="2" fill="#aaaaaa" />
  </svg>
);

// 25. Item: Clock
export const ItemClock: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    <rect x="4" y="2" width="8" height="12" fill="#4a3b10" />
    <rect x="2" y="4" width="12" height="8" fill="#4a3b10" />
    <rect x="4" y="3" width="8" height="10" fill="#ccaa33" />
    <rect x="3" y="4" width="10" height="8" fill="#ccaa33" />
    {/* Day sky half & Night half */}
    <rect x="4" y="4" width="8" height="4" fill="#4da6ff" />
    <rect x="4" y="8" width="8" height="4" fill="#0a1a33" />
    {/* Golden Sun */}
    <rect x="7" y="5" width="2" height="2" fill="#ffee33" />
  </svg>
);

// 26. Item: Music Disc
export const ItemMusicDisc: React.FC<BlockIconProps & { centerColor?: string }> = ({
  size = 28,
  className = '',
  centerColor = '#ff2255',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Black Vinyl disc */}
    <rect x="4" y="2" width="8" height="12" fill="#111111" />
    <rect x="2" y="4" width="12" height="8" fill="#111111" />
    <rect x="3" y="3" width="10" height="10" fill="#242424" />
    {/* Grooves */}
    <rect x="4" y="4" width="8" height="8" fill="#111111" />
    {/* Center label with specific disc color */}
    <rect x="6" y="6" width="4" height="4" fill={centerColor} />
    {/* Spindle hole */}
    <rect x="7" y="7" width="2" height="2" fill="#000000" />
  </svg>
);

// 27. Block: Jukebox
export const BlockJukebox: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    <rect width="16" height="16" fill="#523924" />
    <rect x="1" y="1" width="14" height="14" fill="#755234" />
    <rect x="2" y="2" width="12" height="12" fill="#523924" />
    {/* Inlaid Diamond Slot */}
    <rect x="6" y="6" width="4" height="4" fill="#2eb8b8" />
    <rect x="7" y="7" width="2" height="2" fill="#111111" />
    {/* Speaker grille pattern */}
    <rect x="3" y="11" width="10" height="2" fill="#302014" />
  </svg>
);

// 28. Block: Note Block
export const BlockNoteBlock: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    <rect width="16" height="16" fill="#755234" />
    <rect x="2" y="2" width="12" height="12" fill="#523924" />
    {/* Musical note icon on side */}
    <rect x="6" y="5" width="2" height="6" fill="#24170d" />
    <rect x="8" y="5" width="3" height="2" fill="#24170d" />
    <rect x="10" y="7" width="2" height="4" fill="#24170d" />
    <rect x="4" y="9" width="3" height="3" fill="#24170d" />
    <rect x="9" y="9" width="3" height="3" fill="#24170d" />
  </svg>
);

// 29. Item: Diamond Pickaxe
export const ItemDiamondPickaxe: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Diamond Head */}
    <rect x="7" y="2" width="7" height="2" fill="#30c2c2" />
    <rect x="12" y="3" width="2" height="3" fill="#30c2c2" />
    <rect x="13" y="5" width="2" height="2" fill="#30c2c2" />
    <rect x="5" y="3" width="3" height="2" fill="#30c2c2" />
    <rect x="3" y="5" width="3" height="2" fill="#30c2c2" />
    <rect x="8" y="2" width="4" height="1" fill="#99ffff" />
    {/* Wooden Stick Handle */}
    <rect x="7" y="6" width="2" height="2" fill="#664422" />
    <rect x="6" y="8" width="2" height="2" fill="#664422" />
    <rect x="5" y="10" width="2" height="2" fill="#664422" />
    <rect x="4" y="12" width="2" height="2" fill="#664422" />
    <rect x="3" y="14" width="2" height="2" fill="#402810" />
  </svg>
);

// 30. Item: Firework Rocket
export const ItemFireworkRocket: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Paper body */}
    <rect x="5" y="3" width="6" height="8" fill="#dddddd" />
    <rect x="5" y="3" width="6" height="2" fill="#cc2222" />
    <rect x="5" y="7" width="6" height="2" fill="#cc2222" />
    {/* Fuse */}
    <rect x="7" y="11" width="2" height="2" fill="#887755" />
    <rect x="8" y="13" width="2" height="2" fill="#ffaa00" />
  </svg>
);

// 31. Item: Potion Bottle
export const ItemPotion: React.FC<BlockIconProps & { liquidColor?: string }> = ({
  size = 28,
  className = '',
  liquidColor = '#cc22aa',
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Cork */}
    <rect x="7" y="2" width="2" height="2" fill="#885522" />
    {/* Bottle Neck */}
    <rect x="6" y="4" width="4" height="2" fill="#99ccff" opacity="0.6" />
    {/* Glass Bottle Body */}
    <rect x="4" y="6" width="8" height="8" fill="#000000" opacity="0.3" />
    <rect x="4" y="7" width="8" height="6" fill={liquidColor} />
    <rect x="5" y="8" width="6" height="4" fill={liquidColor} />
    {/* Glass shine */}
    <rect x="5" y="7" width="1" height="4" fill="#ffffff" opacity="0.7" />
  </svg>
);

// 32. Block: Enchanting Table
export const BlockEnchantingTable: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Obsidian Base */}
    <rect x="0" y="8" width="16" height="8" fill="#140c21" />
    <rect x="1" y="9" width="14" height="6" fill="#24153b" />
    {/* Red carpet top */}
    <rect x="0" y="6" width="16" height="2" fill="#8f1515" />
    <rect x="1" y="6" width="14" height="1" fill="#ba2727" />
    {/* Hovering Spellbook on top */}
    <rect x="4" y="1" width="8" height="4" fill="#5e2912" />
    <rect x="5" y="2" width="6" height="2" fill="#eae3d2" />
  </svg>
);

// 33. Block: Netherrack
export const BlockNetherrack: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    <rect width="16" height="16" fill="#661414" />
    <rect x="2" y="2" width="3" height="3" fill="#8a2020" />
    <rect x="8" y="3" width="4" height="2" fill="#400b0b" />
    <rect x="3" y="9" width="5" height="4" fill="#400b0b" />
    <rect x="10" y="8" width="4" height="5" fill="#8a2020" />
    <rect x="6" y="6" width="2" height="2" fill="#a83232" />
  </svg>
);

// 34. Item: Spawn Egg
export const ItemSpawnEgg: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    <rect x="5" y="2" width="6" height="12" fill="#55aa55" />
    <rect x="3" y="4" width="10" height="8" fill="#55aa55" />
    {/* Darker green spots */}
    <rect x="5" y="4" width="2" height="2" fill="#115511" />
    <rect x="9" y="6" width="2" height="2" fill="#115511" />
    <rect x="6" y="9" width="2" height="2" fill="#115511" />
  </svg>
);

// 35. Item: Redstone Repeater
export const ItemRedstoneRepeater: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Stone slab base */}
    <rect x="1" y="9" width="14" height="5" fill="#777777" />
    <rect x="1" y="9" width="14" height="1" fill="#aaaaaa" />
    {/* Redstone Torches */}
    <rect x="4" y="3" width="2" height="6" fill="#553311" />
    <rect x="4" y="2" width="2" height="2" fill="#ff2222" />
    <rect x="10" y="5" width="2" height="4" fill="#553311" />
    <rect x="10" y="4" width="2" height="2" fill="#ff2222" />
  </svg>
);

// 36. Item: Redstone Torch
export const ItemRedstoneTorch: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Wooden stick base */}
    <rect x="7" y="6" width="2" height="8" fill="#593a1c" />
    <rect x="7" y="10" width="2" height="4" fill="#3b2510" />
    {/* Glowing Redstone Torch Head */}
    <rect x="6" y="2" width="4" height="5" fill="#990000" />
    <rect x="6" y="2" width="4" height="4" fill="#ff1a1a" />
    <rect x="7" y="3" width="2" height="2" fill="#ff7777" />
    <rect x="7" y="2" width="2" height="1" fill="#ffffff" />
    {/* Glow spark */}
    <rect x="5" y="3" width="1" height="2" fill="#ff4444" opacity="0.6" />
    <rect x="10" y="3" width="1" height="2" fill="#ff4444" opacity="0.6" />
  </svg>
);

// 37. Item: Enchanted Golden Apple (Notch Apple with mystical purple glint)
export const ItemEnchantedGoldenApple: React.FC<BlockIconProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Stem */}
    <rect x="8" y="2" width="1" height="3" fill="#4a2560" />
    <rect x="9" y="2" width="2" height="1" fill="#753099" />
    {/* Apple Body with shimmering purple-gold enchantment glint */}
    <rect x="4" y="5" width="8" height="8" fill="#994d1a" />
    <rect x="3" y="6" width="10" height="6" fill="#994d1a" />
    <rect x="5" y="4" width="6" height="9" fill="#ffb833" />
    <rect x="4" y="6" width="8" height="6" fill="#ffcc44" />
    {/* Mystical pink/purple enchantment sheen */}
    <rect x="5" y="5" width="4" height="2" fill="#ff77ee" />
    <rect x="7" y="7" width="4" height="2" fill="#cc44ff" />
    <rect x="4" y="8" width="3" height="2" fill="#ff88ee" />
    {/* Brilliant glint specular */}
    <rect x="6" y="5" width="2" height="2" fill="#ffffff" />
    <rect x="10" y="6" width="1" height="3" fill="#ffffff" />
  </svg>
);


