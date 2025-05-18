/**
 * Script: color-combiner.ts
 * Description: Given a hex color input, calculates matching color schemes and classifies pairs:
 *  - Complementary
 *  - Analogous
 *  - Triadic
 *  - Split-Complementary
 *  - Tetradic
 *  - Neutrals
 * Author: ChatGPT
 */

import { DefaultColorConverter } from './implementations/DefaultColorConverter';
import { DefaultColorSchemeGenerator } from './implementations/DefaultColorSchemeGenerator';

interface HSL {
  h: number;
  s: number;
  l: number;
}

enum ColorRelationship {
  NEUTRAL = 'neutral',
  COMPLEMENTARY = 'complementary',
  ANALOGOUS = 'analogous',
  SPLIT_COMPLEMENTARY = 'split-complementary',
  TRIADIC = 'triadic',
  OTHER = 'other'
}

class ColorUtils {
  static clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
  }

  static hexToHsl(hex: string): HSL {
    const clean = hex.replace(/^#/, '');
    const bigint = parseInt(clean, 16);
    const r = ((bigint >> 16) & 255) / 255;
    const g = ((bigint >> 8) & 255) / 255;
    const b = (bigint & 255) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h *= 60;
    }

    return { h, s: s * 100, l: l * 100 };
  }

  static hslToHex(h: number, s: number, l: number): string {
    s = ColorUtils.clamp(s / 100, 0, 1);
    l = ColorUtils.clamp(l / 100, 0, 1);
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;

    if (h >= 0 && h < 60) {
      r = c;
      g = x;
    } else if (h >= 60 && h < 120) {
      r = x;
      g = c;
    } else if (h >= 120 && h < 180) {
      g = c;
      b = x;
    } else if (h >= 180 && h < 240) {
      g = x;
      b = c;
    } else if (h >= 240 && h < 300) {
      r = x;
      b = c;
    } else {
      r = c;
      b = x;
    }

    const toHex = (v: number): string =>
      Math.round((v + m) * 255)
        .toString(16)
        .padStart(2, '0');

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  static hueDistance(h1: number, h2: number): number {
    const d = Math.abs(h1 - h2) % 360;
    return d > 180 ? 360 - d : d;
  }

  static isNeutral({ s, l }: HSL): boolean {
    if (s < 10) return true;
    if (l > 90 || l < 10) return true;
    return false;
  }

  static classifyPair(baseHsl: HSL, otherHsl: HSL): ColorRelationship {
    const d = ColorUtils.hueDistance(baseHsl.h, otherHsl.h);
    const TOLERANCE = 15;
    
    if (ColorUtils.isNeutral(otherHsl)) return ColorRelationship.NEUTRAL;
    if (Math.abs(d - 180) <= TOLERANCE) return ColorRelationship.COMPLEMENTARY;
    if (d <= 30) return ColorRelationship.ANALOGOUS;
    if (Math.abs(d - 150) <= TOLERANCE || Math.abs(d - 210) <= TOLERANCE) 
      return ColorRelationship.SPLIT_COMPLEMENTARY;
    if (Math.abs(d - 120) <= TOLERANCE || Math.abs(d - 240) <= TOLERANCE) 
      return ColorRelationship.TRIADIC;
      
    return ColorRelationship.OTHER;
  }
}

const colorConverter = new DefaultColorConverter();
const colorSchemeGenerator = new DefaultColorSchemeGenerator(colorConverter);

/** Generate matching color schemes from base hex */
export function generateSchemes(baseHex: string) {
  return colorSchemeGenerator.generateSchemes(baseHex);
}
