import { Component } from '@angular/core';

import { ThemeSwitcherComponent } from '@client/app/shared/theme-switcher/theme-switcher.component';

@Component({
  selector: 'shared-desktop-theme-switcher',
  standalone: true,
  imports: [ThemeSwitcherComponent],
  templateUrl: './desktop-theme-switcher.component.html',
  styleUrl: './desktop-theme-switcher.component.css',
})
export class DesktopThemeSwitcherComponent {}
