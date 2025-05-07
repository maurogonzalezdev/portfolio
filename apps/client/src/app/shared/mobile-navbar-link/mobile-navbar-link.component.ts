import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewportScroller } from '@angular/common';

import { NavbarService } from '@client/app/shared/services/navbar.service';
import { NavLink } from '@client/app/shared/interfaces';

@Component({
  selector: 'shared-mobile-navbar-link',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './mobile-navbar-link.component.html',
})
export class MobileNavbarLinkComponent {
  @Input({ required: true })
  set setLink(link: NavLink) {
    if (!link) return;

    this._link = link;
    return;
  }

  private readonly _viewportScroller: ViewportScroller =
    inject(ViewportScroller);
  private readonly _navbarService: NavbarService = inject(NavbarService);

  private _link: NavLink = {
    id: 0,
    name: '',
    fragment: '',
  };

  get getLink(): NavLink {
    return this._link;
  }

  public navigate(): void {
    if (!this.getLink.fragment.startsWith('/')) {
      this._viewportScroller.scrollToAnchor(this.getLink.fragment);
    }
  }
  public closeMenu(): void {
    setTimeout(() => {
      this._navbarService.toggleIsOpen();
    }, 100);
  }
}
