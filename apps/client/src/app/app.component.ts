import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { LoaderComponent } from '@client/app/shared/loader/loader.component';
import { LoaderService } from '@client/app/shared/services/loader.service';

@Component({
  imports: [RouterOutlet, LoaderComponent, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private readonly _destroyRef: DestroyRef = inject(DestroyRef);
  private readonly _loaderService: LoaderService = inject(LoaderService);

  private _isLoaderVisible: boolean = true;

  ngOnInit(): void {
    this._loaderService
      .isLoaderVisible$()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((isVisible: boolean) => {
        this._isLoaderVisible = isVisible;
      });
  }

  get isLoaderVisible(): boolean {
    return this._isLoaderVisible;
  }
}
