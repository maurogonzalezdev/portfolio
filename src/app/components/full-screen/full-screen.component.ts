import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroArrowsPointingIn,
  heroArrowsPointingOut,
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-full-screen',
  imports: [NgIcon],
  providers: [
    provideIcons({
      heroArrowsPointingOut,
      heroArrowsPointingIn,
    }),
  ],
  templateUrl: './full-screen.component.html',
  styles: ``,
})
export class FullScreenComponent implements OnInit {
  private readonly FULLSCREEN_DELAY = 100;
  private _element!: HTMLElement;
  private _isFullScreen = false;

  constructor(
    @Inject(DOCUMENT) private readonly _document: Document,
    @Inject(PLATFORM_ID) private readonly _platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      this._element = this._document.documentElement;
      this._checkScreenMode();
    }
  }

  // #region Fullscreen Listeners
  @HostListener('document:fullscreenchange')
  @HostListener('document:webkitfullscreenchange')
  @HostListener('document:mozfullscreenchange')
  @HostListener('document:MSFullscreenChange')
  private _handleFullscreenChange(): void {
    setTimeout(() => {
      this._checkScreenMode();
    }, this.FULLSCREEN_DELAY);
  }

  @HostListener('document:keydown', ['$event'])
  private async _handleKeyboardEvent(event: KeyboardEvent): Promise<void> {
    if (!event.isTrusted) return;

    const isFullscreenToggle =
      event.key === 'F11' ||
      ((event.metaKey || event.ctrlKey) && event.key === 'Enter');

    if (isFullscreenToggle) {
      event.preventDefault();
      await this.toggleFullScreen();
    }
  }

  @HostListener('document:fullscreenerror')
  private _handleFullscreenError(): void {
    console.info('Fullscreen request was denied by the browser or user');
    this._isFullScreen = false;
  }
  // #endregion

  get getIsFullScreen(): boolean {
    return this._isFullScreen;
  }

  // #region Fullscreen Behavior Functions
  private _checkScreenMode(): void {
    const fullscreenElement = this._document.fullscreenElement;

    this._isFullScreen = Boolean(fullscreenElement);
  }

  private async _openFullscreen(): Promise<void> {
    if (this._document.fullscreenElement) return;

    try {
      const requestFullscreen = this._element.requestFullscreen?.bind(
        this._element
      );

      if (!requestFullscreen) {
        // * Unsupported browser
        throw new Error('Fullscreen API not supported');
      }

      await requestFullscreen();
    } catch (err) {
      if (err instanceof Error && !err.message.includes('user gesture')) {
        console.warn('Fullscreen error:', err.message);
      }
    }
  }

  // * Close fullscreen mode
  private async _closeFullscreen(): Promise<void> {
    if (!this._document.fullscreenElement) return;

    try {
      const exitFullscreen = this._document.exitFullscreen?.bind(
        this._document
      );

      if (!exitFullscreen) {
        throw new Error('Fullscreen API not supported');
      }

      await exitFullscreen();
    } catch (err) {
      if (err instanceof Error) {
        console.warn('Exit fullscreen error:', err.message);
      }
    }
  }

  public async toggleFullScreen(): Promise<void> {
    try {
      if (this._isFullScreen) {
        await this._closeFullscreen();
      } else {
        await this._openFullscreen();
      }
    } catch (err) {
      console.warn('Toggle fullscreen failed:', err);
    }
  }
  // #endregion

  public getIconName(): string {
    return this._isFullScreen
      ? 'heroArrowsPointingIn'
      : 'heroArrowsPointingOut';
  }
}
