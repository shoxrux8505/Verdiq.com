import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, '../src/assets');

const imagesToOptimize = [
  'verdiq-logo.png',
  'showcase-1.png',
  'showcase-2.png'
];

async function optimizeImages() {
  for (const imgName of imagesToOptimize) {
    const inputPath = path.join(assetsDir, imgName);
    const outputPath = path.join(assetsDir, imgName.replace('.png', '.webp'));

    if (fs.existsSync(inputPath)) {
      console.log(`Optimizing ${imgName}...`);
      try {
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        console.log(`Successfully created ${path.basename(outputPath)}`);
      } catch (err) {
        console.error(`Error optimizing ${imgName}:`, err);
      }
    } else {
      console.warn(`File not found: ${inputPath}`);
    }
  }
}

optimizeImages();
