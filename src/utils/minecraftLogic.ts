/**
 * Core MinecraftOS logic functions
 * Decoupled from React UI for deterministic testing and rock-solid state management.
 */

export interface StackCalculation {
  stacks: number;
  remainder: number;
  displayText: string;
}

export function calculateStackCount(totalItems: number, maxStackSize = 64): StackCalculation {
  if (totalItems <= 0 || isNaN(totalItems)) {
    return { stacks: 0, remainder: 0, displayText: '0 items' };
  }
  const stacks = Math.floor(totalItems / maxStackSize);
  const remainder = totalItems % maxStackSize;

  let displayText = '';
  if (stacks > 0 && remainder > 0) {
    displayText = `${stacks} stack${stacks > 1 ? 's' : ''} + ${remainder}`;
  } else if (stacks > 0) {
    displayText = `${stacks} stack${stacks > 1 ? 's' : ''}`;
  } else {
    displayText = `${remainder} item${remainder > 1 ? 's' : ''}`;
  }

  return { stacks, remainder, displayText };
}

export function calculateItemsFromStacks(stacks: number, remainder: number, maxStackSize = 64): number {
  const safeStacks = Math.max(0, Math.floor(stacks || 0));
  const safeRemainder = Math.max(0, Math.floor(remainder || 0));
  return safeStacks * maxStackSize + safeRemainder;
}

export interface CommandContext {
  timeTicks: number;
  weather: 'clear' | 'rain' | 'thunder';
  gameMode: 'survival' | 'creative' | 'adventure' | 'spectator';
  difficulty: 'peaceful' | 'easy' | 'normal' | 'hard';
  volume: number;
  inventory: string[];
}

export interface CommandResult {
  success: boolean;
  message: string;
  updatedContext?: Partial<CommandContext>;
}

export function executeMinecraftCommand(
  rawInput: string,
  currentContext: CommandContext
): CommandResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { success: false, message: 'Type /help for a list of commands.' };
  }

  const normalized = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed;
  const parts = normalized.split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (command) {
    case 'help':
      return {
        success: true,
        message:
          'Available commands:\n' +
          '• /time set <day|night|noon|midnight|<ticks>>\n' +
          '• /weather <clear|rain|thunder>\n' +
          '• /gamemode <survival|creative|adventure|spectator>\n' +
          '• /difficulty <peaceful|easy|normal|hard>\n' +
          '• /give <item> [amount]\n' +
          '• /clear\n' +
          '• /sysinfo\n' +
          '• /seed\n' +
          '• /say <message>',
      };

    case 'time': {
      if (args[0] === 'set') {
        const val = args[1]?.toLowerCase();
        let newTicks = 1000;
        if (val === 'day') newTicks = 1000;
        else if (val === 'noon') newTicks = 6000;
        else if (val === 'sunset') newTicks = 12000;
        else if (val === 'night') newTicks = 14000;
        else if (val === 'midnight') newTicks = 18000;
        else if (!isNaN(Number(val))) {
          newTicks = Math.abs(parseInt(val, 10)) % 24000;
        } else {
          return { success: false, message: 'Usage: /time set <day|night|noon|midnight|<ticks>>' };
        }

        return {
          success: true,
          message: `Set the time to ${newTicks} ticks`,
          updatedContext: { timeTicks: newTicks },
        };
      }
      return {
        success: true,
        message: `Current time is ${currentContext.timeTicks} ticks (${formatMinecraftTime(currentContext.timeTicks)})`,
      };
    }

    case 'weather': {
      const mode = args[0]?.toLowerCase();
      if (mode === 'clear' || mode === 'rain' || mode === 'thunder') {
        return {
          success: true,
          message: `Set the weather to ${mode}`,
          updatedContext: { weather: mode },
        };
      }
      return { success: false, message: 'Usage: /weather <clear|rain|thunder>' };
    }

    case 'gamemode': {
      const mode = args[0]?.toLowerCase();
      if (['survival', 'creative', 'adventure', 'spectator'].includes(mode)) {
        return {
          success: true,
          message: `Set own game mode to ${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode`,
          updatedContext: { gameMode: mode as CommandContext['gameMode'] },
        };
      }
      return { success: false, message: 'Usage: /gamemode <survival|creative|adventure|spectator>' };
    }

    case 'difficulty': {
      const diff = args[0]?.toLowerCase();
      if (['peaceful', 'easy', 'normal', 'hard'].includes(diff)) {
        return {
          success: true,
          message: `Set difficulty to ${diff.charAt(0).toUpperCase() + diff.slice(1)}`,
          updatedContext: { difficulty: diff as CommandContext['difficulty'] },
        };
      }
      return { success: false, message: 'Usage: /difficulty <peaceful|easy|normal|hard>' };
    }

    case 'give': {
      const item = args[0];
      const amount = parseInt(args[1] || '1', 10);
      if (!item) return { success: false, message: 'Usage: /give <item> [amount]' };
      const safeAmount = Math.min(64, Math.max(1, isNaN(amount) ? 1 : amount));
      const newItem = `${item} x${safeAmount}`;
      return {
        success: true,
        message: `Gave [${newItem}] to Steve`,
        updatedContext: {
          inventory: [...currentContext.inventory, newItem],
        },
      };
    }

    case 'clear':
      return {
        success: true,
        message: 'Cleared the inventory of Steve, removing items',
        updatedContext: { inventory: [] },
      };

    case 'sysinfo':
    case 'neofetch':
      return {
        success: true,
        message:
          'minecraftOS Release 1.21.4 (Java Edition)\n' +
          'Kernel: Redstone Flux 4.8.0-mc\n' +
          'Uptime: 14 Minecraft Days\n' +
          'Shell: CommandBlock-SH 2.1\n' +
          'Memory: 4096MB / 16384MB Allocated\n' +
          'TPS: 20.0 (Optimal)\n' +
          'Resolution: 1440x900 (GUI Scale: Auto)',
      };

    case 'seed':
      return {
        success: true,
        message: 'Seed: [8675309420691337]',
      };

    case 'say':
      return {
        success: true,
        message: `[Server] ${args.join(' ')}`,
      };

    default:
      return {
        success: false,
        message: `Unknown command: /${command}. Type /help for available commands.`,
      };
  }
}

