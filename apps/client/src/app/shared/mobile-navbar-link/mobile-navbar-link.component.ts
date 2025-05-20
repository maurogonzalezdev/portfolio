import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  HostListener,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NavbarService } from '@client/app/shared/services/navbar.service';
import { NavLink } from '@client/app/shared/interfaces';
import { LoggingService } from '../services/logging.service';

@Component({
  selector: 'shared-mobile-navbar-link',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './mobile-navbar-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavbarLinkComponent implements OnInit {
  @Input({ required: true })
  set setLink(link: NavLink) {
    if (!link) return;

    this._link = link;
    return;
  }

  private readonly _navbarService: NavbarService = inject(NavbarService);
  private readonly _loggingService: LoggingService = inject(LoggingService);
  private readonly _destroyRef: DestroyRef = inject(DestroyRef);
  private readonly _changeDetectorRef: ChangeDetectorRef =
    inject(ChangeDetectorRef);

  private _currentFragment: string = '';
  private _link: NavLink = {
    id: 0,
    name: '',
    fragment: '',
    icon: '',
  };

  ngOnInit(): void {
    this._navbarService.getCurrentFragment$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((fragment: string) => {
        this._currentFragment = fragment;
        this._changeDetectorRef.markForCheck();
      });
  }

  get getLink(): NavLink {
    return this._link;
  }
  get isActive(): boolean {
    return this._isActive();
  }

  private _isActive(): boolean {
    return this._currentFragment === this._link.fragment;
  }

  public navigateToFragment(event: Event): void {
    this._navbarService.navigateToFragment(this._link.fragment, event);
    setTimeout(() => {
      this._navbarService.toggleIsOpen();
    }, 650);
  }
  public closeMenu(): void {
    setTimeout(() => {
      this._navbarService.toggleIsOpen();
    }, 100);
  }
}
