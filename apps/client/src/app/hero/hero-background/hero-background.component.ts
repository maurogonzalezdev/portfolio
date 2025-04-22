import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';

import { LoaderService } from '@client/app/shared/services/loader.service';
import { Star } from '@client/app/hero/interfaces';
import { StarGenerationService } from '@client/app/hero/services/star-generation.service';

@Component({
  selector: 'hero-background',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero-background.component.html',
  styleUrl: './hero-background.component.css',
})
export class HeroBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('starsContainer')
  private _starsContainer!: ElementRef<SVGGElement>;

  private _isBrowser: boolean;
  private _timeoutId: number | null = null;
  private _resizeInProgress = false;
  private _containerCounter = 0;
  private _twinkling = false;
  private _twinkleIntervalId: number | null = null;

  private readonly _ngZone: NgZone = inject(NgZone);
  private readonly _platformId: Object = inject(PLATFORM_ID);
  private readonly _document: Document = inject(DOCUMENT);
  private readonly _starService: StarGenerationService = inject(
    StarGenerationService
  );
  private readonly _loaderService: LoaderService = inject(LoaderService);

  // Star configuration
  private readonly _starConfig: Star = {
    count: 400,
    size: 1.0,
    sizeVariance: 0.9,
    minOpacity: 0.5,
    maxOpacity: 1.0,
    glowPercentage: 0.3,
    svgWidth: 2100,
    svgHeight: 650,
  };

  get starsColors() {
    return this._starService.starsColors;
  }

  get svgViewBox(): string {
    return `0 0 ${this._starConfig.svgWidth} ${this._starConfig.svgHeight}`;
  }

  get svgWidth(): number {
    return this._starConfig.svgWidth;
  }

  get svgHeight(): number {
    return this._starConfig.svgHeight;
  }

  constructor() {
    this._isBrowser = isPlatformBrowser(this._platformId);
  }

  ngAfterViewInit(): void {
    if (!this._isBrowser) return;

    this._ngZone.runOutsideAngular(() => {
      // Generate 30% of stars immediately for quick visual feedback
      this._timeoutId =
        this._document.defaultView?.setTimeout(() => {
          this.generatePartialStars(0.3);
          this._loaderService.setHeroBackgroundLoaded(true);

          // Complete the rest after a brief delay
          this._document.defaultView?.setTimeout(() => {
            this.generatePartialStars(1.0);
            this.startTwinkling();
          }, 200);
        }, 0) || null;
    });
  }

  ngOnDestroy(): void {
    if (!this._isBrowser) return;

    if (this._timeoutId !== null && this._document.defaultView) {
      this._document.defaultView.clearTimeout(this._timeoutId);
    }

    if (this._twinkleIntervalId !== null && this._document.defaultView) {
      this._document.defaultView.clearInterval(this._twinkleIntervalId);
    }
  }

  /**
   * Generates a partial or complete starfield based on percentage
   * @param percentage Percentage of total stars to generate (0.0 to 1.0)
   */
  private generatePartialStars(percentage: number): void {
    if (!this._isBrowser) return;

    const starsGroup = this._starsContainer.nativeElement;

    // Clear existing stars only on first run
    if (percentage <= 0.3) {
      this._starService.clearContainer(starsGroup);
    }

    // Create adjusted configuration
    const partialConfig = { ...this._starConfig };

    if (percentage < 1.0) {
      partialConfig.count = Math.floor(this._starConfig.count * percentage);
    }

    // Generate stars with adjusted count
    this._starService.generateStarsInContainer(starsGroup, partialConfig);
  }

  /**
   * Starts the star twinkling effect
   */
  private startTwinkling(): void {
    if (!this._isBrowser || this._twinkling || !this._document.defaultView)
      return;

    this._twinkling = true;
    this._twinkleIntervalId = this._document.defaultView.setInterval(() => {
      if (!this._resizeInProgress) {
        this.twinkleStars();
      }
    }, 1800);
  }

  /**
   * Regenerates stars with a smooth transition for twinkling effect
   */
  private twinkleStars(): void {
    if (!this._isBrowser || this._resizeInProgress) return;

    this._resizeInProgress = true;

    const oldStarsContainer = this._starsContainer.nativeElement;
    const svgElement = oldStarsContainer.parentElement;

    if (!svgElement) {
      this._resizeInProgress = false;
      return;
    }

    // Create and setup new container
    const containerId = `stars-container-${++this._containerCounter}`;
    const newStarsContainer =
      this._starService.createNewStarsContainer(containerId);
    svgElement.appendChild(newStarsContainer);

    // Generate new stars
    this._starService.generateStarsInContainer(newStarsContainer);

    // Animate transition between containers
    this._starService.animateContainerTransition(
      oldStarsContainer,
      newStarsContainer,
      () =>
        this.finalizeContainerTransition(oldStarsContainer, newStarsContainer)
    );
  }

  /**
   * Finalizes the container transition by removing old container and updating reference
   */
  private finalizeContainerTransition(
    oldContainer: SVGGElement,
    newContainer: SVGGElement
  ): void {
    if (oldContainer.parentElement) {
      oldContainer.parentElement.removeChild(oldContainer);
    }

    this._starsContainer = {
      nativeElement: newContainer,
    } as ElementRef<SVGGElement>;

    this._resizeInProgress = false;
  }
}
