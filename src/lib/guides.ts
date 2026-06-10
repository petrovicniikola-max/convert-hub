export interface GuideSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readMinutes: number;
  sections: GuideSection[];
  relatedConverters: Array<{ slug: string; label: string }>;
}

export const guides: Guide[] = [
  {
    slug: 'metric-vs-imperial',
    title: 'Metric vs Imperial: When to Use Which System',
    description:
      'A practical guide to metric and imperial measurement systems — where each is used, why both still matter, and how to convert between them.',
    publishedAt: '2026-06-10',
    readMinutes: 6,
    relatedConverters: [
      { slug: 'cm-to-inch', label: 'cm → in' },
      { slug: 'km-to-mile', label: 'km → mi' },
      { slug: 'kg-to-lb', label: 'kg → lb' },
      { slug: 'liter-to-gallon', label: 'L → gal' },
    ],
    sections: [
      {
        heading: 'Two systems, one world',
        paragraphs: [
          'Most countries use the metric system (meters, kilograms, liters) as their everyday standard. The United States, Liberia, and Myanmar still rely heavily on imperial units (inches, pounds, gallons) for daily life, even though science and industry often use metric.',
          'If you shop online, follow international recipes, or read technical specs from another country, you will constantly switch between systems. Understanding both — and knowing quick conversion shortcuts — saves time and prevents costly mistakes.',
        ],
      },
      {
        heading: 'Metric strengths',
        paragraphs: [
          'Metric units scale in powers of ten. Moving from millimeters to centimeters to meters only requires shifting a decimal point. That consistency makes science, engineering, and global trade straightforward.',
        ],
        list: [
          'Length: millimeter → centimeter → meter → kilometer',
          'Weight: milligram → gram → kilogram → metric ton',
          'Volume: milliliter → liter → cubic meter',
          'Temperature: Celsius and Kelvin share a clear zero reference for science',
        ],
      },
      {
        heading: 'Where imperial still dominates',
        paragraphs: [
          'In the US, road signs show miles per hour, lumber is sold in feet and inches, and recipes often use cups and fluid ounces. UK uses a mix: miles on roads but liters at the petrol station.',
          'Screen sizes (phones, TVs, monitors) are marketed globally in inches. Aviation uses feet for altitude and knots for speed worldwide. Real estate in the US lists area in square feet and land in acres.',
        ],
      },
      {
        heading: 'Quick mental conversions',
        paragraphs: [
          'You do not need perfect precision for everyday estimates. One inch is about 2.5 centimeters. One mile is roughly 1.6 kilometers. One kilogram is about 2.2 pounds. One US gallon is close to 3.8 liters.',
          'For exact work — engineering, medicine, baking — use a proper converter. ConvertHub runs entirely in your browser so you can check values privately without uploading data.',
        ],
      },
      {
        heading: 'Which system should you use?',
        paragraphs: [
          'Match your audience. If you are writing for US readers, include imperial alongside metric. For international audiences, lead with metric and add imperial in parentheses.',
          'When in doubt, follow the units on the label, blueprint, or recipe you are working from, then convert to the system you think in. Consistency matters more than which system you pick.',
        ],
      },
    ],
  },
  {
    slug: 'celsius-fahrenheit-explained',
    title: 'Celsius vs Fahrenheit: A Complete Guide',
    description:
      'Understand Celsius and Fahrenheit scales, common reference points, conversion formulas, and when each scale is used around the world.',
    publishedAt: '2026-06-10',
    readMinutes: 5,
    relatedConverters: [
      { slug: 'celsius-to-fahrenheit', label: '°C → °F' },
      { slug: 'fahrenheit-to-celsius', label: '°F → °C' },
      { slug: 'celsius-to-kelvin', label: '°C → K' },
    ],
    sections: [
      {
        heading: 'Why two temperature scales?',
        paragraphs: [
          'Celsius (°C) is based on the freezing and boiling points of water at sea level: 0°C and 100°C. It is used in most countries for weather, cooking, and daily life.',
          'Fahrenheit (°F) sets water freezing at 32°F and boiling at 212°F. It is the standard in the United States for weather forecasts, oven settings, and medical thermometers.',
        ],
      },
      {
        heading: 'Reference points to remember',
        paragraphs: [
          'These anchors help you sanity-check any conversion:',
        ],
        list: [
          'Water freezes: 0°C = 32°F',
          'Room temperature: about 20°C = 68°F',
          'Body temperature: about 37°C = 98.6°F',
          'Water boils: 100°C = 212°F',
          'Hot summer day: 30°C = 86°F',
          'Cold winter day: 0°F ≈ −18°C',
        ],
      },
      {
        heading: 'Conversion formulas',
        paragraphs: [
          'To convert Celsius to Fahrenheit: °F = (°C × 9/5) + 32. Example: 25°C → (25 × 1.8) + 32 = 77°F.',
          'To convert Fahrenheit to Celsius: °C = (°F − 32) × 5/9. Example: 350°F (common baking temp) → (350 − 32) × 5/9 ≈ 177°C.',
          'Kelvin is used in science. K = °C + 273.15. Absolute zero is 0 K (−273.15°C). You will rarely see Kelvin in weather apps, but it appears in physics and chemistry.',
        ],
      },
      {
        heading: 'Practical tips',
        paragraphs: [
          'Oven recipes from the US list Fahrenheit; European recipes use Celsius. Always convert before adjusting temperature — a 20-degree mistake can ruin a bake.',
          'Weather apps let you switch units in settings. When traveling, learn a few anchors (0°C/32°F, 20°C/68°F) so you can dress appropriately without pulling out a phone.',
        ],
      },
    ],
  },
  {
    slug: 'us-gallon-vs-imperial-gallon',
    title: 'US Gallon vs Imperial Gallon: What Is the Difference?',
    description:
      'US gallons and UK imperial gallons are not the same. Learn the sizes, where each is used, and how to convert gallons to liters correctly.',
    publishedAt: '2026-06-10',
    readMinutes: 4,
    relatedConverters: [
      { slug: 'liter-to-gallon', label: 'L → US gal' },
      { slug: 'gallon-to-liter', label: 'US gal → L' },
      { slug: 'liter-to-quart', label: 'L → qt' },
    ],
    sections: [
      {
        heading: 'Not all gallons are equal',
        paragraphs: [
          'The US liquid gallon equals 3.78541 liters. The UK imperial gallon equals 4.54609 liters — about 20% larger. Mixing them up when fueling, cooking, or reading specs can lead to significant errors.',
          'ConvertHub uses US customary units for gallon, quart, pint, cup, and fluid ounce unless stated otherwise — matching American labels and most online US recipes.',
        ],
      },
      {
        heading: 'Where each gallon appears',
        paragraphs: [
          'US gallon: fuel pumps in the United States, US milk jugs, American beer keg sizing references, EPA fuel-economy figures (miles per gallon).',
          'Imperial gallon: fuel economy in the United Kingdom and Canada (historically), some Commonwealth countries. UK fuel prices are often quoted per liter today, but older literature still references imperial gallons.',
        ],
      },
      {
        heading: 'Conversion cheat sheet',
        paragraphs: [
          'Use these rounded values for quick checks:',
        ],
        list: [
          '1 US gallon ≈ 3.79 liters',
          '1 imperial gallon ≈ 4.55 liters',
          '1 US gallon ≈ 0.83 imperial gallons',
          '4 liters ≈ 1.06 US gallons',
          '1 US quart = 0.946 liters',
        ],
      },
      {
        heading: 'Avoiding mistakes',
        paragraphs: [
          'When a recipe or manual says "gallon," check the country of origin. British baking books may assume imperial pints and gallons.',
          'For fuel economy: US mpg and UK mpg are not comparable without converting the underlying gallon definition. Always convert to liters per 100 km for a fair comparison.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-convert-units',
    title: 'How to Convert Units: Step-by-Step Guide',
    description:
      'Learn the unit conversion method that works for any measurement — length, weight, volume, temperature, and more.',
    publishedAt: '2026-06-10',
    readMinutes: 5,
    relatedConverters: [
      { slug: 'cm-to-inch', label: 'cm → in' },
      { slug: 'kg-to-lb', label: 'kg → lb' },
      { slug: 'm2-to-sqft', label: 'm² → ft²' },
    ],
    sections: [
      {
        heading: 'The conversion factor method',
        paragraphs: [
          'Most unit conversions use a single multiplication factor. If 1 inch equals 2.54 centimeters, then 10 inches equals 10 × 2.54 = 25.4 centimeters.',
          'Always write units in your calculation so you can cancel them. This "dimensional analysis" approach prevents flipping the factor backwards.',
        ],
      },
      {
        heading: 'Step 1: Identify the conversion factor',
        paragraphs: [
          'Find how the two units relate. Official definitions are best: 1 mile = 1.609344 km, 1 pound = 0.453592 kg, 1 US gallon = 3.78541 liters.',
          'For squared or cubed units, apply the factor multiple times. One square meter is (3.28084 ft)² ≈ 10.764 square feet, not 3.28.',
        ],
      },
      {
        heading: 'Step 2: Multiply or divide',
        paragraphs: [
          'To convert from unit A to unit B, multiply by the factor that turns A into B. If you have centimeters and need inches, multiply by 0.393700 (since 1 cm = 0.393700 in).',
          'To go backwards, multiply by the inverse factor or use the swap button on a converter page.',
        ],
      },
      {
        heading: 'Temperature is different',
        paragraphs: [
          'You cannot convert Celsius to Fahrenheit with a simple multiplier because the scales have different zero points. Use °F = (°C × 9/5) + 32 instead.',
          'Linear factors only work when zero means the same thing in both scales (e.g., centimeters and meters both start at zero length).',
        ],
      },
      {
        heading: 'Step 3: Check your answer',
        paragraphs: [
          'Sanity-check with a known reference. If you converted 100 km to miles, expect something near 62 — not 620 or 6.2.',
          'ConvertHub calculates locally in your browser with full precision, then rounds for display. Use conversion tables on each page for common values.',
        ],
      },
    ],
  },
  {
    slug: 'cooking-measurements',
    title: 'Cooking Measurements: Cups, Tablespoons, and Milliliters',
    description:
      'Convert cooking volumes between US cups, tablespoons, fluid ounces, and milliliters — with tips for recipes from different countries.',
    publishedAt: '2026-06-10',
    readMinutes: 5,
    relatedConverters: [
      { slug: 'cup-to-ml', label: 'cup → ml' },
      { slug: 'tbsp-to-ml', label: 'tbsp → ml' },
      { slug: 'floz-to-ml', label: 'fl oz → ml' },
      { slug: 'ml-to-floz', label: 'ml → fl oz' },
    ],
    sections: [
      {
        heading: 'US vs metric recipes',
        paragraphs: [
          'American recipes measure liquids in cups, tablespoons, and fluid ounces. European and Australian recipes typically use milliliters and liters. A "cup" in the US is 236.588 ml — not the same as a UK metric cup (250 ml) used in some countries.',
          'When precision matters (macarons, bread ratios), weigh ingredients in grams instead of using volume. Weight is the same everywhere.',
        ],
      },
      {
        heading: 'Common US cooking conversions',
        paragraphs: [
          'Keep these equivalents on hand:',
        ],
        list: [
          '1 US cup = 236.588 ml (often rounded to 240 ml)',
          '1 tablespoon = 14.787 ml (3 teaspoons)',
          '1 fluid ounce = 29.574 ml',
          '1 US pint = 2 cups = 473 ml',
          '1 US quart = 4 cups = 946 ml',
          '1 US gallon = 16 cups = 3.79 liters',
        ],
      },
      {
        heading: 'Scaling recipes',
        paragraphs: [
          'Doubling a recipe? Multiply every measurement by 2. Halving? Divide by 2. For awkward fractions, convert to milliliters or grams first, scale, then convert back if needed.',
          'Sticky ingredients (honey, peanut butter) are easier by weight. One tablespoon of honey weighs about 21 grams regardless of how it sits in the spoon.',
        ],
      },
      {
        heading: 'Tools that help',
        paragraphs: [
          'A kitchen scale is the most reliable tool for international cooking. For liquids, a measuring jug with both ml and cup markings works well.',
          'Use ConvertHub volume converters when you encounter an unfamiliar unit in a recipe — ml to cups, tablespoons to ml, and more — without installing an app.',
        ],
      },
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
