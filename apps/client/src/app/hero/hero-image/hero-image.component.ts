import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  PLATFORM_ID,
  ViewChild,
  inject,
  OnInit,
  ElementRef,
} from '@angular/core';

import { BreakpointObserverService } from '@client/app/shared/services/breakpoint-observer.service';
import { LoaderService } from '@client/app/shared/services/loader.service';

@Component({
  selector: 'hero-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-image.component.html',
  styleUrl: './hero-image.component.css',
})
export class HeroImageComponent implements OnInit {
  @ViewChild('heroImage', { static: true })
  private _heroImage?: ElementRef<HTMLDivElement>;

  private readonly _loaderService: LoaderService = inject(LoaderService);
  private readonly _isBrowser: boolean = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly _breakpointObserverService: BreakpointObserverService =
    inject(BreakpointObserverService);

  private readonly _imageUrls: string[] = [
    '/images/hero-640w.webp',
    '/images/hero-768w.webp',
    '/images/hero-1024w.webp',
    '/images/hero-1280w.webp',
    '/images/hero-1536w.webp',
  ];
  private _loadedImagesCount = 0;
  private _isLandscape: boolean = false;

  ngOnInit(): void {
    this._loaderService.setHeroImageLoaded(false);

    this._breakpointObserverService
      .isLandscapeMode$()
      .subscribe((isPortrait: boolean) => {
        this._isLandscape = isPortrait;
      });

    if (this._isBrowser) {
      this._preloadAllImages();
    }
  }

  private _preloadAllImages(): void {
    this._imageUrls.forEach((url) => {
      const img = new Image();

      img.onload = () => {
        this._loadedImagesCount++;

        if (this._loadedImagesCount === this._imageUrls.length) {
          this._loaderService.setHeroImageLoaded(true);
        }
      };

      img.onerror = () => {
        console.warn(`Failed to preload image: ${url}`);
        this._loadedImagesCount++;

        if (this._loadedImagesCount === this._imageUrls.length) {
          this._loaderService.setHeroImageLoaded(true);
        }
      };

      img.src = url;
    });
  }

  public getLandscapeStyle() {
    if (this._isLandscape) {
      return {
        width: '300px',
        height: '288px',
      };
    }

    return;
  }
}
