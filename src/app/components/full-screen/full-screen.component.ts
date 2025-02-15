import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
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
  private _element: any;
  private _isFullScreen: boolean = false;

  constructor(@Inject(DOCUMENT) private readonly _document: any) {}

  ngOnInit(): void {
    this._element = document.documentElement;
    this._checkScreenMode();
  }

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  fullscreenmodes(event: Event) {
    setTimeout(() => {
      this._checkScreenMode();
    }, 100);
  }

  @HostListener('document:keydown', ['$event'])
  private async _handleKeyboardEvent(event: KeyboardEvent) {
    if (!event.isTrusted) return;

    if (event.key === 'F11') {
      event.preventDefault();
      await this.toggleFullScreen();
    }

    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault();
      await this.toggleFullScreen();
    }
  }

  // Añadir al componente
  @HostListener('document:fullscreenerror', ['$event'])
  private _handleFullscreenError(event: Event): void {
    console.info('Fullscreen request was denied by the browser or user');
    this._isFullScreen = false;
  }

  get getIsFullScreen(): boolean {
    return this._isFullScreen;
  }

  private _canRequestFullscreen(): boolean {
    return (
      document.documentElement.requestFullscreen !== undefined &&
      !document.fullscreenElement
    );
  }

  private _checkScreenMode(): void {
    // Mejorar la detección cross-browser
    this._isFullScreen = Boolean(document.fullscreenElement);
  }

  private async _openFullscreen(): Promise<void> {
    // Verificar si ya estamos en pantalla completa
    if (document.fullscreenElement) {
      return;
    }

    try {
      // Verificar si el navegador soporta la API de pantalla completa
      if (!this._element.requestFullscreen) {
        throw new Error('Fullscreen API not supported');
      }

      await this._element.requestFullscreen();
    } catch (err) {
      if (err instanceof Error) {
        // Solo logear errores que no sean por falta de interacción del usuario
        if (!err.message.includes('user gesture')) {
          console.warn('Fullscreen error:', err.message);
        }
      }
    }
  }

  private async _closeFullscreen(): Promise<void> {
    // Verificar si realmente estamos en pantalla completa
    if (!document.fullscreenElement) {
      return;
    }

    try {
      await this._document.exitFullscreen();
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

  public getIconName(): string {
    return this._isFullScreen
      ? 'heroArrowsPointingIn'
      : 'heroArrowsPointingOut';
  }
}
