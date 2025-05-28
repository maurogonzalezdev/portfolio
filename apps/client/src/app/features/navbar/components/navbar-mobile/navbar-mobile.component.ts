import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NavbarDrawerMobileComponent } from '@client/app/features/navbar/components/navbar-drawer-mobile/navbar-drawer-mobile.component';
import { NavbarIconMobileComponent } from '@client/app/features/navbar/components/navbar-icon-mobile/navbar-icon-mobile.component';
import { NavbarService } from '@client/app/features/navbar/services';

import { heroBars3 } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'navbar-mobile',
  standalone: true,
  imports: [NavbarDrawerMobileComponent, NavbarIconMobileComponent],
  templateUrl: './navbar-mobile.component.html',
})
export class NavbarMobileComponent implements OnInit {
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

  get getOpenIcon(): string {
    return this._openIcon;
  }
  get getIsOpen(): boolean {
    return this._isOpen;
  }
}
