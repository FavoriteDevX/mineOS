import React, { useState } from 'react';
import { MacOsIcon, type MacOsIconType } from './MacOsIcon';
import { ItemGoldenApple } from './MinecraftBlockIcons';
import { SoundEngine } from '../utils/audio';
import { ALL_APPS_DICT, type AppDefinition, ALL_APPS } from './apps/appRegistry';

export { ALL_APPS, ALL_APPS_DICT };
export type { AppDefinition };
export type IconDisplayMode = 'macos' | 'minecraft' | 'hybrid';

// Legacy export for backwards compatibility
export const APPS_LIST = ALL_APPS.slice(0, 9);

interface HotbarDockProps {
  activeAppId: string | null;
  openAppIds: string[];
  iconMode: IconDisplayMode;
  hotbarAppIds?: string[];
  highlightedDropSlot?: number | null;
  onToggleIconMode: () => void;
  onOpenApp: (appId: string) => void;
  onEatFood: () => void;
  onSlotDrop?: (slotIndex: number, appId: string) => void;
  foodCount?: number;
}

export const HotbarDock: React.FC<HotbarDockProps> = ({
  activeAppId,
  openAppIds,
  iconMode,
  hotbarAppIds = ['finder', 'browser', 'terminal', 'notes', 'jukebox', 'calc', 'activity', 'store', 'vault'],
  highlightedDropSlot = null,
  onToggleIconMode,
  onOpenApp,
  onEatFood,
  onSlotDrop,
  foodCount = 16,
}) => {
  const [hoveredSlotApp, setHoveredSlotApp] = useState<AppDefinition | null>(null);
  const [hoveredOffhand, setHoveredOffhand] = useState(false);
  const [draggedSlotIdx, setDraggedSlotIdx] = useState<number | null>(null);

  const handleAppClick = (app: AppDefinition) => {
    SoundEngine.playPop(0.3);
    onOpenApp(app.id);
  };

  const handleEat = () => {
    if (foodCount > 0) {
      SoundEngine.playEat(0.35);
      onEatFood();
    }
  };

  const handleSlotDragStart = (e: React.DragEvent, slotIdx: number, appId: string) => {
    e.dataTransfer.setData('text/plain', appId);
    e.dataTransfer.setData('source-slot', slotIdx.toString());
    setDraggedSlotIdx(slotIdx);
  };

  const handleSlotDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleSlotDropEvent = (e: React.DragEvent, targetSlotIdx: number) => {
    e.preventDefault();
    const droppedAppId = e.dataTransfer.getData('text/plain');
    if (droppedAppId && onSlotDrop) {
      SoundEngine.playLevelUp(0.35);
      onSlotDrop(targetSlotIdx, droppedAppId);
    }
    setDraggedSlotIdx(null);
  };

  return (
    <div className="relative flex flex-col items-center select-none pb-2">
      {/* Minecraft Tooltip floating above hovered slot */}
      {hoveredSlotApp && (
        <div className="absolute -top-14 z-50 mc-tooltip px-3 py-1 text-center whitespace-nowrap pointer-events-none transition-opacity">
          <div className="text-[#ffff55] font-bold text-base leading-tight">
            {hoveredSlotApp.name} <span className="text-[#aaaaaa] text-xs">({hoveredSlotApp.macosParody})</span>
          </div>
          <div className="text-[#ffffff] text-xs leading-none">
            {hoveredSlotApp.description} <span className="text-[#55ff55] ml-1">[{hoveredSlotApp.slotNumber || ''}]</span>
          </div>
        </div>
      )}

      {hoveredOffhand && (
        <div className="absolute -top-14 z-50 mc-tooltip px-3 py-1 text-center whitespace-nowrap pointer-events-none">
          <div className="text-[#ffff55] font-bold text-base leading-tight">
            Golden Apple Ration <span className="text-[#55ff55] text-xs">[Click to Eat]</span>
          </div>
          <div className="text-[#ffffff] text-xs leading-none">
            Restores health & hunger shanks [F]
          </div>
        </div>
      )}

      {/* Main Continuous Minecraft Hotbar Row - Expanded size (50px slots) */}
      <div className="flex items-center gap-3">
        {/* Offhand Slot (Left side, matching Minecraft Java layout) */}
        <div className="p-[2px] bg-[#1a1a1a] border-2 border-[#000000] shadow-2xl">
          <button
            type="button"
            onClick={handleEat}
            onMouseEnter={() => setHoveredOffhand(true)}
            onMouseLeave={() => setHoveredOffhand(false)}
            title="Offhand Ration - Click to Eat"
            aria-label="Eat Ration"
            className="relative w-[50px] h-[50px] flex items-center justify-center mc-slot hover:brightness-110 active:scale-95"
          >
            <ItemGoldenApple size={36} />

            {/* Stack count in slot bottom right */}
            {foodCount > 0 && (
              <span
                className="absolute bottom-0.5 right-1.5 text-xs font-bold text-[#ffffff] mc-font mc-text-shadow leading-none"
                style={{ textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000' }}
              >
                {foodCount}
              </span>
            )}

            {/* Offhand 'F' key label in corner */}
            <span className="absolute top-0.5 left-1 text-[10px] text-[#ffff55] font-bold opacity-75 leading-none">
              F
            </span>
          </button>
        </div>

        {/* The 9-slot seamless inventory bar: expanded length (9 x 50px = 450px) */}
        <div
          id="hotbar-slots-container"
          className="flex items-center p-[2px] bg-[#1a1a1a] border-2 border-[#000000] shadow-2xl relative"
        >
          {hotbarAppIds.slice(0, 9).map((appId, slotIdx) => {
            const app = ALL_APPS_DICT[appId] || ALL_APPS[0];
            const isOpen = openAppIds.includes(app.id);
            const isActive = activeAppId === app.id;
            const isDropHighlighted = highlightedDropSlot === slotIdx;
            const slotNumber = slotIdx + 1;

            return (
              <div
                key={`slot-${slotIdx}`}
                data-hotbar-slot={slotIdx}
                onDragOver={handleSlotDragOver}
                onDrop={(e) => handleSlotDropEvent(e, slotIdx)}
                className="relative"
              >
                <button
                  type="button"
                  draggable
                  onDragStart={(e) => handleSlotDragStart(e, slotIdx, app.id)}
                  onClick={() => handleAppClick(app)}
                  onMouseEnter={() => setHoveredSlotApp({ ...app, slotNumber })}
                  onMouseLeave={() => setHoveredSlotApp(null)}
                  aria-label={`${app.name} (${app.macosParody})`}
                  className={`relative w-[50px] h-[50px] flex items-center justify-center mc-slot transition-all ${
                    isActive ? 'mc-slot-selected z-20' : 'hover:brightness-110'
                  } ${isDropHighlighted ? 'ring-2 ring-[#ffff55] bg-white/20' : ''}`}
                >
                  {/* Active Minecraft Selector Frame Overlay */}
                  {isActive && (
                    <div className="absolute -inset-1 border-[3px] border-[#ffffff] pointer-events-none z-30 shadow-md" />
                  )}

                  {/* Drop target indicator */}
                  {isDropHighlighted && (
                    <div className="absolute inset-0 bg-[#55ff55]/30 border-2 border-[#55ff55] pointer-events-none z-40 animate-pulse" />
                  )}

                  {/* Centered App Icon with substantial 38px dimensions */}
                  <div className="flex items-center justify-center w-full h-full pointer-events-none">
                    {iconMode === 'macos' && (
                      <MacOsIcon
                        type={app.macosIconType}
                        size={38}
                        className="rounded-[7px] shadow-sm transform transition-transform group-hover:scale-105"
                      />
                    )}

                    {iconMode === 'minecraft' && (
                      <div className="flex items-center justify-center transform transition-transform group-hover:scale-110">
                        {app.minecraftIcon}
                      </div>
                    )}

                    {iconMode === 'hybrid' && (
                      <div className="relative flex items-center justify-center">
                        <MacOsIcon type={app.macosIconType} size={32} className="rounded-[6px] opacity-85" />
                        <div className="absolute -bottom-1 -right-1 scale-75 bg-black/80 p-0.5 rounded border border-[#555555]">
                          {app.minecraftIcon}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* macOS running indicator: Emerald green pip in bottom-right */}
                  {isOpen && (
                    <div
                      title="Running"
                      className="absolute bottom-1 right-1 w-2 h-2 bg-[#55ff55] border border-[#003300] z-10 rounded-[1px] shadow-xs"
                    />
                  )}

                  {/* Slot index number in top-left */}
                  <span className="absolute top-0.5 left-1 text-[11px] text-[#ffffff] font-bold opacity-75 leading-none mc-text-shadow-sm pointer-events-none z-10">
                    {slotNumber}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Icon Style Mode Switcher */}
        <button
          type="button"
          onClick={() => {
            SoundEngine.playClick(0.3);
            onToggleIconMode();
          }}
          title={`Switch Icon Style: Currently ${iconMode.toUpperCase()} (Click to toggle)`}
          aria-label="Switch Icon Style"
          className="h-[54px] px-3 flex flex-col items-center justify-center mc-button text-[9px] font-bold tracking-tight shadow-2xl"
        >
          <span>ICONS:</span>
          <span className="text-[#ffff55]">
            {iconMode === 'macos' ? 'APPLE' : iconMode === 'minecraft' ? 'BLOCKS' : 'HYBRID'}
          </span>
        </button>
      </div>
    </div>
  );
};
