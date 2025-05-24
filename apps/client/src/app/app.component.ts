import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ThemeSwitcherService } from '@client/app/shared/services/theme-switcher.service';

@Component({
  imports: [RouterOutlet, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private readonly _themeSwitcherService: ThemeSwitcherService =
    inject(ThemeSwitcherService);

  ngOnInit(): void {
    // Initialize the theme when the app starts
    this._themeSwitcherService.initTheme();
  }
}
