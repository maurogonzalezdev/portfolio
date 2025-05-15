export interface ExoticDetail {
  bands: Array<{
    width: number;
    y: number;
    color: string;
    pattern: string;
    swirls?: Array<{
      x: number;
      width: number;
      height: number;
      angle: number;
      color: string;
    }>;
    stripes?: Array<{
      angle: number;
      width: number;
      color: string;
    }>;
  }>;
  spots: Array<{
    x: number;
    y: number;
    size: number;
    color: string;
    hasInnerDetail: boolean;
    innerSize: number;
    innerColor: string;
  }>;
  hasGlow: boolean;
  glowColor: string;
  glowIntensity: number;
}
