import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
  { src: 'src/assets/hero-children.jpg', quality: 70, priority: true },
  { src: 'src/assets/gallery-1.jpg', quality: 65 },
  { src: 'src/assets/gallery-2.jpg', quality: 65 },
  { src: 'src/assets/gallery-3.jpg', quality: 65 },
  { src: 'src/assets/gallery-4.jpg', quality: 65 },
  { src: 'src/assets/gallery-5.jpg', quality: 65 },
  { src: 'src/assets/gallery-6.jpg', quality: 65 },
  { src: 'src/assets/logo.png', quality: 70, priority: true },
  { src: 'src/assets/chatbot-avatar.png', quality: 70 },
];

const sizes = {
  mobile: 480,
  tablet: 768,
  desktop: 1200,
};

const sizeOrder = ['mobile', 'tablet', 'desktop'];

async function optimizeImages() {
  console.log('🚀 Starting image optimization...\n');

  for (const img of images) {
    const ext = path.extname(img.src);
    const baseName = img.src.replace(ext, '');
    const extNoDot = ext.replace('.', '');

    if (!fs.existsSync(img.src)) {
      console.log(`⚠️  File not found: ${img.src}`);
      continue;
    }

    const originalSize = fs.statSync(img.src).size / 1024;
    console.log(`\n📸 Processing: ${img.src} (${originalSize.toFixed(1)} KB)`);

    try {
      // Create responsive variants
      for (const size of sizeOrder) {
        const width = sizes[size];
        const webpPath = `${baseName}-${size}.webp`;

        await sharp(img.src)
          .resize(width, null, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .webp({ quality: img.quality })
          .toFile(webpPath);

        const webpSize = fs.statSync(webpPath).size / 1024;
        const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
        console.log(`  ✓ ${size.padEnd(8)}: ${webpSize.toFixed(1)} KB (${savings}% savings)`);

        // Keep original as fallback for PNG files
        if (extNoDot === 'png' && size === 'desktop') {
          const fallbackPath = `${baseName}-desktop.${extNoDot}`;
          await sharp(img.src)
            .resize(width, null, {
              fit: 'inside',
              withoutEnlargement: true,
            })
            .png({ quality: img.quality })
            .toFile(fallbackPath);

          const fallbackSize = fs.statSync(fallbackPath).size / 1024;
          console.log(`  ✓ ${size}.fallback: ${fallbackSize.toFixed(1)} KB (PNG)`);
        }
      }

      console.log(`  ✅ Completed: ${img.src}`);
    } catch (error) {
      console.error(`  ❌ Error processing ${img.src}:`, error.message);
    }
  }

  console.log('\n🎉 Image optimization complete!');
}

optimizeImages().catch(console.error);
