import type { CategoryId } from './convert';

export interface CategoryMeta {
  id: CategoryId;
  label: string;
  description: string;
  path: string;
}

export const categories: CategoryMeta[] = [
  {
    id: 'length',
    label: 'Length',
    description: 'Centimeters, inches, feet, miles, and more.',
    path: '/convert/length',
  },
  {
    id: 'weight',
    label: 'Weight',
    description: 'Kilograms, pounds, ounces, stones, and tons.',
    path: '/convert/weight',
  },
  {
    id: 'temperature',
    label: 'Temperature',
    description: 'Celsius, Fahrenheit, and Kelvin.',
    path: '/convert/temperature',
  },
  {
    id: 'volume',
    label: 'Volume',
    description: 'Liters, gallons, cups, milliliters, and more.',
    path: '/convert/volume',
  },
  {
    id: 'area',
    label: 'Area',
    description: 'Square meters, square feet, acres, and hectares.',
    path: '/convert/area',
  },
  {
    id: 'speed',
    label: 'Speed',
    description: 'km/h, mph, knots, and meters per second.',
    path: '/convert/speed',
  },
];

export function getCategoryMeta(id: CategoryId): CategoryMeta | undefined {
  return categories.find((c) => c.id === id);
}
