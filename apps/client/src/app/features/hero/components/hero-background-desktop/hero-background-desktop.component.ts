import { Component, inject, OnInit } from '@angular/core';

import { Breakpoint } from '@client/app/core/models/types';
import {
  BreakpointObserverService,
  LoggingService,
} from '@client/app/core/services';
import { Theme } from '@client/app/features/theme/models/types';
import { ThemeSwitcherService } from '@client/app/features/theme/services';

@Component({
  selector: 'hero-background-desktop',
  standalone: true,
  templateUrl: './hero-background-desktop.component.html',
  styleUrl: './hero-background-desktop.component.css',
})
export class HeroBackgroundDesktopComponent implements OnInit {
  private readonly _breakpointObserverService: BreakpointObserverService =
    inject(BreakpointObserverService);
  private readonly _loggingService: LoggingService = inject(LoggingService);
  private readonly _themeSwitcherService: ThemeSwitcherService =
    inject(ThemeSwitcherService);

  private _isDarkMode: boolean = true;
  private _isMobile: boolean = true;

  constructor() {
    // Subscribe to the theme changes
    this._themeSwitcherService.getTheme$().subscribe((theme: Theme) => {
      this._isDarkMode = theme === 'dark';
      this._loggingService.log(
        'info',
        `Theme changed to: ${theme} in HeroBackgroundDesktopComponent`
      );
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
