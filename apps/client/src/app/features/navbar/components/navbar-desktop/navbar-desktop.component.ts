import { Component } from '@angular/core';

import { NavbarLinksDesktopComponent } from '@client/app/features/navbar/components/navbar-links-desktop/navbar-links-desktop.component';

@Component({
  selector: 'navbar-desktop',
  standalone: true,
  imports: [NavbarLinksDesktopComponent],
  templateUrl: './navbar-desktop.component.html',
  styleUrl: './navbar-desktop.component.css',
})
export class NavbarDesktopComponent {}
