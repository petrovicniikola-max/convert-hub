import unitsData from '../../data/units.json';

export type CategoryId = keyof typeof unitsData.categories;
export type UnitId = string;

export interface UnitInfo {
  id: UnitId;
  category: CategoryId;
  symbol: string;
  name: string;
}

const LINEAR_CATEGORIES = new Set<CategoryId>(['length', 'weight', 'volume', 'area', 'speed']);

function getUnit(category: CategoryId, unitId: UnitId) {
  const categoryDef = unitsData.categories[category];
  const unit = categoryDef.units[unitId as keyof typeof categoryDef.units];
  if (!unit) {
    throw new Error(`Unknown unit "${unitId}" in category "${category}"`);
  }
  return unit;
}

export function getUnitInfo(category: CategoryId, unitId: UnitId): UnitInfo {
  const unit = getUnit(category, unitId);
  return {
    id: unitId,
    category,
    symbol: unit.symbol,
    name: unit.name,
  };
}

export function getUnitsInCategory(category: CategoryId): UnitInfo[] {
  const categoryDef = unitsData.categories[category];
  return Object.keys(categoryDef.units).map((id) => getUnitInfo(category, id));
}

function toCelsius(value: number, from: UnitId): number {
  if (from === 'celsius') return value;
  if (from === 'fahrenheit') return (value - 32) * (5 / 9);
  if (from === 'kelvin') return value - 273.15;
  throw new Error(`Unsupported temperature unit: ${from}`);
}

function fromCelsius(value: number, to: UnitId): number {
  if (to === 'celsius') return value;
  if (to === 'fahrenheit') return value * (9 / 5) + 32;
  if (to === 'kelvin') return value + 273.15;
  throw new Error(`Unsupported temperature unit: ${to}`);
}

export function convert(
  value: number,
  fromUnit: UnitId,
  toUnit: UnitId,
  category: CategoryId,
): number {
  if (!Number.isFinite(value)) {
    throw new Error('Value must be a finite number');
  }

  if (fromUnit === toUnit) return value;

  if (category === 'temperature') {
    return fromCelsius(toCelsius(value, fromUnit), toUnit);
  }

  if (!LINEAR_CATEGORIES.has(category)) {
    throw new Error(`Category "${category}" is not supported yet`);
  }

  const from = getUnit(category, fromUnit) as { toBase: number };
  const to = getUnit(category, toUnit) as { toBase: number };
  const baseValue = value * from.toBase;
  return baseValue / to.toBase;
}

export function formatResult(value: number, maxDecimals = 6): string {
  if (!Number.isFinite(value)) return '—';
  const rounded = Number(value.toPrecision(10));
  const str = rounded.toString();
  const [intPart, decPart] = str.split('.');
  if (!decPart) return intPart;
  const trimmed = decPart.replace(/0+$/, '');
  if (!trimmed) return intPart;
  return `${intPart}.${trimmed.slice(0, maxDecimals)}`;
}

export function buildConversionTable(
  fromUnit: UnitId,
  toUnit: UnitId,
  category: CategoryId,
  sampleValues: number[],
): Array<{ input: number; output: string }> {
  return sampleValues.map((input) => ({
    input,
    output: formatResult(convert(input, fromUnit, toUnit, category)),
  }));
}

/** Exact factor: how many `toUnit` per 1 `fromUnit`. */
export function getConversionFactor(
  fromUnit: UnitId,
  toUnit: UnitId,
  category: CategoryId,
): number {
  return convert(1, fromUnit, toUnit, category);
}
