import { Component, DestroyRef, inject, PLATFORM_ID } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Theme } from '@client/app/features/theme/models/types';
import {
  ThemeButton,
  ThemeButtonItem,
} from '@client/app/features/theme/models/interfaces';
import { ThemeSwitcherButtonComponent } from '@client/app/features/theme/components/theme-switcher-button/theme-switcher-button.component';
import { ThemeSwitcherService } from '@client/app/features/theme/services';

@Component({
  selector: 'shared-theme-switcher',
  standalone: true,
  imports: [ThemeSwitcherButtonComponent],
  templateUrl: './theme-switcher.component.html',
})
export class ThemeSwitcherComponent {
  private readonly _themeSwitcherService: ThemeSwitcherService =
    inject(ThemeSwitcherService);
  private readonly _destroyRef: DestroyRef = inject(DestroyRef);

  // This array contains the theme buttons with their properties.
  private _themeButtons: ThemeButtonItem[] = [
    {
      dark: {
        id: 1,
        name: 'dark',
        colorPrimary: 'rgba(43, 43, 43, 1)',
        colorSecondary: 'rgba(31, 31, 31, 1)',
        isActive: true,
      },
    },
    {
      purple: {
        id: 2,
        name: 'purple',
        colorPrimary: 'rgba(57, 45, 75, 1)',
        colorSecondary: 'rgba(31, 26, 38, 1)',
        isActive: false,
      },
    },
  ];

  constructor() {
    // Subscribe to the theme changes from the ThemeSwitcherService.
    this._themeSwitcherService
      .getTheme$()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((theme: Theme) => {
        if (theme === 'dark') {
          this._themeButtons[0]['dark'].isActive = true;
          this._themeButtons[1]['purple'].isActive = false;
          return;
        }

        this._themeButtons[0]['dark'].isActive = false;
        this._themeButtons[1]['purple'].isActive = true;

        return;
      });
  }

  /**
   * This method retrieves the theme buttons.
   * @returns {ThemeButton[]} An array of ThemeButton objects.
   * @description Retrieves the theme buttons from the private _themeButtons array.
   */
  get getThemeButtons(): ThemeButton[] {
    return this._themeButtons.map((item: ThemeButtonItem) => {
      const key: string = Object.keys(item)[0];
      return item[key];
    });
  }

  public toggleTheme(): void {
    this._themeSwitcherService.toggleTheme();
  }
}
