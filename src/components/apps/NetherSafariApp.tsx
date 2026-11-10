import React, { useState } from 'react';
import { SoundEngine } from '../../utils/audio';

interface WikiRecipe {
  id: string;
  name: string;
  category: string;
  grid: (string | null)[]; // 9 slots for 3x3 crafting table
  result: string;
  description: string;
}

const RECIPES: WikiRecipe[] = [
  {
    id: 'diamond-pick',
    name: 'Diamond Pickaxe',
    category: 'Tools',
    grid: ['💎', '💎', '💎', null, '🪵', null, null, '🪵', null],
    result: '⛏ Diamond Pickaxe x1',
    description: 'Essential tool for mining Obsidian and Ancient Debris in deep cavern layers.',
  },
  {
    id: 'diamond-sword',
    name: 'Diamond Sword',
    category: 'Weapons',
    grid: [null, '💎', null, null, '💎', null, null, '🪵', null],
    result: '🗡 Diamond Sword x1',
    description: '+7 Attack Damage. Grants critical strikes when jumping.',
  },
  {
    id: 'observer',
    name: 'Redstone Observer',
    category: 'Redstone',
    grid: ['🪨', '🪨', '🪨', '🔴', '🔴', '🪨', '🪨', '🪨', '🪨'],
    result: '👁 Observer x1',
    description: 'Detects block updates directly in front of its face and emits a 1-tick pulse.',
  },
  {
    id: 'tnt',
    name: 'TNT Explosive',
    category: 'Mechanisms',
    grid: ['🧨', '⏳', '🧨', '⏳', '🧨', '⏳', '🧨', '⏳', '🧨'],
    result: '💣 TNT x1',
    description: 'Primed with flint & steel or redstone current. High blast radius.',
  },
  {
    id: 'cake',
    name: 'Celebration Cake',
    category: 'Food',
    grid: ['🥛', '🥛', '🥛', '🍬', '🥚', '🍬', '🌾', '🌾', '🌾'],
    result: '🎂 Cake x1',
    description: 'Placed on a block and eaten in 7 separate slices to restore hunger.',
  },
];

