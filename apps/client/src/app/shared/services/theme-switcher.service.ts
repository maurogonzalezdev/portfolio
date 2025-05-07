import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Theme } from '@client/app/shared/types';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeSwitcherService {
  private readonly _platformId: Object = inject(PLATFORM_ID);

  private _theme$: BehaviorSubject<Theme> = new BehaviorSubject<Theme>('dark');

  constructor() {
    if (isPlatformBrowser(this._platformId)) {
      // Init theme on client side
      this._initTheme();
    }
  }

  private _initTheme(): void {
    const savedTheme: Theme = localStorage.getItem('theme') as Theme;

    this._theme$.next(savedTheme);
  }
  private _applyTheme(theme: Theme): void {
    const metaTag = document.querySelector('meta[name="theme-color"]');

    if (theme === 'purple') {
      if (metaTag) {
        metaTag.setAttribute('content', '#17161f');
      }

      document.documentElement.classList.remove('dark');
    } else {
      if (metaTag) {
        metaTag.setAttribute('content', '#191919');
      }

      document.documentElement.classList.toggle('dark', true);
    }

    localStorage.setItem('theme', theme);
    this._theme$.next(theme);
    return;
  }
  public getTheme$(): Observable<Theme> {
    return this._theme$.asObservable();
  }
  public toggleTheme(): void {
    const currentTheme: Theme = this._theme$.getValue();
    const newTheme: Theme = currentTheme === 'dark' ? 'purple' : 'dark';
    this._applyTheme(newTheme);
  }
}
