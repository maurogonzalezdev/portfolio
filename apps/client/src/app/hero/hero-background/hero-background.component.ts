import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  PLATFORM_ID,
  AfterViewInit,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ViewChild,
  NgZone,
  Input,
  ApplicationRef,
  inject,
} from '@angular/core';

import { StarAnimationService } from '@client/app/hero/services/star-animation.service';
import { Breakpoint, Theme } from '@client/app/shared/types';
import { ThemeSwitcherService } from '@client/app/shared/services/theme-switcher.service';

import { debounceTime, take } from 'rxjs/operators';
import { Subject, takeUntil, fromEvent, timer } from 'rxjs';
import { BreakpointObserverService } from '@client/app/shared/services/breakpoint-observer.service';

@Component({
  selector: 'hero-background',
  standalone: true,
  imports: [CommonModule],
  providers: [StarAnimationService],
  templateUrl: './hero-background.component.html',
  styleUrl: './hero-background.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroBackgroundComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('canvas', { static: true })
  private _canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input()
  set setStarCount(starCount: number) {
    if (!starCount) return;

    this._originalStarCount = starCount;
    this._starCount = starCount;

    return;
  }
  @Input()
  set setPlanetCount(planetCount: number) {
    if (!planetCount) return;

    this._originalPlanetCount = planetCount;
    this._planetCount = planetCount;

    return;
  }
  @Input()
  set setShootingStarInterval(interval: { min: number; max: number }) {
    if (!interval) return;

    this._shootingStarInterval = interval;
    return;
  }
  @Input()
  set setShootingStars(shouldShow: boolean) {
    if (shouldShow === undefined) return;

    this._enableShootingStars = shouldShow;
    return;
  }
  @Input()
  set setFadeInDuration(duration: number) {
    if (!duration) return;

    this._fadeInDuration = duration;
    return;
  }

  private readonly _destroy$: Subject<void> = new Subject<void>();
  private _resizeObserver?: ResizeObserver;
  private readonly _starAnimationService: StarAnimationService =
    inject(StarAnimationService);
  private readonly _themeSwitcherService: ThemeSwitcherService =
    inject(ThemeSwitcherService);
  private readonly _platformId: Object = inject(PLATFORM_ID);
  private readonly _ngZone: NgZone = inject(NgZone);

  private _fadeInDuration: number = 300;
  private _enableShootingStars: boolean = true;
  private _shootingStarInterval = {
    min: 2000,
    max: 3500,
  };
  private _isDarkMode: boolean = true;
  private _isDesktopView: boolean = false;
  private _isCanvasInitialized: boolean = false;
  private _initializationInProgress: boolean = false;
  private _themeInitialized: boolean = false;
  private _stableInitComplete: boolean = false;
  private _resizeTimeout?: number;
  // Properties for element count
  private _originalStarCount: number = 600;
  private _originalPlanetCount: number = 7;
  private _starCount: number = 600;
  private _planetCount: number = 7;
  // Factor to adjust the size of stars and planets
  private _sizeFactor: number = 1.0;

  constructor(
    private readonly _elementRef: ElementRef<HTMLElement>,
    private readonly _appRef: ApplicationRef
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this._platformId)) return;

    // Detect if we're on desktop view
    this._isDesktopView = window.innerWidth >= 1024;

    // Adjust the number of stars and planets based on the screen size
    this._adjustElementCountForScreenSize();

    this._themeSwitcherService
      .getTheme$()
      .pipe(takeUntil(this._destroy$))
      .subscribe((theme: Theme) => {
        this._isDarkMode = theme === 'dark';
        this._themeInitialized = true;

        if (this._isCanvasInitialized) {
          this._starAnimationService.updateTheme(this._isDarkMode);
        }
      });

    // Special configuration for mobile viewport
    if (!this._isDesktopView) {
      // Wait for the application to stabilize before initializing on mobile
      this._ngZone.runOutsideAngular(() => {
        // Wait for multiple stability cycles to ensure layout is complete
        timer(500)
          .pipe(take(1))
          .subscribe(() => {
            this._stableInitComplete = true;
            if (!this._isCanvasInitialized && !this._initializationInProgress) {
              this._initializeCanvasWhenReady();
            }
          });
      });
    }

    // Resize handler with larger reaction time threshold on mobile
    this._ngZone.runOutsideAngular(() => {
      fromEvent(window, 'resize')
        .pipe(
          debounceTime(this._isDesktopView ? 250 : 500),
          takeUntil(this._destroy$)
        )
        .subscribe(() => {
          // Update desktop detection on size change
          const wasDesktopView = this._isDesktopView;
          this._isDesktopView = window.innerWidth >= 1024;

          // If we cross desktop/mobile threshold
          if (wasDesktopView !== this._isDesktopView) {
            const container = this._getContainerElement();
            if (container) {
              this._smoothResizeTransition(container);
            }
          } else if (this._isCanvasInitialized) {
            this._handleResize();
          }
        });
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this._platformId)) return;

    this._ngZone.runOutsideAngular(() => {
      // For mobile, we already started the process in ngOnInit with delay
      if (this._isDesktopView || this._stableInitComplete) {
        this._initializeCanvasWhenReady();
      }
    });
  }

  get getStarCount(): number {
    return this._starCount;
  }
  get getPlanetCount(): number {
    return this._planetCount;
  }
  get getIsDarkMode(): boolean {
    return this._isDarkMode;
  }
  get getSizeFactor(): number {
    return this._sizeFactor;
  }

  /**
   * Adjust the number of stars and planets based on the screen size
   */
  private _adjustElementCountForScreenSize(): void {
    // Reduce the number of stars and planets for mobile devices
    const isMobile = !this._isDesktopView;
    const isLowEndDevice = this._detectLowEndDevice();

    // Set the size factor based on the screen size
    this._sizeFactor = this._isDesktopView ? 1.0 : 1.1;

    // Adaptative configuration for mobile and low-end devices
    if (isMobile || isLowEndDevice) {
      // Low end devices
      this._starCount = isLowEndDevice ? 100 : 400;
      this._planetCount = Math.ceil(this._originalPlanetCount * 0.6);

      // Load aditional stars progressively
      if (!isLowEndDevice) {
        setTimeout(() => this._progressivelyAddStars(), 1000);
      }
    } else {
      // Desktop devices
      this._starCount = 400; // Start with a lower count
      this._planetCount = this._originalPlanetCount;

      // Adds stars progressively to avoid blocking the main thread
      setTimeout(() => this._progressivelyAddStars(), 1200);
    }
  }

  /**
   * Adds stars progressively to avoid blocking the main thread
   */
  private _progressivelyAddStars(): void {
    if (!this._isCanvasInitialized) return;

    const targetCount = this._isDesktopView ? 1200 : 250;
    const currentCount = this._starCount;
    const delta = targetCount - currentCount;

    if (delta <= 0) return;

    // Small batch size to avoid blocking the main thread
    const batchSize = Math.min(Math.floor(Math.random() * 20) + 10, delta);

    // Service method to add stars
    this._starAnimationService.addAdditionalStars(batchSize);
    this._starCount += batchSize;

    // If we haven't reached the target count, schedule the next batch
    if (this._starCount < targetCount) {
      const nextDelay = this._isDesktopView
        ? 100 + Math.random() * 400 // 100-500ms desktop
        : 300 + Math.random() * 700; // 300-1000ms mobile

      setTimeout(() => this._progressivelyAddStars(), nextDelay);
    }
  }

  /**
   * Detects if the device is a low-end mobile device
   */
  private _detectLowEndDevice(): boolean {
    if (!isPlatformBrowser(this._platformId)) return false;

    // Detect if the device has low memory
    const memory = (navigator as any).deviceMemory;
    const hasLowMemory = typeof memory !== 'undefined' && memory < 4;

    // Verify if the device is a low-end mobile
    const isLowEndMobile =
      !this._isDesktopView &&
      (hasLowMemory || navigator.hardwareConcurrency <= 4);

    return isLowEndMobile;
  }

  private _initializeCanvasWhenReady(): void {
    if (this._isCanvasInitialized || this._initializationInProgress) return;

    this._initializationInProgress = true;

    // For mobile, make sure the theme is ready and have stable dimensions
    if (
      !this._themeInitialized ||
      (!this._isDesktopView && !this._stableInitComplete)
    ) {
      setTimeout(() => {
        this._initializationInProgress = false;
        this._initializeCanvasWhenReady();
      }, 100);
      return;
    }

    const container: HTMLElement | null = this._getContainerElement();
    if (!container || !container.clientWidth || !container.clientHeight) {
      setTimeout(() => {
        this._initializationInProgress = false;
        this._initializeCanvasWhenReady();
      }, 100);
      return;
    }

    this._initCanvasAnimation();

    // On mobile, avoid ResizeObserver and use only the window.resize event
    if (this._isDesktopView) {
      this._setupResizeObserver();
    }

    this._initializationInProgress = false;
  }

  private _initCanvasAnimation(): void {
    if (this._isCanvasInitialized) return;

    const canvas: HTMLCanvasElement = this._canvasRef.nativeElement;
    const container: HTMLElement | null = this._getContainerElement();

    if (!container) return;

    // Prepare the canvas, but don't modify its dimensions here
    // as the service will handle that based on the screen type
    this._prepareCanvas(canvas);

    // Initialize only once and mark as initialized before calling the service
    this._isCanvasInitialized = true;

    try {
      // The service will handle adjusting the canvas size based on isDesktopView
      this._starAnimationService.initialize(
        canvas,
        container.clientWidth,
        container.clientHeight,
        {
          starCount: this.getStarCount,
          planetCount: this.getPlanetCount,
          shootingStarInterval: this._shootingStarInterval,
          enableShootingStars: this._enableShootingStars,
          isDarkMode: this._isDarkMode,
          fadeInDuration: this._fadeInDuration,
          sizeFactor: this.getSizeFactor, // Pass the size factor to the service
        }
      );
    } catch (error) {
      console.error('Error initializing star animation:', error);
      this._isCanvasInitialized = false;
    }
  }

  private _prepareCanvas(canvas: HTMLCanvasElement): void {
    // Set initial position and clear previous styles
    canvas.style.opacity = '0'; // Start invisible, the service will make it visible

    // Clear any previous positioning
    canvas.style.left = '';
    canvas.style.right = '';

    // Ensure the canvas is absolute and fills its container
    canvas.style.position = 'absolute';
  }

  private _setupResizeObserver(): void {
    const container: HTMLElement | null = this._getContainerElement();
    if (!container || typeof ResizeObserver === 'undefined') return;

    this._resizeObserver = new ResizeObserver(() => {
      if (this._isCanvasInitialized && !this._resizeTimeout) {
        // Use debounce here as well to avoid multiple resizes
        this._resizeTimeout = window.setTimeout(() => {
          this._handleResize();
          this._resizeTimeout = undefined;
        }, 250);
      }
    });

    this._resizeObserver.observe(container);
  }

  private _handleResize(): void {
    if (!this._isCanvasInitialized) return;

    const container: HTMLElement | null = this._getContainerElement();
    if (!container) return;

    // Determine if we're crossing the desktop/mobile threshold
    const wasDesktopView = this._isDesktopView;
    this._isDesktopView = window.innerWidth >= 1024;

    // For threshold crossing, use smooth transition
    if (wasDesktopView !== this._isDesktopView) {
      this._smoothResizeTransition(container);
    } else {
      // For normal resizing within same view mode, just resize
      try {
        this._starAnimationService.resize(
          container.clientWidth,
          container.clientHeight
        );
      } catch (error) {
        console.error('Error resizing star animation:', error);
      }
    }
  }

  /**
   * Handle smooth transition when resizing the canvas
   */
  private _smoothResizeTransition(container: HTMLElement): void {
    // Mark the canvas as not initialized to prevent further actions
    this._isCanvasInitialized = false;

    // 1. Prepare the canvas for fade-out
    const currentCanvas = this._canvasRef.nativeElement;
    currentCanvas.style.transition = 'opacity 400ms ease-out';
    currentCanvas.style.opacity = '0';

    // 2. Wait for the fade-out to complete before resizing
    setTimeout(() => {
      // Stop the animation and cleanup
      this._starAnimationService.cleanup();

      // Hide the canvas to avoid flickering
      currentCanvas.style.display = 'none';
      currentCanvas.style.visibility = 'hidden';
      currentCanvas.style.transition = '';

      // 3. Clear the canvas
      const ctx = currentCanvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, currentCanvas.width, currentCanvas.height);
      }

      // 4. Adjust the canvas size based on the new container dimensions
      this._adjustElementCountForScreenSize();

      // 5. Wait to DOM
      setTimeout(() => {
        // Prepare the canvas for the new animation
        currentCanvas.style.display = '';
        currentCanvas.style.visibility = 'hidden'; // Keep it hidden until ready
        currentCanvas.style.opacity = '0';

        // 6. Initialize the canvas animation with new dimensions
        this._initCanvasAnimation();

        // 7. Wait for the animation to be ready
        setTimeout(() => {
          // Now we can show the canvas
          currentCanvas.style.visibility = 'visible';
          currentCanvas.style.transition = 'opacity 400ms ease-in';
          currentCanvas.style.opacity = '1';
        }, 100); // Time to ensure the animation is ready
      }, 200); // Aumented time to ensure the canvas is cleared
    }, 400); // Aumented time to ensure the fade-out is complete
  }

  private _getContainerElement(): HTMLElement | null {
    // Find container element with valid dimensions
    const container: HTMLElement | null =
      this._elementRef.nativeElement.closest('header')?.closest('div') || null;

    // Additional verification for mobile
    if (container && !this._isDesktopView) {
      if (container.clientWidth === 0 || container.clientHeight === 0) {
        return null;
      }
    }

    return container;
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();

    if (isPlatformBrowser(this._platformId)) {
      this._starAnimationService.cleanup();

      if (this._resizeObserver) {
        this._resizeObserver.disconnect();
      }

      if (this._resizeTimeout) {
        window.clearTimeout(this._resizeTimeout);
      }
    }
  }
}
