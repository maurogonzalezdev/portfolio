import { PlanetDetails } from '@client/app/hero/interfaces';

export interface Planet {
  x: number;
  y: number;
  size: number;
  speed: number;
  initialX: number;
  initialY: number;
  opacity: number;
  type:
    | 'rocky'
    | 'gaseous'
    | 'ringed'
    | 'terrestrial'
    | 'ice'
    | 'volcanic'
    | 'exotic';
  color: string;
  detailColor?: string;
  ringSize?: number;
  ringColor?: string;
  hasSecondRing?: boolean;
  secondRingSize?: number;
  secondRingColor?: string;
  hasAtmosphere?: boolean;
  atmosphereColor?: string;
  rotation: number;
  waterColor?: string;
  landColor?: string;
  lavaColor?: string;
  iceColor?: string;
  details?: PlanetDetails;
}