/**
 * Converts ticks (0 to 24000) to 24h clock string
 * 0 ticks = 06:00
 * 6000 ticks = 12:00
 * 12000 ticks = 18:00
 * 18000 ticks = 00:00
 */
export function formatMinecraftTime(ticks: number): string {
  const normalizedTicks = ((ticks % 24000) + 24000) % 24000;
  // 1 hour = 1000 ticks. 0 ticks is 06:00.
  const totalMinutes = Math.floor((normalizedTicks / 1000) * 60);
  const hour = (Math.floor(totalMinutes / 60) + 6) % 24;
  const minute = totalMinutes % 60;
  const hh = hour.toString().padStart(2, '0');
  const mm = minute.toString().padStart(2, '0');
  return `${hh}:${mm}`;
}

export interface VirtualFile {
  id: string;
  name: string;
  type: 'file' | 'folder';
  parentId: string | null;
  content?: string;
  size?: string;
  updatedAt: string;
}

export function createInitialFileSystem(): VirtualFile[] {
  return [
    { id: 'desktop', name: 'Desktop', type: 'folder', parentId: null, updatedAt: 'Today' },
    { id: 'worlds', name: 'Saved Worlds', type: 'folder', parentId: null, updatedAt: 'Yesterday' },
    { id: 'recipes', name: 'Redstone Blueprints', type: 'folder', parentId: null, updatedAt: '3 days ago' },
    { id: 'trash', name: 'Lava Trash', type: 'folder', parentId: null, updatedAt: 'Just now' },

    // Files in Desktop
    {
      id: 'welcome-txt',
      name: 'Welcome_To_minecraftOS.txt',
      type: 'file',
      parentId: 'desktop',
      size: '1.2 KB',
      updatedAt: 'Today',
      content:
        '# Welcome to minecraftOS!\n\n' +
        'This operating system is completely built using authentic Minecraft GUI aesthetics and inspired by macOS functionality.\n\n' +
        'Features:\n' +
        '- Hotbar Dock with macOS parody apps (Seeker, Nether Safari, Command Block, Book & Quill, Jukebox, etc.)\n' +
        '- Interactive HUD: Health, Hunger, XP Bar, Armor and clock\n' +
        '- Draggable & resizable Minecraft windows\n' +
        '- Web Audio sound effects for UI clicks, chest latches, and C418 ambient discs\n' +
        '- Working Terminal with /time, /weather, /gamemode, and /give\n\n' +
        'Enjoy your stay in the Overworld!',
    },
    {
      id: 'todo-list',
      name: 'Mining_Goals.txt',
      type: 'file',
      parentId: 'desktop',
      size: '0.8 KB',
      updatedAt: 'Today',
      content:
        '[x] Craft Diamond Pickaxe\n' +
        '[x] Build Nether Portal\n' +
        '[ ] Find Ancient Debris in Nether (Y=15)\n' +
        '[ ] Brew Strength and Fire Resistance Potions\n' +
        '[ ] Defeat the Ender Dragon\n' +
        '[ ] Elytra retrieval expedition',
    },

    // Files in Worlds
    {
      id: 'world-1',
      name: 'Hardcore_Survival_Day_142.dat',
      type: 'file',
      parentId: 'worlds',
      size: '42.8 MB',
      updatedAt: 'Yesterday',
      content: 'World Seed: -48291059281\nSpawn Biome: Old Growth Taiga\nPlayer HP: 20/20\nDifficulty: HARDCORE',
    },
    {
      id: 'world-2',
      name: 'Mega_Redstone_Computer.dat',
      type: 'file',
      parentId: 'worlds',
      size: '128.5 MB',
      updatedAt: 'Last week',
      content: 'World Seed: 84920491\nType: Superflat\nFeatures: 8-bit CPU, RAM display, piston doors',
    },

    // Files in Recipes
    {
      id: 'recipe-1',
      name: 'Automated_Sugarcane_Farm.txt',
      type: 'file',
      parentId: 'recipes',
      size: '2.4 KB',
      updatedAt: '3 days ago',
      content:
        'Components required:\n' +
        '- 16 Observers\n' +
        '- 16 Pistons\n' +
        '- 16 Redstone Dust\n' +
        '- Water source & mud/sand\n' +
        '- Minecart with Hopper underneath',
    },
  ];
}
