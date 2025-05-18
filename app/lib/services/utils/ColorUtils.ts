export class ColorUtils {
  static clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
  }

  static hueDistance(h1: number, h2: number): number {
    const d = Math.abs(h1 - h2) % 360;
    return d > 180 ? 360 - d : d;
  }

  static isNeutral({ s, l }: { s: number; l: number }): boolean {
    if (s < 10) return true;
    if (l > 90 || l < 10) return true;
    return false;
  }
} 