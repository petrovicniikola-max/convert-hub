import { describe, expect, it } from 'vitest';
import { buildConversionTable, convert, formatResult, getConversionFactor } from './convert';

describe('convert - length', () => {
  it('converts cm to inch', () => {
    expect(convert(2.54, 'cm', 'inch', 'length')).toBeCloseTo(1, 8);
    expect(convert(10, 'cm', 'inch', 'length')).toBeCloseTo(3.93700787, 5);
  });

  it('converts inch to cm', () => {
    expect(convert(1, 'inch', 'cm', 'length')).toBeCloseTo(2.54, 8);
    expect(convert(100, 'inch', 'cm', 'length')).toBeCloseTo(254, 5);
  });

  it('round-trips cm ↔ inch', () => {
    const original = 42.5;
    const roundTrip = convert(convert(original, 'cm', 'inch', 'length'), 'inch', 'cm', 'length');
    expect(roundTrip).toBeCloseTo(original, 8);
  });

  it('returns same value for identical units', () => {
    expect(convert(5, 'cm', 'cm', 'length')).toBe(5);
  });
});

describe('convert - temperature', () => {
  it('converts celsius to fahrenheit', () => {
    expect(convert(0, 'celsius', 'fahrenheit', 'temperature')).toBeCloseTo(32, 8);
    expect(convert(100, 'celsius', 'fahrenheit', 'temperature')).toBeCloseTo(212, 8);
  });

  it('converts fahrenheit to celsius', () => {
    expect(convert(32, 'fahrenheit', 'celsius', 'temperature')).toBeCloseTo(0, 8);
  });

  it('converts celsius to kelvin', () => {
    expect(convert(0, 'celsius', 'kelvin', 'temperature')).toBeCloseTo(273.15, 8);
    expect(convert(-273.15, 'celsius', 'kelvin', 'temperature')).toBeCloseTo(0, 5);
  });
});

describe('convert - weight', () => {
  it('converts kg to lb', () => {
    expect(convert(1, 'kg', 'lb', 'weight')).toBeCloseTo(2.20462, 4);
  });
});

describe('convert - volume', () => {
  it('converts liter to gallon', () => {
    expect(convert(3.78541, 'liter', 'gallon', 'volume')).toBeCloseTo(1, 4);
  });
});

describe('convert - speed', () => {
  it('converts kmh to mph', () => {
    expect(convert(100, 'kmh', 'mph', 'speed')).toBeCloseTo(62.137, 2);
  });
});

describe('helpers', () => {
  it('formatResult trims trailing zeros', () => {
    expect(formatResult(3.937007874)).toBe('3.937007');
    expect(formatResult(10)).toBe('10');
    expect(formatResult(0.3937007874)).toBe('0.393700');
  });

  it('getConversionFactor for cm to inch', () => {
    expect(getConversionFactor('cm', 'inch', 'length')).toBeCloseTo(1 / 2.54, 8);
  });

  it('buildConversionTable', () => {
    const table = buildConversionTable('cm', 'inch', 'length', [1, 10, 100]);
    expect(table).toHaveLength(3);
    expect(table[0].input).toBe(1);
    expect(Number(table[0].output)).toBeCloseTo(0.3937, 3);
  });

  it('rejects non-finite values', () => {
    expect(() => convert(NaN, 'cm', 'inch', 'length')).toThrow();
  });
});
