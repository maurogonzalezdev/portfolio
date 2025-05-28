import { Component, inject, NgZone } from '@angular/core';

import { NavbarService } from '@client/app/features/navbar/services';

import { heroArrowUturnUp } from '@ng-icons/heroicons/outline';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'shared-back-to-top',
  standalone: true,
  imports: [NgIcon],
  providers: [provideIcons({ heroArrowUturnUp })],
  templateUrl: './shared-back-to-top.component.html',
  styleUrl: './shared-back-to-top.component.css',
})
export class SharedBackToTopComponent {
  private readonly _ngZone: NgZone = inject(NgZone);
  private readonly _navbarService: NavbarService = inject(NavbarService);

  // Navigate to the top of the page
  public backToTop(event: Event): void {
    this._ngZone.runOutsideAngular(() => {
      this._navbarService.navigateToFragment('/', event);
    });
  }
}
