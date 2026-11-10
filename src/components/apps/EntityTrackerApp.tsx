import React, { useState, useEffect } from 'react';
import { SoundEngine } from '../../utils/audio';
import {
  ItemClock,
  ResourceRedstone,
  ItemPaper,
  ItemSpawnEgg,
  BlockChest,
  ResourceDiamond,
  BlockCommandBlockItem,
  BlockBookshelf,
  BlockJukebox,
  BlockFurnace,
  ResourceEmerald,
  BlockGrass,
  BlockRedstoneLamp,
} from '../MinecraftBlockIcons';

interface EntityTrackerAppProps {
  openAppIds: string[];
  onCloseApp: (appId: string) => void;
}

interface SystemProcess {
  pid: number;
  appId: string;
  name: string;
  type: string;
  cpu: number;
  memoryMb: number;
}

const APP_ICONS: Record<string, React.ReactNode> = {
  finder: <BlockChest size={16} />,
  browser: <ResourceDiamond size={16} />,
  terminal: <BlockCommandBlockItem size={16} />,
  notes: <BlockBookshelf size={16} />,
  jukebox: <BlockJukebox size={16} />,
  calc: <ResourceRedstone size={16} />,
  activity: <BlockFurnace size={16} />,
  store: <ResourceEmerald size={16} />,
  vault: <BlockGrass size={16} />,
  settings: <BlockRedstoneLamp size={16} />,
};

