import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Breakpoint } from '@client/app/shared/types';
import { BreakpointObserverService } from '@client/app/shared/services/breakpoint-observer.service';
import { DesktopHeroBackgroundComponent } from '@client/app/hero/desktop-hero-background/desktop-hero-background.component';
import { HeroGradientComponent } from '@client/app/hero/hero-gradient/hero-gradient.component';
import { HeroImageComponent } from '@client/app/hero/hero-image/hero-image.component';
import { HeroNebulaComponent } from '@client/app/hero/hero-nebula/hero-nebula.component';
import { HeroPlanetsComponent } from '@client/app/hero/hero-planets/hero-planets.component';
import { MobileHeroBackgroundComponent } from '@client/app/hero/mobile-hero-background/mobile-hero-background.component';
import { ThemeSwitcherService } from '@client/app/shared/services/theme-switcher.service';

import { combineLatestWith } from 'rxjs';

@Component({
  selector: 'hero-container',
  standalone: true,
  imports: [
    HeroImageComponent,
    DesktopHeroBackgroundComponent,
    MobileHeroBackgroundComponent,
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

  private _breakpoint: Breakpoint = 'sm';
  private _isDarkMode: boolean = true;

  ngOnInit(): void {
    this._breakpointObserverService
      .getBreakpoint$()
      .pipe(
        takeUntilDestroyed(this._DestroyRef),
        combineLatestWith(this._themeSwitcherService.getTheme$())
      )
      .subscribe(([breakpoint, theme]) => {
        this._breakpoint = breakpoint;
        this._isDarkMode = theme === 'dark';
      });
  }

  ngAfterViewInit(): void {
    this._themeSwitcherService.removeLoader();
  }

  get getBreakpoint(): Breakpoint {
    return this._breakpoint;
  }
  get getIsDarkMode(): boolean {
    return this._isDarkMode;
  }
}
