import React, { useState } from 'react';
import { calculateStackCount, calculateItemsFromStacks } from '../../utils/minecraftLogic';
import { SoundEngine } from '../../utils/audio';

export const RedstoneCalcApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stack' | 'standard'>('stack');

  // Standard Calculator State
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  // Stack Calculator State
  const [itemInput, setItemInput] = useState('192');
  const [stackSize, setStackSize] = useState<64 | 16>(64);
  const [inputStacks, setInputStacks] = useState('3');
  const [inputRemainder, setInputRemainder] = useState('0');

  // Standard Calc Handlers
  const handleDigit = (digit: string) => {
    SoundEngine.playClick(0.2);
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const handleOperator = (nextOp: string) => {
    SoundEngine.playClick(0.25);
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const current = prevValue || 0;
      let newValue = current;
      if (operator === '+') newValue = current + inputValue;
      else if (operator === '-') newValue = current - inputValue;
      else if (operator === '×') newValue = current * inputValue;
      else if (operator === '÷') newValue = inputValue !== 0 ? current / inputValue : 0;
      setPrevValue(newValue);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOp);
  };

  const handleEquals = () => {
    if (!operator || prevValue === null) return;
    SoundEngine.playLevelUp(0.3);
    const inputValue = parseFloat(display);
    let newValue = prevValue;
    if (operator === '+') newValue = prevValue + inputValue;
    else if (operator === '-') newValue = prevValue - inputValue;
    else if (operator === '×') newValue = prevValue * inputValue;
    else if (operator === '÷') newValue = inputValue !== 0 ? prevValue / inputValue : 0;

    setDisplay(String(newValue));
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handleClear = () => {
    SoundEngine.playClick(0.2);
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  // Stack Calculations
  const totalItems = parseInt(itemInput, 10) || 0;
  const stackResult = calculateStackCount(totalItems, stackSize);
  const chestsNeeded = Math.ceil(totalItems / (stackSize * 27)); // Single chest = 27 slots
  const doubleChestsNeeded = Math.ceil(totalItems / (stackSize * 54)); // Double chest = 54 slots
  const coalNeededForSmelt = Math.ceil(totalItems / 8);

  const reverseCalculatedTotal = calculateItemsFromStacks(
    parseInt(inputStacks, 10) || 0,
    parseInt(inputRemainder, 10) || 0,
    stackSize
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-[#2a2a2a] p-3 text-white mc-font overflow-hidden">
      {/* Tab Switcher: Stack Math vs Standard Math */}
      <div className="flex items-center gap-1 mb-3 p-1 bg-[#1a1a1a] border border-[#444444] rounded">
        <button
          type="button"
          onClick={() => {
            SoundEngine.playClick(0.2);
            setActiveTab('stack');
          }}
          className={`flex-1 py-1 text-xs font-bold transition-colors ${
            activeTab === 'stack' ? 'bg-[#55aa55] text-black font-bold' : 'text-[#888888] hover:text-white'
          }`}
        >
          ⛏ Minecraft Stack Math
        </button>
        <button
          type="button"
          onClick={() => {
            SoundEngine.playClick(0.2);
            setActiveTab('standard');
          }}
          className={`flex-1 py-1 text-xs font-bold transition-colors ${
            activeTab === 'standard' ? 'bg-[#ff5555] text-black font-bold' : 'text-[#888888] hover:text-white'
          }`}
        >
          🔢 Standard Redstone Calc
        </button>
      </div>

      {activeTab === 'stack' ? (
        /* Stack Calculator View */
        <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1">
          {/* Item count to Stacks */}
          <div className="p-3 bg-[#1e1e1e] border-2 border-[#444444] rounded">
            <span className="text-xs uppercase tracking-wider text-[#ffaa00] font-bold block mb-1">
              Convert Total Items ➔ Stacks
            </span>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="number"
                min="0"
                value={itemInput}
                onChange={(e) => setItemInput(e.target.value)}
                placeholder="Number of items"
                className="w-32 px-2 py-1 mc-input text-base text-center"
              />
              <select
                value={stackSize}
                onChange={(e) => setStackSize(Number(e.target.value) as 64 | 16)}
                className="px-2 py-1 mc-input text-sm cursor-pointer"
              >
                <option value={64}>Max 64 (Blocks/Ores/Ingots)</option>
                <option value={16}>Max 16 (Ender Pearls/Eggs/Buckets)</option>
              </select>
            </div>

            {/* Result Box */}
            <div className="p-2 bg-[#121212] border border-[#333333] flex items-center justify-between">
              <span className="text-sm text-[#aaaaaa]">Inventory Result:</span>
              <span className="text-lg font-bold text-[#55ff55] mc-text-shadow">
                {stackResult.displayText}
              </span>
            </div>
          </div>

          {/* Logistics Estimates */}
          <div className="p-3 bg-[#1e1e1e] border-2 border-[#444444] rounded grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 bg-[#121212] border border-[#333333]">
              <span className="text-[#888888] block mb-0.5">Single Chests</span>
              <span className="text-base font-bold text-[#ffff55]">{chestsNeeded}</span>
            </div>
            <div className="p-2 bg-[#121212] border border-[#333333]">
              <span className="text-[#888888] block mb-0.5">Double Chests</span>
              <span className="text-base font-bold text-[#ffff55]">{doubleChestsNeeded}</span>
            </div>
            <div className="p-2 bg-[#121212] border border-[#333333]">
              <span className="text-[#888888] block mb-0.5">Coal for Smelt</span>
              <span className="text-base font-bold text-[#ff5555]">{coalNeededForSmelt}</span>
            </div>
          </div>

          {/* Stacks to Total Items (Reverse) */}
          <div className="p-3 bg-[#1e1e1e] border-2 border-[#444444] rounded">
            <span className="text-xs uppercase tracking-wider text-[#ffaa00] font-bold block mb-1">
              Convert Stacks + Items ➔ Total Items
            </span>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="0"
                  value={inputStacks}
                  onChange={(e) => setInputStacks(e.target.value)}
                  className="w-16 px-2 py-1 mc-input text-sm text-center"
                />
                <span className="text-xs">stacks</span>
              </div>
              <span className="text-sm font-bold">+</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="0"
                  value={inputRemainder}
                  onChange={(e) => setInputRemainder(e.target.value)}
                  className="w-16 px-2 py-1 mc-input text-sm text-center"
                />
                <span className="text-xs">items</span>
              </div>
            </div>

            <div className="p-2 bg-[#121212] border border-[#333333] flex items-center justify-between">
              <span className="text-sm text-[#aaaaaa]">Total Items:</span>
              <span className="text-lg font-bold text-[#55ffff] mc-text-shadow">
                {reverseCalculatedTotal} items
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Standard Calculator Grid */
        <div className="flex-1 flex flex-col justify-between max-w-xs mx-auto w-full">
          {/* LCD Screen */}
          <div className="p-3 bg-[#0a0a0a] border-2 border-[#555555] text-right font-mono text-2xl text-[#ff3333] font-bold tracking-wider rounded mb-3 shadow-inner">
            {display}
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-4 gap-1.5 flex-1">
            <button type="button" onClick={handleClear} className="mc-button mc-button-danger py-2 text-base font-bold">
              C
            </button>
            <button type="button" onClick={() => setDisplay(String(-parseFloat(display)))} className="mc-button py-2 text-base font-bold">
              ±
            </button>
            <button type="button" onClick={() => handleOperator('÷')} className="mc-button py-2 text-base font-bold text-[#ffff55]">
              ÷
            </button>
            <button type="button" onClick={() => handleOperator('×')} className="mc-button py-2 text-base font-bold text-[#ffff55]">
              ×
            </button>

            {['7', '8', '9'].map((d) => (
              <button key={d} type="button" onClick={() => handleDigit(d)} className="mc-button py-2 text-base font-bold">
                {d}
              </button>
            ))}
            <button type="button" onClick={() => handleOperator('-')} className="mc-button py-2 text-base font-bold text-[#ffff55]">
              -
            </button>

            {['4', '5', '6'].map((d) => (
              <button key={d} type="button" onClick={() => handleDigit(d)} className="mc-button py-2 text-base font-bold">
                {d}
              </button>
            ))}
            <button type="button" onClick={() => handleOperator('+')} className="mc-button py-2 text-base font-bold text-[#ffff55]">
              +
            </button>

            {['1', '2', '3'].map((d) => (
              <button key={d} type="button" onClick={() => handleDigit(d)} className="mc-button py-2 text-base font-bold">
                {d}
              </button>
            ))}
            <button type="button" onClick={handleEquals} className="mc-button mc-button-green row-span-2 py-2 text-base font-bold">
              =
            </button>

            <button type="button" onClick={() => handleDigit('0')} className="col-span-2 mc-button py-2 text-base font-bold">
              0
            </button>
            <button type="button" onClick={() => !display.includes('.') && setDisplay(display + '.')} className="mc-button py-2 text-base font-bold">
              .
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
