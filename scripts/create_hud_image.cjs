const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function createPNG(width, height, pixelFn) {
  const rowSize = width * 4 + 1;
  const raw = Buffer.alloc(rowSize * height);
  for (let y = 0; y < height; y++) {
    raw[y * rowSize] = 0;
    for (let x = 0; x < width; x++) {
      const idx = y * rowSize + 1 + x * 4;
      const [r, g, b, a] = pixelFn(x, y);
      raw[idx] = r;
      raw[idx + 1] = g;
      raw[idx + 2] = b;
      raw[idx + 3] = a !== undefined ? a : 255;
    }
  }

  const deflated = zlib.deflateSync(raw);

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const chunkType = Buffer.from(type, 'ascii');
    const body = Buffer.concat([chunkType, data]);
    const crc = Buffer.alloc(4);
    let c = 0xffffffff;
    const table = [];
    for (let n = 0; n < 256; n++) {
      let cur = n;
      for (let k = 0; k < 8; k++) {
        cur = (cur & 1) ? (0xedb88320 ^ (cur >>> 1)) : (cur >>> 1);
      }
      table[n] = cur;
    }
    for (let i = 0; i < body.length; i++) {
      c = table[(c ^ body[i]) & 0xff] ^ (c >>> 8);
    }
    crc.writeUInt32BE((c ^ 0xffffffff) >>> 0, 0);
    return Buffer.concat([len, body, crc]);
  }

  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    header,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', deflated),
    makeChunk('IEND', Buffer.alloc(0))
  ]);
}

