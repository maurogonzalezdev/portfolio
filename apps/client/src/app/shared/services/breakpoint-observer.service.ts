import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

import { Breakpoint } from '@client/app/shared/types';
import { Breakpoints } from '@client/app/shared/interfaces';

import { distinctUntilChanged, map, Observable, of, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreakpointObserverService {
  private readonly _breakpointObserver$: BreakpointObserver =
    inject(BreakpointObserver);
  private readonly _document: Document = inject(DOCUMENT);
  private readonly _platformId: Object = inject(PLATFORM_ID);

  private _mediaQueries: Breakpoints = {
    sm: `(max-width: ${
      Number(process.env.PORTFOLIO_CLIENT_BREAKPOINT_MD) - 1
    }px)`,
    md: `(min-width: ${
      process.env.PORTFOLIO_CLIENT_BREAKPOINT_MD
    }px) and (max-width: ${
      Number(process.env.PORTFOLIO_CLIENT_BREAKPOINT_LG) - 1
    }px)`,
    lg: `(min-width: ${
      process.env.PORTFOLIO_CLIENT_BREAKPOINT_LG
    }px) and (max-width: ${
      Number(process.env.PORTFOLIO_CLIENT_BREAKPOINT_XL) - 1
    }px)`,
    xl: `(min-width: ${
      process.env.PORTFOLIO_CLIENT_BREAKPOINT_XL
    }px) and (max-width: ${
      Number(process.env.PORTFOLIO_CLIENT_BREAKPOINT_XXL) - 1
    }px)`,
    xxl: `(min-width: ${
      process.env.PORTFOLIO_CLIENT_BREAKPOINT_XXL
    }px) and (max-width: ${
      Number(process.env.PORTFOLIO_CLIENT_BREAKPOINT_2K) - 1
    }px)`,
    twoK: `(min-width: ${
      process.env.PORTFOLIO_CLIENT_BREAKPOINT_2K
    }px) and (max-width: ${
      Number(process.env.PORTFOLIO_CLIENT_BREAKPOINT_4K) - 1
    }px)`,
    fourK: `(min-width: ${process.env.PORTFOLIO_CLIENT_BREAKPOINT_4K}px)`,
  };
  private _landscapeMediaQuery: string = `(orientation: landscape) and (max-height: ${process.env.PORTFOLIO_CLIENT_BREAKPOINT_LANDSCAPE}px)`;
  private _SmallScreenQuery: string = `(max-height: ${process.env.PORTFOLIO_CLIENT_BREAKPOINT_SMALL_SCREEN}px)`;

  public getBreakpoint$(): Observable<Breakpoint> {
    return this._breakpointObserver$
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
  public isLandscapeMode$(): Observable<boolean> {
    if (isPlatformBrowser(this._platformId)) {
      const initialMatch: boolean = this._document.defaultView!.matchMedia(
        this._landscapeMediaQuery
      ).matches;

      return this._breakpointObserver$
        .observe([this._landscapeMediaQuery])
        .pipe(
          map((state: BreakpointState) => state.matches),
          startWith(initialMatch),
          distinctUntilChanged()
        );
    }

    return of(false);
  }
  public isSmallScreen$(): Observable<boolean> {
    if (isPlatformBrowser(this._platformId)) {
      const initialMatch: boolean = this._document.defaultView!.matchMedia(
        this._SmallScreenQuery
      ).matches;

      return this._breakpointObserver$.observe([this._SmallScreenQuery]).pipe(
        map((state: BreakpointState) => state.matches),
        startWith(initialMatch),
        distinctUntilChanged()
      );
    }

    return of(false);
  }
}
