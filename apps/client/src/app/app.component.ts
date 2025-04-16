import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { LoaderComponent } from '@client/app/shared/loader/loader.component';

import { catchError, delay, filter, from, map, of } from 'rxjs';

@Component({
  imports: [RouterOutlet, LoaderComponent],
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    @if(isLoaderActive){
    <shared-loader></shared-loader>
    }
  `,
})
export class AppComponent implements OnInit {
  private readonly _destroyRef: DestroyRef = inject(DestroyRef);
  private readonly _document: Document = inject(DOCUMENT);
  private readonly _platformId: Object = inject(PLATFORM_ID);

  private _font: string = 'Manrope';
  private _fontSize: string = '1rem';
  private _isLoaderActive: boolean = true;

  ngOnInit(): void {
    this._isLoaderActive = true;
    // * Check if the custom font is loaded
    if (isPlatformBrowser(this._platformId)) {
      from(this._document.fonts.load(`${this._fontSize} "${this._font}"`))
        .pipe(
          takeUntilDestroyed(this._destroyRef),
          delay(400),
          map(() =>
            this._document.fonts.check(`${this._fontSize} "${this._font}"`)
          ),
          filter(Boolean),
          catchError((error: any) => {
            console.error('Error loading font:', error);
            return of(false);
          })
        )
        .subscribe(() => {
          this._isLoaderActive = false;
        });
    }
  }

  get isLoaderActive(): boolean {
    return this._isLoaderActive;
  }
}
