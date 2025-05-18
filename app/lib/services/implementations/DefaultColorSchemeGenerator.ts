import { ColorConverter, HslColor } from '../interfaces/ColorConverter';
import { ColorSchemeGenerator, ColorSchemes } from '../interfaces/ColorSchemeGenerator';
import { ColorUtils } from '../utils/ColorUtils';

export class DefaultColorSchemeGenerator implements ColorSchemeGenerator {
  constructor(private colorConverter: ColorConverter) {}

  generateSchemes(baseHex: string): ColorSchemes {
    const baseHsl = this.colorConverter.hexToHsl(baseHex);
    const hue = (deg: number) => (baseHsl.h + deg + 360) % 360;

    return {
      base: baseHex,
      complementary: this.colorConverter.hslToHex(hue(180), baseHsl.s, baseHsl.l),
      analogous: [
        this.colorConverter.hslToHex(hue(-30), baseHsl.s, baseHsl.l),
        this.colorConverter.hslToHex(hue(30), baseHsl.s, baseHsl.l),
      ],
      splitComplementary: [
        this.colorConverter.hslToHex(hue(150), baseHsl.s, baseHsl.l),
        this.colorConverter.hslToHex(hue(210), baseHsl.s, baseHsl.l),
      ],
      triadic: [
        this.colorConverter.hslToHex(hue(120), baseHsl.s, baseHsl.l),
        this.colorConverter.hslToHex(hue(240), baseHsl.s, baseHsl.l),
      ],
      tetradic: [
        this.colorConverter.hslToHex(hue(90), baseHsl.s, baseHsl.l),
        this.colorConverter.hslToHex(hue(180), baseHsl.s, baseHsl.l),
        this.colorConverter.hslToHex(hue(270), baseHsl.s, baseHsl.l),
      ],
      classify: (hex: string) => {
        const hsl = this.colorConverter.hexToHsl(hex);
        return this.classifyPair(baseHsl, hsl);
      },
    };
  }

  classifyPair(baseHsl: HslColor, otherHsl: HslColor): string {
    const d = ColorUtils.hueDistance(baseHsl.h, otherHsl.h);
    const TOL = 15;
    if (ColorUtils.isNeutral(otherHsl)) return 'neutral';
    if (Math.abs(d - 180) <= TOL) return 'complementary';
    if (d <= 30) return 'analogous';
    if (Math.abs(d - 150) <= TOL || Math.abs(d - 210) <= TOL)
      return 'split-complementary';
    if (Math.abs(d - 120) <= TOL || Math.abs(d - 240) <= TOL) return 'triadic';
    return 'other';
  }
} 