import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import {
  Animation,
  ExoticDetail,
  GaseousBand,
  GaseousDetails,
  IceCrack,
  IceDetail,
  IcePole,
  Planet,
  PlanetDetails,
  PolarCap,
  RockyDetail,
  RockyDetails,
  ShootingStar,
  Star,
  TerrestrialContinent,
  TerrestrialDetails,
  VolcanicDetail,
  VolcanicFlow,
  VolcanicVent,
} from '@client/app/hero/interfaces';

@Injectable()
export class StarAnimationService {
  private _starColors = [
    '#ffffff',
    '#F9E9BE',
    '#FF828E',
    '#80ACEF',
    '#76DE95',
    '#FFD700',
    '#E6E6FA',
    '#87CEFA',
    '#FF69B4',
    '#7FFFD4',
  ];

  private _planetColors = {
    rocky: [
      '#A97C50',
      '#CF8A56',
      '#D4A46A',
      '#B88569',
      '#9C7C5D',
      '#8B4513',
      '#CD853F',
      '#D2691E',
      '#BC8F8F',
      '#F4A460',
      '#C19A6B',
      '#E6BE8A',
    ],
    gaseous: [
      '#E8C054',
      '#70ABDF',
      '#DFBA7C',
      '#D1AA84',
      '#A6CCE0',
      '#ADD8E6',
      '#87CEFA',
      '#B0E0E6',
      '#F0E68C',
      '#FAFAD2',
      '#EEE8AA',
      '#F0FFF0',
      '#98FB98',
    ],
    earth: [
      '#6B93D6',
      '#4A7FC1',
      '#9BBDF9',
      '#7A5C8D',
      '#A079BF',
      '#E59356',
      '#D16B47',
      '#20B2AA',
      '#3CB371',
      '#48D1CC',
      '#5F9EA0',
      '#4682B4',
      '#6495ED',
      '#7B68EE',
    ],
    ice: [
      '#E0FFFF',
      '#B0E0E6',
      '#AFEEEE',
      '#E6E6FA',
      '#F0F8FF',
      '#F0FFFF',
      '#F5F5F5',
      '#DCDCDC',
    ],
    volcanic: [
      '#8B0000',
      '#A52A2A',
      '#B22222',
      '#DC143C',
      '#800000',
      '#8B4513',
      '#D2691E',
      '#FF8C00',
    ],
    exotic: [
      '#9932CC',
      '#FF00FF',
      '#BA55D3',
      '#DA70D6',
      '#EE82EE',
      '#FF69B4',
      '#C71585',
      '#DB7093',
    ],
    rings: [
      '#E5D1A0',
      '#D3BF8D',
      '#F0E5BE',
      '#C5B178',
      '#ADA07A',
      '#D9CDBC',
      '#C2B5A5',
      '#E8E1D3',
      '#B0C4DE',
      '#A4B6D7',
      '#8DA9CA',
      '#DBC4AD',
      '#CBA58C',
      '#E8D3C7',
      '#CBC3E3',
      '#A393D8',
      '#BA9CE8',
      '#D8BFD8',
      '#DDA0DD',
      '#EE82EE',
      '#DA70D6',
      '#FF00FF',
      '#FF69B4',
      '#FFFF00',
      '#FFDAB9',
      '#FFEFD5',
      '#FFE4E1',
    ],
    atmosphere: [
      'rgba(255,255,255,0.2)',
      'rgba(173,216,230,0.15)',
      'rgba(144,238,144,0.15)',
      'rgba(255,182,193,0.15)',
      'rgba(255,222,173,0.13)',
      'rgba(135,206,250,0.18)',
      'rgba(240,248,255,0.2)',
      'rgba(152,251,152,0.15)',
      'rgba(255,160,122,0.15)',
      'rgba(238,130,238,0.12)',
      'rgba(255,215,0,0.1)',
    ],
    water: [
      '#3F7CAC',
      '#4A7FC1',
      '#2E5C8F',
      '#2B4B8A',
      '#3969A2',
      '#00BFFF',
      '#1E90FF',
      '#4169E1',
      '#0000CD',
      '#000080',
      '#5F9EA0',
      '#6495ED',
    ],
    land: [
      '#6DAB64',
      '#8BC34A',
      '#A5D6A7',
      '#B27D4B',
      '#C8903E',
      '#D9A066',
      '#556B2F',
      '#6B8E23',
      '#808000',
      '#BDB76B',
      '#F5DEB3',
      '#FFDEAD',
      '#DEB887',
      '#D2B48C',
    ],
    lava: ['#FF4500', '#FF6347', '#FF7F50', '#FF8C00', '#FFA500', '#FFD700'],
    iceCaps: ['#F0FFFF', '#F0F8FF', '#F5F5F5', '#FFFAFA', '#E0FFFF', '#E6E6FA'],
  };

  private readonly _platformId: Object = inject(PLATFORM_ID);

  private _canvas: HTMLCanvasElement | null = null;
  private _ctx: CanvasRenderingContext2D | null = null;
  private _width: number = 0;
  private _height: number = 0;
  private _stars: Star[] = [];
  private _planets: Planet[] = [];
  private _shootingStars: ShootingStar[] = [];
  private _animationFrameId?: number;
  private _shootingStarIntervalId?: number;
  private _isDarkMode: boolean = true;
  private _isInitialized: boolean = false;
  private _maxShootingStars: number = 8;
  private _fadeInAnimationId?: number;
  private _isDesktopView: boolean = false;
  private _sizeFactor: number = 1.0; // Factor size by default 1.0
  private _backgroundColor: string = 'rgba(25, 25, 25, 1)';

  constructor() {
    if (isPlatformBrowser(this._platformId)) {
      this._isDesktopView =
        typeof window !== 'undefined' && window.innerWidth >= 1024;
    }
  }

  private _setupCanvas(): void {
    if (!this._canvas || !this._ctx) return;

    const dpr: number =
      typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    this._canvas.width = this._width * dpr;
    this._canvas.height = this._height * dpr;
    this._canvas.style.width = `${this._width}px`;
    this._canvas.style.height = `${this._height}px`;
    this._ctx.setTransform(1, 0, 0, 1, 0, 0);
    this._ctx.scale(dpr, dpr);
  }

  private _createStars(count: number, fadeInDuration: number = 600): void {
    for (let i = 0; i < count; i++) {
      const initialX: number = Math.random();
      const initialY: number = Math.random();

      let size: number;
      const sizeCategory: number = Math.random();

      // New size logic
      if (sizeCategory < 0.03) {
        // Keeping very large stars
        size = (Math.random() * 3 + 2) * this._sizeFactor;
      } else if (sizeCategory < 0.15) {
        // Shrink large stars significantly
        size = (Math.random() * 1.5 + 1.2) * this._sizeFactor;
      } else if (sizeCategory < 0.4) {
        // Reduce medium stars
        size = (Math.random() * 0.8 + 0.6) * this._sizeFactor;
      } else {
        // Keep small stars
        size = (Math.random() * 0.5 + 0.3) * this._sizeFactor;
      }

      this._stars.push({
        x: initialX * this._width,
        y: initialY * this._height,
        size,
        speed: Math.random() * 0.05 + 0.02,
        color: Math.random() < 0.8 ? '#ffffff' : this._getRandomColor(),
        initialX,
        initialY,
        opacity: 0,
      });
    }

    const startTime: number = performance.now();

    const fadeInElements = (): void => {
      const now: number = performance.now();
      const progress: number = Math.min((now - startTime) / fadeInDuration, 1);
      const easedProgress: number = Math.pow(progress, 2);

      this._stars.forEach((star) => {
        star.opacity = Math.min(easedProgress, 1);
      });

      this._planets.forEach((planet) => {
        planet.opacity = Math.min(easedProgress, 1);
      });

      if (progress < 1) {
        this._fadeInAnimationId = requestAnimationFrame(fadeInElements);
      }
    };

    fadeInElements();
  }

