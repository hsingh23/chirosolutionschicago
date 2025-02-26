#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const SOURCE_ICON = path.join(__dirname, '../public/favicon.png');
const OUTPUT_DIR = path.join(__dirname, '../public/icons');

// Define icon sizes
const ICON_SIZES = [
  72, 96, 128, 144, 152, 384, 512
];

async function generateIcons() {
  try {
    // Create output directory if it doesn't exist
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    
    // Generate regular icons
    for (const size of ICON_SIZES) {
      await sharp(SOURCE_ICON)
        .resize(size, size)
        .toFile(path.join(OUTPUT_DIR, `icon-${size}x${size}.png`));
      console.log(`Generated icon-${size}x${size}.png`);
    }
    
    // Generate maskable icon with padding
    await sharp(SOURCE_ICON)
      .resize(512, 512, {
        fit: 'contain',
        background: { r: 188, g: 205, b: 48, alpha: 1 } // #bccd30
      })
      .toFile(path.join(OUTPUT_DIR, 'maskable-icon.png'));
    console.log('Generated maskable-icon.png');
    
    // Generate badge icon (smaller, for notifications)
    await sharp(SOURCE_ICON)
      .resize(96, 96)
      .toFile(path.join(OUTPUT_DIR, 'badge-icon.png'));
    console.log('Generated badge-icon.png');
    
    // Generate app shortcut icons
    await sharp(SOURCE_ICON)
      .resize(192, 192)
      .toFile(path.join(OUTPUT_DIR, 'booking-icon.png'));
    console.log('Generated booking-icon.png');
    
    await sharp(SOURCE_ICON)
      .resize(192, 192)
      .toFile(path.join(OUTPUT_DIR, 'services-icon.png'));
    console.log('Generated services-icon.png');
    
    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

generateIcons();