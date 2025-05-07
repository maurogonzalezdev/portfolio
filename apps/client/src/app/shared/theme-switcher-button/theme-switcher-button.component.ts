import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';

import { ThemeButton } from '@client/app/shared/interfaces';
import { ThemeDarkIconComponent } from '@client/app/shared/theme-dark-icon/theme-dark-icon.component';
import { ThemePurpleIconComponent } from '@client/app/shared/theme-purple-icon/theme-purple-icon.component';
import { ThemeSwitcherService } from '@client/app/shared/services/theme-switcher.service';

@Component({
  selector: 'shared-theme-switcher-button',
  standalone: true,
  imports: [CommonModule, ThemeDarkIconComponent, ThemePurpleIconComponent],
  templateUrl: './theme-switcher-button.component.html',
})
export class ThemeSwitcherButtonComponent {
  @Input({ required: true })
  set setThemeButton(themeButton: ThemeButton) {
    if (!themeButton) return;

    this._themeButton = themeButton;
    return;
  }

  private readonly _themeSwitcherService: ThemeSwitcherService =
    inject(ThemeSwitcherService);

  private _themeButton: ThemeButton = {
    id: 0,
    name: 'dark',
    colorPrimary: '',
    colorSecondary: '',
    isActive: true,
  };

  get getThemeButton(): ThemeButton {
    return this._themeButton;
  }

  public getButtonStyle() {
    return {
      backgroundColor: this._themeButton.colorPrimary,
    };
  }
  public toggleTheme(): void {
    this._themeSwitcherService.toggleTheme();
  }
}