  /**
   * Create planets with fade-in effect
   */
  private _createPlanets(count: number, fadeInDuration: number = 600): void {
    // Grid setup
    const gridSetup = this._setupPlanetGrid(count);
    const { gridCols, gridRows, cellWidth, cellHeight } = gridSetup;

    // Array to track occupied positions
    const occupiedPositions: Array<{ x: number; y: number; radius: number }> =
      [];

    // Create planets
    for (let i = 0; i < count; i++) {
      this._createSinglePlanet(
        i,
        gridCols,
        gridRows,
        cellWidth,
        cellHeight,
        occupiedPositions
      );
    }

    // Animate fade-in effect
    this._animatePlanetsFadeIn(fadeInDuration);
  }

  /**
   * Create a single planet
   */
  private _createSinglePlanet(
    index: number,
    gridCols: number,
    gridRows: number,
    cellWidth: number,
    cellHeight: number,
    occupiedPositions: Array<{ x: number; y: number; radius: number }>
  ): void {
    // Grid cell position
    const gridCol: number = index % gridCols;
    const gridRow: number = Math.floor(index / gridCols) % gridRows;

    // Planet type
    const type = this._getPlanetType();

    // Size of the planet
    const size: number = this._getPlanetSize(type);

    // Normalize the radius
    const normalizedRadius: number = size / this._width;

    // Grid position
    const position = this._positionPlanet(
      gridCol,
      gridRow,
      cellWidth,
      cellHeight,
      normalizedRadius,
      occupiedPositions
    );

    if (!position) return; // No valid position found

    const { initialX, initialY } = position;

    // Register the occupied position
    occupiedPositions.push({
      x: initialX,
      y: initialY,
      radius: normalizedRadius,
    });

    // Complete planet configuration
    this._configurePlanetAndAddToArray(initialX, initialY, size, type);
  }

  /**
   * Setup planet configuration and add to the array
   */
  private _configurePlanetAndAddToArray(
    initialX: number,
    initialY: number,
    size: number,
    type:
      | 'rocky'
      | 'gaseous'
      | 'ringed'
      | 'terrestrial'
      | 'ice'
      | 'volcanic'
      | 'exotic'
  ): void {
    // Setup colors
    const colors = this._setupPlanetColors(type);

    // Setup rings
    const rings = this._setupPlanetRings(type, size, colors);

    // Setup atmosphere
    const atmosphere = this._setupPlanetAtmosphere(type);

    // Precalculate details
    const details = this._precalculatePlanetDetails(type, size, colors);

    // Add planet to the array
    this._addPlanetToArray(
      initialX,
      initialY,
      size,
      type,
      colors,
      rings,
      atmosphere,
      details
    );
  }

  /**
   * Setup the grid for planet positioning
   */
  private _setupPlanetGrid(count: number): {
    gridCols: number;
    gridRows: number;
    cellWidth: number;
    cellHeight: number;
  } {
    const gridCols: number = Math.ceil(Math.sqrt(count * 1.5));
    const gridRows: number = Math.ceil(count / gridCols);
    const cellWidth: number = 1 / gridCols;
    const cellHeight: number = 1 / gridRows;

    return { gridCols, gridRows, cellWidth, cellHeight };
  }

  /**
   * Planet type generator
   */
  private _getPlanetType():
    | 'rocky'
    | 'gaseous'
    | 'ringed'
    | 'terrestrial'
    | 'ice'
    | 'volcanic'
    | 'exotic' {
    const planetTypes = [
      'rocky',
      'gaseous',
      'ringed',
      'terrestrial',
      'ice',
      'volcanic',
      'exotic',
    ] as const;

    return planetTypes[Math.floor(Math.random() * planetTypes.length)];
  }

  /**
   * Planet size by type
   */
  private _getPlanetSize(
    type:
      | 'rocky'
      | 'gaseous'
      | 'ringed'
      | 'terrestrial'
      | 'ice'
      | 'volcanic'
      | 'exotic'
  ): number {
    if (type === 'ringed') {
      return (Math.random() * 6 + 8) * this._sizeFactor;
    } else if (type === 'gaseous') {
      return (Math.random() * 5 + 6) * this._sizeFactor;
    } else if (type === 'terrestrial') {
      return (Math.random() * 4 + 5) * this._sizeFactor;
    } else if (type === 'ice') {
      return (Math.random() * 4.5 + 4.5) * this._sizeFactor;
    } else if (type === 'volcanic') {
      return (Math.random() * 4 + 4.5) * this._sizeFactor;
    } else if (type === 'exotic') {
      return (Math.random() * 5 + 5) * this._sizeFactor;
    } else {
      return (Math.random() * 4 + 4) * this._sizeFactor;
    }
  }

  private _positionPlanetSimple(
    gridCol: number,
    gridRow: number,
    cellWidth: number,
    cellHeight: number,
    normalizedRadius: number,
    occupiedPositions: Array<{ x: number; y: number; radius: number }>
  ): { initialX: number; initialY: number } | null {
    // Simple positioning logic
    let attempts: number = 0;
    const maxAttempts: number = 10;
    let initialX: number, initialY: number;

    do {
      const margin: number = normalizedRadius * 2;
      initialX =
        gridCol * cellWidth + margin + Math.random() * (cellWidth - margin * 2);
      initialY =
        gridRow * cellHeight +
        margin +
        Math.random() * (cellHeight - margin * 2);

      // Mobile view adjustment
      if (!this._isDesktopView) {
        initialX = initialX * 0.7 + 0.3;
      }

      attempts++;

      // Verify if the position is too close to existing ones
    } while (
      attempts < maxAttempts &&
      this._isTooClose(initialX, initialY, normalizedRadius, occupiedPositions)
    );

    // If no valid position found
    if (
      attempts >= maxAttempts &&
      this._isTooClose(initialX, initialY, normalizedRadius, occupiedPositions)
    ) {
      return null;
    }

    return { initialX, initialY };
  }

  private _isTooClose(
    x: number,
    y: number,
    radius: number,
    occupiedPositions: Array<{ x: number; y: number; radius: number }>
  ): boolean {
    const marginFactor = 1.2;

    for (const pos of occupiedPositions) {
      const dx: number = (x - pos.x) * this._width;
      const dy: number = (y - pos.y) * this._height;
      const distanceSquared: number = dx * dx + dy * dy;
      const combinedRadius: number =
        (radius + pos.radius) * marginFactor * this._width;
      const minDistanceSquared: number = combinedRadius * combinedRadius;

      if (distanceSquared < minDistanceSquared) {
        return true;
      }
    }

    return false;
  }

  /**
   * Tries to position a planet in a grid cell, avoiding collisions with existing planets
   */
  private _positionPlanet(
    gridCol: number,
    gridRow: number,
    cellWidth: number,
    cellHeight: number,
    normalizedRadius: number,
    occupiedPositions: Array<{ x: number; y: number; radius: number }>
  ): { initialX: number; initialY: number } | null {
    // If there are few occupied positions, use a simple approach
    if (occupiedPositions.length < 5) {
      return this._positionPlanetSimple(
        gridCol,
        gridRow,
        cellWidth,
        cellHeight,
        normalizedRadius,
        occupiedPositions
      );
    }

    // For more occupied positions, use a spatial grid approach
    const gridSize = Math.max(this._width, this._height) / 10;
    const spatialGrid = new Map<
      string,
      Array<{ x: number; y: number; radius: number }>
    >();

    // Fill the spatial grid with occupied positions
    for (const pos of occupiedPositions) {
      const cellX = Math.floor((pos.x * this._width) / gridSize);
      const cellY = Math.floor((pos.y * this._height) / gridSize);
      const key = `${cellX},${cellY}`;

      if (!spatialGrid.has(key)) {
        spatialGrid.set(key, []);
      }
      spatialGrid.get(key)!.push(pos);
    }

    // Optimized function to check if a position is too close to existing ones
    const isTooCloseOptimized = (
      x: number,
      y: number,
      radius: number
    ): boolean => {
      const marginFactor = 1.2;
      const cellX = Math.floor((x * this._width) / gridSize);
      const cellY = Math.floor((y * this._height) / gridSize);

      // Verify nearby cells
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const key = `${cellX + dx},${cellY + dy}`;
          const cellPositions = spatialGrid.get(key);

          if (!cellPositions) continue;

          for (const pos of cellPositions) {
            // Check if the distance is too close
            const xDist = Math.abs((x - pos.x) * this._width);
            const yDist = Math.abs((y - pos.y) * this._height);
            const combinedRadius =
              (radius + pos.radius) * marginFactor * this._width;

            if (xDist > combinedRadius || yDist > combinedRadius) {
              continue;
            }

            // Verify distance squared
            const dx: number = (x - pos.x) * this._width;
            const dy: number = (y - pos.y) * this._height;
            const distanceSquared: number = dx * dx + dy * dy;
            const minDistanceSquared: number = combinedRadius * combinedRadius;

            if (distanceSquared < minDistanceSquared) {
              return true;
            }
          }
        }
      }

