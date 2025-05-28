import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { BreakpointObserverService } from '@client/app/core/services';
import { SharedImagotypeComponent } from '@client/app/shared/components/shared-imagotype/shared-imagotype.component';
import { SharedScrollNavigatorComponent } from '@client/app/shared/components/shared-scroll-navigator/shared-scroll-navigator.component';

@Component({
  selector: 'hero-section-mobile',
  standalone: true,
  imports: [SharedImagotypeComponent, SharedScrollNavigatorComponent],
  templateUrl: './hero-section-mobile.component.html',
  styleUrl: './hero-section-mobile.component.css',
})
export class HeroSectionMobileComponent implements OnInit {
  private readonly _breakpointObserverService: BreakpointObserverService =
    inject(BreakpointObserverService);
  private readonly _destroyRef: DestroyRef = inject(DestroyRef);

  private _isLandscape: boolean = false;

  ngOnInit(): void {
    // If the device is in landscape mode, we set the _isLandscape property to true
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
