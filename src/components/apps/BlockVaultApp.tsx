import React, { useState } from 'react';
import {
  BlockGrass,
  BlockCraftingTable,
  BlockFurnace,
  BlockTNT,
  BlockDiamond,
  BlockChest,
  BlockEnderChest,
  BlockCommandBlockItem,
  BlockBookshelf,
  BlockRedstoneLamp,
  ResourceDiamond,
  ResourceEmerald,
  ResourceNetherite,
  ResourceRedstone,
  ItemDiamondSword,
  ItemGoldenApple,
  ItemEnderPearl,
  ItemTotem,
} from '../MinecraftBlockIcons';
import { SoundEngine } from '../../utils/audio';

export interface MinecraftItem {
  id: string;
  name: string;
  category: 'blocks' | 'minerals' | 'redstone' | 'combat' | 'food';
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic';
  stackSize: number;
  description: string;
  lore?: string;
  icon: React.ReactNode;
}

const ALL_MINECRAFT_ITEMS: MinecraftItem[] = [
  // Building Blocks
  {
    id: 'grass_block',
    name: 'Grass Block',
    category: 'blocks',
    rarity: 'Common',
    stackSize: 64,
    description: 'Found abundantly across Overworld biomes. Spreads to adjacent dirt blocks under sufficient light.',
    lore: 'The fundamental building block of Minecraft.',
    icon: <BlockGrass size={28} />,
  },
  {
    id: 'crafting_table',
    name: 'Crafting Table',
    category: 'blocks',
    rarity: 'Common',
    stackSize: 64,
    description: 'Provides a 3x3 crafting grid allowing creation of advanced tools, weapons, and mechanisms.',
    icon: <BlockCraftingTable size={28} />,
  },
  {
    id: 'furnace',
    name: 'Furnace',
    category: 'blocks',
    rarity: 'Common',
    stackSize: 64,
    description: 'Smelts ores, sand, and clay into refined ingots and glass using coal or wood fuel.',
    icon: <BlockFurnace size={28} />,
  },
  {
    id: 'diamond_block',
    name: 'Block of Diamond',
    category: 'blocks',
    rarity: 'Rare',
    stackSize: 64,
    description: 'Crafted from 9 pure diamonds. Can be used as a beacon pyramid foundation.',
    lore: 'Pure crystallized carbon structure.',
    icon: <BlockDiamond size={28} />,
  },
  {
    id: 'chest',
    name: 'Oak Chest',
    category: 'blocks',
    rarity: 'Common',
    stackSize: 64,
    description: 'Stores up to 27 stacks of items. Two adjacent chests form a double chest with 54 slots.',
    icon: <BlockChest size={28} />,
  },
  {
    id: 'ender_chest',
    name: 'Ender Chest',
    category: 'blocks',
    rarity: 'Rare',
    stackSize: 64,
    description: 'Interdimensional storage tied to the player. Accessible from any Ender Chest in all dimensions.',
    lore: 'Protected by ancient Ender magic.',
    icon: <BlockEnderChest size={28} />,
  },
  {
    id: 'bookshelf',
    name: 'Bookshelf',
    category: 'blocks',
    rarity: 'Common',
    stackSize: 64,
    description: 'Increases enchanting table level up to Level 30 when placed within 2 blocks.',
    icon: <BlockBookshelf size={28} />,
  },

  // Minerals & Resources
  {
    id: 'diamond',
    name: 'Diamond',
    category: 'minerals',
    rarity: 'Rare',
    stackSize: 64,
    description: 'Extracted deep underground between Y=-50 and Y=-64. Used to craft tier 4 tools and armor.',
    lore: 'The most sought-after gemstone.',
    icon: <ResourceDiamond size={28} />,
  },
  {
    id: 'emerald',
    name: 'Emerald',
    category: 'minerals',
    rarity: 'Uncommon',
    stackSize: 64,
    description: 'The universal currency among villagers and wandering traders.',
    icon: <ResourceEmerald size={28} />,
  },
  {
    id: 'netherite_ingot',
    name: 'Netherite Ingot',
    category: 'minerals',
    rarity: 'Epic',
    stackSize: 64,
    description: 'Forged from 4 netherite scrap and 4 gold ingots. Highly resistant to lava immersion.',
    lore: 'Stronger and more durable than diamond.',
    icon: <ResourceNetherite size={28} />,
  },
  {
    id: 'redstone_dust',
    name: 'Redstone Dust',
    category: 'redstone',
    rarity: 'Common',
    stackSize: 64,
    description: 'Transmits redstone power up to 15 blocks. Essential for building logic gates and automatons.',
    icon: <ResourceRedstone size={28} />,
  },
  {
    id: 'command_block',
    name: 'Command Block',
    category: 'redstone',
    rarity: 'Epic',
    stackSize: 64,
    description: 'Executes server commands with elevated administrative privileges when triggered.',
    lore: 'OP / Creator permission required.',
    icon: <BlockCommandBlockItem size={28} />,
  },
  {
    id: 'tnt',
    name: 'TNT Explosive',
    category: 'redstone',
    rarity: 'Uncommon',
    stackSize: 64,
    description: 'Detonates 4 seconds after ignition with power rating 4.0.',
    icon: <BlockTNT size={28} />,
  },
  {
    id: 'redstone_lamp',
    name: 'Redstone Lamp',
    category: 'redstone',
    rarity: 'Common',
    stackSize: 64,
    description: 'Emits light level 15 when powered by a redstone current.',
    icon: <BlockRedstoneLamp size={28} />,
  },

  // Combat & Equipment
  {
    id: 'diamond_sword',
    name: 'Diamond Sword',
    category: 'combat',
    rarity: 'Rare',
    stackSize: 1,
    description: '+7 Attack Damage, 1.6 Attack Speed. 1561 Durability.',
    icon: <ItemDiamondSword size={28} />,
  },
  {
    id: 'totem_of_undying',
    name: 'Totem of Undying',
    category: 'combat',
    rarity: 'Epic',
    stackSize: 1,
    description: 'Prevents fatal damage when held in offhand. Grants Regeneration II and Fire Resistance.',
    lore: 'Saved Steve from the Void.',
    icon: <ItemTotem size={28} />,
  },
  {
    id: 'ender_pearl',
    name: 'Ender Pearl',
    category: 'combat',
    rarity: 'Uncommon',
    stackSize: 16,
    description: 'Teleports the thrower to destination point upon impact, dealing 5 fall damage.',
    icon: <ItemEnderPearl size={28} />,
  },
  {
    id: 'golden_apple',
    name: 'Golden Apple',
    category: 'food',
    rarity: 'Rare',
    stackSize: 64,
    description: 'Restores 4 hunger shanks. Grants Absorption I (2 minutes) and Regeneration II (5 seconds).',
    lore: 'Infused with 8 gold ingots.',
    icon: <ItemGoldenApple size={28} />,
  },
];

