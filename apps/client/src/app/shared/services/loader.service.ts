import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

import {
  BehaviorSubject,
  catchError,
  combineLatest,
  delay,
  from,
  map,
  Observable,
  of,
  switchMap,
  timeout,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _platformId: Object = inject(PLATFORM_ID);
  private readonly _document: Document = inject(DOCUMENT);

  private _isHeroImageLoaded$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private _isHeroBackgroundLoaded$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private _isFontLoaded$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private _font: string = 'Manrope';
  private _fontSize: string = '1rem';

  constructor() {
    this._loadFont();
  }

  public setHeroImageLoaded(isLoaded: boolean): void {
    this._isHeroImageLoaded$.next(isLoaded);
  }
  public setHeroBackgroundLoaded(isLoaded: boolean): void {
    this._isHeroBackgroundLoaded$.next(isLoaded);
  }

  private _loadFont(): void {
    if (isPlatformBrowser(this._platformId)) {
      // First attempt to load the font
      from(this._document.fonts.load(`${this._fontSize} "${this._font}"`))
        .pipe(
          timeout(5000), // Avoids waiting indefinitely
          // After trying to load, verify if it's actually available
          switchMap(() => {
            const isLoaded = this._document.fonts.check(
              `${this._fontSize} "${this._font}"`
            );
            return of(isLoaded);
          }),
          catchError((error) => {
            console.warn(`Error loading font: ${error}`);
            return of(false);
          })
        )
        .subscribe((isLoaded) => {
          this._isFontLoaded$.next(isLoaded);
        });
    } else {
      // For server-side rendering
      this._isFontLoaded$.next(true);
    }
  }

  get getIsHeroImageLoaded$() {
    return this._isHeroImageLoaded$.asObservable();
  }
  get getIsHeroBackgroundLoaded$() {
    return this._isHeroBackgroundLoaded$.asObservable();
  }
  get getIsFontLoaded$() {
    return this._isFontLoaded$.asObservable();
  }

  public isLoaderVisible$(): Observable<boolean> {
    return combineLatest([
      this.getIsHeroImageLoaded$,
      this.getIsHeroBackgroundLoaded$,
      this.getIsFontLoaded$,
    ]).pipe(
      delay(300),
      map(([isImageLoaded, isBackgroundLoaded, isFontLoaded]) => {
        return !(isImageLoaded && isBackgroundLoaded && isFontLoaded);
      })
    );
  }
  /**
   * Resets the loader state
   */
  public resetLoaderState(): void {
    this._isHeroImageLoaded$.next(false);
    this._isHeroBackgroundLoaded$.next(false);
    this._isFontLoaded$.next(false);
    this._loadFont(); // Retry loading the font
  }
  /**
   * Forces completion of all loads
   * Useful for testing
   */
  public forceLoadComplete(): void {
    this._isHeroImageLoaded$.next(true);
    this._isHeroBackgroundLoaded$.next(true);
    this._isFontLoaded$.next(true);
  }
}
