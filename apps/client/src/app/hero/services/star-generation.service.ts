import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

import { Quadrant, Star } from '@client/app/hero/interfaces';

@Injectable({
  providedIn: 'root',
})
export class StarGenerationService {
  private _isBrowser: boolean;
  private readonly _platformId: Object = inject(PLATFORM_ID);
  private readonly _document: Document = inject(DOCUMENT);

  // Default star configuration
  private readonly _defaultStarConfig: Star = {
    count: 400,
    size: 1.0,
    sizeVariance: 0.9,
    minOpacity: 0.5,
    maxOpacity: 1.0,
    glowPercentage: 0.3,
    svgWidth: 2100,
    svgHeight: 650,
  };

  private readonly _starsColors = [
    { id: 'glow', color: '#EEEEEE', opacity: 0.35, blur: 1.5 },
    { id: 'blueGlow', color: '#D3EBF3', opacity: 0.4, blur: 2.0 },
    { id: 'pinkGlow', color: '#FFF2F8', opacity: 0.3, blur: 1.5 },
  ];

  constructor() {
    this._isBrowser = isPlatformBrowser(this._platformId);
  }

  get starsColors() {
    return this._starsColors;
  }

  /**
   * Generates stars in a specific container with optional custom config
   */
  public generateStarsInContainer(
    container: SVGGElement,
    customConfig?: Partial<Star>
  ): void {
    if (!this._isBrowser) return;

    // Use custom config if provided, otherwise use default
    const config = customConfig
      ? { ...this._defaultStarConfig, ...customConfig }
      : this._defaultStarConfig;

    const fragment = this._document.createDocumentFragment();
    const quadrants = this.createQuadrants(
      config.count,
      config.svgWidth,
      config.svgHeight
    );

    // Process each quadrant for more uniform star distribution
    quadrants.forEach((quadrant) => {
      this.populateQuadrant(quadrant, config, fragment);
    });

    // Optimize by adding all stars at once
    container.appendChild(fragment);
  }

