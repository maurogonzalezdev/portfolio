import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Breakpoint } from '@client/app/core/models/types';
import {
  BreakpointObserverService,
  LoggingService,
} from '@client/app/core/services';
import { HeroBackgroundDesktopComponent } from '@client/app/features/hero/components/hero-background-desktop/hero-background-desktop.component';
import { HeroBackgroundMobileComponent } from '@client/app/features/hero/components/hero-background-mobile/hero-background-mobile.component';
import { HeroGradientComponent } from '@client/app/features/hero/components/hero-gradient/hero-gradient.component';
import { HeroImageComponent } from '@client/app/features/hero/components/hero-image/hero-image.component';
import { HeroNebulaComponent } from '@client/app/features/hero/components/hero-nebula/hero-nebula.component';
import { HeroPlanetsComponent } from '@client/app/features/hero/components/hero-planets/hero-planets.component';
import { ThemeSwitcherService } from '@client/app/features/theme/services';

import { combineLatestWith } from 'rxjs';

@Component({
  selector: 'hero-container',
  standalone: true,
  imports: [
    HeroImageComponent,
    HeroBackgroundDesktopComponent,
    HeroBackgroundMobileComponent,
    HeroGradientComponent,
    HeroNebulaComponent,
    HeroPlanetsComponent,
  ],
  templateUrl: './hero-container.component.html',
})
export class HeroContainerComponent implements OnInit, AfterViewInit {
  private readonly _breakpointObserverService: BreakpointObserverService =
    inject(BreakpointObserverService);
  private readonly _themeSwitcherService: ThemeSwitcherService =
    inject(ThemeSwitcherService);
  private readonly _DestroyRef: DestroyRef = inject(DestroyRef);
  private readonly _loggingService: LoggingService = inject(LoggingService);

  private _breakpoint: Breakpoint = 'sm';
  private _isDarkMode: boolean = true;

  ngOnInit(): void {
    // Initialize the theme switcher service
    this._breakpointObserverService
      .getBreakpoint$()
      .pipe(
        takeUntilDestroyed(this._DestroyRef),
        combineLatestWith(this._themeSwitcherService.getTheme$())
      )
      .subscribe(([breakpoint, theme]) => {
        this._breakpoint = breakpoint;
        this._isDarkMode = theme === 'dark';
        this._loggingService.log(
          'info',
          `Breakpoint changed to: ${this._breakpoint}, Dark mode: ${this._isDarkMode}`
        );
      });
  }

  ngAfterViewInit(): void {
    this._themeSwitcherService.removeLoader();
    this._loggingService.log(
      'info',
      'Loader removed in HeroContainerComponent'
    );
  }

  get getBreakpoint(): Breakpoint {
    return this._breakpoint;
  }
  get getIsDarkMode(): boolean {
    return this._isDarkMode;
  }
}
