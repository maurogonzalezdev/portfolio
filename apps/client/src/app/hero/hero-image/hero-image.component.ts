import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { BreakpointObserverService } from '@client/app/shared/services/breakpoint-observer.service';
import { Breakpoint } from '@client/app/shared/types';

@Component({
  selector: 'hero-image',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './hero-image.component.html',
  styleUrl: './hero-image.component.css',
})
export class HeroImageComponent implements OnInit {
  private readonly _breakpointObserverService: BreakpointObserverService =
    inject(BreakpointObserverService);

  private _isLandscape: boolean = false;
  private _breakpoint: Breakpoint = 'sm';

  ngOnInit(): void {
    this._breakpointObserverService
      .isLandscapeMode$()
      .subscribe((isPortrait: boolean) => {
        this._isLandscape = isPortrait;
      });
  }

  get getBreakpoint(): Breakpoint {
    return this._breakpoint;
  }

  public getLandscapeStyle() {
    if (this._isLandscape) {
      return {
        width: '300px !important',
        height: '288px !important',
      };
    }

    return;
  }
}
