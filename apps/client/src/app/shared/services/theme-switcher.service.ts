import { DOCUMENT, isPlatformServer } from '@angular/common';
import {
  inject,
  Injectable,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';

import { Theme } from '@client/app/shared/types';
import { BehaviorSubject, distinctUntilChanged, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeSwitcherService implements OnDestroy {
  private readonly _document: Document = inject(DOCUMENT);
  private readonly _platformId: Object = inject(PLATFORM_ID);
  private readonly _ngZone: NgZone = inject(NgZone);
  private _theme$: BehaviorSubject<Theme> = new BehaviorSubject<Theme>('dark');

  private _isThemeLoaded: boolean = false;

  private _getThemeFromLocalStorage(): Theme {
    return (localStorage.getItem('theme') as Theme) || 'dark';
  }
  private _setTheme(
    newTheme: Theme,
    metaThemeColor: HTMLMetaElement | Element,
    document: Document
  ): void {
    if (newTheme === 'dark') {
      metaThemeColor.setAttribute('content', '#191919');
      document.documentElement.classList.remove('purple');
      return;
    }

    metaThemeColor.setAttribute('content', '#17161F');
    document.documentElement.classList.toggle('purple', true);
    return;
  }

  public getTheme$(): Observable<Theme> {
    return this._theme$.asObservable().pipe(distinctUntilChanged());
  }
  // This method is called when app is loaded
  public initTheme(): void {
    if (!isPlatformServer(this._platformId)) {
      this._ngZone.runOutsideAngular(() => {
        this._theme$.next(this._getThemeFromLocalStorage());
      });
    }
  }
  // Removes the loader from the DOM only if the theme is not loaded
  public removeLoader(): void {
    if (!isPlatformServer(this._platformId)) {
      this._ngZone.runOutsideAngular(() => {
        if (!this._isThemeLoaded) {
          const loader = this._document.getElementById('loader');
          if (loader) {
            loader.remove();

            this._isThemeLoaded = true;
          }

          return;
        }
      });
    }
  }
  // Toggle the theme
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

  ngOnDestroy(): void {
    this._isThemeLoaded = false;
  }
}
