import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

import { Breakpoint } from '@client/app/core/models/types';
import { Breakpoints } from '@client/app/core/models/interfaces';

import { distinctUntilChanged, map, Observable, of, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreakpointObserverService {
  private readonly _breakpointObserver: BreakpointObserver =
    inject(BreakpointObserver);
  private readonly _document: Document = inject(DOCUMENT);
  private readonly _platformId: Object = inject(PLATFORM_ID);

  // Define media queries for different breakpoints
  private _mediaQueries: Breakpoints = {
    sm: '(max-width: 767px)',
    md: '(min-width: 768px) and (max-width: 1023px)',
    lg: '(min-width: 1024px) and (max-width: 1279px)',
    xl: '(min-width: 1280px) and (max-width: 1535px)',
    xxl: '(min-width: 1536px) and (max-width: 2047px)',
    twoK: '(min-width: 2048px) and (max-width: 3839px)',
    fourK: '(min-width: 3840px)',
  };
  private _landscapeMediaQuery: string =
    '(orientation: landscape) and (max-height: 500px)';
  private _smallScreenQuery: string = '(max-height: 800px)';

  /**
   * Gets the current breakpoint based on the screen size.
   * @returns {Observable<Breakpoint>} An observable that emits the current breakpoint.
   * @description This method uses the BreakpointObserver to observe changes in screen size and emits the current breakpoint as an observable.
   */
  public getBreakpoint$(): Observable<Breakpoint> {
    return this._breakpointObserver
      .observe([
        this._mediaQueries.sm,
        this._mediaQueries.md,
        this._mediaQueries.lg,
        this._mediaQueries.xl,
        this._mediaQueries.xxl,
        this._mediaQueries.twoK,
        this._mediaQueries.fourK,
      ])
      .pipe(
        map((state: BreakpointState) => {
          if (state.breakpoints[this._mediaQueries.sm]) {
            return 'sm';
          }
          if (state.breakpoints[this._mediaQueries.md]) {
            return 'md';
          }
          if (state.breakpoints[this._mediaQueries.lg]) {
            return 'lg';
          }
          if (state.breakpoints[this._mediaQueries.xl]) {
            return 'xl';
          }
          if (state.breakpoints[this._mediaQueries.xxl]) {
            return 'xxl';
          }
          if (state.breakpoints[this._mediaQueries.twoK]) {
            return '2K';
          } else return '4K';
        }),
        distinctUntilChanged()
      );
  }
  /**
   * Checks if the device is in landscape mode.
   * @returns {Observable<boolean>} An observable that emits true if the device is in landscape mode, false otherwise.
   * @description This method uses the BreakpointObserver to check if the device is in landscape mode by observing the media query for landscape orientation.
   */
  public isLandscapeMode$(): Observable<boolean> {
    if (isPlatformBrowser(this._platformId)) {
      const initialMatch: boolean = this._document.defaultView!.matchMedia(
        this._landscapeMediaQuery
      ).matches;

      return this._breakpointObserver.observe([this._landscapeMediaQuery]).pipe(
        map((state: BreakpointState) => state.matches),
        startWith(initialMatch),
        distinctUntilChanged()
      );
    }

    return of(false);
  }
  /**
   * Checks if the device is a small screen.
   * @returns {Observable<boolean>} An observable that emits true if the device is a small screen, false otherwise.
   * @description This method uses the BreakpointObserver to check if the device is a small screen by observing the media query for small screens.
   */
  public isSmallScreen$(): Observable<boolean> {
    if (isPlatformBrowser(this._platformId)) {
      const initialMatch: boolean = this._document.defaultView!.matchMedia(
        this._smallScreenQuery
      ).matches;

      return this._breakpointObserver.observe([this._smallScreenQuery]).pipe(
        map((state: BreakpointState) => state.matches),
        startWith(initialMatch),
        distinctUntilChanged()
      );
    }

    return of(false);
  }
}
