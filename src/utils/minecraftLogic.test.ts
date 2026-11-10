import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateStackCount,
  calculateItemsFromStacks,
  executeMinecraftCommand,
  formatMinecraftTime,
  createInitialFileSystem,
  type CommandContext,
} from './minecraftLogic';

test('calculateStackCount handles multiples of 64 correctly', () => {
  const result = calculateStackCount(128);
  assert.equal(result.stacks, 2);
  assert.equal(result.remainder, 0);
  assert.equal(result.displayText, '2 stacks');
});

test('calculateStackCount handles stacks with remainder', () => {
  const result = calculateStackCount(70);
  assert.equal(result.stacks, 1);
  assert.equal(result.remainder, 6);
  assert.equal(result.displayText, '1 stack + 6');
});

test('calculateStackCount handles less than 1 stack', () => {
  const result = calculateStackCount(32);
  assert.equal(result.stacks, 0);
  assert.equal(result.remainder, 32);
  assert.equal(result.displayText, '32 items');
});

test('calculateItemsFromStacks calculates total items', () => {
  assert.equal(calculateItemsFromStacks(3, 10), 3 * 64 + 10);
  assert.equal(calculateItemsFromStacks(0, 5), 5);
});

test('formatMinecraftTime converts ticks to 24h clock', () => {
  assert.equal(formatMinecraftTime(0), '06:00');
  assert.equal(formatMinecraftTime(6000), '12:00');
  assert.equal(formatMinecraftTime(12000), '18:00');
  assert.equal(formatMinecraftTime(18000), '00:00');
});

test('executeMinecraftCommand handles /time set day', () => {
  const context: CommandContext = {
    timeTicks: 14000,
    weather: 'clear',
    gameMode: 'survival',
    difficulty: 'normal',
    volume: 0.8,
    inventory: [],
  };

  const result = executeMinecraftCommand('/time set day', context);
  assert.equal(result.success, true);
  assert.equal(result.updatedContext?.timeTicks, 1000);
});

test('executeMinecraftCommand handles /gamemode creative', () => {
  const context: CommandContext = {
    timeTicks: 1000,
    weather: 'clear',
    gameMode: 'survival',
    difficulty: 'normal',
    volume: 0.8,
    inventory: [],
  };

  const result = executeMinecraftCommand('/gamemode creative', context);
  assert.equal(result.success, true);
  assert.equal(result.updatedContext?.gameMode, 'creative');
});

test('executeMinecraftCommand handles /give diamond 64', () => {
  const context: CommandContext = {
    timeTicks: 1000,
    weather: 'clear',
    gameMode: 'survival',
    difficulty: 'normal',
    volume: 0.8,
    inventory: [],
  };

  const result = executeMinecraftCommand('/give diamond 64', context);
  assert.equal(result.success, true);
  assert.deepEqual(result.updatedContext?.inventory, ['diamond x64']);
});

test('createInitialFileSystem creates base folder tree', () => {
  const fs = createInitialFileSystem();
  assert.ok(fs.length >= 5);
  const desktopFolder = fs.find((f) => f.id === 'desktop');
  assert.ok(desktopFolder);
  const welcomeFile = fs.find((f) => f.id === 'welcome-txt');
  assert.ok(welcomeFile);
  assert.equal(welcomeFile?.parentId, 'desktop');
});
