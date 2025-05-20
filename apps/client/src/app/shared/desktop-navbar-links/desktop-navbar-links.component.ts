import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { DesktopNavbarLinkComponent } from '@client/app/shared/desktop-navbar-link/desktop-navbar-link.component';
import { NavbarService } from '@client/app/shared/services/navbar.service';
import { NavLink, NavLinkItem } from '@client/app/shared/interfaces';

@Component({
  selector: 'shared-desktop-navbar-links',
  standalone: true,
  imports: [DesktopNavbarLinkComponent],
  templateUrl: './desktop-navbar-links.component.html',
  styleUrl: './desktop-navbar-links.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopNavbarLinksComponent {
  private readonly _navbarService: NavbarService = inject(NavbarService);

  public getNavLinks(): NavLink[] {
    return (
      this._navbarService.getNavLinks
        .map((link: NavLinkItem) => {
          const k: string = Object.keys(link)[0];
          return link[k].name.toLowerCase() !== 'about me' ? link[k] : null;
        })
        // ! Dont return link "about me"
        .filter((link): link is NavLink => link !== null)
    );
  }
}
