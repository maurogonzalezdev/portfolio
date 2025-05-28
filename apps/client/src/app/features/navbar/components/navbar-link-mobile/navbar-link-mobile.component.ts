import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { LoggingService } from '@client/app/core/services';
import { NavbarService } from '@client/app/features/navbar/services';
import { NavLink } from '@client/app/features/navbar/models/interfaces';

@Component({
  selector: 'navbar-link-mobile',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar-link-mobile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarLinkMobileComponent implements OnInit {
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
        this._loggingService.log(
          'info',
          `NavbarLinkMobileComponent: Current fragment updated to ${fragment}`
        );
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

  /**
   * This method is triggered when the user clicks on a link in the mobile navbar.
   * @param {Event} event - The click event that triggered the navigation
   * @returns {void}
   * @description Handles the click event to navigate to the specified fragment.
   */
  public navigateToFragment(event: Event): void {
    this._navbarService.navigateToFragment(this._link.fragment, event);
    setTimeout(() => {
      this._navbarService.toggleIsOpen();
    }, 200);
  }
  // Closes the mobile menu after a short delay to allow the navigation to complete
  public closeMenu(): void {
    setTimeout(() => {
      this._navbarService.toggleIsOpen();
    }, 100);
  }
}
