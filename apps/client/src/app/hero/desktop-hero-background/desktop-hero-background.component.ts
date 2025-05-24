import { Component, inject, OnInit } from '@angular/core';

import { Breakpoint, Theme } from '@client/app/shared/types';
import { BreakpointObserverService } from '@client/app/shared/services/breakpoint-observer.service';
import { ThemeSwitcherService } from '@client/app/shared/services/theme-switcher.service';

@Component({
  selector: 'hero-desktop-background',
  standalone: true,
  templateUrl: './desktop-hero-background.component.html',
  styleUrl: './desktop-hero-background.component.css',
})
export class DesktopHeroBackgroundComponent implements OnInit {
  private readonly _breakpointObserverService: BreakpointObserverService =
    inject(BreakpointObserverService);
  private readonly _themeSwitcherService: ThemeSwitcherService =
    inject(ThemeSwitcherService);

  private _isDarkMode: boolean = true;
  private _isMobile: boolean = true;

  constructor() {
    this._themeSwitcherService.getTheme$().subscribe((theme: Theme) => {
      this._isDarkMode = theme === 'dark';
    });
  }
  ngOnInit(): void {
    this._breakpointObserverService
      .getBreakpoint$()
      .subscribe((breakpoint: Breakpoint) => {
        this._isMobile = breakpoint === 'sm';
      });
  }

  get getIsDarkMode(): boolean {
    return this._isDarkMode;
  }
  get getIsMobile(): boolean {
    return this._isMobile;
  }
}
