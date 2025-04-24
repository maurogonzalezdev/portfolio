import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { MobileNavbarLinkComponent } from '@client/app/shared/mobile-navbar-link/mobile-navbar-link.component';
import { NavbarService } from '@client/app/shared/services/navbar.service';
import { NavLink, NavLinkItem } from '@client/app/shared/interfaces';

@Component({
  selector: 'shared-mobile-navbar-links',
  standalone: true,
  imports: [CommonModule, MobileNavbarLinkComponent],
  templateUrl: './mobile-navbar-links.component.html',
})
export class MobileNavbarLinksComponent {
  private readonly _navbarService: NavbarService = inject(NavbarService);

  get navLinks(): NavLink[] {
    return this._navbarService.navLinks.map((link: NavLinkItem) => {
      const k: string = Object.keys(link)[0];
      return link[k];
    });
  }
}
