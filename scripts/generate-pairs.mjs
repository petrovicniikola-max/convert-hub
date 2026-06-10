/**
 * Generates conversion-pairs.json from units.json — all directed pairs per category.
 * Run: node scripts/generate-pairs.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const units = JSON.parse(fs.readFileSync(path.join(root, 'data/units.json'), 'utf8'));

/** Sensible default input values per unit id for the converter widget. */
const DEFAULT_VALUES = {
  length: {
    mm: 25,
    cm: 10,
    m: 1,
    km: 5,
    inch: 12,
    foot: 6,
    yard: 1,
    mile: 1,
    nauticalmile: 1,
  },
  weight: {
    mg: 500,
    g: 100,
    kg: 70,
    oz: 8,
    lb: 150,
    stone: 12,
    ton: 1,
  },
  temperature: {
    celsius: 20,
    fahrenheit: 68,
    kelvin: 300,
  },
  volume: {
    ml: 250,
    liter: 4,
    m3: 1,
    floz: 12,
    cup: 2,
    tbsp: 3,
    pint: 2,
    quart: 1,
    gallon: 1,
  },
  area: {
    m2: 50,
    sqft: 1000,
    acre: 1,
    hectare: 1,
  },
  speed: {
    mps: 10,
    kmh: 100,
    mph: 60,
    knots: 30,
  },
};

const pairs = [];

for (const [category, config] of Object.entries(units.categories)) {
  const unitIds = Object.keys(config.units);
  for (const from of unitIds) {
    for (const to of unitIds) {
      if (from === to) continue;
      pairs.push({
        slug: `${from}-to-${to}`,
        category,
        from,
        to,
        defaultValue: DEFAULT_VALUES[category]?.[from] ?? 1,
      });
    }
  }
}

pairs.sort((a, b) => {
  if (a.category !== b.category) return a.category.localeCompare(b.category);
  return a.slug.localeCompare(b.slug);
});

const output = { pairs };
const outPath = path.join(root, 'data/conversion-pairs.json');
fs.writeFileSync(outPath, `${JSON.stringify(output, null, 2)}\n`);

console.log(`Wrote ${pairs.length} pairs to data/conversion-pairs.json`);
for (const cat of Object.keys(units.categories)) {
  const count = pairs.filter((p) => p.category === cat).length;
  console.log(`  ${cat}: ${count}`);
}
