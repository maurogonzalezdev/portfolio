import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { NavbarLinkDesktopComponent } from '@client/app/features/navbar/components/navbar-link-desktop/navbar-link-desktop.component';
import { NavbarService } from '@client/app/features/navbar/services';
import {
  NavLink,
  NavLinkItem,
} from '@client/app/features/navbar/models/interfaces';

@Component({
  selector: 'navbar-links-desktop',
  standalone: true,
  imports: [NavbarLinkDesktopComponent],
  templateUrl: './navbar-links-desktop.component.html',
  styleUrl: './navbar-links-desktop.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarLinksDesktopComponent {
  private readonly _navbarService: NavbarService = inject(NavbarService);

  // Method to get the navigation links without "about me" link
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
