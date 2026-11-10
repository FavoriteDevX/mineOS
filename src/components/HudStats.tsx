import React from 'react';
import { IconHeart, IconHunger, IconArmor, IconBubble } from './MinecraftIcons';

interface HudStatsProps {
  health: number; // 0 - 20
  hunger: number; // 0 - 20
  armor: number; // 0 - 20
  bubbles?: number; // 0 - 10
  level: number;
  xpProgress: number; // 0 - 100%
}

export const HudStats: React.FC<HudStatsProps> = ({
  health = 20,
  hunger = 20,
  armor = 16,
  bubbles = 10,
  level = 8,
  xpProgress = 32,
}) => {
  return (
    <div className="flex flex-col items-center select-none pointer-events-none mb-1">
      {/* Authentic Minecraft HUD container: exactly 378px matching 9 hotbar slots (9 * 42px) */}
      <div className="w-[378px] relative flex flex-col items-center">
        {/* Render the exact authentic Minecraft HUD image provided by user */}
        <img
          src="/assets/minecraft_hud.png"
          alt="Minecraft HUD Health, Hunger and Experience Bar"
          width={378}
          height={38}
          className="w-[378px] h-[38px] object-contain select-none pointer-events-none block drop-shadow-md"
          style={{ imageRendering: 'pixelated' }}
          draggable={false}
        />

        {/* Dynamic Level number overlay if level changes from default 8 */}
        {level !== 8 && (
          <span
            className="absolute top-[8px] text-[#80ff20] font-bold text-[13px] leading-none mc-font z-20 pointer-events-none"
            style={{
              textShadow:
                '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 0 1px 0 #000, 0 -1px 0 #000, 1px 0 0 #000, -1px 0 0 #000',
            }}
          >
            {level}
          </span>
        )}
      </div>
    </div>
  );
};
