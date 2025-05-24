import { Component, inject, NgZone } from '@angular/core';

import { NavbarService } from '@client/app/shared/services/navbar.service';

import { heroArrowUturnUp } from '@ng-icons/heroicons/outline';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'shared-back-to-top',
  standalone: true,
  imports: [NgIcon],
  providers: [provideIcons({ heroArrowUturnUp })],
  templateUrl: './back-to-top.component.html',
  styleUrl: './back-to-top.component.css',
})
export class BackToTopComponent {
  private readonly _ngZone: NgZone = inject(NgZone);
  private readonly _navbarService: NavbarService = inject(NavbarService);

  public backToTop(event: Event): void {
    this._ngZone.runOutsideAngular(() => {
      this._navbarService.navigateToFragment('/', event);
    });
  }
}
