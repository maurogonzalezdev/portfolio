import { DOCUMENT, isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

import { Theme } from '@client/app/shared/types';
import { BehaviorSubject, distinctUntilChanged, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeSwitcherService {
  private readonly _document: Document = inject(DOCUMENT);
  private readonly _platformId: Object = inject(PLATFORM_ID);

  private _theme$: BehaviorSubject<Theme> = new BehaviorSubject<Theme>('dark');

  constructor() {
    if (!isPlatformServer(this._platformId)) {
      this._theme$.next(this._getThemeFromLocalStorage());
      const loader = this._document.getElementById('loader');
      loader!.remove();
    }
  }

  public getTheme$(): Observable<Theme> {
    return this._theme$.asObservable().pipe(distinctUntilChanged());
  }

  private _getThemeFromLocalStorage(): Theme {
    return localStorage.getItem('theme') as Theme;
  }

  private _setTheme(
    newTheme: Theme,
    metaThemeColor: HTMLMetaElement | Element,
    document: Document
  ): void {
    if (newTheme === 'dark' || newTheme !== 'purple') {
      metaThemeColor.setAttribute('content', '#191919');
      document.documentElement.classList.remove('purple');
      return;
    }

    metaThemeColor.setAttribute('content', '#17161F');
    document.documentElement.classList.toggle('purple', true);
    return;
  }

  public toggleTheme(): void {
    const metaThemeColor = this._document.querySelector(
      'meta[name="theme-color"]'
    );

    const newTheme: Theme =
      this._getThemeFromLocalStorage() === 'dark' ? 'purple' : 'dark';

    this._theme$.next(newTheme);

    if (metaThemeColor) {
      this._setTheme(newTheme, metaThemeColor, this._document);
    }

    localStorage.setItem('theme', newTheme);
  }
}
