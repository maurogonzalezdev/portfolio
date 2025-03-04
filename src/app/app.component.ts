import { Component, PLATFORM_ID } from '@angular/core';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { IsMobileService } from './services/is-mobile.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [MainLayoutComponent],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'portfolio';
  constructor(private _isMobileService: IsMobileService) {
    if (isPlatformBrowser(PLATFORM_ID)) {
      this._isMobileService.updateMobileStatus();
    }
  }
}
