import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Breakpoint } from '@client/app/shared/types';
import { BreakpointObserverService } from '@client/app/shared/services/breakpoint-observer.service';
import { DesktopNavbarComponent } from '@client/app/shared/desktop-navbar/desktop-navbar.component';
import { HeroContainerComponent } from '@client/app/hero/container/hero-container.component';
import { MobileNavbarComponent } from '@client/app/shared/mobile-navbar/mobile-navbar.component';

@Component({
  selector: 'shared-layout',
  standalone: true,
  imports: [
    HeroContainerComponent,
    DesktopNavbarComponent,
    MobileNavbarComponent,
  ],
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  private readonly _breakpointObserverService: BreakpointObserverService =
    inject(BreakpointObserverService);
  private readonly _destroyRef: DestroyRef = inject(DestroyRef);

  private _breakpoint: Breakpoint = 'sm';

  ngOnInit(): void {
    this._breakpointObserverService
      .getBreakpoint()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((breakpoint: Breakpoint) => {
        this._breakpoint = breakpoint;
      });
  }

  get breakpoint(): Breakpoint {
    return this._breakpoint;
  }
}
