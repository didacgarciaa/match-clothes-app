import { DefaultColorConverter } from './implementations/DefaultColorConverter';
import { DefaultColorSchemeGenerator } from './implementations/DefaultColorSchemeGenerator';

interface HSL {
  h: number;
  s: number;
  l: number;
}

const colorConverter = new DefaultColorConverter();
const colorSchemeGenerator = new DefaultColorSchemeGenerator(colorConverter);

export function generateSchemes(baseHex: string) {
  return colorSchemeGenerator.generateSchemes(baseHex);
}
