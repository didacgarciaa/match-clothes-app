import { HslColor } from './ColorConverter';

export interface ColorSchemeGenerator {
  generateSchemes(baseHex: string): ColorSchemes;
  classifyPair(baseHsl: HslColor, otherHsl: HslColor): string;
}

export interface ColorSchemes {
  base: string;
  complementary: string;
  analogous: string[];
  splitComplementary: string[];
  triadic: string[];
  tetradic: string[];
  classify: (hex: string) => string;
} 