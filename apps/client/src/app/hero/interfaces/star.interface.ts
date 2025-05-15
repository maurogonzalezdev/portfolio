export interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
  initialX: number;
  initialY: number;
  opacity: number;
  targetSize?: number;
  animating?: boolean;
}
