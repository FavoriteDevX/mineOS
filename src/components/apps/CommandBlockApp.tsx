import React, { useState, useRef, useEffect } from 'react';
import { executeMinecraftCommand, type CommandContext } from '../../utils/minecraftLogic';
import { SoundEngine } from '../../utils/audio';

interface CommandBlockAppProps {
  context: CommandContext;
  onUpdateContext: (updates: Partial<CommandContext>) => void;
}

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  text: string;
}

export const CommandBlockApp: React.FC<CommandBlockAppProps> = ({
  context,
  onUpdateContext,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'minecraftOS Command Block Terminal [Version 1.21.4-mc]',
    },
    {
      id: 'init-2',
      type: 'system',
      text: 'Type /help for all available commands. Try "/time set night" or "/gamemode creative".',
    },
  ]);

  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const commandText = inputVal.trim();
    if (!commandText) return;

    SoundEngine.playClick(0.2);

    // Append user input line
    const userLine: TerminalLine = {
      id: `in-${Date.now()}`,
      type: 'input',
      text: `steve@minecraftos:~$ ${commandText}`,
    };

    const result = executeMinecraftCommand(commandText, context);

    const resultLine: TerminalLine = {
      id: `out-${Date.now()}`,
      type: result.success ? 'output' : 'error',
      text: result.message,
    };

    setLines((prev) => [...prev, userLine, resultLine]);
    setHistory((prev) => [...prev, commandText]);
    setHistoryIndex(-1);
    setInputVal('');

    if (result.success) {
      SoundEngine.playLevelUp(0.25);
      if (result.updatedContext) {
        onUpdateContext(result.updatedContext);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(history[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="flex-1 flex flex-col h-full bg-[#110e1a] text-white p-3 font-mono text-sm overflow-hidden border-2 border-[#2b183d]"
    >
      {/* Terminal Title Bar Hint */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#3b2054] text-xs text-[#a080c0]">
        <span>[Command Block Console v2.0]</span>
        <span>TPS: 20.0 · Redstone Impulses: ACTIVE</span>
      </div>

      {/* Terminal Lines Area */}
      <div className="flex-1 overflow-y-auto space-y-1 pr-1">
        {lines.map((line) => {
          let color = 'text-[#e0e0e0]';
          if (line.type === 'input') color = 'text-[#55ffff] font-bold';
          else if (line.type === 'error') color = 'text-[#ff5555]';
          else if (line.type === 'output') color = 'text-[#55ff55]';
          else if (line.type === 'system') color = 'text-[#ffff55]';

          return (
            <div key={line.id} className={`whitespace-pre-wrap leading-relaxed ${color}`}>
              {line.text}
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* Interactive Command Input Form */}
      <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2 pt-2 border-t border-[#3b2054]">
        <span className="text-[#55ffff] font-bold whitespace-nowrap">
          steve@minecraftos:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="/help, /time set day, /gamemode creative..."
          className="flex-1 bg-transparent text-[#ffffff] outline-none border-none font-mono text-sm caret-[#55ff55]"
          autoFocus
        />
        <button
          type="submit"
          className="px-2 py-0.5 mc-button text-xs font-bold shrink-0"
        >
          Execute
        </button>
      </form>
    </div>
  );
};