export const EntityTrackerApp: React.FC<EntityTrackerAppProps> = ({
  openAppIds,
  onCloseApp,
}) => {
  const [tps, setTps] = useState(20.0);
  const [cpuUsage, setCpuUsage] = useState(14.2);
  const [memoryUsage, setMemoryUsage] = useState(3840);
  const [entityCount, setEntityCount] = useState(128);

  useEffect(() => {
    const timer = setInterval(() => {
      // Jitter TPS realistically between 19.8 and 20.0
      setTps(+(19.8 + Math.random() * 0.2).toFixed(1));
      setCpuUsage(+(10 + Math.random() * 8 + openAppIds.length * 2.5).toFixed(1));
      setMemoryUsage(3200 + openAppIds.length * 240 + Math.floor(Math.random() * 80));
      setEntityCount(110 + Math.floor(Math.random() * 30));
    }, 2000);
    return () => clearInterval(timer);
  }, [openAppIds.length]);

  const appNames: Record<string, string> = {
    finder: 'Seeker (Finder)',
    browser: 'Nether Safari (Web)',
    terminal: 'Command Block (Console)',
    notes: 'Book & Quill (Notes)',
    jukebox: 'Jukebox (Music)',
    calc: 'Redstone Calc (Math)',
    activity: 'Entity Tracker (System)',
    store: 'Trading Post (Market)',
    settings: 'Redstone Settings (Prefs)',
  };

  const processes: SystemProcess[] = openAppIds.map((id, idx) => ({
    pid: 1040 + idx * 12,
    appId: id,
    name: appNames[id] || id,
    type: 'User GUI Application',
    cpu: +(Math.random() * 3 + 1.2).toFixed(1),
    memoryMb: 180 + idx * 45,
  }));

  const handleKill = (appId: string) => {
    SoundEngine.playChestClose(0.35);
    onCloseApp(appId);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#14231b] p-3 text-white mc-font overflow-hidden">
      {/* Top System Health Gauge Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
        {/* TPS Gauge */}
        <div className="p-2.5 bg-[#0d1712] border-2 border-[#1c3a2a] rounded">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[11px] text-[#55ff55] uppercase tracking-wider block">
              Ticks Per Second
            </span>
            <ItemClock size={16} />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-[#55ff55] mc-text-shadow">
              {tps}
            </span>
            <span className="text-xs text-[#a0e0a0]">/ 20.0 TPS</span>
          </div>
        </div>

        {/* CPU Usage */}
        <div className="p-2.5 bg-[#0d1712] border-2 border-[#1c3a2a] rounded">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[11px] text-[#55ffff] uppercase tracking-wider block">
              Redstone Load
            </span>
            <ResourceRedstone size={16} />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-[#55ffff] mc-text-shadow">
              {cpuUsage}%
            </span>
            <span className="text-xs text-[#a0e0e0]">Active</span>
          </div>
        </div>

        {/* Memory Allocation */}
        <div className="p-2.5 bg-[#0d1712] border-2 border-[#1c3a2a] rounded">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[11px] text-[#ffff55] uppercase tracking-wider block">
              RAM Allocated
            </span>
            <ItemPaper size={16} />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-[#ffff55] mc-text-shadow">
              {memoryUsage}
            </span>
            <span className="text-xs text-[#d0d080]">MB / 16GB</span>
          </div>
        </div>

        {/* Rendered Entities */}
        <div className="p-2.5 bg-[#0d1712] border-2 border-[#1c3a2a] rounded">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[11px] text-[#ffaa00] uppercase tracking-wider block">
              Active Entities
            </span>
            <ItemSpawnEgg size={16} />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-[#ffaa00] mc-text-shadow">
              {entityCount}
            </span>
            <span className="text-xs text-[#e0b080]">Chunks (12)</span>
          </div>
        </div>
      </div>

      {/* Running Processes Table */}
      <div className="flex-1 flex flex-col bg-[#0d1712] border-2 border-[#1c3a2a] rounded overflow-hidden">
        <div className="px-3 py-1.5 bg-[#172c20] border-b border-[#244733] flex items-center justify-between text-xs font-bold text-[#a0e0a0]">
          <span>Active Operating System Processes ({processes.length})</span>
          <span className="text-[11px]">Click 'End Process' to terminate</span>
        </div>

        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#1c3a2a] text-[#80c090] bg-[#122218]">
                <th className="p-2">PID</th>
                <th className="p-2">Process Name</th>
                <th className="p-2">CPU %</th>
                <th className="p-2">Memory</th>
                <th className="p-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {processes.map((proc) => (
                <tr
                  key={proc.pid}
                  className="border-b border-[#162a1e] hover:bg-[#1a3324] transition-colors"
                >
                  <td className="p-2 font-mono text-[#a0a0a0]">{proc.pid}</td>
                  <td className="p-2 font-bold text-white flex items-center gap-2">
                    {APP_ICONS[proc.appId] || <BlockChest size={16} />}
                    <span>{proc.name}</span>
                  </td>
                  <td className="p-2 font-mono text-[#55ffff]">{proc.cpu}%</td>
                  <td className="p-2 font-mono text-[#ffff55]">{proc.memoryMb} MB</td>
                  <td className="p-2 text-right">
                    <button
                      type="button"
                      onClick={() => handleKill(proc.appId)}
                      className="px-2 py-0.5 mc-button mc-button-danger text-[11px] font-bold"
                    >
                      End Process
                    </button>
                  </td>
                </tr>
              ))}
              {/* Background Core Engine rows */}
              <tr className="border-b border-[#162a1e] opacity-60">
                <td className="p-2 font-mono">1001</td>
                <td className="p-2">minecraftOS.Kernel (Java Edition)</td>
                <td className="p-2 font-mono">4.2%</td>
                <td className="p-2 font-mono">1024 MB</td>
                <td className="p-2 text-right text-[10px] text-[#888888]">SYSTEM</td>
              </tr>
              <tr className="border-b border-[#162a1e] opacity-60">
                <td className="p-2 font-mono">1002</td>
                <td className="p-2">SoundEngine.ProceduralSynth</td>
                <td className="p-2 font-mono">0.8%</td>
                <td className="p-2 font-mono">64 MB</td>
                <td className="p-2 text-right text-[10px] text-[#888888]">SYSTEM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
