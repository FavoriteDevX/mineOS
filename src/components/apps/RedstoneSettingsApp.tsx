import React from 'react';
import { SoundEngine } from '../../utils/audio';

interface RedstoneSettingsProps {
  biome: string;
  onSelectBiome: (biome: string) => void;
  dayCycleSpeed: 'realtime' | 'fast' | 'frozen';
  onChangeDayCycleSpeed: (speed: 'realtime' | 'fast' | 'frozen') => void;
  showClouds: boolean;
  onToggleClouds: () => void;
  difficulty: 'peaceful' | 'easy' | 'normal' | 'hard';
  onChangeDifficulty: (diff: 'peaceful' | 'easy' | 'normal' | 'hard') => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

const BIOMES = [
  { id: 'Caves & Cliffs', name: 'Caves & Cliffs (Official Art)', desc: 'Epic Steve & Alex cavern with lush caves & amethyst' },
  { id: 'Plains', name: 'Overworld Plains', desc: 'Lush green rolling hills & blue sky' },
  { id: 'Cherry Grove', name: 'Cherry Blossom Grove', desc: 'Pink pastel leaves & mountain petals' },
  { id: 'Nether Wastes', name: 'Nether Crimson Forest', desc: 'Crimson fog, glowstone & lava lakes' },
  { id: 'The End', name: 'The End Dimension', desc: 'Cosmic void, end stone & obsidian' },
  { id: 'Deepslate', name: 'Deepslate Caves', desc: 'Subterranean grimstone & sculk glow' },
];

export const RedstoneSettingsApp: React.FC<RedstoneSettingsProps> = ({
  biome,
  onSelectBiome,
  dayCycleSpeed,
  onChangeDayCycleSpeed,
  showClouds,
  onToggleClouds,
  difficulty,
  onChangeDifficulty,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <div className="flex-1 flex flex-col h-full bg-[#202020] p-4 text-white mc-font overflow-y-auto">
      <div className="pb-3 mb-4 border-b-2 border-[#3c3c3c] flex items-center gap-3">
        <span className="text-3xl">⚙️</span>
        <div>
          <h2 className="text-lg font-bold text-[#ffff55] mc-text-shadow leading-tight">
            Redstone Preferences & World Settings
          </h2>
          <p className="text-xs text-[#a0a0a0]">
            Customize biomes, sky dynamics, audio, and gameplay difficulty
          </p>
        </div>
      </div>

      <div className="space-y-4 max-w-xl">
        {/* Biome / Desktop Wallpaper Section */}
        <div className="p-3 bg-[#161616] border-2 border-[#3a3a3a] rounded">
          <span className="text-xs uppercase tracking-wider text-[#55ff55] font-bold block mb-2">
            1. Dimension & Biome Wallpaper
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {BIOMES.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => {
                  SoundEngine.playClick(0.2);
                  onSelectBiome(b.id);
                }}
                className={`p-2 rounded text-left border transition-all flex flex-col gap-1 ${
                  biome === b.id
                    ? 'border-[#55ff55] bg-[#2a382a] text-white font-bold mc-text-shadow'
                    : 'border-[#333333] hover:bg-[#252525] text-[#b0b0b0]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">{b.name}</span>
                  {biome === b.id && <span className="text-[#55ff55]">✓ Active</span>}
                </div>
                <span className="text-[11px] opacity-75">{b.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Day / Night Sky Progression */}
        <div className="p-3 bg-[#161616] border-2 border-[#3a3a3a] rounded">
          <span className="text-xs uppercase tracking-wider text-[#ffff55] font-bold block mb-2">
            2. Day / Night Celestial Cycle
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                SoundEngine.playClick(0.2);
                onChangeDayCycleSpeed('fast');
              }}
              className={`flex-1 py-1.5 mc-button text-xs font-bold ${
                dayCycleSpeed === 'fast' ? 'mc-button-green' : ''
              }`}
            >
              ⚡ Fast (1 min / day)
            </button>
            <button
              type="button"
              onClick={() => {
                SoundEngine.playClick(0.2);
                onChangeDayCycleSpeed('realtime');
              }}
              className={`flex-1 py-1.5 mc-button text-xs font-bold ${
                dayCycleSpeed === 'realtime' ? 'mc-button-green' : ''
              }`}
            >
              ⏱ Standard (20 min)
            </button>
            <button
              type="button"
              onClick={() => {
                SoundEngine.playClick(0.2);
                onChangeDayCycleSpeed('frozen');
              }}
              className={`flex-1 py-1.5 mc-button text-xs font-bold ${
                dayCycleSpeed === 'frozen' ? 'mc-button-green' : ''
              }`}
            >
              ❄ Frozen Time
            </button>
          </div>
        </div>

        {/* Environment Toggles: Clouds & Sound */}
        <div className="p-3 bg-[#161616] border-2 border-[#3a3a3a] rounded grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center justify-between p-2 bg-[#1f1f1f] border border-[#333333] rounded">
            <div>
              <span className="text-xs font-bold text-white block">Fluffy 3D Clouds</span>
              <span className="text-[11px] text-[#888888]">Float across sky</span>
            </div>
            <button
              type="button"
              onClick={() => {
                SoundEngine.playClick(0.2);
                onToggleClouds();
              }}
              className={`px-3 py-1 mc-button text-xs font-bold ${
                showClouds ? 'mc-button-green' : ''
              }`}
            >
              {showClouds ? 'ENABLED' : 'OFF'}
            </button>
          </div>

          <div className="flex items-center justify-between p-2 bg-[#1f1f1f] border border-[#333333] rounded">
            <div>
              <span className="text-xs font-bold text-white block">Sound Effects</span>
              <span className="text-[11px] text-[#888888]">Procedural audio</span>
            </div>
            <button
              type="button"
              onClick={() => {
                SoundEngine.playClick(0.2);
                onToggleSound();
              }}
              className={`px-3 py-1 mc-button text-xs font-bold ${
                soundEnabled ? 'mc-button-green' : ''
              }`}
            >
              {soundEnabled ? 'ACTIVE 🔊' : 'MUTED 🔇'}
            </button>
          </div>
        </div>

        {/* Game Difficulty */}
        <div className="p-3 bg-[#161616] border-2 border-[#3a3a3a] rounded">
          <span className="text-xs uppercase tracking-wider text-[#ff5555] font-bold block mb-2">
            3. World Difficulty
          </span>
          <div className="grid grid-cols-4 gap-1.5">
            {(['peaceful', 'easy', 'normal', 'hard'] as const).map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => {
                  SoundEngine.playClick(0.2);
                  onChangeDifficulty(diff);
                }}
                className={`py-1.5 mc-button text-xs capitalize font-bold ${
                  difficulty === diff ? 'mc-button-green' : ''
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
