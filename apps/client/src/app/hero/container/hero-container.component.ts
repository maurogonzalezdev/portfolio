import { Component, inject } from '@angular/core';

import { Breakpoint } from '@client/app/shared/types';
import { BreakpointObserverService } from '@client/app/shared/services/breakpoint-observer.service';
import { HeroBackgroundComponent } from '@client/app/hero/hero-background/hero-background.component';
import { HeroImageComponent } from '@client/app/hero/hero-image/hero-image.component';

@Component({
  selector: 'hero-container',
  standalone: true,
  imports: [HeroImageComponent, HeroBackgroundComponent],
  templateUrl: './hero-container.component.html',
})
export class HeroContainerComponent {
  private readonly _breakpointObserverService: BreakpointObserverService =
    inject(BreakpointObserverService);

  private _breakpoint: Breakpoint = 'sm';

  constructor() {
    this._breakpointObserverService
      .getBreakpoint$()
      .subscribe((breakpoint: Breakpoint) => {
        this._breakpoint = breakpoint;
      });
  }

  get getBreakpoint(): Breakpoint {
    return this._breakpoint;
  }
}
