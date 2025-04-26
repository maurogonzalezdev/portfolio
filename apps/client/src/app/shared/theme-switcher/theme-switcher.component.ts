import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ThemeSwitcherService } from '@client/app/shared/services/theme-switcher.service';

@Component({
  selector: 'shared-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.css',
})
export class ThemeSwitcherComponent {
  private readonly _themeSwitcherService: ThemeSwitcherService =
    inject(ThemeSwitcherService);

  public toggleTheme(): void {
    this._themeSwitcherService.toggleTheme();
  }
}
