import React, { useState, useEffect } from 'react';
import {
  ItemRedstoneTorch,
  ItemGoldenApple,
  ItemEnchantedGoldenApple,
  ItemDiamondSword,
  ItemClock,
  BlockChest,
  BlockCraftingTable,
  ItemBookAndQuill,
  ResourceRedstone,
  ItemLavaBucket,
} from './MinecraftBlockIcons';
import { SoundEngine } from '../utils/audio';
import { formatMinecraftTime } from '../utils/minecraftLogic';

interface TopMenuBarProps {
  timeTicks: number;
  biome: string;
  isMuted: boolean;
  activeAppId?: string | null;
  activeAppName?: string;
  onToggleMute: () => void;
  onOpenApp: (appId: string) => void;
  onToggleTime: () => void;
  onToggleClouds: () => void;
  onShowAbout: () => void;
  onResetWindows: () => void;
  onEatFood?: () => void;
  foodCount?: number;
}

export const TopMenuBar: React.FC<TopMenuBarProps> = ({
  timeTicks,
  biome,
  isMuted,
  activeAppName = 'MineFinder',
  onToggleMute,
  onOpenApp,
  onToggleTime,
  onToggleClouds,
  onShowAbout,
  onResetWindows,
  onEatFood,
  foodCount = 16,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [hoveredStatus, setHoveredStatus] = useState<string | null>(null);
  const [redstonePulse, setRedstonePulse] = useState(false);
  const [difficulty, setDifficulty] = useState<'Peaceful' | 'Easy' | 'Normal' | 'Hard'>('Normal');
  const [statusToast, setStatusToast] = useState<string | null>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleWindowClick = () => setActiveMenu(null);
    window.addEventListener('click', handleWindowClick);
    return () => window.removeEventListener('click', handleWindowClick);
  }, []);

  const toggleMenu = (menuName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    SoundEngine.playClick(0.2);
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const showToast = (msg: string) => {
    setStatusToast(msg);
    setTimeout(() => setStatusToast(null), 2500);
  };

  // Status Action 1: Redstone Torch
  const handleRedstoneTorchClick = () => {
    SoundEngine.playClick(0.3);
    setRedstonePulse(true);
    setTimeout(() => setRedstonePulse(false), 600);
    showToast('⚡ Redstone pulse broadcasted to all chunks');
  };

  // Status Action 2: Golden Apple
  const handleGoldenAppleClick = () => {
    if (foodCount > 0) {
      SoundEngine.playEat(0.4);
      if (onEatFood) onEatFood();
      showToast('🍎 Consumed Golden Apple! Health & Hunger restored.');
    } else {
      SoundEngine.playPop(0.2);
      showToast('⚠️ No Golden Apples left in offhand slot.');
    }
  };

  // Status Action 3: Enchanted Golden Apple (Notch Apple)
  const handleEnchantedAppleClick = () => {
    SoundEngine.playLevelUp(0.5);
    if (onEatFood) onEatFood();
    showToast('✨ Consumed Enchanted Notch Apple! Absorption IV & Regen II active.');
  };

  // Status Action 4: Diamond Sword
  const handleDiamondSwordClick = () => {
    SoundEngine.playPop(0.35);
    const diffs: ('Peaceful' | 'Easy' | 'Normal' | 'Hard')[] = ['Peaceful', 'Easy', 'Normal', 'Hard'];
    const nextIdx = (diffs.indexOf(difficulty) + 1) % diffs.length;
    const nextDiff = diffs[nextIdx];
    setDifficulty(nextDiff);
    showToast(`⚔️ Diamond Sword: Difficulty set to ${nextDiff}`);
  };

  // Status Action 5: Clock
  const handleClockClick = () => {
    SoundEngine.playClick(0.3);
    onToggleTime();
    showToast(`☀️ Clock: Toggled World Day/Night cycle`);
  };

  const isNight = timeTicks >= 13000 && timeTicks <= 23000;
  const clockString = formatMinecraftTime(timeTicks);

  return (
    <header className="h-7 bg-[#d4d4d6]/92 backdrop-blur-md text-[#111111] border-b border-[#b5b5b8] flex items-center justify-between px-3 z-50 text-[13px] select-none shadow-xs font-sans tracking-tight">
      {/* Toast Notification overlay */}
      {statusToast && (
        <div className="absolute top-9 left-1/2 -translate-x-1/2 z-50 mc-tooltip px-3 py-1 text-center whitespace-nowrap shadow-xl pointer-events-none transition-all">
          <span className="text-[#ffff55] font-bold text-xs">{statusToast}</span>
        </div>
      )}

      {/* Left Menu Items (Matching Image 2 Reference) */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Black Apple Logo Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={(e) => toggleMenu('apple', e)}
            aria-label="Apple Menu"
            className={`px-1.5 py-0.5 flex items-center justify-center hover:bg-black/10 rounded transition-colors ${
              activeMenu === 'apple' ? 'bg-black/15' : ''
            }`}
          >
            {/* Apple Logo SVG */}
            <svg
              className="w-3.5 h-3.5 fill-current text-black"
              viewBox="0 0 170 170"
            >
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.08-7.71-7.96-12.02-14.64-5.99-9.37-10.74-20.08-14.25-32.14-3.51-12.06-5.27-23.47-5.27-34.23 0-14.58 3.59-26.69 10.77-36.33 7.18-9.64 16.27-14.58 27.28-14.83 5.44 0 11.33 1.37 17.67 4.11 6.34 2.74 10.45 4.16 12.33 4.26 1.45 0 5.86-1.48 13.23-4.43 7.37-2.95 13.6-4.22 18.69-3.81 14.5.9 25.8 6.08 33.9 15.53-12.87 7.79-19.19 18.49-18.96 32.1.23 10.59 4.18 19.38 11.84 26.37 4.67 4.35 9.99 7.42 15.96 9.21-2.44 7.27-5.46 14.7-9.05 22.28zM119.22 33.45c0-7.83 2.76-15.34 8.28-22.52 5.52-7.18 12.33-11.43 20.44-12.75.22 1.34.33 2.57.33 3.69 0 7.83-2.94 15.45-8.82 22.86-5.88 7.41-12.78 11.66-20.7 12.75-.45-1.34-.68-2.67-.68-4.03z" />
            </svg>
          </button>

          {activeMenu === 'apple' && (
            <div className="absolute top-7 left-0 w-52 mc-window-frame p-1 z-50 flex flex-col text-[#111111] shadow-2xl mc-font text-xs">
              <button
                type="button"
                onClick={() => {
                  onShowAbout();
                  setActiveMenu(null);
                }}
                className="text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white transition-colors"
              >
                About minecraftOS
              </button>
              <div className="border-b border-[#888888] my-0.5" />
              <button
                type="button"
                onClick={() => {
                  onOpenApp('settings');
                  setActiveMenu(null);
                }}
                className="text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white transition-colors"
              >
                Redstone Settings...
              </button>
              <button
                type="button"
                onClick={() => {
                  onOpenApp('activity');
                  setActiveMenu(null);
                }}
                className="text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white transition-colors"
              >
                Entity Tracker (Activity)
              </button>
              <div className="border-b border-[#888888] my-0.5" />
              <button
                type="button"
                onClick={() => {
                  SoundEngine.playLevelUp(0.4);
                  showToast('Steve has entered AFK rest mode.');
                  setActiveMenu(null);
                }}
                className="text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white transition-colors"
              >
                Sleep (AFK Mode)
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white transition-colors"
              >
                Respawn / Reload World
              </button>
            </div>
          )}
        </div>

        {/* Active Application Name in Bold (Exactly as in Image 2: "MineFinder") */}
        <div className="relative">
          <button
            type="button"
            onClick={(e) => toggleMenu('app', e)}
            className={`font-bold text-[13px] text-black px-1.5 py-0.5 hover:bg-black/10 rounded tracking-tight transition-colors ${
              activeMenu === 'app' ? 'bg-black/15' : ''
            }`}
          >
            {activeAppName}
          </button>
          {activeMenu === 'app' && (
            <div className="absolute top-7 left-0 w-44 mc-window-frame p-1 z-50 flex flex-col text-[#111111] shadow-2xl mc-font text-xs">
              <button
                type="button"
                onClick={() => {
                  showToast(`About ${activeAppName}`);
                  setActiveMenu(null);
                }}
                className="text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white"
              >
                About {activeAppName}
              </button>
              <button
                type="button"
                onClick={() => {
                  onOpenApp('settings');
                  setActiveMenu(null);
                }}
                className="text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white"
              >
                Preferences...
              </button>
              <div className="border-b border-[#888888] my-0.5" />
              <button
                type="button"
                onClick={() => {
                  onResetWindows();
                  setActiveMenu(null);
                }}
                className="text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white"
              >
                Hide Others
              </button>
            </div>
          )}
        </div>

        {/* Menu Item 1: Craft */}
        <div className="relative">
          <button
            type="button"
            onClick={(e) => toggleMenu('craft', e)}
            className={`px-1.5 py-0.5 hover:bg-black/10 rounded transition-colors text-[13px] ${
              activeMenu === 'craft' ? 'bg-black/15' : ''
            }`}
          >
            Craft
          </button>
          {activeMenu === 'craft' && (
            <div className="absolute top-7 left-0 w-52 mc-window-frame p-1 z-50 flex flex-col text-[#111111] shadow-2xl mc-font text-xs">
              <button
                type="button"
                onClick={() => {
                  onOpenApp('vault');
                  setActiveMenu(null);
                }}
                className="flex items-center gap-2 text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white"
              >
                <BlockCraftingTable size={16} />
                <span>Crafting Table Grid</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onOpenApp('notes');
                  setActiveMenu(null);
                }}
                className="flex items-center gap-2 text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white"
              >
                <ItemBookAndQuill size={16} />
                <span>Craft Book & Quill</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onOpenApp('calc');
                  setActiveMenu(null);
                }}
                className="flex items-center gap-2 text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white"
              >
                <ResourceRedstone size={16} />
                <span>Craft Redstone Circuit</span>
              </button>
            </div>
          )}
        </div>

        {/* Menu Item 2: Build */}
        <div className="relative">
          <button
            type="button"
            onClick={(e) => toggleMenu('build', e)}
            className={`px-1.5 py-0.5 hover:bg-black/10 rounded transition-colors text-[13px] ${
              activeMenu === 'build' ? 'bg-black/15' : ''
            }`}
          >
            Build
          </button>
          {activeMenu === 'build' && (
            <div className="absolute top-7 left-0 w-52 mc-window-frame p-1 z-50 flex flex-col text-[#111111] shadow-2xl mc-font text-xs">
              <button
                type="button"
                onClick={() => {
                  onOpenApp('vault');
                  setActiveMenu(null);
                }}
                className="text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white"
              >
                Block & Mineral Palette
              </button>
              <button
                type="button"
                onClick={() => {
                  onOpenApp('itemframe');
                  setActiveMenu(null);
                }}
                className="text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white"
              >
                Item Frame Pixel Studio
              </button>
              <button
                type="button"
                onClick={() => {
                  onResetWindows();
                  setActiveMenu(null);
                }}
                className="text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white"
              >
                Clear Building Grid
              </button>
            </div>
          )}
        </div>

        {/* Menu Item 3: Redstone */}
        <div className="relative">
          <button
            type="button"
            onClick={(e) => toggleMenu('redstone', e)}
            className={`px-1.5 py-0.5 hover:bg-black/10 rounded transition-colors text-[13px] ${
              activeMenu === 'redstone' ? 'bg-black/15' : ''
            }`}
          >
            Redstone
          </button>
          {activeMenu === 'redstone' && (
            <div className="absolute top-7 left-0 w-52 mc-window-frame p-1 z-50 flex flex-col text-[#111111] shadow-2xl mc-font text-xs">
              <button
                type="button"
                onClick={() => {
                  onOpenApp('calc');
                  setActiveMenu(null);
                }}
                className="flex items-center gap-2 text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white"
              >
                <ResourceRedstone size={16} />
                <span>Redstone Calculator</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onOpenApp('terminal');
                  setActiveMenu(null);
                }}
                className="text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white"
              >
                Command Block Console
              </button>
              <button
                type="button"
                onClick={() => {
                  handleRedstoneTorchClick();
                  setActiveMenu(null);
                }}
                className="flex items-center gap-2 text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white"
              >
                <ItemRedstoneTorch size={16} />
                <span>Trigger Redstone Pulse</span>
              </button>
            </div>
          )}
        </div>

        {/* Menu Item 4: Inventory */}
        <div className="relative">
          <button
            type="button"
            onClick={(e) => toggleMenu('inventory', e)}
            className={`px-1.5 py-0.5 hover:bg-black/10 rounded transition-colors text-[13px] ${
              activeMenu === 'inventory' ? 'bg-black/15' : ''
            }`}
          >
            Inventory
          </button>
          {activeMenu === 'inventory' && (
            <div className="absolute top-7 left-0 w-56 mc-window-frame p-1 z-50 flex flex-col text-[#111111] shadow-2xl mc-font text-xs">
              <button
                type="button"
                onClick={() => {
                  onOpenApp('vault');
                  setActiveMenu(null);
                }}
                className="text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white"
              >
                Open Creative Vault [E]
              </button>
              <button
                type="button"
                onClick={() => {
                  handleGoldenAppleClick();
                  setActiveMenu(null);
                }}
                className="flex items-center gap-2 text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white"
              >
                <ItemGoldenApple size={16} />
                <span>Eat Golden Apple Ration [F]</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onOpenApp('finder');
                  setActiveMenu(null);
                }}
                className="flex items-center gap-2 text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white"
              >
                <BlockChest size={16} />
                <span>Manage Chest Storage</span>
              </button>
            </div>
          )}
        </div>

        {/* Menu Item 5: Go */}
        <div className="relative">
          <button
            type="button"
            onClick={(e) => toggleMenu('go', e)}
            className={`px-1.5 py-0.5 hover:bg-black/10 rounded transition-colors text-[13px] ${
              activeMenu === 'go' ? 'bg-black/15' : ''
            }`}
          >
            Go
          </button>
          {activeMenu === 'go' && (
            <div className="absolute top-7 left-0 w-48 mc-window-frame p-1 z-50 flex flex-col text-[#111111] shadow-2xl mc-font text-xs">
              <button
                type="button"
                onClick={() => {
                  onOpenApp('finder');
                  setActiveMenu(null);
                }}
                className="text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white"
              >
                📁 /Desktop
              </button>
              <button
                type="button"
                onClick={() => {
                  onOpenApp('browser');
                  setActiveMenu(null);
                }}
                className="text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white"
              >
                🌐 Nether Safari Browser
              </button>
              <button
                type="button"
                onClick={() => {
                  onOpenApp('store');
                  setActiveMenu(null);
                }}
                className="text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white"
              >
                🏪 Villager Trading Post
              </button>
              <button
                type="button"
                onClick={() => {
                  onOpenApp('jukebox');
                  setActiveMenu(null);
                }}
                className="text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white"
              >
                📻 Jukebox Player
              </button>
            </div>
          )}
        </div>

        {/* Menu Item 6: World */}
        <div className="relative">
          <button
            type="button"
            onClick={(e) => toggleMenu('world', e)}
            className={`px-1.5 py-0.5 hover:bg-black/10 rounded transition-colors text-[13px] ${
              activeMenu === 'world' ? 'bg-black/15' : ''
            }`}
          >
            World
          </button>
          {activeMenu === 'world' && (
            <div className="absolute top-7 left-0 w-52 mc-window-frame p-1 z-50 flex flex-col text-[#111111] shadow-2xl mc-font text-xs">
              <button
                type="button"
                onClick={() => {
                  onToggleTime();
                  setActiveMenu(null);
                }}
                className="text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white"
              >
                Toggle Day / Night ({clockString})
              </button>
              <button
                type="button"
                onClick={() => {
                  onToggleClouds();
                  setActiveMenu(null);
                }}
                className="text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white"
              >
                Toggle Floating Clouds
              </button>
              <div className="border-b border-[#888888] my-0.5" />
              <div className="px-2 py-1 text-[11px] font-bold text-[#555555]">
                Current Biome: [{biome}]
              </div>
            </div>
          )}
        </div>

        {/* Menu Item 7: Help */}
        <div className="relative">
          <button
            type="button"
            onClick={(e) => toggleMenu('help', e)}
            className={`px-1.5 py-0.5 hover:bg-black/10 rounded transition-colors text-[13px] ${
              activeMenu === 'help' ? 'bg-black/15' : ''
            }`}
          >
            Help
          </button>
          {activeMenu === 'help' && (
            <div className="absolute top-7 left-0 w-52 mc-window-frame p-1 z-50 flex flex-col text-[#111111] shadow-2xl mc-font text-xs">
              <button
                type="button"
                onClick={() => {
                  onShowAbout();
                  setActiveMenu(null);
                }}
                className="text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white"
              >
                minecraftOS Manual
              </button>
              <button
                type="button"
                onClick={() => {
                  onOpenApp('browser');
                  setActiveMenu(null);
                }}
                className="text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white"
              >
                Minecraft Wiki Online
              </button>
              <button
                type="button"
                onClick={() => {
                  onOpenApp('terminal');
                  setActiveMenu(null);
                }}
                className="text-left px-2 py-1 font-bold hover:bg-[#386cb0] hover:text-white"
              >
                Command Terminal Reference
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Status Item Icons (Exactly matching the 5 icons in Image 2) */}
      <div className="flex items-center gap-2.5">
        {/* 1. Redstone Torch */}
        <button
          type="button"
          onClick={handleRedstoneTorchClick}
          onMouseEnter={() => setHoveredStatus('torch')}
          onMouseLeave={() => setHoveredStatus(null)}
          title="Redstone Torch (Click to broadcast pulse)"
          aria-label="Redstone Torch"
          className={`p-0.5 hover:bg-black/10 rounded transition-transform active:scale-95 ${
            redstonePulse ? 'brightness-150 scale-110' : ''
          }`}
        >
          <ItemRedstoneTorch size={18} />
        </button>

        {/* 2. Golden Apple */}
        <button
          type="button"
          onClick={handleGoldenAppleClick}
          onMouseEnter={() => setHoveredStatus('gapple')}
          onMouseLeave={() => setHoveredStatus(null)}
          title={`Golden Apple Ration: ${foodCount} left (Click to eat)`}
          aria-label="Golden Apple Ration"
          className="p-0.5 hover:bg-black/10 rounded transition-transform active:scale-95 relative"
        >
          <ItemGoldenApple size={18} />
        </button>

        {/* 3. Enchanted Golden Apple (Notch Apple) */}
        <button
          type="button"
          onClick={handleEnchantedAppleClick}
          onMouseEnter={() => setHoveredStatus('notch')}
          onMouseLeave={() => setHoveredStatus(null)}
          title="Enchanted Golden Apple (Absorption & Regeneration)"
          aria-label="Enchanted Golden Apple"
          className="p-0.5 hover:bg-black/10 rounded transition-transform active:scale-95 animate-pulse"
        >
          <ItemEnchantedGoldenApple size={18} />
        </button>

        {/* 4. Diamond Sword */}
        <button
          type="button"
          onClick={handleDiamondSwordClick}
          onMouseEnter={() => setHoveredStatus('sword')}
          onMouseLeave={() => setHoveredStatus(null)}
          title={`Diamond Sword (Difficulty: ${difficulty})`}
          aria-label="Diamond Sword"
          className="p-0.5 hover:bg-black/10 rounded transition-transform active:scale-95 hover:rotate-12"
        >
          <ItemDiamondSword size={18} />
        </button>

        {/* 5. Clock */}
        <button
          type="button"
          onClick={handleClockClick}
          onMouseEnter={() => setHoveredStatus('clock')}
          onMouseLeave={() => setHoveredStatus(null)}
          title={`Minecraft Clock (${clockString}) - Click to toggle Day/Night`}
          aria-label="Minecraft Clock"
          className="p-0.5 hover:bg-black/10 rounded transition-transform active:scale-95"
        >
          <ItemClock size={18} />
        </button>
      </div>
    </header>
  );
};

