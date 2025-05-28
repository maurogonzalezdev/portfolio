import { DOCUMENT, isPlatformServer } from '@angular/common';
import {
  inject,
  Injectable,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';

import { LoggingService } from '@client/app/core/services';
import { Theme } from '@client/app/features/theme/models/types';

import { BehaviorSubject, distinctUntilChanged, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeSwitcherService implements OnDestroy {
  private readonly _document: Document = inject(DOCUMENT);
  private readonly _platformId: Object = inject(PLATFORM_ID);
  private readonly _ngZone: NgZone = inject(NgZone);
  private readonly _loggingService: LoggingService = inject(LoggingService);
  private _theme$: BehaviorSubject<Theme> = new BehaviorSubject<Theme>('dark');

  private _isThemeLoaded: boolean = false;

  /**
   * This method retrieves the current theme from local storage.
   * @description Retrieves the current theme from local storage.
   * @returns {Theme} The current theme from local storage or 'dark' if not set.
   */
  private _getThemeFromLocalStorage(): Theme {
    return (localStorage.getItem('theme') as Theme) || 'dark';
  }
  /**
   * This method sets the theme based on the provided new theme.
   * @param {Theme} newTheme The new theme to set.
   * @param {HTMLMetaElement | Element} metaThemeColor The meta theme color element to update.
   * @param {Document} document The document object to manipulate.
   * @returns {void}
   * @description This method updates the meta theme color and toggles the 'purple' class on the document element based on the new theme.
   */
  private _setTheme(
    newTheme: Theme,
    metaThemeColor: HTMLMetaElement | Element,
    document: Document
  ): void {
    if (newTheme === 'dark') {
      metaThemeColor.setAttribute('content', '#191919');
      document.documentElement.classList.remove('purple');
      this._loggingService.log('info', 'Theme set to dark from service');
      return;
    }

    metaThemeColor.setAttribute('content', '#17161F');
    document.documentElement.classList.toggle('purple', true);
    this._loggingService.log('info', 'Theme set to purple from service');
    return;
  }

  public getTheme$(): Observable<Theme> {
    return this._theme$.asObservable().pipe(distinctUntilChanged());
  }
  // This method is called when app is loaded
  public initTheme(): void {
    if (!isPlatformServer(this._platformId)) {
      this._ngZone.runOutsideAngular(() => {
        this._loggingService.log('info', 'Initializing theme from service');
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
            this._loggingService.log(
              'info',
              'Loader removed from DOM from service'
            );
          }

          return;
        }
      });
    }
  }
  // Toggle the theme
  public toggleTheme(): void {
    this._loggingService.log('info', 'Toggling theme from service');
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