  /**
   * Clears all children from a container
   */
  public clearContainer(container: Element): void {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  /**
   * Creates a new SVG container for stars with proper attributes
   */
  public createNewStarsContainer(containerId: string): SVGGElement {
    const newContainer = this._document.createElementNS(
      'http://www.w3.org/2000/svg',
      'g'
    );

    newContainer.setAttribute('id', containerId);
    newContainer.setAttribute('fill', 'none');
    newContainer.setAttribute('fill-rule', 'evenodd');
    newContainer.style.opacity = '0';

    return newContainer;
  }

  /**
   * Creates quadrants for uniform star distribution
   */
  private createQuadrants(
    totalStars: number,
    width: number,
    height: number
  ): Array<Quadrant> {
    const quadSize = 4; // 4x4 grid
    const totalQuads = quadSize * quadSize;
    const starsPerQuad = Math.ceil(totalStars / totalQuads);
    const quadWidth = width / quadSize;
    const quadHeight = height / quadSize;

    const quadrants = new Array<Quadrant>(totalQuads);
    let index = 0;

    for (let qx = 0; qx < quadSize; qx++) {
      for (let qy = 0; qy < quadSize; qy++) {
        // Calculate distance from center for density adjustment
        const distanceFromCenter = Math.sqrt(
          Math.pow(qx - quadSize / 2 + 0.5, 2) +
            Math.pow(qy - quadSize / 2 + 0.5, 2)
        );

        // More stars in center, fewer at edges (10% variation)
        const densityFactor =
          1 + 0.1 * (1 - distanceFromCenter / (quadSize / 2));

        quadrants[index++] = {
          x: qx * quadWidth,
          y: qy * quadHeight,
          width: quadWidth,
          height: quadHeight,
          count: Math.round(starsPerQuad * densityFactor),
        };
      }
    }

    return quadrants;
  }

  /**
   * Creates stars for a specific quadrant and adds them to the fragment
   */
  private populateQuadrant(
    quadrant: Quadrant,
    config: Star,
    fragment: DocumentFragment
  ): void {
    const { x, y, width, height, count } = quadrant;
    const {
      size,
      sizeVariance,
      minOpacity,
      maxOpacity,
      glowPercentage,
      svgWidth,
      svgHeight,
    } = config;

    for (let i = 0; i < count; i++) {
      const starX = this.getRandomNumber(x, x + width);
      const starY = this.getRandomNumber(y, y + height);
      const radius = this.getRandomNumber(
        size * (1 - sizeVariance),
        size * (1 + sizeVariance)
      );
      const opacity = this.getRandomNumber(minOpacity, maxOpacity);

      // Calculate distance-based opacity for depth effect
      const distanceToCenter = Math.sqrt(
        Math.pow(starX - svgWidth / 2, 2) + Math.pow(starY - svgHeight / 2, 2)
      );

      const distanceFactor = Math.max(
        0,
        1 - distanceToCenter / (Math.min(svgWidth, svgHeight) * 0.5)
      );

      const adjustedOpacity = opacity * (0.8 + distanceFactor * 0.2);

      // Only create visible stars for performance
      if (adjustedOpacity > 0.2) {
        const star = this.createStar(
          starX,
          starY,
          radius,
          adjustedOpacity,
          glowPercentage
        );

        if (star) {
          fragment.appendChild(star);
        }
      }
    }
  }

  /**
   * Creates an individual star with optimized attributes
   */
  private createStar(
    x: number,
    y: number,
    radius: number,
    opacity: number,
    glowChance: number
  ): SVGCircleElement | null {
    if (!this._isBrowser) return null;

    // Ensure stars stay within boundaries with padding for glow
    const padding = radius * 3;
    const { svgWidth, svgHeight } = this._defaultStarConfig;
    const safeX = Math.max(padding, Math.min(x, svgWidth - padding));
    const safeY = Math.max(padding, Math.min(y, svgHeight - padding));

    const star = this._document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );

    // Determine color and filter in a single step for efficiency
    const { color, filter } = this.getStarColorAndFilter();

    // Set attributes directly for better performance
    star.setAttribute('cx', safeX.toString());
    star.setAttribute('cy', safeY.toString());
    star.setAttribute('r', Math.max(radius, 0.5).toString());
    star.setAttribute('fill', color);
    star.setAttribute('fill-opacity', Math.max(opacity, 0.5).toString());

    // Apply glow only to a subset of stars for performance
    if (Math.random() < glowChance && opacity > 0.7) {
      star.setAttribute('filter', filter);
    }

    return star;
  }

  /**
   * Deterministically selects star color and filter based on probability
   */
  private getStarColorAndFilter(): { color: string; filter: string } {
    const colorRandom = Math.random();
    let colorIndex = 0;

    if (colorRandom >= 0.8) {
      colorIndex = 2; // Pink (20%)
    } else if (colorRandom >= 0.5) {
      colorIndex = 1; // Blue (30%)
    }
    // else index stays 0 for white (50%)

    return {
      color: this._starsColors[colorIndex].color,
      filter: `url(#${this._starsColors[colorIndex].id})`,
    };
  }

  /**
   * Generates a random number within a range
   */
  private getRandomNumber(min: number, max: number): number {
    return min + Math.random() * (max - min);
  }

  /**
   * Animates transition between old and new star containers
   */
  public animateContainerTransition(
    oldContainer: SVGGElement,
    newContainer: SVGGElement,
    callback: () => void
  ): void {
    if (!this._document.defaultView) return;

    let startTime: number;
    const duration = 800; // ms - animation duration
    const oldOpacity = parseFloat(getComputedStyle(oldContainer).opacity) || 1;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      let progress = Math.min(elapsed / duration, 1);

      // Fade out old container
      oldContainer.style.opacity = String(oldOpacity * (1 - progress * 0.95));

      // Fade in new container
      newContainer.style.opacity = String(Math.min(progress * 0.9, 0.85));

      if (progress < 1) {
        this._document.defaultView?.requestAnimationFrame(step);
      } else {
        callback();
      }
    };

    this._document.defaultView.requestAnimationFrame(step);
  }
}
