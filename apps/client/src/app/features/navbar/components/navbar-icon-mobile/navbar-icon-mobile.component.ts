import { Component, inject, Input } from '@angular/core';

import { NavbarService } from '@client/app/features/navbar/services';

import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'navbar-icon-mobile',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './navbar-icon-mobile.component.html',
  styleUrl: './navbar-icon-mobile.component.css',
})
export class NavbarIconMobileComponent {
  @Input({ required: true })
  set setIcon(icon: string) {
    if (!icon) return;

    this._icon = icon;
    return;
  }
  @Input({ required: true })
  set setSize(size: number) {
    if (!size) return;

    this._size = size;
    return;
  }

  private readonly _navbarService: NavbarService = inject(NavbarService);

  private _size: number = 0;
  private _icon: string = '';
  private _isOpen: boolean = false;

  constructor() {
    this._navbarService.getIsOpen$().subscribe((isOpen: boolean) => {
      this._isOpen = isOpen;
    });
  }

  get getIcon(): string {
    return this._icon;
  }
  get getSize(): string {
    return String(this._size);
  }
  get getIsOpen(): boolean {
    return this._isOpen;
  }

  // Toggles the mobile menu open or closed
  public toggleMenu(): void {
    this._navbarService.toggleIsOpen();
  }
}
