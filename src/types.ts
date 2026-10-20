// FashionVerse 3D — shared types

export type GarmentType = 'tshirt' | 'hoodie' | 'jacket' | 'dress';

export type MaterialType = 'cotton' | 'denim' | 'leather' | 'satin';

export type PatternType = 'solid' | 'stripes' | 'dots';

export type PresetColor =
  | 'black'
  | 'white'
  | 'red'
  | 'blue'
  | 'purple'
  | 'emerald'
  | 'custom';

export interface DesignConfig {
  name: string;
  description: string;
  garment: GarmentType;
  color: PresetColor;
  customColor: string;
  material: MaterialType;
  pattern: PatternType;
}

export interface SavedDesign extends DesignConfig {
  id: string;
  createdAt: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  garment: GarmentType;
  color: PresetColor;
  customColor: string;
  material: MaterialType;
  pattern: PatternType;
  gradient: string;
  icon: string;
}

export const PRESET_COLORS: Record<Exclude<PresetColor, 'custom'>, string> = {
  black: '#111111',
  white: '#f5f5f0',
  red: '#c0392b',
  blue: '#1f3a93',
  purple: '#5b2a86',
  emerald: '#0f7a5a',
};

export const DEFAULT_DESIGN: DesignConfig = {
  name: 'Untitled Design',
  description: '',
  garment: 'tshirt',
  color: 'black',
  customColor: '#c0392b',
  material: 'cotton',
  pattern: 'solid',
};

export function resolveColorHex(
  color: PresetColor,
  customColor: string
): string {
  if (color === 'custom') return customColor;
  return PRESET_COLORS[color] ?? '#111111';
}
