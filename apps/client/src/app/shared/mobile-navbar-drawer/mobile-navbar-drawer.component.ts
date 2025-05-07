import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { ImagotypeComponent } from '@client/app/shared/imagotype/imagotype.component';
import { MobileNavbarIconComponent } from '@client/app/shared/mobile-navbar-icon/mobile-navbar-icon.component';
import { MobileNavbarLinksComponent } from '@client/app/shared/mobile-navbar-links/mobile-navbar-links.component';
import { NavbarService } from '@client/app/shared/services/navbar.service';
import { ThemeSwitcherComponent } from '@client/app/shared/theme-switcher/theme-switcher.component';

import { heroXMark } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'shared-mobile-navbar-drawer',
  standalone: true,
  imports: [
    ImagotypeComponent,
    MobileNavbarIconComponent,
    MobileNavbarLinksComponent,
    ThemeSwitcherComponent,
  ],
  templateUrl: './mobile-navbar-drawer.component.html',
  animations: [
    trigger('drawerAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class MobileNavbarDrawerComponent {
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    if (!this._elementRef.nativeElement.contains(event.target)) {
      this._toggleMenu();
    }
  }
  @HostListener('document:keydown', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this._toggleMenu();
    }
  }

  private readonly _navbarService: NavbarService = inject(NavbarService);
  private readonly _elementRef: ElementRef = inject(ElementRef);
  private readonly _document: Document = inject(DOCUMENT);

  private _closeIcon: string = heroXMark;

  get getCloseIcon(): string {
    return this._closeIcon;
  }

  private _toggleMenu(): void {
    this._navbarService.toggleIsOpen();
  }

  public reloadPage(): void {
    this._navbarService.toggleIsOpen();
    this._document.defaultView?.location.reload();
  }
}
