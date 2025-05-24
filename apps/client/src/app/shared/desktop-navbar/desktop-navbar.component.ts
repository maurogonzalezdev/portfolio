import { Component } from '@angular/core';

import { DesktopNavbarLinksComponent } from '@client/app/shared/desktop-navbar-links/desktop-navbar-links.component';

@Component({
  selector: 'shared-desktop-navbar',
  standalone: true,
  imports: [DesktopNavbarLinksComponent],
  templateUrl: './desktop-navbar.component.html',
  styleUrl: './desktop-navbar.component.css',
})
export class DesktopNavbarComponent {}
