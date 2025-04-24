import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavbarService } from '@client/app/shared/services/navbar.service';
import { NavLink } from '@client/app/shared/interfaces';

@Component({
  selector: 'shared-mobile-navbar-link',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mobile-navbar-link.component.html',
})
export class MobileNavbarLinkComponent {
  private readonly _viewportScroller = inject(ViewportScroller);
  private readonly _navbarService: NavbarService = inject(NavbarService);

  @Input({ required: true })
  set link(link: NavLink) {
    if (!link) return;

    this._link = link;
    return;
  }
  private _link: NavLink = {
    id: 0,
    name: '',
    fragment: '',
  };

  get link(): NavLink {
    return this._link;
  }

  navigate(): void {
    if (!this.link.fragment.startsWith('/')) {
      this._viewportScroller.scrollToAnchor(this.link.fragment);
    }
  }

  public closeMenu(): void {
    setTimeout(() => {
      this._navbarService.toggleIsOpen();
    }, 100);
  }
}
