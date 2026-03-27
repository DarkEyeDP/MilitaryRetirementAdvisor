/**
 * Geocodes all VA facility addresses in vaFacilityLocations.ts
 * using OpenStreetMap Nominatim (free, no API key).
 * Rate-limited to 1 req/sec per Nominatim usage policy.
 *
 * Usage: node scripts/geocode-facilities.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, '../src/app/data/vaFacilityLocations.ts');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function geocode(address) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'MilitaryRetirementAdvisor/1.0 (geocode-facilities-script)' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (!data.length) return null;
  return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
}

async function main() {
  let content = fs.readFileSync(DATA_FILE, 'utf-8');

  // Extract all facility blocks: capture name, current lat, lon, and address
  // Matches both inline and multiline object styles
  const facilityRegex =
    /\{\s*name:\s*'([^']+)'[^}]*?lat:\s*([\d.\-]+)[^}]*?lon:\s*([\d.\-]+)[^}]*?address:\s*'([^']+)'[^}]*?\}/gs;

  const facilities = [];
  let match;
  while ((match = facilityRegex.exec(content)) !== null) {
    facilities.push({
      name: match[1],
      currentLat: parseFloat(match[2]),
      currentLon: parseFloat(match[3]),
      address: match[4],
      raw: match[0],
      index: match.index,
    });
  }

  console.log(`Found ${facilities.length} facilities. Starting geocoding...`);

  let updated = 0;
  let failed = 0;
  let unchanged = 0;

  // Process in order, replacing in content string from end to start to preserve indices
  const patches = [];

  for (let i = 0; i < facilities.length; i++) {
    const f = facilities[i];
    process.stdout.write(`[${i + 1}/${facilities.length}] ${f.name} ... `);

    try {
      const coords = await geocode(f.address);
      if (!coords) {
        console.log('NOT FOUND');
        failed++;
      } else {
        const latDiff = Math.abs(coords.lat - f.currentLat);
        const lonDiff = Math.abs(coords.lon - f.currentLon);
        if (latDiff < 0.001 && lonDiff < 0.001) {
          console.log(`OK (no change)`);
          unchanged++;
        } else {
          console.log(`UPDATED ${f.currentLat},${f.currentLon} → ${coords.lat.toFixed(6)},${coords.lon.toFixed(6)}`);
          patches.push({ facility: f, newLat: coords.lat, newLon: coords.lon });
          updated++;
        }
      }
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
      failed++;
    }

    // 1.1 second delay to respect Nominatim rate limit
    await sleep(1100);
  }

  console.log(`\nGeocoding complete: ${updated} updated, ${unchanged} unchanged, ${failed} failed`);

  if (patches.length === 0) {
    console.log('No changes to apply.');
    return;
  }

  // Apply patches — replace lat/lon values in the raw block text
  // Process patches from last to first to keep string indices valid
  patches.sort((a, b) => b.facility.index - a.facility.index);

  for (const { facility, newLat, newLon } of patches) {
    const oldBlock = facility.raw;
    // Replace lat and lon values within the block
    let newBlock = oldBlock.replace(
      /(lat:\s*)([\d.\-]+)/,
      `$1${newLat.toFixed(6)}`
    );
    newBlock = newBlock.replace(
      /(lon:\s*)([\d.\-]+)/,
      `$1${newLon.toFixed(6)}`
    );
    content = content.slice(0, facility.index) + newBlock + content.slice(facility.index + oldBlock.length);
  }

  fs.writeFileSync(DATA_FILE, content, 'utf-8');
  console.log(`\nFile updated: ${DATA_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
