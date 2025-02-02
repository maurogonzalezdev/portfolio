import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
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
  private _elem: any;
  public isFullScreen: boolean = false;

  constructor(@Inject(DOCUMENT) private readonly _document: any) {}

  ngOnInit(): void {
    this._elem = document.documentElement;
    this._chkScreenMode();
  }

  // TODO: Check how to get F11 or Enter - Exit fullscreen from Keyboard events
  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  fullscreenmodes(event: Event) {
    this._chkScreenMode();
  }

  private _chkScreenMode(): void {
    if (document.fullscreenElement) {
      //fullscreen
      this.isFullScreen = true;
    } else {
      //not in full screen
      this.isFullScreen = false;
    }
  }

  public openFullscreen(): void {
    if (this._elem.requestFullscreen) {
      this._elem.requestFullscreen();
    } else if (this._elem.mozRequestFullScreen) {
      /* Firefox */
      this._elem.mozRequestFullScreen();
    } else if (this._elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this._elem.webkitRequestFullscreen();
    } else if (this._elem.msRequestFullscreen) {
      /* IE/Edge */
      this._elem.msRequestFullscreen();
    }
  }
  /* Close fullscreen */
  public closeFullscreen(): void {
    if (this._document.exitFullscreen) {
      this._document.exitFullscreen();
    } else if (this._document.mozCancelFullScreen) {
      /* Firefox */
      this._document.mozCancelFullScreen();
    } else if (this._document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this._document.webkitExitFullscreen();
    } else if (this._document.msExitFullscreen) {
      /* IE/Edge */
      this._document.msExitFullscreen();
    }
  }

  public getIconName(): string{
    return this.isFullScreen ? 'heroArrowsPointingIn' : 'heroArrowsPointingOut'
  }
}
