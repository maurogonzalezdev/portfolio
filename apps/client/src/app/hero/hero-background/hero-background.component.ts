import {
  AfterViewInit,
  Component,
  PLATFORM_ID,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { LoaderService } from '@client/app/shared/services/loader.service';
import { ThemeSwitcherService } from '@client/app/shared/services/theme-switcher.service';
import { Theme } from '@client/app/shared/types';

@Component({
  selector: 'hero-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-background.component.html',
  styleUrl: './hero-background.component.css',
})
export class HeroBackgroundComponent implements OnInit, AfterViewInit {
  @ViewChild('backgroundDiv', { static: true })
  private _backgroundDiv?: HTMLDivElement;

  private readonly _loaderService: LoaderService = inject(LoaderService);
  private readonly _isBrowser: boolean = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly _themeSwitcherService: ThemeSwitcherService =
    inject(ThemeSwitcherService);

  private _isDarkMode: boolean = false;
  private readonly _imageUrls: string[] = [
    '/images/starfield-640w.webp',
    '/images/starfield-768w.webp',
    '/images/starfield-1024w.webp',
    '/images/starfield-1280w.webp',
    '/images/starfield-1536w.webp',
  ];
  private _loadedImagesCount = 0;

  ngOnInit(): void {
    if (this._isBrowser) {
      this._preloadAllImages();
    }

    this._themeSwitcherService.getTheme$().subscribe((theme: Theme) => {
      if (theme === 'dark') {
        this._isDarkMode = true;
      }
      if (theme === 'purple') {
        this._isDarkMode = false;
      }
    });
  }

  ngAfterViewInit(): void {
    if (this._backgroundDiv) {
      if (
        !this._isBrowser ||
        this._loadedImagesCount === this._imageUrls.length
      ) {
        this._loaderService.setHeroBackgroundLoaded(true);
      }
    } else {
      console.error('Background div not found!');
    }
  }

  private _preloadAllImages(): void {
    this._imageUrls.forEach((url) => {
      const img = new Image();

      img.onload = () => {
        this._loadedImagesCount++;

        if (this._loadedImagesCount === this._imageUrls.length) {
          this._loaderService.setHeroBackgroundLoaded(true);
        }
      };

      img.onerror = () => {
        console.warn(`Failed to preload image: ${url}`);
        this._loadedImagesCount++;

        if (this._loadedImagesCount === this._imageUrls.length) {
          this._loaderService.setHeroBackgroundLoaded(true);
        }
      };

      img.src = url;
    });
  }

  get getIsDarkMode(): boolean {
    return this._isDarkMode;
  }
}
