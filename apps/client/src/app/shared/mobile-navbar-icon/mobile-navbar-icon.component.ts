import { Component, inject, Input } from '@angular/core';

import { NavbarService } from '@client/app/shared/services/navbar.service';

import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'shared-mobile-navbar-icon',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './mobile-navbar-icon.component.html',
  styleUrl: './mobile-navbar-icon.component.css',
})
export class MobileNavbarIconComponent {
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

  get getIcon(): string {
    return this._icon;
  }
  get getSize(): string {
    return String(this._size);
  }

  public toggleMenu(): void {
    this._navbarService.toggleIsOpen();
  }
}