interface BlockVaultAppProps {
  onEquipItem?: (item: MinecraftItem) => void;
}

export const BlockVaultApp: React.FC<BlockVaultAppProps> = ({ onEquipItem }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<MinecraftItem>(ALL_MINECRAFT_ITEMS[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'blocks', label: 'Blocks' },
    { id: 'minerals', label: 'Minerals' },
    { id: 'redstone', label: 'Redstone' },
    { id: 'combat', label: 'Combat' },
    { id: 'food', label: 'Food & Alchemy' },
  ];

  const filteredItems = ALL_MINECRAFT_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectItem = (item: MinecraftItem) => {
    SoundEngine.playPop(0.25);
    setSelectedItem(item);
  };

  const handleEquip = () => {
    SoundEngine.playLevelUp(0.35);
    setToastMessage(`Spawned ${selectedItem.name} into inventory!`);
    setTimeout(() => setToastMessage(null), 2500);
    if (onEquipItem) {
      onEquipItem(selectedItem);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#c6c6c6] text-[#222222] mc-font overflow-hidden select-none">
      {/* Creative Tab Headers */}
      <div className="flex items-center gap-1 px-2 pt-2 bg-[#8b8b8b] border-b-2 border-[#373737]">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => {
              SoundEngine.playClick(0.2);
              setActiveCategory(cat.id);
            }}
            className={`px-3 py-1.5 text-xs font-bold transition-all rounded-t ${
              activeCategory === cat.id
                ? 'bg-[#c6c6c6] text-[#111111] border-t-2 border-l-2 border-r-2 border-[#ffffff] shadow-sm translate-y-[2px]'
                : 'bg-[#737373] text-[#dddddd] hover:bg-[#858585]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search Input Bar */}
      <div className="p-2 bg-[#a0a0a0] border-b border-[#555555] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1">
          <span className="text-xs font-bold">Search Vault:</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Diamond, TNT, Grass Block..."
            className="px-2 py-0.5 mc-input text-xs flex-1 max-w-xs"
          />
        </div>
        <span className="text-xs font-bold text-[#333333]">
          {filteredItems.length} resources available
        </span>
      </div>

      {/* Main Split: Inventory Slots Grid + Inspector Details */}
      <div className="flex-1 flex overflow-hidden p-2 gap-3">
        {/* Left: 9x5 Inventory Slots Grid */}
        <div className="flex-1 bg-[#8b8b8b] p-2 border-2 border-[#373737] rounded overflow-y-auto">
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-9 gap-1.5 auto-rows-max">
            {filteredItems.map((item) => {
              const isSelected = selectedItem.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectItem(item)}
                  title={`${item.name} (Max stack: ${item.stackSize})`}
                  className={`w-11 h-11 flex items-center justify-center mc-slot relative transition-transform ${
                    isSelected ? 'mc-slot-selected scale-105' : 'hover:brightness-110 active:scale-95'
                  }`}
                >
                  {item.icon}
                  {item.stackSize > 1 && (
                    <span
                      className="absolute bottom-0.5 right-1 text-[11px] font-bold text-white mc-text-shadow leading-none pointer-events-none"
                    >
                      {item.stackSize}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Item Lore & Details Inspector */}
        <div className="w-56 sm:w-64 bg-[#100010] border-2 border-[#280070] shadow-inner p-3 flex flex-col justify-between text-white rounded">
          <div>
            <div className="flex items-center gap-2 pb-2 border-b border-[#3b0099] mb-2">
              <div className="w-10 h-10 mc-slot flex items-center justify-center bg-[#222222] shrink-0">
                {selectedItem.icon}
              </div>
              <div>
                <h3 className={`text-base font-bold leading-tight ${
                  selectedItem.rarity === 'Epic' ? 'text-[#ff55ff]' :
                  selectedItem.rarity === 'Rare' ? 'text-[#55ffff]' :
                  selectedItem.rarity === 'Uncommon' ? 'text-[#ffff55]' : 'text-[#ffffff]'
                }`}>
                  {selectedItem.name}
                </h3>
                <span className="text-[10px] text-[#a0a0a0] block">
                  minecraft:{selectedItem.id}
                </span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-[#d0d0d0]">
              <div className="flex justify-between">
                <span className="text-[#888888]">Rarity:</span>
                <span className="font-bold text-[#ffff55]">{selectedItem.rarity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Max Stack:</span>
                <span className="font-mono">{selectedItem.stackSize} items</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888888]">Category:</span>
                <span className="capitalize">{selectedItem.category}</span>
              </div>

              <div className="pt-2 border-t border-[#3b0099]">
                <p className="text-[11px] leading-relaxed text-[#c0c0c0]">
                  {selectedItem.description}
                </p>
                {selectedItem.lore && (
                  <p className="text-[11px] italic text-[#aa00aa] mt-1">
                    "{selectedItem.lore}"
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-2">
            {toastMessage && (
              <div className="text-center text-xs text-[#55ff55] font-bold mb-1">
                {toastMessage}
              </div>
            )}
            <button
              type="button"
              onClick={handleEquip}
              className="w-full py-1.5 mc-button mc-button-green text-xs font-bold"
            >
              + Spawn into Hotbar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
