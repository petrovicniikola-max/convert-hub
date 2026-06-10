import type { ConversionPair } from './pairs';
import { getReversePair } from './pairs';
import {
  buildConversionTable,
  convert,
  formatResult,
  getConversionFactor,
  getUnitInfo,
  type CategoryId,
} from './convert';

export interface PageContent {
  path: string;
  pageTitle: string;
  h1: string;
  description: string;
  categoryLabel: string;
  lead: string;
  introTitle: string;
  introParagraphs: string[];
  formula: string;
  exampleParagraph: string;
  tableTitle: string;
  reverseTableTitle: string;
  reverseLinkText: string | null;
  tableRows: Array<{ input: number; output: string }>;
  reverseTableRows: Array<{ input: number; output: string }>;
  faq: Array<{ question: string; answer: string }>;
  breadcrumbLabel: string;
}

const CATEGORY_LABELS: Record<CategoryId, string> = {
  length: 'Length',
  weight: 'Weight',
  temperature: 'Temperature',
  volume: 'Volume',
  area: 'Area',
  speed: 'Speed',
};

const TABLE_VALUES: Record<CategoryId, number[]> = {
  length: [1, 2, 5, 10, 25, 50, 100, 150, 200],
  weight: [1, 2, 5, 10, 25, 50, 100, 200, 500],
  temperature: [], // use unit-specific samples via getTableSampleValues
  volume: [1, 2, 4, 8, 16, 32, 64],
  area: [1, 5, 10, 25, 50, 100, 500],
  speed: [1, 5, 10, 30, 60, 100, 120],
};

const REVERSE_TABLE_VALUES: Record<CategoryId, number[]> = {
  length: [1, 2, 6, 12, 24, 36, 48, 60, 72],
  weight: [1, 4, 8, 16, 32, 64, 128, 150, 200],
  temperature: [], // use unit-specific samples via getTableSampleValues
  volume: [1, 2, 4, 8, 16, 32, 64],
  area: [1, 5, 10, 25, 50, 100, 1000],
  speed: [1, 5, 15, 30, 55, 60, 100],
};

/** Sample inputs for conversion tables — sensible everyday values per unit. */
function getTableSampleValues(unitId: string, category: CategoryId): number[] {
  if (category === 'temperature') {
    if (unitId === 'celsius') return [-5, 0, 10, 15, 20, 25, 30];
    if (unitId === 'fahrenheit') return [23, 32, 50, 59, 68, 77, 86];
    if (unitId === 'kelvin') return [268, 273, 283, 288, 293, 298, 303];
  }
  return TABLE_VALUES[category];
}

function getReverseTableSampleValues(unitId: string, category: CategoryId): number[] {
  if (category === 'temperature') {
    return getTableSampleValues(unitId, category);
  }
  return REVERSE_TABLE_VALUES[category];
}

function shortLabel(pair: ConversionPair, which: 'from' | 'to'): string {
  const id = which === 'from' ? pair.from : pair.to;
  return getUnitInfo(pair.category, id).symbol;
}

function getFormula(pair: ConversionPair): string {
  const from = getUnitInfo(pair.category, pair.from);
  const to = getUnitInfo(pair.category, pair.to);

  if (pair.category === 'temperature') {
    if (pair.from === 'celsius' && pair.to === 'fahrenheit') {
      return '°F = (°C × 9/5) + 32';
    }
    if (pair.from === 'fahrenheit' && pair.to === 'celsius') {
      return '°C = (°F − 32) × 5/9';
    }
    if (pair.from === 'celsius' && pair.to === 'kelvin') {
      return 'K = °C + 273.15';
    }
    if (pair.from === 'fahrenheit' && pair.to === 'kelvin') {
      return 'K = (°F − 32) × 5/9 + 273.15';
    }
    if (pair.from === 'kelvin' && pair.to === 'celsius') {
      return '°C = K − 273.15';
    }
    return `${to.symbol} = f(${from.symbol})`;
  }

  const factor = formatResult(getConversionFactor(pair.from, pair.to, pair.category));
  return `${to.symbol} = ${from.symbol} × ${factor}`;
}

function getUseCase(category: CategoryId): string {
  switch (category) {
    case 'length':
      return 'travel distances, screen sizes, furniture dimensions, and construction plans';
    case 'weight':
      return 'recipes, shipping labels, fitness tracking, and luggage limits';
    case 'temperature':
      return 'weather forecasts, cooking, science labs, and HVAC settings';
    case 'volume':
      return 'cooking measurements, fuel economy context, and liquid packaging';
    case 'area':
      return 'real estate listings, land surveys, agriculture, and floor plans';
    case 'speed':
      return 'driving abroad, aviation, running pace, and wind reports';
    default:
      return 'everyday calculations';
  }
}

