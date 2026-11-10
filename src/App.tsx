import React, { useState, useEffect, useRef } from 'react';
import { TopMenuBar } from './components/TopMenuBar';
import { HudStats } from './components/HudStats';
import { HotbarDock, type IconDisplayMode } from './components/HotbarDock';
import { WindowFrame } from './components/WindowFrame';
import { MacOsIcon } from './components/MacOsIcon';

// App Components
import { SeekerApp } from './components/apps/SeekerApp';
import { NetherSafariApp } from './components/apps/NetherSafariApp';
import { CommandBlockApp } from './components/apps/CommandBlockApp';
import { BookAndQuillApp } from './components/apps/BookAndQuillApp';
import { JukeboxApp } from './components/apps/JukeboxApp';
import { RedstoneCalcApp } from './components/apps/RedstoneCalcApp';
import { EntityTrackerApp } from './components/apps/EntityTrackerApp';
import { TradingPostApp } from './components/apps/TradingPostApp';
import { ItemFrameApp } from './components/apps/ItemFrameApp';
import { RedstoneSettingsApp } from './components/apps/RedstoneSettingsApp';
import { BlockVaultApp, type MinecraftItem } from './components/apps/BlockVaultApp';

import {
  ALL_APPS,
  ALL_APPS_DICT,
  type AppDefinition,
} from './components/apps/appRegistry';

import {
  createInitialFileSystem,
  VirtualFile,
  type CommandContext,
} from './utils/minecraftLogic';
import { SoundEngine } from './utils/audio';

interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

interface DesktopIconPosition {
  id: string;
  x: number;
  y: number;
}

