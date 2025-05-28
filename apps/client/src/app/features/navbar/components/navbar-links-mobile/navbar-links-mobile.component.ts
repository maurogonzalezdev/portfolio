import { Component, inject } from '@angular/core';

import { NavbarService } from '@client/app/features/navbar/services';
import { NavbarLinkMobileComponent } from '@client/app/features/navbar/components/navbar-link-mobile/navbar-link-mobile.component';
import {
  NavLink,
  NavLinkItem,
} from '@client/app/features/navbar/models/interfaces';

@Component({
  selector: 'navbar-links-mobile',
  standalone: true,
  imports: [NavbarLinkMobileComponent],
  templateUrl: './navbar-links-mobile.component.html',
})
export class NavbarLinksMobileComponent {
  private readonly _navbarService: NavbarService = inject(NavbarService);

  // Method to get the navigation links on mobile
  get getNavLinks(): NavLink[] {
    return this._navbarService.getNavLinks.map((link: NavLinkItem) => {
      const k: string = Object.keys(link)[0];
      return link[k];
    });
  }
}