function getDirectionContext(pair: ConversionPair): string {
  const from = getUnitInfo(pair.category, pair.from);
  const to = getUnitInfo(pair.category, pair.to);

  const metricIds = ['mm', 'cm', 'm', 'km', 'g', 'kg', 'mg', 'liter', 'ml', 'm2', 'm3', 'kmh', 'mps'];
  const imperialIds = ['inch', 'foot', 'yard', 'mile', 'oz', 'lb', 'stone', 'floz', 'cup', 'gallon', 'sqft', 'acre', 'mph'];

  if (metricIds.includes(pair.from) && imperialIds.includes(pair.to)) {
    return `This page converts ${from.name.toLowerCase()} to ${to.name.toLowerCase()} — the direction you need when a product, map, or recipe uses metric but you think in US or UK customary units.`;
  }
  if (imperialIds.includes(pair.from) && metricIds.includes(pair.to)) {
    return `This page converts ${from.name.toLowerCase()} to ${to.name.toLowerCase()} — ideal when American or British measurements need to match metric specs, school assignments, or international standards.`;
  }

  const reverse = getReversePair(pair);
  if (reverse) {
    return `Looking for the opposite direction? See our dedicated ${to.name.toLowerCase()} to ${from.name.toLowerCase()} converter — same formula reversed, with content written for that direction.`;
  }

  return `This conversion is commonly used for ${getUseCase(pair.category)} when working across different measurement conventions.`;
}

function getSpecialExample(pair: ConversionPair, sampleResult: string): string {
  const from = getUnitInfo(pair.category, pair.from);
  const to = getUnitInfo(pair.category, pair.to);
  const val = pair.defaultValue;
  const result = formatResult(convert(val, pair.from, pair.to, pair.category));

  if (pair.slug === 'cm-to-inch') {
    return `For example, ${val} cm is about ${result} inches — handy when a product lists metric dimensions but you think in inches (TVs, monitors, paper sizes).`;
  }
  if (pair.slug === 'kg-to-lb') {
    return `A person weighing ${val} kg is roughly ${result} lb on a US scale — common when comparing gym or medical readings across countries.`;
  }
  if (pair.slug === 'celsius-to-fahrenheit') {
    return `${val}°C is ${result}°F — close to room temperature on a warm day. Water freezes at 0°C (32°F) and boils at 100°C (212°F).`;
  }
  if (pair.slug === 'liter-to-gallon') {
    return `${val} liters is about ${result} US gallons — useful at the fuel pump or when reading American container labels.`;
  }
  if (pair.slug === 'kmh-to-mph') {
    return `${val} km/h equals ${result} mph — about highway speed in many European countries compared to US speed limits.`;
  }
  if (pair.slug === 'inch-to-cm') {
    return `${val} inches equals ${result} cm — common for screen diagonals, lumber sizes, and height when metric is required.`;
  }
  if (pair.slug === 'lb-to-kg') {
    return `${val} lb is about ${result} kg — useful for gym records, luggage weight limits, and medical charts outside the US.`;
  }
  if (pair.slug === 'fahrenheit-to-celsius') {
    return `${val}°F is ${result}°C — handy for oven settings when following a European recipe or science worksheet.`;
  }
  if (pair.slug === 'gallon-to-liter') {
    return `${val} US gallon is ${result} liters — about the size of a large milk jug when comparing fuel or container volumes.`;
  }
  if (pair.slug === 'mph-to-kmh') {
    return `${val} mph equals ${result} km/h — essential when reading US speed limits while driving in a metric country.`;
  }

  return `Converting ${val} ${from.symbol} gives ${result} ${to.symbol}. This is a practical reference when switching between ${from.name.toLowerCase()} and ${to.name.toLowerCase()} for ${getUseCase(pair.category)}.`;
}

