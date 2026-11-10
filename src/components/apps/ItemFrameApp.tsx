import React, { useState } from 'react';
import { SoundEngine } from '../../utils/audio';

const PALETTE = [
  { name: 'Redstone', color: '#ff3333' },
  { name: 'Lapis', color: '#2244cc' },
  { name: 'Emerald', color: '#22aa44' },
  { name: 'Gold', color: '#ffcc00' },
  { name: 'Diamond', color: '#55ffff' },
  { name: 'Obsidian', color: '#2a1240' },
  { name: 'Oak Wood', color: '#885522' },
  { name: 'Stone', color: '#777777' },
  { name: 'Snow', color: '#ffffff' },
  { name: 'Coal', color: '#111111' },
];

export const ItemFrameApp: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState('#22aa44');
  const [pixels, setPixels] = useState<string[]>(() => {
    // Initial 16x16 creeper face or sword preview
    const arr = new Array(256).fill('#55aa55');
    // Draw basic creeper pattern in center
    // Creeper eyes: row 4 & 5
    const black = '#111111';
    [
      51, 52, 67, 68, // Left eye
      59, 60, 75, 76, // Right eye
      103, 104, 119, 120, // Nose
      134, 135, 136, 137, // Mouth top
      150, 151, 152, 153, // Mouth mid
      165, 166, 169, 170, // Mouth bottom legs
    ].forEach((idx) => {
      arr[idx] = black;
    });
    return arr;
  });

  const handlePixelClick = (index: number) => {
    SoundEngine.playPop(0.2);
    setPixels((prev) => {
      const next = [...prev];
      next[index] = selectedColor;
      return next;
    });
  };

  const handleClear = () => {
    SoundEngine.playClick(0.2);
    setPixels(new Array(256).fill('#888888'));
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#3d2716] p-3 text-white mc-font overflow-hidden">
      {/* Top Banner */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b-2 border-[#5e3c23]">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🖼</span>
          <div>
            <h2 className="text-lg font-bold text-[#ffff55] mc-text-shadow leading-tight">
              Item Frame 16x16 Pixel Art Studio
            </h2>
            <p className="text-xs text-[#c09060]">
              Design custom Minecraft paintings and banner emblems
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClear}
          className="px-2 py-1 mc-button mc-button-danger text-xs font-bold"
        >
          Clear Canvas
        </button>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row gap-4 items-center justify-center overflow-auto p-1">
        {/* 16x16 Pixel Grid */}
        <div
          className="grid grid-cols-16 gap-[1px] p-2 bg-[#26170d] border-4 border-[#8c5930] rounded shadow-2xl shrink-0"
          style={{ gridTemplateColumns: 'repeat(16, minmax(0, 1fr))' }}
        >
          {pixels.map((color, idx) => (
            <div
              key={`px-${idx}`}
              onClick={() => handlePixelClick(idx)}
              className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:opacity-80 transition-opacity"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Color Palette Tools */}
        <div className="flex flex-col gap-2 p-3 bg-[#26170d] border-2 border-[#5e3c23] rounded">
          <span className="text-xs text-[#e0b080] font-bold uppercase tracking-wider">
            Wool & Block Dyes
          </span>
          <div className="grid grid-cols-2 gap-2">
            {PALETTE.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => {
                  SoundEngine.playClick(0.2);
                  setSelectedColor(p.color);
                }}
                className={`flex items-center gap-2 px-2 py-1 rounded text-xs text-left border ${
                  selectedColor === p.color
                    ? 'border-[#ffff55] bg-[#4a2e19] font-bold text-[#ffff55]'
                    : 'border-transparent hover:bg-[#382212] text-white'
                }`}
              >
                <div
                  className="w-4 h-4 rounded border border-black shrink-0"
                  style={{ backgroundColor: p.color }}
                />
                <span className="truncate">{p.name}</span>
              </button>
            ))}
          </div>

          <div className="mt-2 pt-2 border-t border-[#5e3c23] text-center">
            <span className="text-xs text-[#a08060]">Active Dye:</span>
            <div
              className="w-full h-6 mt-1 rounded border border-black shadow-inner"
              style={{ backgroundColor: selectedColor }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