// 9x9 Pixel definitions
// Heart: 0=trans, 1=black, 2=red, 3=dark_red, 4=white
const HEART_PIXELS = [
  [0, 1, 1, 0, 0, 0, 1, 1, 0],
  [1, 4, 2, 1, 0, 1, 2, 2, 1],
  [1, 2, 2, 2, 1, 2, 2, 3, 1],
  [1, 2, 2, 2, 2, 2, 3, 3, 1],
  [1, 2, 2, 2, 2, 3, 3, 3, 1],
  [0, 1, 2, 2, 3, 3, 3, 1, 0],
  [0, 0, 1, 2, 3, 3, 1, 0, 0],
  [0, 0, 0, 1, 3, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
];

// Hunger drumstick: 0=trans, 1=black, 2=meat_brown, 3=meat_dark, 4=meat_specular, 5=bone_white, 6=bone_shade
const HUNGER_PIXELS = [
  [0, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 1, 4, 4, 2, 1, 0, 0, 0],
  [1, 4, 4, 2, 2, 2, 1, 0, 0],
  [1, 2, 2, 2, 2, 3, 1, 0, 0],
  [1, 2, 2, 2, 3, 3, 1, 0, 0],
  [0, 1, 3, 3, 3, 1, 5, 1, 0],
  [0, 0, 1, 1, 1, 5, 5, 6, 1],
  [0, 0, 0, 0, 1, 6, 1, 1, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0],
];

// Number "8" in Minecraft font (width 5, height 7): 1=green, 2=outline
const NUM_8 = [
  [0, 2, 2, 2, 0],
  [2, 1, 0, 1, 2],
  [2, 1, 0, 1, 2],
  [0, 2, 1, 2, 0],
  [2, 1, 0, 1, 2],
  [2, 1, 0, 1, 2],
  [0, 2, 2, 2, 0],
];

function buildHud(withGrassBg = true) {
  // Target dimensions matching Minecraft Java standard HUD
  // Width 378px, Height 38px
  const W = 378;
  const H = 38;
  const canvas = Array.from({ length: H }, () => Array.from({ length: W }, () => [0, 0, 0, 0]));

  // 1. Fill background if withGrassBg
  // Foliage green palette with soft organic pixel noise
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (withGrassBg) {
        const noise = ((Math.sin(x * 0.17 + y * 0.23) * 10000) % 1 + 1) / 2;
        const n2 = ((Math.cos(x * 0.41 - y * 0.19) * 10000) % 1 + 1) / 2;
        let r = 88 + Math.floor(noise * 18);
        let g = 118 + Math.floor(n2 * 22);
        let b = 38 + Math.floor(noise * 12);
        canvas[y][x] = [r, g, b, 255];
      } else {
        canvas[y][x] = [0, 0, 0, 0];
      }
    }
  }

  // Scale 2x for crisp rendering
  // Left side: 10 hearts
  // Each heart 9px wide, spaced by 8px (overlap/standard 8px grid) -> 9*8 + 9 = 81px
  const startHeartX = 4;
  const topY = 4;

  const heartPalette = {
    1: [0, 0, 0, 255],        // black outline
    2: [255, 34, 0, 255],     // bright red
    3: [180, 0, 0, 255],      // shadow red
    4: [255, 255, 255, 255],  // white specular
  };

  for (let i = 0; i < 10; i++) {
    const hx = startHeartX + i * 16; // 16px per heart at 2x scale
    for (let py = 0; py < 9; py++) {
      for (let px = 0; px < 9; px++) {
        const val = HEART_PIXELS[py][px];
        if (val > 0) {
          const col = heartPalette[val];
          // Draw at 2x (or scaled 1.77x)
          for (let dy = 0; dy < 2; dy++) {
            for (let dx = 0; dx < 2; dx++) {
              const cy = topY + py * 2 + dy;
              const cx = hx + px * 2 + dx;
              if (cy < H && cx < W) {
                canvas[cy][cx] = col;
              }
            }
          }
        }
      }
    }
  }

  // Right side: 10 hunger drumsticks (counted right-to-left)
  const drumstickPalette = {
    1: [0, 0, 0, 255],        // black outline
    2: [178, 98, 48, 255],    // roasted meat brown
    3: [102, 45, 18, 255],    // dark roasted shade
    4: [222, 138, 78, 255],   // meat specular
    5: [240, 235, 220, 255],  // bone white
    6: [160, 155, 140, 255],  // bone shadow
  };

  const endDrumstickX = W - 22;
  for (let i = 0; i < 10; i++) {
    const dx = endDrumstickX - i * 16;
    for (let py = 0; py < 9; py++) {
      for (let px = 0; px < 9; px++) {
        const val = HUNGER_PIXELS[py][px];
        if (val > 0) {
          const col = drumstickPalette[val];
          for (let dy = 0; dy < 2; dy++) {
            for (let dx2 = 0; dx2 < 2; dx2++) {
              const cy = topY + py * 2 + dy;
              const cx = dx + px * 2 + dx2;
              if (cy < H && cx < W) {
                canvas[cy][cx] = col;
              }
            }
          }
        }
      }
    }
  }

  // Center: Level "8" in bright lime green with black outline
  const centerX = Math.floor(W / 2) - 5;
  const numY = topY + 6;
  for (let py = 0; py < 7; py++) {
    for (let px = 0; px < 5; px++) {
      const v = NUM_8[py][px];
      if (v > 0) {
        const col = v === 1 ? [128, 255, 32, 255] : [0, 0, 0, 255];
        for (let dy = 0; dy < 2; dy++) {
          for (let dx = 0; dx < 2; dx++) {
            const cy = numY + py * 2 + dy;
            const cx = centerX + px * 2 + dx;
            if (cy < H && cx < W) {
              canvas[cy][cx] = col;
            }
          }
        }
      }
    }
  }

  // Bottom row: Segmented XP bar
  const xpTop = topY + 22;
  const xpHeight = 8;
  const xpStartX = 4;
  const xpEndX = W - 4;
  const totalXpWidth = xpEndX - xpStartX;
  const filledWidth = Math.floor(totalXpWidth * 0.32); // 32% filled like in the image (~5 segments)

  for (let y = xpTop; y < xpTop + xpHeight; y++) {
    const isBorder = (y === xpTop || y === xpTop + xpHeight - 1);
    for (let x = xpStartX; x < xpEndX; x++) {
      if (isBorder || x === xpStartX || x === xpEndX - 1) {
        canvas[y][x] = [0, 0, 0, 255]; // Black outer border
      } else {
        // Vertical divider every ~20px (18 segments)
        const relX = x - xpStartX;
        const isTick = (relX % 20 === 0);
        if (isTick) {
          canvas[y][x] = [0, 0, 0, 255];
        } else if (relX < filledWidth) {
          // Green XP gradient
          const isHighlight = (y === xpTop + 2 || y === xpTop + 3);
          if (isHighlight) {
            canvas[y][x] = [140, 255, 70, 255];
          } else {
            canvas[y][x] = [90, 230, 40, 255];
          }
        } else {
          // Empty dark slate/green bar
          const isMid = (y === xpTop + 2 || y === xpTop + 3);
          if (isMid) {
            canvas[y][x] = [40, 52, 38, 255];
          } else {
            canvas[y][x] = [24, 34, 22, 255];
          }
        }
      }
    }
  }

  return createPNG(W, H, (x, y) => canvas[y][x]);
}

const outDir = path.resolve(__dirname, '../public/assets');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Write minecraft_hud.png (with authentic grass background matching uploaded image)
const hudWithBg = buildHud(true);
fs.writeFileSync(path.join(outDir, 'minecraft_hud.png'), hudWithBg);
console.log('Saved /public/assets/minecraft_hud.png');

// 2. Write minecraft_hud_transparent.png
const hudTransparent = buildHud(false);
fs.writeFileSync(path.join(outDir, 'minecraft_hud_transparent.png'), hudTransparent);
console.log('Saved /public/assets/minecraft_hud_transparent.png');