export const NetherSafariApp: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState('https://minecraft.wiki/wiki/Crafting_Guide');
  const [activeTab, setActiveTab] = useState<'recipes' | 'wiki' | 'redstone' | 'notes'>('recipes');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<WikiRecipe>(RECIPES[0]);

  const filteredRecipes = RECIPES.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNavigate = (tab: 'recipes' | 'wiki' | 'redstone' | 'notes', url: string) => {
    SoundEngine.playPop(0.2);
    setActiveTab(tab);
    setCurrentUrl(url);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1b102b] text-white mc-font overflow-hidden">
      {/* Top Browser Bar (Address & Controls) */}
      <div className="p-2 bg-[#2a1740] border-b-2 border-[#4c2777] flex items-center gap-2">
        {/* Navigation Buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => SoundEngine.playClick(0.2)}
            className="w-7 h-7 mc-button text-xs font-bold"
          >
            ◀
          </button>
          <button
            type="button"
            onClick={() => SoundEngine.playClick(0.2)}
            className="w-7 h-7 mc-button text-xs font-bold"
          >
            ▶
          </button>
          <button
            type="button"
            onClick={() => {
              SoundEngine.playClick(0.2);
              SoundEngine.playPop(0.3);
            }}
            className="w-7 h-7 mc-button text-xs font-bold"
          >
            ⟳
          </button>
        </div>

        {/* Address URL Bar */}
        <div className="flex-1 px-3 py-1 bg-[#12081f] border border-[#582d8c] flex items-center gap-2 rounded text-xs text-[#d8b4fe]">
          <span className="text-[#a855f7]">🔒</span>
          <span className="truncate">{currentUrl}</span>
        </div>
      </div>

      {/* Bookmarks Bar */}
      <div className="px-3 py-1 bg-[#231236] border-b border-[#432363] flex items-center gap-4 text-xs font-bold">
        <button
          type="button"
          onClick={() => handleNavigate('recipes', 'https://minecraft.wiki/wiki/Crafting_Guide')}
          className={`hover:text-[#ffff55] transition-colors ${
            activeTab === 'recipes' ? 'text-[#ffff55] underline' : 'text-[#c084fc]'
          }`}
        >
          🔨 Crafting Guide
        </button>
        <button
          type="button"
          onClick={() => handleNavigate('wiki', 'https://minecraft.wiki/wiki/Minecraft_Lore')}
          className={`hover:text-[#ffff55] transition-colors ${
            activeTab === 'wiki' ? 'text-[#ffff55] underline' : 'text-[#c084fc]'
          }`}
        >
          📖 Overworld Wiki
        </button>
        <button
          type="button"
          onClick={() => handleNavigate('redstone', 'https://redstone.academy/engineering')}
          className={`hover:text-[#ffff55] transition-colors ${
            activeTab === 'redstone' ? 'text-[#ffff55] underline' : 'text-[#c084fc]'
          }`}
        >
          ⚡ Redstone Logic
        </button>
        <button
          type="button"
          onClick={() => handleNavigate('notes', 'https://mojang.com/patch-notes-1.21.4')}
          className={`hover:text-[#ffff55] transition-colors ${
            activeTab === 'notes' ? 'text-[#ffff55] underline' : 'text-[#c084fc]'
          }`}
        >
          📢 Patch Notes
        </button>
      </div>

      {/* Main Web Page Content */}
      <div className="flex-1 p-3 overflow-y-auto bg-[#160b24]">
        {activeTab === 'recipes' && (
          <div className="flex flex-col md:flex-row gap-4 h-full">
            {/* Left Recipe List */}
            <div className="w-full md:w-52 flex flex-col gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blueprints..."
                className="px-2 py-1 mc-input text-xs"
              />
              <div className="flex-1 overflow-y-auto space-y-1">
                {filteredRecipes.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      SoundEngine.playPop(0.2);
                      setSelectedRecipe(r);
                    }}
                    className={`w-full p-2 text-left text-xs rounded border transition-colors flex items-center justify-between ${
                      selectedRecipe.id === r.id
                        ? 'bg-[#582d8c] border-[#ffff55] text-white font-bold'
                        : 'bg-[#210f36] border-[#3e1b66] text-[#d8b4fe] hover:bg-[#30164e]'
                    }`}
                  >
                    <span>{r.name}</span>
                    <span className="text-[10px] opacity-75">{r.category}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Interactive Crafting Table Preview */}
            <div className="flex-1 bg-[#25123d] border-2 border-[#582d8c] p-4 flex flex-col rounded shadow-xl">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#43206a]">
                <h3 className="text-lg font-bold text-[#ffff55] mc-text-shadow">
                  {selectedRecipe.name}
                </h3>
                <span className="px-2 py-0.5 bg-[#4c2777] rounded text-xs text-[#a855f7] font-bold">
                  {selectedRecipe.category}
                </span>
              </div>

              {/* 3x3 Crafting Grid + Arrow + Output Slot */}
              <div className="my-auto flex flex-col sm:flex-row items-center justify-center gap-6 py-4">
                {/* 3x3 Grid */}
                <div className="grid grid-cols-3 gap-1.5 p-2 bg-[#1b0b2e] border-2 border-[#43206a] rounded">
                  {selectedRecipe.grid.map((item, idx) => (
                    <div
                      key={`slot-${idx}`}
                      className="w-12 h-12 mc-slot flex items-center justify-center text-xl bg-[#2e1948]"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Arrow */}
                <span className="text-3xl text-[#ffff55] mc-text-shadow">➔</span>

                {/* Output Result Slot */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 mc-slot-selected flex items-center justify-center text-2xl bg-[#3c1e60]">
                    {selectedRecipe.result.split(' ')[0]}
                  </div>
                  <span className="text-xs font-bold text-[#55ff55] text-center max-w-[140px]">
                    {selectedRecipe.result}
                  </span>
                </div>
              </div>

              {/* Blueprint Description */}
              <div className="p-3 bg-[#170a27] border border-[#3e1b66] rounded mt-2">
                <span className="text-xs text-[#a855f7] font-bold block mb-1">
                  Crafting Specifications:
                </span>
                <p className="text-sm text-[#e9d5ff] leading-relaxed">
                  {selectedRecipe.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'wiki' && (
          <div className="max-w-2xl mx-auto space-y-4">
            <h1 className="text-2xl font-bold text-[#ffff55] mc-text-shadow border-b border-[#4c2777] pb-2">
              The Minecraft Overworld Chronicles
            </h1>
            <p className="text-sm leading-relaxed text-[#d8b4fe]">
              The Overworld is the primary dimension where all players awaken upon beginning their journey. Spanning 60 million blocks in width, it is characterized by diverse biomes ranging from sun-drenched savannas to deep frozen peaks and lush cherry blossom groves.
            </p>
            <div className="p-3 bg-[#24133b] border-2 border-[#4c2777] rounded">
              <h4 className="text-base font-bold text-[#55ff55] mb-1">Core Survival Tenets:</h4>
              <ul className="text-xs space-y-1 text-[#e9d5ff] list-disc list-inside">
                <li>Never mine directly under your feet into potential lava pockets.</li>
                <li>Secure a shelter before sunset (12000 ticks) when hostile mobs emerge.</li>
                <li>Light levels below 1 enable zombie, skeleton, and creeper spawns.</li>
                <li>Always carry a water bucket for MLG water landings and obsidian conversion.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'redstone' && (
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-xl font-bold text-[#ff5555] mc-text-shadow border-b border-[#4c2777] pb-1">
              Redstone Logic Engineering
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#231138] border border-[#4c2777] rounded">
                <h4 className="text-sm font-bold text-[#ffff55] mb-1">T-Flip-Flop</h4>
                <p className="text-[#d8b4fe]">
                  Converts a momentary button pulse into a permanent toggle state (like a lever). Built with a sticky piston spitting out a redstone block.
                </p>
              </div>
              <div className="p-3 bg-[#231138] border border-[#4c2777] rounded">
                <h4 className="text-sm font-bold text-[#ffff55] mb-1">Pulse Extender</h4>
                <p className="text-[#d8b4fe]">
                  Uses two facing comparators and redstone dust to prolong a signal up to several seconds for smooth blast doors.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="max-w-2xl mx-auto space-y-2">
            <h2 className="text-xl font-bold text-[#55ff55] mc-text-shadow border-b border-[#4c2777] pb-1">
              minecraftOS v1.21.4 Release Highlights
            </h2>
            <p className="text-xs text-[#d8b4fe]">
              • Integrated macOS Parody hotbar dock with 9 accessible software slots.<br />
              • Fully reactive day/night cycle, sound engine, and draggable stone windows.<br />
              • Added interactive Book & Quill notes with multi-page parchment persistence.<br />
              • Built-in Redstone Calculator with 64-item stack logistics arithmetic.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
