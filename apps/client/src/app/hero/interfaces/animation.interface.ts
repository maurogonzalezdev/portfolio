export interface Animation {
  starCount: number;
  planetCount?: number;
  shootingStarInterval: { min: number; max: number };
  enableShootingStars: boolean;
  isDarkMode: boolean;
  fadeInDuration?: number;
  sizeFactor?: number;
}