function buildFaq(pair: ConversionPair): Array<{ question: string; answer: string }> {
  const from = getUnitInfo(pair.category, pair.from);
  const to = getUnitInfo(pair.category, pair.to);
  const factor = getConversionFactor(pair.from, pair.to, pair.category);
  const oneUnit = formatResult(factor);
  const tenUnit = formatResult(convert(10, pair.from, pair.to, pair.category));
  const reverseFactor = formatResult(getConversionFactor(pair.to, pair.from, pair.category));

  const reverse = getReversePair(pair);
  const items: Array<{ question: string; answer: string }> = [
    {
      question: `How many ${to.name.toLowerCase()}s are in 1 ${from.name.toLowerCase()}?`,
      answer: `One ${from.name.toLowerCase()} equals ${oneUnit} ${to.symbol}. Use the converter above for any value — results are calculated locally with full precision.`,
    },
    {
      question: `How do I convert ${from.symbol} to ${to.symbol}?`,
      answer: `Use the formula: ${getFormula(pair)}. Enter your value in the calculator and the result appears instantly. Click the swap button to convert ${to.symbol} back to ${from.symbol}.`,
    },
    {
      question: `How many ${from.name.toLowerCase()}s are in 1 ${to.name.toLowerCase()}?`,
      answer: `One ${to.name.toLowerCase()} equals ${reverseFactor} ${from.symbol}. Swap the converter direction to work backwards from ${to.symbol} to ${from.symbol}.`,
    },
    {
      question: `What is 10 ${from.symbol} in ${to.symbol}?`,
      answer: `10 ${from.symbol} is ${tenUnit} ${to.symbol}. See the conversion table on this page for more common values.`,
    },
    {
      question: `When would I convert ${from.name.toLowerCase()} to ${to.name.toLowerCase()}?`,
      answer: `This conversion is useful for ${getUseCase(pair.category)}. ConvertHub runs entirely in your browser — no data is uploaded to any server.`,
    },
  ];

  if (reverse) {
    const revFrom = getUnitInfo(pair.category, pair.to);
    const revTo = getUnitInfo(pair.category, pair.from);
    items.push({
      question: `Is ${from.name.toLowerCase()} to ${to.name.toLowerCase()} the same as ${revFrom.name.toLowerCase()} to ${revTo.name.toLowerCase()}?`,
      answer: `They are inverse operations. This page focuses on ${from.symbol} → ${to.symbol} with examples and tables for that direction. For ${revFrom.symbol} → ${revTo.symbol}, use our separate ${revFrom.name.toLowerCase()} to ${revTo.name.toLowerCase()} converter page.`,
    });
  }

  return items;
}

export function buildPageContent(pair: ConversionPair): PageContent {
  const from = getUnitInfo(pair.category, pair.from);
  const to = getUnitInfo(pair.category, pair.to);
  const categoryLabel = CATEGORY_LABELS[pair.category];
  const path = `/convert/${pair.slug}`;
  const fromShort = shortLabel(pair, 'from');
  const toShort = shortLabel(pair, 'to');

  const pageTitle = `${from.name} to ${to.name} Converter`;
  const h1 = `${from.name} to ${to.name} Converter`;
  const description = `Convert ${from.name.toLowerCase()} to ${to.name.toLowerCase()} instantly. Free ${fromShort} to ${toShort} calculator with formula, tables, and FAQ. Private — runs in your browser.`;

  const factor = formatResult(getConversionFactor(pair.from, pair.to, pair.category));
  const formula = getFormula(pair);

  const reverse = getReversePair(pair);
  const reverseLinkText = reverse
    ? `Need ${to.name.toLowerCase()} to ${from.name.toLowerCase()} instead? Try our ${to.name} to ${from.name} converter.`
    : null;

  const introParagraphs = [
    `${from.name} (${from.symbol}) and ${to.name} (${to.symbol}) both measure ${categoryLabel.toLowerCase()}. Whether you are studying, traveling, cooking, or working on a project, converting between them should be fast and accurate.`,
    getDirectionContext(pair),
    `The standard relationship used on this page means that 1 ${from.name.toLowerCase()} equals ${factor} ${to.symbol}. Enter any number in the calculator — use the swap button to reverse the direction without leaving the page.`,
    getSpecialExample(pair, factor),
  ];

  return {
    path,
    pageTitle,
    h1,
    description,
    categoryLabel,
    lead: `Convert ${fromShort} to ${toShort} or reverse with one click. Type a value below for an instant result.`,
    introTitle: `How to convert ${from.name.toLowerCase()} to ${to.name.toLowerCase()}`,
    introParagraphs,
    formula,
    exampleParagraph: getSpecialExample(pair, factor),
    tableTitle: `${fromShort} to ${toShort} conversion table`,
    reverseTableTitle: `${toShort} to ${fromShort} conversion table`,
    reverseLinkText,
    tableRows: buildConversionTable(
      pair.from,
      pair.to,
      pair.category,
      getTableSampleValues(pair.from, pair.category),
    ),
    reverseTableRows: buildConversionTable(
      pair.to,
      pair.from,
      pair.category,
      getReverseTableSampleValues(pair.to, pair.category),
    ),
    faq: buildFaq(pair),
    breadcrumbLabel: `${from.symbol} to ${to.symbol}`,
  };
}

export function pairLinkLabel(pair: ConversionPair): string {
  const from = getUnitInfo(pair.category, pair.from);
  const to = getUnitInfo(pair.category, pair.to);
  return `${from.symbol} → ${to.symbol}`;
}
