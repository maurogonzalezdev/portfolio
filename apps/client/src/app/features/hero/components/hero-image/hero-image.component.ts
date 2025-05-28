import { Component, inject, OnInit } from '@angular/core';

import { BreakpointObserverService } from '@client/app/core/services';

@Component({
  selector: 'hero-image',
  standalone: true,
  templateUrl: './hero-image.component.html',
  styleUrl: './hero-image.component.css',
})
export class HeroImageComponent implements OnInit {
  private readonly _breakpointObserverService: BreakpointObserverService =
    inject(BreakpointObserverService);

  private _isLandscape: boolean = false;

  ngOnInit(): void {
    // Subscribe to landscape mode changes
    this._breakpointObserverService
      .isLandscapeMode$()
      .subscribe((isLandscape: boolean) => {
        this._isLandscape = isLandscape;
      });
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
