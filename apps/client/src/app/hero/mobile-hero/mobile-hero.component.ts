import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { BreakpointObserverService } from '@client/app/shared/services/breakpoint-observer.service';
import { ImagotypeComponent } from '@client/app/shared/imagotype/imagotype.component';
import { ScrollNavigatorComponent } from '@client/app/shared/scroll-navigator/scroll-navigator.component';

@Component({
  selector: 'hero-mobile-hero',
  standalone: true,
  imports: [ImagotypeComponent, ScrollNavigatorComponent],
  templateUrl: './mobile-hero.component.html',
  styleUrl: './mobile-hero.component.css',
})
export class MobileHeroComponent implements OnInit {
  private readonly _breakpointObserverService: BreakpointObserverService =
    inject(BreakpointObserverService);
  private readonly _destroyRef: DestroyRef = inject(DestroyRef);

  private _isLandscape: boolean = false;

  ngOnInit(): void {
    this._breakpointObserverService
      .isLandscapeMode$()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((isLandscape) => {
        this._isLandscape = isLandscape;
      });
  }

  get getIsLandscape(): boolean {
    return this._isLandscape;
  }
}
