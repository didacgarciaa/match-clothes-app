export interface ColorConverter {
  hexToHsl(hex: string): HslColor;
  hslToHex(h: number, s: number, l: number): string;
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
} 