export default function App() {
  // World Simulation State
  const [timeTicks, setTimeTicks] = useState(2000); // 2000 = mid-morning
  const [dayCycleSpeed, setDayCycleSpeed] = useState<'realtime' | 'fast' | 'frozen'>('realtime');
  const [biome, setBiome] = useState('Caves & Cliffs');
  const [showClouds, setShowClouds] = useState(false);
  const [difficulty, setDifficulty] = useState<'peaceful' | 'easy' | 'normal' | 'hard'>('normal');
  const [isMuted, setIsMuted] = useState(false);
  const [iconMode, setIconMode] = useState<IconDisplayMode>('macos');

  // Player Stats
  const [health, setHealth] = useState(20);
  const [hunger, setHunger] = useState(20);
  const [armor, setArmor] = useState(16);
  const [level, setLevel] = useState(8);
  const [xpProgress, setXpProgress] = useState(32);
  const [foodCount, setFoodCount] = useState(16);

  // File System State
  const [files, setFiles] = useState<VirtualFile[]>(() => createInitialFileSystem());

  // Command Context for Command Block (Terminal)
  const [commandContext, setCommandContext] = useState<CommandContext>({
    timeTicks: 2000,
    weather: 'clear',
    gameMode: 'survival',
    difficulty: 'normal',
    volume: 0.8,
    inventory: ['diamond x64', 'golden_apple x16'],
  });

  // Hotbar Slots state (9 slots - slot 1 is MineFinder!)
  const [hotbarAppIds, setHotbarAppIds] = useState<string[]>([
    'finder',
    'browser',
    'terminal',
    'notes',
    'jukebox',
    'calc',
    'activity',
    'store',
    'vault',
  ]);

  // Desktop Icons with free drag coordinates (x, y)
  // Grid layout across the left side of the desktop
  const [desktopIcons, setDesktopIcons] = useState<DesktopIconPosition[]>(() => {
    return ALL_APPS.map((app, index) => {
      const col = Math.floor(index / 7);
      const row = index % 7;
      return {
        id: app.id,
        x: 24 + col * 92,
        y: 18 + row * 82,
      };
    });
  });

  // Dragging state for desktop icons
  const [draggingAppId, setDraggingAppId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dragPos, setDragPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredHotbarSlot, setHoveredHotbarSlot] = useState<number | null>(null);

  // Generic window data for any open extra apps
  const [genericAppModal, setGenericAppModal] = useState<AppDefinition | null>(null);

  // Windows State Management
  const [windows, setWindows] = useState<Record<string, WindowState>>({
    finder: { isOpen: true, isMinimized: false, zIndex: 10 },
    browser: { isOpen: false, isMinimized: false, zIndex: 1 },
    terminal: { isOpen: false, isMinimized: false, zIndex: 1 },
    notes: { isOpen: false, isMinimized: false, zIndex: 1 },
    jukebox: { isOpen: false, isMinimized: false, zIndex: 1 },
    calc: { isOpen: false, isMinimized: false, zIndex: 1 },
    activity: { isOpen: false, isMinimized: false, zIndex: 1 },
    store: { isOpen: false, isMinimized: false, zIndex: 1 },
    vault: { isOpen: false, isMinimized: false, zIndex: 1 },
    itemframe: { isOpen: false, isMinimized: false, zIndex: 1 },
    settings: { isOpen: false, isMinimized: false, zIndex: 1 },
  });

  const [activeAppId, setActiveAppId] = useState<string | null>('finder');
  const [showAboutModal, setShowAboutModal] = useState(false);
  const topZIndex = useRef(15);

  // Keyboard number keys 1-9 to select hotbar apps, and 'E' for inventory vault
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key.toLowerCase() === 'e') {
        openApp('vault');
        return;
      }

      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 9) {
        const targetAppId = hotbarAppIds[num - 1];
        if (targetAppId) {
          openApp(targetAppId);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hotbarAppIds]);

  // Day/Night Cycle Timer
  useEffect(() => {
    if (dayCycleSpeed === 'frozen') return;
    const intervalMs = dayCycleSpeed === 'fast' ? 100 : 800;
    const step = dayCycleSpeed === 'fast' ? 100 : 16;

    const timer = setInterval(() => {
      setTimeTicks((prev) => (prev + step) % 24000);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [dayCycleSpeed]);

  const bringToFront = (appId: string) => {
    topZIndex.current += 1;
    setWindows((prev) => ({
      ...prev,
      [appId]: {
        ...(prev[appId] || { isOpen: true, isMinimized: false }),
        zIndex: topZIndex.current,
        isMinimized: false,
      },
    }));
    setActiveAppId(appId);
  };

  const openApp = (appId: string) => {
    SoundEngine.playChestOpen(0.3);
    topZIndex.current += 1;

    // Check if it's one of the built-in window apps
    const builtInApps = [
      'finder',
      'browser',
      'terminal',
      'notes',
      'jukebox',
      'calc',
      'activity',
      'store',
      'vault',
      'itemframe',
      'settings',
    ];

    if (builtInApps.includes(appId)) {
      setWindows((prev) => ({
        ...prev,
        [appId]: {
          isOpen: true,
          isMinimized: false,
          zIndex: topZIndex.current,
        },
      }));
    } else {
      // Open as detailed Minecraft OS feature preview modal
      const app = ALL_APPS_DICT[appId];
      if (app) {
        setGenericAppModal(app);
      }
    }
    setActiveAppId(appId);
  };

  const closeApp = (appId: string) => {
    setWindows((prev) => ({
      ...prev,
      [appId]: {
        ...(prev[appId] || { isOpen: false, isMinimized: false, zIndex: 1 }),
        isOpen: false,
      },
    }));
    if (activeAppId === appId) {
      setActiveAppId(null);
    }
  };

  const minimizeApp = (appId: string) => {
    setWindows((prev) => ({
      ...prev,
      [appId]: {
        ...(prev[appId] || { isOpen: true, isMinimized: true, zIndex: 1 }),
        isMinimized: true,
      },
    }));
    if (activeAppId === appId) {
      setActiveAppId(null);
    }
  };

  const resetWindowPositions = () => {
    SoundEngine.playPop(0.3);
    window.location.reload();
  };

  const toggleDayNight = () => {
    SoundEngine.playClick(0.3);
    setTimeTicks((prev) => (prev >= 12000 ? 1000 : 14000));
  };

  const handleEatFood = () => {
    if (foodCount > 0) {
      setFoodCount((prev) => prev - 1);
      setHunger(20);
      setHealth(20);
      setXpProgress((prev) => (prev + 12) % 100);
      setLevel((prev) => (xpProgress >= 88 ? prev + 1 : prev));
    }
  };

  const handleEquipVaultItem = (item: MinecraftItem) => {
    if (item.category === 'food') {
      setFoodCount((prev) => prev + 8);
    }
    setLevel((prev) => prev + 1);
  };

  const handleUpdateCommandContext = (updates: Partial<CommandContext>) => {
    setCommandContext((prev) => ({ ...prev, ...updates }));
    if (updates.timeTicks !== undefined) setTimeTicks(updates.timeTicks);
    if (updates.difficulty !== undefined) setDifficulty(updates.difficulty);
  };

  const cycleIconMode = () => {
    if (iconMode === 'macos') setIconMode('minecraft');
    else if (iconMode === 'minecraft') setIconMode('hybrid');
    else setIconMode('macos');
  };

  // Dragging Desktop Icon Handlers
  const handleDesktopIconMouseDown = (
    e: React.MouseEvent,
    appId: string,
    currentX: number,
    currentY: number
  ) => {
    e.preventDefault();
    setDraggingAppId(appId);
    setDragStartPos({ x: e.clientX, y: e.clientY });
    setDragOffset({ x: e.clientX - currentX, y: e.clientY - currentY });
    setDragPos({ x: currentX, y: currentY });
  };

  // Slot drop callback from HotbarDock
  const handleSlotDrop = (slotIndex: number, droppedAppId: string) => {
    setHotbarAppIds((prev) => {
      const next = [...prev];
      // If dropped app is already in hotbar, swap them
      const existingIdx = next.indexOf(droppedAppId);
      if (existingIdx !== -1 && existingIdx !== slotIndex) {
        next[existingIdx] = next[slotIndex];
      }
      next[slotIndex] = droppedAppId;
      return next;
    });
  };

  // Global mouse move & up for smooth desktop icon dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggingAppId) return;

      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      setDragPos({ x: newX, y: newY });

      // Check if mouse is hovering over any hotbar slot
      const elementsUnderCursor = document.elementsFromPoint(e.clientX, e.clientY);
      let foundSlot: number | null = null;
      for (const el of elementsUnderCursor) {
        const slotAttr = el.getAttribute('data-hotbar-slot');
        if (slotAttr !== null) {
          foundSlot = parseInt(slotAttr, 10);
          break;
        }
      }
      setHoveredHotbarSlot(foundSlot);
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!draggingAppId) return;

      const dist = Math.hypot(e.clientX - dragStartPos.x, e.clientY - dragStartPos.y);

      // Check if dropped into a hotbar slot
      const elementsUnderCursor = document.elementsFromPoint(e.clientX, e.clientY);
      let targetSlot: number | null = null;
      for (const el of elementsUnderCursor) {
        const slotAttr = el.getAttribute('data-hotbar-slot');
        if (slotAttr !== null) {
          targetSlot = parseInt(slotAttr, 10);
          break;
        }
      }

      if (targetSlot !== null) {
        // Placed into hotbar slot!
        handleSlotDrop(targetSlot, draggingAppId);
        SoundEngine.playLevelUp(0.4);
      } else if (dist > 5) {
        // Dropped on desktop at new coordinates
        const clampedX = Math.max(10, Math.min(window.innerWidth - 85, dragPos.x));
        const clampedY = Math.max(32, Math.min(window.innerHeight - 150, dragPos.y));

        setDesktopIcons((prev) =>
          prev.map((item) =>
            item.id === draggingAppId ? { ...item, x: clampedX, y: clampedY } : item
          )
        );
        SoundEngine.playPop(0.3);
      } else {
        // Small distance = click! Open app
        openApp(draggingAppId);
      }

      setDraggingAppId(null);
      setHoveredHotbarSlot(null);
    };

    if (draggingAppId) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingAppId, dragOffset, dragPos, dragStartPos]);

  // Celestial Sky Colors & Sun/Moon Coordinates
  const isNight = timeTicks >= 13000 && timeTicks <= 23000;
  const isDuskDawn =
    (timeTicks >= 11500 && timeTicks < 13000) || (timeTicks >= 23000 || timeTicks < 1000);

  let skyGradient = 'from-[#4a9eff] via-[#75baff] to-[#b8ddff]';
  if (biome === 'Nether Wastes') {
    skyGradient = 'from-[#380606] via-[#611212] to-[#8a1a1a]';
  } else if (biome === 'The End') {
    skyGradient = 'from-[#06020d] via-[#100821] to-[#1c1138]';
  } else if (biome === 'Deepslate') {
    skyGradient = 'from-[#101318] via-[#181d24] to-[#252b36]';
  } else if (biome === 'Cherry Grove') {
    skyGradient = isNight
      ? 'from-[#0b0817] via-[#1d122e] to-[#2d1a45]'
      : 'from-[#6ba4ff] via-[#94c3ff] to-[#fbcfe8]';
  } else if (isNight) {
    skyGradient = 'from-[#04060f] via-[#090d21] to-[#11193b]';
  } else if (isDuskDawn) {
    skyGradient = 'from-[#1c1236] via-[#732a38] to-[#e06d53]';
  }

  const celestialAngle = ((timeTicks - 6000) / 24000) * 360;
  const sunX = 50 + 40 * Math.cos((celestialAngle * Math.PI) / 180);
  const sunY = 50 + 40 * Math.sin((celestialAngle * Math.PI) / 180);

  const openAppIds = Object.entries(windows)
    .filter(([, state]) => state.isOpen)
    .map(([id]) => id);

  const isCavesWallpaper = biome === 'Caves & Cliffs';
  const activeAppName = activeAppId
    ? ALL_APPS_DICT[activeAppId]?.name || 'MineFinder'
    : 'MineFinder';

  return (
    <div
      className={`h-screen w-screen flex flex-col overflow-hidden relative select-none ${
        isCavesWallpaper ? 'bg-black' : `bg-gradient-to-b ${skyGradient} transition-colors duration-1000`
      } mc-font`}
      style={
        isCavesWallpaper
          ? {
              backgroundImage: `url('/assets/aistudio/image_14ae6fb1.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
            }
          : { imageRendering: 'pixelated' }
      }
    >
      {/* 1. TOP MAC MENU BAR (Identical to reference Image 2) */}
      <TopMenuBar
        timeTicks={timeTicks}
        biome={biome}
        isMuted={isMuted}
        activeAppName={activeAppName}
        onToggleMute={() => {
          setIsMuted(!isMuted);
          SoundEngine.playClick(0.3);
        }}
        onOpenApp={openApp}
        onToggleTime={toggleDayNight}
        onToggleClouds={() => setShowClouds(!showClouds)}
        onShowAbout={() => setShowAboutModal(true)}
        onResetWindows={resetWindowPositions}
        onEatFood={handleEatFood}
        foodCount={foodCount}
      />

      {/* 2. DESKTOP WORKSPACE (Draggable Desktop Icons & Windows) */}
      <main className="flex-1 relative overflow-hidden z-10">
        {/* DRAGGABLE DESKTOP ICONS */}
        {desktopIcons.map((item) => {
          const app = ALL_APPS_DICT[item.id] || ALL_APPS[0];
          const isDragging = draggingAppId === item.id;
          const currentPosX = isDragging ? dragPos.x : item.x;
          const currentPosY = isDragging ? dragPos.y : item.y;

          return (
            <div
              key={item.id}
              style={{
                position: 'absolute',
                left: `${currentPosX}px`,
                top: `${currentPosY}px`,
                zIndex: isDragging ? 50 : 15,
                transform: isDragging ? 'scale(1.08)' : 'scale(1)',
                transition: isDragging ? 'none' : 'transform 0.15s ease',
              }}
              onMouseDown={(e) => handleDesktopIconMouseDown(e, item.id, item.x, item.y)}
              className="cursor-grab active:cursor-grabbing select-none group"
            >
              <div
                title={`${app.name} (${app.macosParody})\nDrag anywhere or into Hotbar slots`}
                className="flex flex-col items-center gap-1 w-20 p-1.5 rounded hover:bg-black/35 text-white text-center transition-colors pointer-events-auto"
              >
                {/* App Icon: MacOs, Minecraft, or Hybrid */}
                <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform drop-shadow-md">
                  {iconMode === 'macos' && (
                    <MacOsIcon
                      type={app.macosIconType}
                      size={38}
                      className="rounded-[7px] shadow-md"
                    />
                  )}
                  {iconMode === 'minecraft' && (
                    <div className="flex items-center justify-center">
                      {app.minecraftIcon}
                    </div>
                  )}
                  {iconMode === 'hybrid' && (
                    <div className="relative flex items-center justify-center">
                      <MacOsIcon type={app.macosIconType} size={32} className="rounded-[6px] opacity-85" />
                      <div className="absolute -bottom-1 -right-1 scale-65 bg-black/85 p-0.5 rounded border border-[#555555]">
                        {app.minecraftIcon}
                      </div>
                    </div>
                  )}
                </div>

                {/* Fused Apple & Minecraft App Name */}
                <span className="text-[10px] font-bold leading-tight mc-text-shadow bg-black/65 px-1 py-0.5 rounded border border-black/45 truncate max-w-[76px] block">
                  {app.name}
                </span>
              </div>
            </div>
          );
        })}

        {/* WINDOWS CONTAINER */}
        {/* 1. MineFinder (Finder parody) */}
        <WindowFrame
          id="finder"
          title="MineFinder — Overworld Storage"
          icon={<MacOsIcon type="finder" size={20} />}
          isOpen={windows.finder?.isOpen || false}
          isMinimized={windows.finder?.isMinimized || false}
          zIndex={windows.finder?.zIndex || 1}
          initialPos={{ x: 260, y: 35 }}
          initialSize={{ width: 680, height: 430 }}
          onClose={() => closeApp('finder')}
          onMinimize={() => minimizeApp('finder')}
          onFocus={() => bringToFront('finder')}
        >
          <SeekerApp
            files={files}
            onUpdateFiles={setFiles}
            onOpenFileInNotes={() => openApp('notes')}
          />
        </WindowFrame>

        {/* 2. MineSafari (Safari parody) */}
        <WindowFrame
          id="browser"
          title="MineSafari — Portal Browser"
          icon={<MacOsIcon type="safari" size={20} />}
          isOpen={windows.browser?.isOpen || false}
          isMinimized={windows.browser?.isMinimized || false}
          zIndex={windows.browser?.zIndex || 1}
          initialPos={{ x: 280, y: 55 }}
          initialSize={{ width: 720, height: 460 }}
          onClose={() => closeApp('browser')}
          onMinimize={() => minimizeApp('browser')}
          onFocus={() => bringToFront('browser')}
        >
          <NetherSafariApp />
        </WindowFrame>

        {/* 3. CommandTerminal (Terminal parody) */}
        <WindowFrame
          id="terminal"
          title="CommandTerminal — System Shell"
          icon={<MacOsIcon type="shortcuts" size={20} />}
          isOpen={windows.terminal?.isOpen || false}
          isMinimized={windows.terminal?.isMinimized || false}
          zIndex={windows.terminal?.zIndex || 1}
          initialPos={{ x: 300, y: 70 }}
          initialSize={{ width: 630, height: 390 }}
          onClose={() => closeApp('terminal')}
          onMinimize={() => minimizeApp('terminal')}
          onFocus={() => bringToFront('terminal')}
        >
          <CommandBlockApp
            context={commandContext}
            onUpdateContext={handleUpdateCommandContext}
          />
        </WindowFrame>

        {/* 4. CraftNotes (Notes parody) */}
        <WindowFrame
          id="notes"
          title="CraftNotes — Journal"
          icon={<MacOsIcon type="notes" size={20} />}
          isOpen={windows.notes?.isOpen || false}
          isMinimized={windows.notes?.isMinimized || false}
          zIndex={windows.notes?.zIndex || 1}
          initialPos={{ x: 320, y: 60 }}
          initialSize={{ width: 600, height: 440 }}
          onClose={() => closeApp('notes')}
          onMinimize={() => minimizeApp('notes')}
          onFocus={() => bringToFront('notes')}
        >
          <BookAndQuillApp />
        </WindowFrame>

        {/* 5. MineMusic (Music parody) */}
        <WindowFrame
          id="jukebox"
          title="MineMusic — Jukebox & Discs"
          icon={<MacOsIcon type="music" size={20} />}
          isOpen={windows.jukebox?.isOpen || false}
          isMinimized={windows.jukebox?.isMinimized || false}
          zIndex={windows.jukebox?.zIndex || 1}
          initialPos={{ x: 340, y: 40 }}
          initialSize={{ width: 590, height: 430 }}
          onClose={() => closeApp('jukebox')}
          onMinimize={() => minimizeApp('jukebox')}
          onFocus={() => bringToFront('jukebox')}
        >
          <JukeboxApp />
        </WindowFrame>

        {/* 6. RedstoneCalc (Calculator parody) */}
        <WindowFrame
          id="calc"
          title="RedstoneCalc — Stack Logistics"
          icon={<MacOsIcon type="numbers" size={20} />}
          isOpen={windows.calc?.isOpen || false}
          isMinimized={windows.calc?.isMinimized || false}
          zIndex={windows.calc?.zIndex || 1}
          initialPos={{ x: 360, y: 80 }}
          initialSize={{ width: 510, height: 440 }}
          onClose={() => closeApp('calc')}
          onMinimize={() => minimizeApp('calc')}
          onFocus={() => bringToFront('calc')}
        >
          <RedstoneCalcApp />
        </WindowFrame>

        {/* 7. EntityMonitor (Activity Monitor parody) */}
        <WindowFrame
          id="activity"
          title="EntityMonitor — Performance & TPS"
          icon={<MacOsIcon type="stocks" size={20} />}
          isOpen={windows.activity?.isOpen || false}
          isMinimized={windows.activity?.isMinimized || false}
          zIndex={windows.activity?.zIndex || 1}
          initialPos={{ x: 290, y: 60 }}
          initialSize={{ width: 680, height: 420 }}
          onClose={() => closeApp('activity')}
          onMinimize={() => minimizeApp('activity')}
          onFocus={() => bringToFront('activity')}
        >
          <EntityTrackerApp openAppIds={openAppIds} onCloseApp={closeApp} />
        </WindowFrame>

        {/* 8. MineStore (App Store parody) */}
        <WindowFrame
          id="store"
          title="MineStore — Villager Trading Post"
          icon={<MacOsIcon type="appstore" size={20} />}
          isOpen={windows.store?.isOpen || false}
          isMinimized={windows.store?.isMinimized || false}
          zIndex={windows.store?.zIndex || 1}
          initialPos={{ x: 270, y: 50 }}
          initialSize={{ width: 650, height: 440 }}
          onClose={() => closeApp('store')}
          onMinimize={() => minimizeApp('store')}
          onFocus={() => bringToFront('store')}
        >
          <TradingPostApp />
        </WindowFrame>

        {/* 9. BlockPhotos (Photos / Inventory app) */}
        <WindowFrame
          id="vault"
          title="BlockPhotos — Creative Inventory"
          icon={<MacOsIcon type="photos" size={20} />}
          isOpen={windows.vault?.isOpen || false}
          isMinimized={windows.vault?.isMinimized || false}
          zIndex={windows.vault?.zIndex || 1}
          initialPos={{ x: 280, y: 45 }}
          initialSize={{ width: 680, height: 460 }}
          onClose={() => closeApp('vault')}
          onMinimize={() => minimizeApp('vault')}
          onFocus={() => bringToFront('vault')}
        >
          <BlockVaultApp onEquipItem={handleEquipVaultItem} />
        </WindowFrame>

        {/* 10. Item Frame Studio */}
        <WindowFrame
          id="itemframe"
          title="Item Frame — 16x16 Pixel Studio"
          icon={<MacOsIcon type="preview" size={20} />}
          isOpen={windows.itemframe?.isOpen || false}
          isMinimized={windows.itemframe?.isMinimized || false}
          zIndex={windows.itemframe?.zIndex || 1}
          initialPos={{ x: 310, y: 40 }}
          initialSize={{ width: 620, height: 450 }}
          onClose={() => closeApp('itemframe')}
          onMinimize={() => minimizeApp('itemframe')}
          onFocus={() => bringToFront('itemframe')}
        >
          <ItemFrameApp />
        </WindowFrame>

        {/* 11. MineSettings (System Settings parody) */}
        <WindowFrame
          id="settings"
          title="MineSettings — Preferences"
          icon={<MacOsIcon type="settings" size={20} />}
          isOpen={windows.settings?.isOpen || false}
          isMinimized={windows.settings?.isMinimized || false}
          zIndex={windows.settings?.zIndex || 1}
          initialPos={{ x: 300, y: 50 }}
          initialSize={{ width: 600, height: 460 }}
          onClose={() => closeApp('settings')}
          onMinimize={() => minimizeApp('settings')}
          onFocus={() => bringToFront('settings')}
        >
          <RedstoneSettingsApp
            biome={biome}
            onSelectBiome={setBiome}
            dayCycleSpeed={dayCycleSpeed}
            onChangeDayCycleSpeed={setDayCycleSpeed}
            showClouds={showClouds}
            onToggleClouds={() => setShowClouds(!showClouds)}
            difficulty={difficulty}
            onChangeDifficulty={setDifficulty}
            soundEnabled={!isMuted}
            onToggleSound={() => setIsMuted(!isMuted)}
          />
        </WindowFrame>

        {/* GENERIC APP PREVIEW MODAL FOR EXTRA APPS */}
        {genericAppModal && (
          <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md mc-window-frame p-4 flex flex-col items-center text-center text-[#111111]">
              <div className="w-16 h-16 mb-2 flex items-center justify-center">
                <MacOsIcon type={genericAppModal.macosIconType} size={54} />
              </div>
              <h2 className="text-xl font-bold text-[#111111] mc-text-shadow">
                {genericAppModal.name}
              </h2>
              <span className="text-xs font-bold text-[#444444] mb-3">
                Fused with Apple {genericAppModal.macosParody}
              </span>

              <div className="p-3 bg-[#e0e0e0] border-2 border-[#888888] rounded text-left text-xs space-y-1.5 mb-4 w-full">
                <p><strong>Description:</strong> {genericAppModal.description}</p>
                <p><strong>Minecraft Item:</strong> {genericAppModal.name} enchanted tool</p>
                <p><strong>Status:</strong> Integrated in minecraftOS Application Registry</p>
                <p className="text-[#008800] font-bold">Tip: You can drag this app's icon into any Hotbar slot (1-9)!</p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleSlotDrop(0, genericAppModal.id);
                    SoundEngine.playLevelUp(0.4);
                    setGenericAppModal(null);
                  }}
                  className="px-4 py-1.5 mc-button text-xs font-bold"
                >
                  Pin to Hotbar [Slot 1]
                </button>
                <button
                  type="button"
                  onClick={() => {
                    SoundEngine.playClick(0.3);
                    setGenericAppModal(null);
                  }}
                  className="px-4 py-1.5 mc-button text-xs font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ABOUT MODAL */}
        {showAboutModal && (
          <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md mc-window-frame p-4 flex flex-col items-center text-center text-[#222222]">
              <div className="w-16 h-16 mb-2 flex items-center justify-center">
                <MacOsIcon type="finder" size={56} />
              </div>
              <h2 className="text-2xl font-bold text-[#111111] mc-text-shadow">
                minecraftOS
              </h2>
              <span className="text-xs font-bold text-[#555555] mb-2">
                Version 1.21.4 (Java Edition & macOS Sonoma)
              </span>

              <div className="p-3 bg-[#e0e0e0] border-2 border-[#888888] rounded text-left text-xs space-y-1 mb-4 w-full">
                <p><strong>Kernel:</strong> Redstone Flux Microkernel 4.8</p>
                <p><strong>Window Manager:</strong> BlockGlass Quartz Compositor</p>
                <p><strong>Icons:</strong> Apple &times; Minecraft Fused Applications</p>
                <p><strong>MineFinder:</strong> Dirt & Grass Smiling Face</p>
                <p><strong>Hotbar:</strong> Draggable Desktop & Hotbar inventory slots</p>
                <p><strong>User:</strong> Steve (Superuser / OP)</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  SoundEngine.playClick(0.3);
                  setShowAboutModal(false);
                }}
                className="px-6 py-1.5 mc-button text-sm font-bold"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </main>

      {/* 3. BOTTOM MINECRAFT HUD & HOTBAR DOCK */}
      <footer className="relative z-30 flex flex-col items-center pointer-events-auto">
        {/* Authentic Minecraft HUD: Health on Left, Hunger on Right, Armor & Bubbles above, centered Level number */}
        <HudStats
          health={health}
          hunger={hunger}
          armor={armor}
          level={level}
          xpProgress={xpProgress}
        />

        {/* Contiguous 9-slot Hotbar Dock + Left Offhand Slot */}
        <HotbarDock
          activeAppId={activeAppId}
          openAppIds={openAppIds}
          iconMode={iconMode}
          hotbarAppIds={hotbarAppIds}
          highlightedDropSlot={hoveredHotbarSlot}
          onToggleIconMode={cycleIconMode}
          onOpenApp={openApp}
          onEatFood={handleEatFood}
          onSlotDrop={handleSlotDrop}
          foodCount={foodCount}
        />
      </footer>
    </div>
  );
}
