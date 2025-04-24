import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';

import { Breakpoint } from '@client/app/shared/types';
import { Breakpoints } from '@client/app/shared/interfaces';

import { distinctUntilChanged, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreakpointObserverService {
  private readonly _breakpointObserver$: BreakpointObserver =
    inject(BreakpointObserver);

  private readonly _mediaQueries: Breakpoints = {
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
    xxl: `(min-width: ${process.env.PORTFOLIO_CLIENT_BREAKPOINT_XXL}px)`,
  };

  public getBreakpoint(): Observable<Breakpoint> {
    return this._breakpointObserver$
      .observe([
        this._mediaQueries.sm,
        this._mediaQueries.md,
        this._mediaQueries.lg,
        this._mediaQueries.xl,
        this._mediaQueries.xxl,
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
          return 'xxl';
        }),
        distinctUntilChanged()
      );
  }
}