      return false;
    };

    // Try to find a valid position
    let attempts: number = 0;
    const maxAttempts: number = 10;
    let initialX: number, initialY: number;

    do {
      const margin: number = normalizedRadius * 2;
      initialX =
        gridCol * cellWidth + margin + Math.random() * (cellWidth - margin * 2);
      initialY =
        gridRow * cellHeight +
        margin +
        Math.random() * (cellHeight - margin * 2);

      // Adjust for mobile view
      if (!this._isDesktopView) {
        initialX = initialX * 0.7 + 0.3;
      }

      attempts++;
    } while (
      attempts < maxAttempts &&
      isTooCloseOptimized(initialX, initialY, normalizedRadius)
    );

    // If no valid position found
    if (
      attempts >= maxAttempts &&
      isTooCloseOptimized(initialX, initialY, normalizedRadius)
    ) {
      return null;
    }

    return { initialX, initialY };
  }

  /**
   * Setup planet colors based on type
   */
  private _setupPlanetColors(type: string): {
    color: string;
    detailColor?: string;
    waterColor?: string;
    landColor?: string;
    lavaColor?: string;
    iceColor?: string;
  } {
    let color: string;
    let detailColor: string | undefined;
    let waterColor: string | undefined;
    let landColor: string | undefined;
    let lavaColor: string | undefined;
    let iceColor: string | undefined;

    switch (type) {
      case 'rocky':
        color =
          this._planetColors.rocky[
            Math.floor(Math.random() * this._planetColors.rocky.length)
          ];
        detailColor =
          this._planetColors.rocky[
            Math.floor(Math.random() * this._planetColors.rocky.length)
          ];
        break;

      case 'gaseous':
        color =
          this._planetColors.gaseous[
            Math.floor(Math.random() * this._planetColors.gaseous.length)
          ];
        detailColor =
          this._planetColors.gaseous[
            Math.floor(Math.random() * this._planetColors.gaseous.length)
          ];
        break;

      case 'terrestrial':
        color = '#3D5A80';
        waterColor =
          this._planetColors.water[
            Math.floor(Math.random() * this._planetColors.water.length)
          ];
        landColor =
          this._planetColors.land[
            Math.floor(Math.random() * this._planetColors.land.length)
          ];
        break;

      case 'ice':
        color =
          this._planetColors.ice[
            Math.floor(Math.random() * this._planetColors.ice.length)
          ];
        iceColor =
          this._planetColors.iceCaps[
            Math.floor(Math.random() * this._planetColors.iceCaps.length)
          ];
        detailColor = this._adjustColorBrightness(color, 15);
        break;

      case 'volcanic':
        color =
          this._planetColors.volcanic[
            Math.floor(Math.random() * this._planetColors.volcanic.length)
          ];
        lavaColor =
          this._planetColors.lava[
            Math.floor(Math.random() * this._planetColors.lava.length)
          ];
        detailColor = this._adjustColorBrightness(color, -20);
        break;

      case 'exotic':
        color =
          this._planetColors.exotic[
            Math.floor(Math.random() * this._planetColors.exotic.length)
          ];
        detailColor = this._adjustColorBrightness(color, 30);
        break;

      default:
        color =
          this._planetColors.earth[
            Math.floor(Math.random() * this._planetColors.earth.length)
          ];
    }

    return { color, detailColor, waterColor, landColor, lavaColor, iceColor };
  }

  /**
   * Setup planet rings based on type
   */
  private _setupPlanetRings(
    type: string,
    size: number,
    colors: { color: string }
  ): {
    ringSize: number;
    ringColor: string;
    hasSecondRing: boolean;
    secondRingSize: number;
    secondRingColor: string;
  } {
    let ringSize: number = 0;
    let ringColor: string = '';
    let hasSecondRing: boolean = false;
    let secondRingSize: number = 0;
    let secondRingColor: string = '';

    if (type === 'ringed' || (type === 'exotic' && Math.random() < 0.4)) {
      ringSize = size * (Math.random() * 0.5 + 1.4);
      ringColor =
        this._planetColors.rings[
          Math.floor(Math.random() * this._planetColors.rings.length)
        ];

      hasSecondRing = Math.random() < 0.5;
      if (hasSecondRing) {
        const secondRingRatio =
          Math.random() > 0.5
            ? 0.7 + Math.random() * 0.2
            : 1.1 + Math.random() * 0.2;

        secondRingSize = ringSize * secondRingRatio;

        do {
          secondRingColor =
            this._planetColors.rings[
              Math.floor(Math.random() * this._planetColors.rings.length)
            ];
        } while (secondRingColor === ringColor);
      }
    }

    return {
      ringSize,
      ringColor,
      hasSecondRing,
      secondRingSize,
      secondRingColor,
    };
  }

  /**
   * Setup planet atmosphere based on type
   */
  private _setupPlanetAtmosphere(type: string): {
    hasAtmosphere: boolean;
    atmosphereColor: string;
  } {
    const atmosphereProbability: number =
      type === 'gaseous'
        ? 0.9
        : type === 'terrestrial'
        ? 0.8
        : type === 'exotic'
        ? 0.7
        : type === 'ice'
        ? 0.6
        : type === 'ringed'
        ? 0.5
        : type === 'volcanic'
        ? 0.3
        : 0.4;

    const hasAtmosphere: boolean = Math.random() < atmosphereProbability;
    const atmosphereColor: string =
      this._planetColors.atmosphere[
        Math.floor(Math.random() * this._planetColors.atmosphere.length)
      ];

    return { hasAtmosphere, atmosphereColor };
  }

  /**
   * Precalculates planet details based on type
   */
  private _precalculatePlanetDetails(
    type: string,
    size: number,
    colors: {
      color: string;
      detailColor?: string;
      iceColor?: string;
      lavaColor?: string;
    }
  ): PlanetDetails {
    const details: PlanetDetails = {};

    switch (type) {
      case 'rocky':
        details.rocky = this._precalculateRockyDetails(size);
        break;
      case 'gaseous':
        details.gaseous = this._precalculateGaseousDetails(
          size,
          colors.detailColor || colors.color
        );
        break;
      case 'terrestrial':
        details.terrestrial = this._precalculateTerrestrialDetails(size);
        break;
      case 'ice':
        details.ice = this._precalculateIceDetails(
          size,
          colors.iceColor || '#FFFFFF'
        );
        break;
      case 'volcanic':
        details.volcanic = this._precalculateVolcanicDetails(
          size,
          colors.lavaColor || '#FF4500'
        );
        break;
      case 'exotic':
        details.exotic = this._precalculateExoticDetails(
          size,
          colors.detailColor || '#FF00FF'
        );
        break;
    }

    return details;
  }

  /**
   * Add a planet to the array
   */
  private _addPlanetToArray(
    initialX: number,
    initialY: number,
    size: number,
    type:
      | 'rocky'
      | 'gaseous'
      | 'ringed'
      | 'terrestrial'
      | 'ice'
      | 'volcanic'
      | 'exotic',
    colors: {
      color: string;
      detailColor?: string;
      waterColor?: string;
      landColor?: string;
      lavaColor?: string;
      iceColor?: string;
    },
    rings: {
      ringSize: number;
      ringColor: string;
      hasSecondRing: boolean;
      secondRingSize: number;
      secondRingColor: string;
    },
    atmosphere: {
      hasAtmosphere: boolean;
      atmosphereColor: string;
    },
    details: PlanetDetails
  ): void {
    this._planets.push({
      x: initialX * this._width,
      y: initialY * this._height,
      size,
      speed: Math.random() * 0.03 + 0.01,
      initialX,
      initialY,
      opacity: 0,
      type,
      color: colors.color,
      detailColor: colors.detailColor,
      ringSize: rings.ringSize,
      ringColor: rings.ringColor,
      hasSecondRing: rings.hasSecondRing,
      secondRingSize: rings.secondRingSize,
      secondRingColor: rings.secondRingColor,
      hasAtmosphere: atmosphere.hasAtmosphere,
      atmosphereColor: atmosphere.atmosphereColor,
      rotation: Math.random() * Math.PI * 2,
      waterColor: colors.waterColor,
      landColor: colors.landColor,
      lavaColor: colors.lavaColor,
      iceColor: colors.iceColor,
      details,
    });
  }

  /**
   * Animate planets fade-in effect
   */
  private _animatePlanetsFadeIn(fadeInDuration: number): void {
    if (this._planets.length === 0) return;

    const startTime: number = performance.now();

    const fadeInElements = (): void => {
      const now = performance.now();
      const progress = Math.min((now - startTime) / fadeInDuration, 1);
      const easedProgress = Math.pow(progress, 2);

      this._planets.forEach((planet) => {
        planet.opacity = Math.min(easedProgress, 1);
      });

      if (progress < 1) {
        this._fadeInAnimationId = requestAnimationFrame(fadeInElements);
      }
    };

    fadeInElements();
  }

  private _precalculateIceDetails(size: number, iceColor: string): IceDetail {
    const cracks: IceCrack[] = [];
    const crackCount: number = Math.floor(Math.random() * 5) + 3;

    for (let i = 0; i < crackCount; i++) {
      const points: Array<{ x: number; y: number }> = [];
      const startAngle: number = Math.random() * Math.PI * 2;
      const length: number = size * (0.3 + Math.random() * 0.4);
      const segments: number = Math.floor(Math.random() * 3) + 2;

      let x: number = Math.cos(startAngle) * size * 0.2;
      let y: number = Math.sin(startAngle) * size * 0.2;
      points.push({ x, y });

      let curAngle: number = startAngle;

      for (let j = 0; j < segments; j++) {
        curAngle += (Math.random() * 0.5 - 0.25) * Math.PI;
        const segLength: number = length / segments;
        x += Math.cos(curAngle) * segLength;
        y += Math.sin(curAngle) * segLength;
        points.push({ x, y });
      }

      cracks.push({ points });
    }

    const poles: IcePole[] = [
      { y: -size * 0.6, width: size * 0.6, height: size * 0.3 },
      { y: size * 0.6, width: size * 0.6, height: size * 0.3 },
    ];

    return { cracks, poles, iceColor };
  }

  private _precalculateVolcanicDetails(
    size: number,
    lavaColor: string
  ): VolcanicDetail {
    const vents: VolcanicVent[] = [];
    const ventCount: number = Math.floor(Math.random() * 5) + 3;

    for (let i = 0; i < ventCount; i++) {
      const angle: number = Math.random() * Math.PI * 2;
      const distance: number = Math.random() * size * 0.7;
      const x: number = Math.cos(angle) * distance;
      const y: number = Math.sin(angle) * distance;
      const ventSize: number = size * (0.05 + Math.random() * 0.15);

      vents.push({ x, y, size: ventSize });
    }

    const flows: VolcanicFlow[] = [];
    const flowCount: number = Math.floor(Math.random() * 3) + 2;

    for (let i = 0; i < flowCount; i++) {
      if (vents.length === 0) continue;

      const vent = vents[Math.floor(Math.random() * vents.length)];
      const points: Array<{ x: number; y: number }> = [];

      points.push({ x: vent.x, y: vent.y });

      let curX: number = vent.x;
      let curY: number = vent.y;
      const flowLength: number = size * (0.3 + Math.random() * 0.5);
      const segments: number = Math.floor(Math.random() * 3) + 2;
      const segLength: number = flowLength / segments;

      let direction: number = Math.random() * Math.PI + Math.PI / 2;

      for (let j = 0; j < segments; j++) {
        direction += (Math.random() * 0.5 - 0.25) * Math.PI;
        curX += Math.cos(direction) * segLength;
        curY += Math.sin(direction) * segLength;

        const dist: number = Math.sqrt(curX * curX + curY * curY);
        if (dist > size * 0.9) {
          const scale: number = (size * 0.9) / dist;
          curX *= scale;
          curY *= scale;
        }

        points.push({ x: curX, y: curY });
      }

      flows.push({ points });
    }

    return { vents, flows, lavaColor };
  }

  private _precalculateExoticDetails(
    size: number,
    accentColor: string
  ): ExoticDetail {
    const bands: ExoticDetail['bands'] = [];
    const hasBands: boolean = Math.random() < 0.7;

    if (hasBands) {
      const bandCount: number = Math.floor(Math.random() * 4) + 2;
      for (let i = 0; i < bandCount; i++) {
        const bandWidth: number = size * (Math.random() * 0.2 + 0.1);
        const offsetY: number = size * 0.7 * (i / (bandCount - 1) - 0.5);

        const bandColor: string =
          i % 2 === 0
            ? accentColor
            : this._adjustColorBrightness(accentColor, i % 4 === 0 ? 30 : -30);

        const pattern = Math.random() < 0.5 ? 'swirl' : 'striped';

        // Precalculate the band details
        const band: ExoticDetail['bands'][0] = {
          width: bandWidth,
          y: offsetY,
          color: bandColor,
          pattern,
        };

        // For swirl pattern, precalculate all swirls
        if (pattern === 'swirl') {
          const swirlCount: number = Math.floor(Math.random() * 3) + 1;
          band.swirls = [];

          for (let j = 0; j < swirlCount; j++) {
            const swirlX: number = (Math.random() * 2 - 1) * size * 0.5;
            band.swirls.push({
              x: swirlX,
              width: bandWidth * 1.2,
              height: bandWidth * 0.5,
              angle: Math.random() * Math.PI * 0.3,
              color: this._adjustColorBrightness(bandColor, 30),
            });
          }
        }
        // For striped pattern, precalculate all stripes
        else if (pattern === 'striped') {
          const stripeCount: number = Math.floor(Math.random() * 5) + 3;
          band.stripes = [];

          for (let j = 0; j < stripeCount; j++) {
            const stripeAngle: number = (Math.PI * 2 * j) / stripeCount;
            const stripeWidth: number = (Math.PI * 2) / stripeCount / 2;

            band.stripes.push({
              angle: stripeAngle,
              width: stripeWidth,
              color: this._adjustColorBrightness(bandColor, 20),
            });
          }
        }

        bands.push(band);
      }
    }

    // Precalculate the spots
    const spots: ExoticDetail['spots'] = [];
    const hasSpots: boolean = Math.random() < 0.6;

    if (hasSpots || !hasBands) {
      const spotCount: number = Math.floor(Math.random() * 5) + 3;
      for (let i = 0; i < spotCount; i++) {
        const angle: number = Math.random() * Math.PI * 2;
        const distance: number = Math.random() * size * 0.6;
        const x: number = Math.cos(angle) * distance;
        const y: number = Math.sin(angle) * distance;
        const spotSize: number = size * (0.1 + Math.random() * 0.25);

        const spotColor: string =
          Math.random() < 0.5
            ? this._adjustColorBrightness(accentColor, 40)
            : this._adjustColorBrightness(accentColor, -40);

        // ! IMPORTANT: This is a hack to avoid the inner detail
        const hasInnerDetail: boolean = Math.random() < 0.6;
        const innerSize: number = spotSize * 0.6;
        const innerColor: string = this._adjustColorBrightness(spotColor, 20);

        spots.push({
          x,
          y,
          size: spotSize,
          color: spotColor,
          hasInnerDetail,
          innerSize,
          innerColor,
        });
      }
    }

    const hasGlow: boolean = Math.random() < 0.4;
    const glowColor: string = this._adjustColorBrightness(accentColor, 50);
    const glowIntensity: number = Math.random() * 0.3 + 0.1;

    return { bands, spots, hasGlow, glowColor, glowIntensity };
  }

  private _updatePlanets(): void {
    if (!this._ctx) return;

    try {
      this._planets.forEach((planet) => {
        planet.x -= planet.speed;

        const respawnDistance: number = this._isDesktopView
          ? -planet.size * 2
          : -planet.size;
        if (planet.x < respawnDistance) {
          planet.x = this._width + planet.size;
        }

        this._ctx!.globalAlpha = planet.opacity;
        this._drawPlanet(planet);
      });

      this._ctx!.globalAlpha = 1;
    } catch (error) {
      console.error('Error rendering planets:', error);
    }
  }

  private _drawPlanet(planet: Planet): void {
    if (!this._ctx) return;

    const {
      x,
      y,
      size,
      type,
      color,
      details,
      detailColor,
      hasAtmosphere,
      atmosphereColor,
      ringSize,
      ringColor,
      hasSecondRing,
      secondRingSize,
      secondRingColor,
      rotation,
      waterColor,
      landColor,
      lavaColor,
      iceColor,
    } = planet;

    this._ctx.save();
    this._ctx.shadowBlur = size * 0.3;
    this._ctx.shadowColor = color;

    if (hasAtmosphere) {
      this._ctx.beginPath();
      this._ctx.arc(x, y, size + size * 0.3, 0, Math.PI * 2);
      this._ctx.fillStyle = atmosphereColor || 'rgba(255, 255, 255, 0.12)';
      this._ctx.fill();
    }

    if (type === 'ringed' && ringSize && ringColor) {
      this._drawPlanetRingsBack(x, y, size, ringSize, ringColor, rotation);

      if (hasSecondRing && secondRingSize && secondRingColor) {
        const secondRingRotation: number = rotation + Math.PI / 8;
        this._drawPlanetRingsBack(
          x,
          y,
          size,
          secondRingSize,
          secondRingColor,
          secondRingRotation
        );
      }
    }

    this._ctx.beginPath();
    this._ctx.arc(x, y, size, 0, Math.PI * 2);
    this._ctx.fillStyle = color;
    this._ctx.fill();
    this._ctx.restore();

    switch (type) {
      case 'rocky':
        if (details?.rocky) {
          this._drawRockyDetailsPrecalculated(
            x,
            y,
            size,
            detailColor || '#8B5A2B',
            rotation,
            details.rocky
          );
        }
        break;

      case 'gaseous':
        if (details?.gaseous) {
          this._drawGaseousDetailsPrecalculated(
            x,
            y,
            size,
            rotation,
            details.gaseous
          );
        }
        break;

      case 'terrestrial':
        if (waterColor && landColor && details?.terrestrial) {
          this._drawTerrestrialDetailsPrecalculated(
            x,
            y,
            size,
            waterColor,
            landColor,
            rotation,
            details.terrestrial
          );
        }
        break;

      case 'ice':
        if (details?.ice) {
          this._drawIcePlanetDetails(x, y, size, color, rotation, details.ice);
        }
        break;

      case 'volcanic':
        if (details?.volcanic) {
          this._drawVolcanicPlanetDetails(
            x,
            y,
            size,
            color,
            rotation,
            details.volcanic
          );
        }
        break;

      case 'exotic':
        if (details?.exotic) {
          this._drawExoticPlanetDetails(
            x,
            y,
            size,
            color,
            rotation,
            details.exotic
          );
        }
        break;

      case 'ringed':
        if (ringSize && ringColor) {
          this._drawPlanetRingsFront(x, y, size, ringSize, ringColor, rotation);
        }

        if (hasSecondRing && secondRingSize && secondRingColor) {
          const secondRingRotation: number = rotation + Math.PI / 8;
          this._drawPlanetRingsFront(
            x,
            y,
            size,
            secondRingSize,
            secondRingColor,
            secondRingRotation
          );
        }
        break;
    }
  }

  private _drawIcePlanetDetails(
    x: number,
    y: number,
    size: number,
    baseColor: string,
    rotation: number,
    details: IceDetail
  ): void {
    if (!this._ctx) return;

    this._ctx.save();
    this._ctx.translate(x, y);
    this._ctx.rotate(rotation);

    const polarColor = details.iceColor || '#FFFFFF';
    this._ctx.fillStyle = polarColor;

    details.poles.forEach((pole) => {
      this._ctx!.beginPath();
      this._ctx!.ellipse(0, pole.y, pole.width, pole.height, 0, 0, Math.PI * 2);
      this._ctx!.fill();
    });

    this._ctx.strokeStyle = this._adjustColorBrightness(baseColor, 20);
    this._ctx.lineWidth = size * 0.02;

    details.cracks.forEach((crack) => {
      if (crack.points.length < 2) return;

      this._ctx!.beginPath();
      this._ctx!.moveTo(crack.points[0].x, crack.points[0].y);

      for (let i = 1; i < crack.points.length; i++) {
        this._ctx!.lineTo(crack.points[i].x, crack.points[i].y);
      }

      this._ctx!.stroke();
    });

    this._ctx.restore();
  }

  private _getRandomColor(): string {
    return this._starColors[
      Math.floor(Math.random() * this._starColors.length)
    ];
  }

  private _precalculateRockyDetails(size: number): RockyDetails {
    const craters: RockyDetail[] = [];
    const detailCount: number = Math.floor(Math.random() * 4) + 3; // 3-6 details

    for (let i = 0; i < detailCount; i++) {
      // Size for the craters, controlled by a factor
      const detailSize: number = size * (Math.random() * 0.3 + 0.15);

      // Craters must be within a certain range
      const maxOffset: number = size * 0.6 - detailSize;
      const offsetX: number = (Math.random() * 2 - 1) * maxOffset;
      const offsetY: number = (Math.random() * 2 - 1) * maxOffset;

      const hasInner: boolean = Math.random() > 0.5;

      craters.push({
        size: detailSize,
        x: offsetX,
        y: offsetY,
        hasInner,
      });
    }

    return { craters };
  }

  private _precalculateGaseousDetails(
    size: number,
    baseColor: string
  ): GaseousDetails {
    const bands: GaseousBand[] = [];
    const bandCount: number = Math.floor(Math.random() * 3) + 3; // 3-5 bands

    for (let i = 0; i < bandCount; i++) {
      // Width for the bands, controlled by a factor
      const bandWidth: number = size * (Math.random() * 0.2 + 0.1);
      const offsetY: number = size * 0.6 * (i / (bandCount - 1) - 0.5);

      // Alter the color of the bands based on the index
      const bandColor: string =
        i % 2 === 0
          ? baseColor
          : this._adjustColorBrightness(baseColor, i % 4 === 0 ? 20 : -20);

      const swirls: Array<{ x: number; angle: number }> = [];
      if (i % 2 === 0) {
        const swirlCount = Math.floor(Math.random() * 2) + 1; // 1-2 swirls
        for (let j = 0; j < swirlCount; j++) {
          const maxX: number = size * 0.6;
          const swirlX: number = (Math.random() * 2 - 1) * maxX;
          const angle: number = Math.PI * 0.15 * (Math.random() - 0.5);
          swirls.push({ x: swirlX, angle });
        }
      }

      bands.push({
        width: bandWidth,
        y: offsetY,
        color: bandColor,
        swirls,
      });
    }

    return { bands };
  }

  private _precalculateTerrestrialDetails(size: number): TerrestrialDetails {
    const continents: TerrestrialContinent[] = [];
    const continentCount: number = Math.floor(Math.random() * 3) + 2; // 2-4 continents

    for (let i = 0; i < continentCount; i++) {
      const startAngle: number = (Math.PI * 2 * i) / continentCount;
      const continentSize: number = size * (0.2 + Math.random() * 0.25);
      const centerX: number = Math.cos(startAngle) * size * 0.35;
      const centerY: number = Math.sin(startAngle) * size * 0.35;

      const pointCount: number = 5 + Math.floor(Math.random() * 3); // 5-7 points
      const points: Array<{ x: number; y: number }> = [];

      for (let j = 0; j < pointCount; j++) {
        const angle: number = (Math.PI * 2 * j) / pointCount;
        const radiusVariation: number = 0.75 + Math.random() * 0.35;
        const px: number =
          centerX + Math.cos(angle) * continentSize * radiusVariation;
        const py: number =
          centerY + Math.sin(angle) * continentSize * radiusVariation;
        points.push({ x: px, y: py });
      }

      const islands: Array<{ x: number; y: number; size: number }> = [];
      const islandCount: number = Math.floor(Math.random() * 2) + 1; // 1-2 islands
      for (let j = 0; j < islandCount; j++) {
        const angle: number = Math.random() * Math.PI * 2;
        const distance: number = size * (0.15 + Math.random() * 0.25);
        const islandX: number = Math.cos(angle) * distance;
        const islandY: number = Math.sin(angle) * distance;
        const islandSize: number = size * (0.04 + Math.random() * 0.08);

        islands.push({
          x: islandX,
          y: islandY,
          size: islandSize,
        });
      }

      continents.push({
        points,
        islands,
      });
    }

    // Polar caps
    const poles: PolarCap[] = [
      { y: -size * 0.55, width: size * 0.45, height: size * 0.2 },
      { y: size * 0.55, width: size * 0.45, height: size * 0.2 },
    ];

    return { continents, poles };
  }

  // Draw the planet details
  private _drawRockyDetailsPrecalculated(
    x: number,
    y: number,
    size: number,
    detailColor: string,
    rotation: number,
    details: RockyDetails
  ): void {
    if (!this._ctx) return;

    this._ctx.save();
    this._ctx.translate(x, y);
    this._ctx.rotate(rotation);

    this._ctx.shadowBlur = size * 0.15;
    this._ctx.shadowColor = this._adjustColorBrightness(detailColor, -15);

    details.craters.forEach((crater) => {
      this._ctx!.beginPath();
      this._ctx!.arc(crater.x, crater.y, crater.size, 0, Math.PI * 2);
      this._ctx!.fillStyle = detailColor;
      this._ctx!.fill();

      if (crater.hasInner) {
        this._ctx!.beginPath();
        this._ctx!.arc(crater.x, crater.y, crater.size * 0.6, 0, Math.PI * 2);
        this._ctx!.fillStyle = this._adjustColorBrightness(detailColor, 15);
        this._ctx!.fill();
      }
    });

    this._ctx.restore();
  }

  private _drawGaseousDetailsPrecalculated(
    x: number,
    y: number,
    size: number,
    rotation: number,
    details: GaseousDetails
  ): void {
    if (!this._ctx) return;

    this._ctx.save();
    this._ctx.translate(x, y);
    this._ctx.rotate(rotation);

    this._ctx.shadowBlur = size * 0.1;

    details.bands.forEach((band) => {
      this._ctx!.shadowColor = this._adjustColorBrightness(band.color, -15);
      this._ctx!.beginPath();
      this._ctx!.ellipse(0, band.y, size * 0.85, band.width, 0, 0, Math.PI * 2);
      this._ctx!.fillStyle = band.color;
      this._ctx!.fill();

      band.swirls.forEach((swirl) => {
        this._ctx!.beginPath();
        this._ctx!.ellipse(
          swirl.x,
          band.y,
          band.width * 0.7,
          band.width * 0.35,
          swirl.angle,
          0,
          Math.PI * 2
        );
        this._ctx!.fillStyle = this._adjustColorBrightness(band.color, 25);
        this._ctx!.fill();
      });
    });

    this._ctx.restore();
  }

  private _drawTerrestrialDetailsPrecalculated(
    x: number,
    y: number,
    size: number,
    waterColor: string,
    landColor: string,
    rotation: number,
    details: TerrestrialDetails
  ): void {
    if (!this._ctx) return;

    this._ctx.save();
    this._ctx.translate(x, y);
    this._ctx.rotate(rotation);

    // Water
    this._ctx.fillStyle = waterColor;
    this._ctx.beginPath();
    this._ctx.arc(0, 0, size * 0.95, 0, Math.PI * 2);
    this._ctx.fill();

    // Continents
    this._ctx.fillStyle = landColor;

    details.continents.forEach((continent) => {
      if (continent.points.length < 3) return;

      this._ctx!.beginPath();
      this._ctx!.moveTo(continent.points[0].x, continent.points[0].y);

      for (let j = 0; j < continent.points.length; j++) {
        const nextIndex = (j + 1) % continent.points.length;

        this._ctx!.quadraticCurveTo(
          (continent.points[j].x + continent.points[nextIndex].x) * 0.5,
          (continent.points[j].y + continent.points[nextIndex].y) * 0.5,
          continent.points[nextIndex].x,
          continent.points[nextIndex].y
        );
      }

      this._ctx!.fill();

      // Islands
      continent.islands.forEach((island) => {
        this._ctx!.beginPath();
        this._ctx!.arc(island.x, island.y, island.size, 0, Math.PI * 2);
        this._ctx!.fill();
      });
    });

    // Polar Caps adjusts
    const polarCapColor: string = this._adjustColorBrightness(waterColor, 40);
    this._ctx.fillStyle = polarCapColor;

    details.poles.forEach((pole) => {
      this._ctx!.beginPath();
      this._ctx!.ellipse(0, pole.y, pole.width, pole.height, 0, 0, Math.PI * 2);
      this._ctx!.fill();
    });

    this._ctx.restore();
  }

  private _drawVolcanicPlanetDetails(
    x: number,
    y: number,
    size: number,
    baseColor: string,
    rotation: number,
    details: VolcanicDetail
  ): void {
    if (!this._ctx) return;

    this._ctx.save();
    this._ctx.translate(x, y);
    this._ctx.rotate(rotation);

    const lavaColor = details.lavaColor || '#FF4500';

    this._ctx.strokeStyle = lavaColor;
    this._ctx.lineWidth = size * 0.08;
    this._ctx.lineCap = 'round';

    details.flows.forEach((flow) => {
      if (flow.points.length < 2) return;

      this._ctx!.beginPath();
      this._ctx!.moveTo(flow.points[0].x, flow.points[0].y);

      for (let i = 1; i < flow.points.length; i++) {
        this._ctx!.lineTo(flow.points[i].x, flow.points[i].y);
      }

      this._ctx!.stroke();
    });

    this._ctx.fillStyle = lavaColor;

    details.vents.forEach((vent) => {
      this._ctx!.beginPath();
      this._ctx!.arc(vent.x, vent.y, vent.size, 0, Math.PI * 2);
      this._ctx!.fill();

      this._ctx!.save();
      this._ctx!.shadowBlur = vent.size * 1.5;
      this._ctx!.shadowColor = lavaColor;
      this._ctx!.beginPath();
      this._ctx!.arc(vent.x, vent.y, vent.size * 0.7, 0, Math.PI * 2);
      this._ctx!.fill();
      this._ctx!.restore();
    });

    this._ctx.restore();
  }

  private _drawExoticPlanetDetails(
    x: number,
    y: number,
    size: number,
    baseColor: string,
    rotation: number,
    details: ExoticDetail
  ): void {
    if (!this._ctx) return;

    this._ctx.save();
    this._ctx.translate(x, y);
    this._ctx.rotate(rotation);

    // Glow effect
    if (details.hasGlow) {
      this._ctx.save();
      this._ctx.shadowBlur = size * details.glowIntensity;
      this._ctx.shadowColor = details.glowColor;
      this._ctx.beginPath();
      this._ctx.arc(0, 0, size * 0.9, 0, Math.PI * 2);
      this._ctx.fillStyle = 'rgba(255,255,255,0.1)';
      this._ctx.fill();
      this._ctx.restore();
    }

    // Draw the base planet bands
    if (details.bands && details.bands.length > 0) {
      details.bands.forEach((band) => {
        // Draw the band
        this._ctx!.beginPath();
        this._ctx!.ellipse(
          0,
          band.y,
          size * 0.85,
          band.width,
          0,
          0,
          Math.PI * 2
        );
        this._ctx!.fillStyle = band.color;
        this._ctx!.fill();

        // Draw swirls if they exist, using precalculated values
        if (band.pattern === 'swirl' && band.swirls) {
          band.swirls.forEach((swirl) => {
            this._ctx!.beginPath();
            this._ctx!.ellipse(
              swirl.x,
              band.y,
              swirl.width,
              swirl.height,
              swirl.angle,
              0,
              Math.PI * 2
            );
            this._ctx!.fillStyle = swirl.color;
            this._ctx!.fill();
          });
        }
        // Draw stripes if they exist, using precalculated values
        else if (band.pattern === 'striped' && band.stripes) {
          band.stripes.forEach((stripe) => {
            this._ctx!.beginPath();
            this._ctx!.ellipse(
              0,
              band.y,
              size * 0.85,
              band.width,
              0,
              stripe.angle,
              stripe.angle + stripe.width
            );
            this._ctx!.arc(
              0,
              0,
              size,
              stripe.angle + stripe.width,
              stripe.angle,
              true
            );
            this._ctx!.fillStyle = stripe.color;
            this._ctx!.fill();
          });
        }
      });
    }

    // Draw the base planet spots
    if (details.spots && details.spots.length > 0) {
      details.spots.forEach((spot) => {
        // Exterior spot
        this._ctx!.beginPath();
        this._ctx!.arc(spot.x, spot.y, spot.size, 0, Math.PI * 2);
        this._ctx!.fillStyle = spot.color;
        this._ctx!.fill();

        // Exterior spot with inner detail
        if (spot.hasInnerDetail) {
          this._ctx!.beginPath();
          this._ctx!.arc(spot.x, spot.y, spot.innerSize, 0, Math.PI * 2);
          this._ctx!.fillStyle = spot.innerColor;
          this._ctx!.fill();
        }
      });
    }

    this._ctx.restore();
  }

  private _drawPlanetRingsBack(
    x: number,
    y: number,
    planetSize: number,
    ringSize: number,
    ringColor: string,
    rotation: number
  ): void {
    if (!this._ctx) return;

    this._ctx.save();
    this._ctx.translate(x, y);
    this._ctx.rotate(rotation * 0.3);

    this._ctx.beginPath();
    this._ctx.ellipse(0, 0, ringSize, ringSize * 0.2, 0, Math.PI, 2 * Math.PI);
    this._ctx.strokeStyle = ringColor;
    this._ctx.lineWidth = planetSize * 0.25;
    this._ctx.stroke();

    this._ctx.beginPath();
    this._ctx.ellipse(
      0,
      0,
      ringSize * 0.8,
      ringSize * 0.8 * 0.2,
      0,
      Math.PI,
      2 * Math.PI
    );
    this._ctx.strokeStyle = this._adjustColorBrightness(ringColor, -30);
    this._ctx.lineWidth = planetSize * 0.15;
    this._ctx.stroke();

    this._ctx.restore();
  }

  private _drawPlanetRingsFront(
    x: number,
    y: number,
    planetSize: number,
    ringSize: number,
    ringColor: string,
    rotation: number
  ): void {
    if (!this._ctx) return;

    this._ctx.save();
    this._ctx.translate(x, y);
    this._ctx.rotate(rotation * 0.3);

    this._ctx.shadowBlur = planetSize * 0.2;
    this._ctx.shadowColor = ringColor;

    this._ctx.beginPath();
    this._ctx.ellipse(0, 0, ringSize, ringSize * 0.2, 0, 0, Math.PI);
    this._ctx.strokeStyle = ringColor;
    this._ctx.lineWidth = planetSize * 0.25;
    this._ctx.stroke();

    this._ctx.beginPath();
    this._ctx.ellipse(
      0,
      0,
      ringSize * 0.8,
      ringSize * 0.8 * 0.2,
      0,
      0,
      Math.PI
    );
    this._ctx.strokeStyle = this._adjustColorBrightness(ringColor, -30);
    this._ctx.lineWidth = planetSize * 0.15;
    this._ctx.stroke();

    this._ctx.restore();
  }

  private _adjustColorBrightness(color: string, percent: number): string {
    let r: number = parseInt(color.substr(1, 2), 16);
    let g: number = parseInt(color.substr(3, 2), 16);
    let b: number = parseInt(color.substr(5, 2), 16);

    r = Math.max(0, Math.min(255, r + percent));
    g = Math.max(0, Math.min(255, g + percent));
    b = Math.max(0, Math.min(255, b + percent));

    return `#${r.toString(16).padStart(2, '0')}${g
      .toString(16)
      .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  private _setupShootingStars(interval: { min: number; max: number }): void {
    this._maxShootingStars = this._isDesktopView ? 5 : 8;

    const initialCount: number = this._isDesktopView ? 2 : 3;
    for (let i = 0; i < initialCount; i++) {
      this._createShootingStar();
    }

    const actualInterval = this._isDesktopView
      ? { min: interval.min * 1.2, max: interval.max * 1.2 }
      : interval;

    this._shootingStarIntervalId = window.setInterval(() => {
      if (this._shootingStars.length < this._maxShootingStars) {
        this._createShootingStar();
      }
    }, Math.random() * (actualInterval.max - actualInterval.min) + actualInterval.min);
  }

  private _createShootingStar(): void {
    const direction: number = 1;
    const x: number = Math.random() * (this._width * 0.8) + this._width * 0.2;
    const y: number = Math.random() * this._height * 0.7;

    const speedBase: number = this._isDesktopView
      ? Math.random() * 4 + 6
      : Math.random() * 5 + 7;

    const length: number = (Math.random() * 80 + 40) * this._sizeFactor;
    const width: number = (Math.random() * 1.8 + 0.8) * this._sizeFactor;
    const opacity: number = Math.random() * 0.3 + 0.7;

    const speedX: number = speedBase;
    const speedY: number = speedBase * 0.4;

    this._shootingStars.push({
      x,
      y,
      speedX,
      speedY,
      len: length,
      opacity,
      width,
      direction,
    });
  }

  /**
   * Create stars without animation
   */
  private _createStarsWithoutAnimation(count: number): void {
    for (let i = 0; i < count; i++) {
      const initialX: number = Math.random();
      const initialY: number = Math.random();

      let size: number;
      const sizeCategory: number = Math.random();

      // Nuevos tamaños ajustados
      if (sizeCategory < 0.03) {
        // Mantener estrellas más grandes como efecto destacado
        size = (Math.random() * 3 + 2) * this._sizeFactor;
      } else if (sizeCategory < 0.15) {
        // Reducir estrellas grandes
        size = (Math.random() * 1.5 + 1.2) * this._sizeFactor;
      } else if (sizeCategory < 0.4) {
        // Reducir estrellas medianas significativamente
        size = (Math.random() * 0.8 + 0.6) * this._sizeFactor;
      } else {
        // Mantener estrellas pequeñas
        size = (Math.random() * 0.5 + 0.3) * this._sizeFactor;
      }

      // Colores más brillantes para estrellas grandes
      const useSpecialColor = sizeCategory < 0.15;
      const color = useSpecialColor
        ? this._getRandomColor()
        : Math.random() < 0.8
        ? '#ffffff'
        : this._getRandomColor();

      // Añadir la estrella con animación de escala y opacidad
      this._stars.push({
        x: initialX * this._width,
        y: initialY * this._height,
        size: 0.1, // Tamaño inicial pequeño
        targetSize: size, // Tamaño objetivo
        speed: Math.random() * 0.05 + 0.02,
        color,
        initialX,
        initialY,
        opacity: 0, // Comenzar invisible
        animating: true, // Marcar como en animación
      });
    }
  }

  private _updateStars(): void {
    if (!this._ctx) return;

    try {
      // Actualiza cada estrella y maneja la animación
      this._stars.forEach((star) => {
        // Mover la estrella horizontalmente
        star.x -= star.speed;
        if (star.x < -star.size) star.x = this._width + star.size;

        // Animar la estrella si está en proceso de animación
        if (star.animating && star.targetSize !== undefined) {
          // Aumentar gradualmente el tamaño (easing)
          star.size += (star.targetSize - star.size) * 0.08;

          // Aumentar gradualmente la opacidad
          star.opacity += (1 - star.opacity) * 0.08;

          // Si estamos lo suficientemente cerca del tamaño final, finalizar animación
          if (star.size >= star.targetSize * 0.95) {
            star.size = star.targetSize;
            star.opacity = 1;
            star.animating = false;
            delete star.targetSize; // Limpiar propiedad innecesaria
          }
        }
      });

      // Separar estrellas por tamaño para optimizar renderizado
      const largeStars = this._stars.filter((star) => star.size >= 1.2);
      const smallStars = this._stars.filter((star) => star.size < 1.2);

      // Dibujar estrellas pequeñas (sin glow)
      this._ctx.globalAlpha = 1;
      smallStars.forEach((star) => {
        this._ctx!.globalAlpha = star.opacity;
        this._ctx!.beginPath();
        this._ctx!.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        this._ctx!.fillStyle = star.color;
        this._ctx!.fill();
      });

      // Dibujar estrellas grandes (con glow)
      this._ctx.save();
      largeStars.forEach((star) => {
        // Apply glow effect
        this._ctx!.shadowBlur = star.size * 0.8;
        this._ctx!.shadowColor = star.color;
        this._ctx!.globalAlpha = star.opacity;
        this._ctx!.beginPath();
        this._ctx!.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        this._ctx!.fillStyle = star.color;
        this._ctx!.fill();
      });
      this._ctx.restore();

      // Reset global alpha for other drawings
      this._ctx!.globalAlpha = 1;
    } catch (error) {
      console.error('Error rendering stars:', error);
    }
  }

  /**
   * Detect if the device is low performance
   */
  private _detectLowPerformance(): boolean {
    if (!isPlatformBrowser(this._platformId)) return false;

    // Verify if the device has low memory
    const memory = (navigator as any).deviceMemory;
    if (typeof memory !== 'undefined' && memory < 4) {
      return true;
    }

    // Verify if the device has low CPU cores
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
      return true;
    }

    return !this._isDesktopView;
  }

  private _startAnimation(): void {
    if (!this._ctx) return;

    // Set target FPS based on device performance
    let targetFPS = 30;
    const isLowEndDevice = this._detectLowPerformance();

    if (isLowEndDevice) {
      targetFPS = 15; // Reducir FPS para dispositivos de gama baja
    }

    // FPS limiting
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;

    // Set background color based on theme
    this._backgroundColor = this._isDarkMode
      ? 'rgba(25, 25, 25, 1)'
      : 'rgba(23, 22, 31, 1)';

    const animate = (timestamp: number): void => {
      try {
        if (!this._ctx) return;

        // Limit FPS based on the target
        const elapsed = timestamp - lastFrameTime;
        if (elapsed < frameInterval) {
          this._animationFrameId = requestAnimationFrame(animate);
          return;
        }

        lastFrameTime = timestamp - (elapsed % frameInterval);

        // Use precalculated background color
        this._ctx.fillStyle = this._backgroundColor;
        this._ctx.fillRect(0, 0, this._width, this._height);

        this._updateStars();
        this._updatePlanets();
        this._updateShootingStars();

        this._animationFrameId = requestAnimationFrame(animate);
      } catch (error) {
        console.error('Error in star animation:', error);
        this.cleanup();
      }
    };

    try {
      lastFrameTime = performance.now();
      this._animationFrameId = requestAnimationFrame(animate);
    } catch (error) {
      console.error('Error starting star animation:', error);
      this.cleanup();
    }
  }

  private _updateShootingStars(): void {
    if (!this._ctx) return;

    try {
      this._shootingStars = this._shootingStars.filter((star) => {
        const outOfBounds: boolean =
          star.x < -star.len || star.y > this._height + star.len;
        return !outOfBounds;
      });

      this._shootingStars.forEach((star) => {
        star.x -= star.speedX;
        star.y += star.speedY;

        const globalOpacity: number = Math.min(
          star.opacity,
          this._stars[0]?.opacity || 1
        );
        this._ctx!.globalAlpha = globalOpacity;

        const gradient: CanvasGradient = this._ctx!.createLinearGradient(
          star.x,
          star.y,
          star.x + star.len,
          star.y - star.len * 0.3
        );

        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        this._ctx!.save();
        this._ctx!.strokeStyle = gradient;
        this._ctx!.lineWidth = star.width;
        this._ctx!.beginPath();
        this._ctx!.moveTo(star.x, star.y);
        this._ctx!.lineTo(star.x + star.len, star.y - star.len * 0.3);
        this._ctx!.stroke();

        this._ctx!.beginPath();
        this._ctx!.arc(star.x, star.y, star.width * 1.5, 0, Math.PI * 2);
        this._ctx!.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        this._ctx!.fill();
        this._ctx!.restore();
      });

      this._ctx!.globalAlpha = 1;
    } catch (error) {
      console.error('Error rendering shooting stars:', error);
    }
  }

  public initialize(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    options: Animation
  ): void {
    if (!isPlatformBrowser(this._platformId)) return;

    if (this._isInitialized) {
      this.cleanup();
    }

    this._canvas = canvas;
    this._ctx = canvas.getContext('2d', { alpha: true });

    this._isDesktopView = window.innerWidth >= 1024;

    // Apply size factor
    this._sizeFactor = options.sizeFactor || 1.0;

    if (this._isDesktopView) {
      // We don't modify the canvas size here
      // The component has already prepared it with overflow-hidden
    }

    this._width = width;
    this._height = height;
    this._isDarkMode = options.isDarkMode;

    this._setupCanvas();

    const fadeInDuration: number = options.fadeInDuration || 600;
    this._createStars(options.starCount, fadeInDuration);
    this._createPlanets(options.planetCount || 8, fadeInDuration);

    if (options.enableShootingStars) {
      this._setupShootingStars(options.shootingStarInterval);
    }

    canvas.style.opacity = '1';

    this._startAnimation();
    this._isInitialized = true;
  }

  /**
   * Add additional stars to the canvas
   */
  public addAdditionalStars(count: number): void {
    if (!this._isInitialized || !isPlatformBrowser(this._platformId)) return;

    // Use requestIdleCallback for better performance
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        this._createStarsWithoutAnimation(count);
      });
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      setTimeout(() => {
        this._createStarsWithoutAnimation(count);
      }, 0);
    }
  }

  public updateTheme(isDarkMode: boolean): void {
    this._isDarkMode = isDarkMode;

    // Update background color based on theme
    this._backgroundColor = isDarkMode
      ? 'rgba(25, 25, 25, 1)'
      : 'rgba(23, 22, 31, 1)';
  }

  public resize(width: number, height: number): void {
    if (!isPlatformBrowser(this._platformId) || !this._isInitialized) return;

    this._isDesktopView = window.innerWidth >= 1024;

    this._width = width;
    this._height = height;
    this._setupCanvas();

    this._stars.forEach((star) => {
      star.x = star.initialX * this._width;
      star.y = star.initialY * this._height;
    });

    this._planets.forEach((planet) => {
      planet.x = planet.initialX * this._width;
      planet.y = planet.initialY * this._height;
    });
  }

  public cleanup(): void {
    if (!isPlatformBrowser(this._platformId)) return;

    if (this._animationFrameId) {
      cancelAnimationFrame(this._animationFrameId);
      this._animationFrameId = undefined;
    }

    if (this._fadeInAnimationId) {
      cancelAnimationFrame(this._fadeInAnimationId);
      this._fadeInAnimationId = undefined;
    }

    if (this._shootingStarIntervalId) {
      clearInterval(this._shootingStarIntervalId);
      this._shootingStarIntervalId = undefined;
    }

    this._stars = [];
    this._planets = [];
    this._shootingStars = [];
    this._isInitialized = false;
  }
}
