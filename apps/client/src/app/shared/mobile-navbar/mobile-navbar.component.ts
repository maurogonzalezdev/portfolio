import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MobileNavbarIconComponent } from '@client/app/shared/mobile-navbar-icon/mobile-navbar-icon.component';
import { MobileNavbarDrawerComponent } from '@client/app/shared/mobile-navbar-drawer/mobile-navbar-drawer.component';
import { NavbarService } from '@client/app/shared/services/navbar.service';

import { heroBars3 } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'shared-mobile-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MobileNavbarIconComponent,
    MobileNavbarDrawerComponent,
  ],
  templateUrl: './mobile-navbar.component.html',
})
export class MobileNavbarComponent implements OnInit {
  private readonly _navbarService: NavbarService = inject(NavbarService);
  private readonly _destroyReg: DestroyRef = inject(DestroyRef);

  private _openIcon: string = heroBars3;
  private _isOpen: boolean = false;

  ngOnInit(): void {
    this._navbarService
      .getIsOpen$()
      .pipe(takeUntilDestroyed(this._destroyReg))
      .subscribe((isOpen: boolean) => {
        this._isOpen = isOpen;
      });
  }

  get openIcon(): string {
    return this._openIcon;
  }
  get isOpen(): boolean {
    return this._isOpen;
  }
}
