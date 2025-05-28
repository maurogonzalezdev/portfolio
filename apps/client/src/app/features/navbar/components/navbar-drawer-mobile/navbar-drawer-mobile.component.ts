import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { LoggingService } from '@client/app/core/services';
import { NavbarIconMobileComponent } from '@client/app/features/navbar/components/navbar-icon-mobile/navbar-icon-mobile.component';
import { NavbarLinksMobileComponent } from '@client/app/features/navbar/components/navbar-links-mobile/navbar-links-mobile.component';
import { NavbarService } from '@client/app/features/navbar/services';
import { SharedImagotypeComponent } from '@client/app/shared/components/shared-imagotype/shared-imagotype.component';
import { ThemeSwitcherComponent } from '@client/app/features/theme/components/theme-switcher/theme-switcher.component';

import { heroXMark } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'navbar-drawer-mobile',
  standalone: true,
  imports: [
    SharedImagotypeComponent,
    NavbarIconMobileComponent,
    NavbarLinksMobileComponent,
    ThemeSwitcherComponent,
  ],
  templateUrl: './navbar-drawer-mobile.component.html',
  styleUrl: './navbar-drawer-mobile.component.css',
})
export class NavbarDrawerMobileComponent {
  // Listens for clicks outside the component to close the menu
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    this._loggingService.log('info', 'Clicked outside the navbar drawer');

    if (!this._elementRef.nativeElement.contains(event.target)) {
      this._toggleMenu();
    }
  }
  // Listens for the Escape key to close the menu
  @HostListener('document:keydown', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    this._loggingService.log('info', `Key pressed: ${event.key}`);

    if (event.key === 'Escape') {
      this._toggleMenu();
    }
  }

  private readonly _navbarService: NavbarService = inject(NavbarService);
  private readonly _elementRef: ElementRef = inject(ElementRef);
  private readonly _document: Document = inject(DOCUMENT);
  private readonly _loggingService: LoggingService = inject(LoggingService);

  private _closeIcon: string = heroXMark;

  get getCloseIcon(): string {
    return this._closeIcon;
  }

  private _toggleMenu(): void {
    this._navbarService.toggleIsOpen();
  }

  // Reloads the page when the reload button is clicked
  public reloadPage(): void {
    this._navbarService.toggleIsOpen();
    this._document.defaultView?.location.reload();
  }
}
