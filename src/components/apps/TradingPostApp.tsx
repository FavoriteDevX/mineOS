import React, { useState } from 'react';
import { SoundEngine } from '../../utils/audio';
import {
  ResourceEmerald,
  ResourceDiamond,
  ItemDiamondPickaxe,
  ItemCompass,
  ItemFireworkRocket,
  ItemTotem,
  BlockEnchantingTable,
  BlockChest,
} from '../MinecraftBlockIcons';

interface TradeableApp {
  id: string;
  name: string;
  category: string;
  priceEmeralds: number;
  icon: React.ReactNode;
  description: string;
  installed: boolean;
}

export const TradingPostApp: React.FC = () => {
  const [emeralds, setEmeralds] = useState(48);
  const [apps, setApps] = useState<TradeableApp[]>([
    {
      id: 'optifine',
      name: 'OptiFine Shaders HD',
      category: 'Visual Enhancements',
      priceEmeralds: 12,
      icon: <BlockEnchantingTable size={32} />,
      description: 'Increases render distance, adds dynamic torch lighting and waving leaves.',
      installed: false,
    },
    {
      id: 'autominer',
      name: 'Auto-Miner 3000',
      category: 'Productivity',
      priceEmeralds: 16,
      icon: <ItemDiamondPickaxe size={32} />,
      description: 'Quarry automation robot that digs 3x3 shafts and places torches.',
      installed: false,
    },
    {
      id: 'minimap',
      name: 'Ender Journey Minimap',
      category: 'Navigation',
      priceEmeralds: 8,
      icon: <ItemCompass size={32} />,
      description: 'Heads-up radar tracking nearby friendly villagers, mobs, and underground caves.',
      installed: true,
    },
    {
      id: 'xray',
      name: 'Echo Ore Locator',
      category: 'Mining Tools',
      priceEmeralds: 24,
      icon: <ResourceDiamond size={32} />,
      description: 'Acoustic pulse detector revealing hidden ancient debris and diamond veins.',
      installed: false,
    },
    {
      id: 'elytra-booster',
      name: 'Rocket Jetpack Elytra',
      category: 'Transportation',
      priceEmeralds: 20,
      icon: <ItemFireworkRocket size={32} />,
      description: 'Endless thermal propulsion while gliding through the skies.',
      installed: false,
    },
    {
      id: 'totem-guard',
      name: 'Totem Anti-Crash Guard',
      category: 'System Security',
      priceEmeralds: 32,
      icon: <ItemTotem size={32} />,
      description: 'Prevents window crash events and automatically backs up virtual world files.',
      installed: false,
    },
  ]);

  const handleTrade = (app: TradeableApp) => {
    if (app.installed) return;
    if (emeralds < app.priceEmeralds) {
      SoundEngine.playEat(0.3);
      alert('Villager says: "Hmph! You need more emeralds for this trade!"');
      return;
    }

    SoundEngine.playLevelUp(0.4);
    setEmeralds((prev) => prev - app.priceEmeralds);
    setApps((prev) =>
      prev.map((a) => (a.id === app.id ? { ...a, installed: true } : a))
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1b2b1a] p-3 text-white mc-font overflow-hidden">
      {/* Top Villager Banner */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-[#2d472c]">
        <div className="flex items-center gap-3">
          <BlockChest size={32} />
          <div>
            <h2 className="text-lg font-bold text-[#ffff55] mc-text-shadow leading-tight">
              Villager Trading Marketplace
            </h2>
            <p className="text-xs text-[#a0cfa0]">
              Official minecraftOS Software & Datapack Repository
            </p>
          </div>
        </div>

        {/* Player Emeralds Balance */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 bg-[#0d170d] border-2 border-[#2d472c] rounded">
          <ResourceEmerald size={24} />
          <div className="text-right">
            <span className="text-[10px] text-[#80b080] uppercase tracking-wider block leading-none">Your Emeralds</span>
            <span className="text-base font-bold text-[#55ff55] mc-text-shadow">
              {emeralds}
            </span>
          </div>
        </div>
      </div>

      {/* App Cards List */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {apps.map((app) => (
          <div
            key={app.id}
            className="p-3 bg-[#111c11] border-2 border-[#2d472c] rounded flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#1b2e1b] border-2 border-[#3b5e3a] rounded flex items-center justify-center shrink-0">
                {app.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-white">{app.name}</h3>
                  <span className="px-2 py-0.5 bg-[#1b2e1b] rounded text-[10px] text-[#a0e0a0] font-bold border border-[#2d472c]">
                    {app.category}
                  </span>
                </div>
                <p className="text-xs text-[#c0e0c0] leading-snug mt-0.5">
                  {app.description}
                </p>
              </div>
            </div>

            {/* Price & Install Button */}
            <div className="shrink-0 flex items-center gap-3">
              {!app.installed && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#55ff55]">
                  <span>{app.priceEmeralds}</span>
                  <ResourceEmerald size={16} />
                </div>
              )}
              <button
                type="button"
                onClick={() => handleTrade(app)}
                disabled={app.installed}
                className={`px-3 py-1.5 mc-button text-xs font-bold ${
                  app.installed
                    ? 'opacity-60 cursor-default'
                    : 'mc-button-green'
                }`}
              >
                {app.installed ? '✓ Installed' : 'Trade Emeralds'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
