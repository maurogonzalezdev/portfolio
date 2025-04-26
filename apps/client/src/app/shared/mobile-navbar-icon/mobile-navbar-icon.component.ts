import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';

import { NavbarService } from '@client/app/shared/services/navbar.service';

import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'shared-mobile-navbar-icon',
  standalone: true,
  imports: [CommonModule, NgIcon],
  templateUrl: './mobile-navbar-icon.component.html',
  styleUrl: './mobile-navbar-icon.component.css',
})
export class MobileNavbarIconComponent {
  private readonly _navbarService: NavbarService = inject(NavbarService);

  @Input({ required: true })
  set icon(icon: string) {
    if (!icon) return;

    this._icon = icon;
    return;
  }
  private _icon: string = '';

  @Input({ required: true })
  set size(size: number) {
    if (!size) return;

    this._size = size;
    return;
  }
  private _size: number = 0;

  get icon(): string {
    return this._icon;
  }
  get size(): string {
    return String(this._size);
  }

  public toggleMenu(): void {
    this._navbarService.toggleIsOpen();
  }
}
