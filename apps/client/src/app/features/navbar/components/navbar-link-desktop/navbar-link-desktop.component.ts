import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  inject,
  Input,
  OnInit,
} from '@angular/core';

import { LoggingService } from '@client/app/core/services';
import { NavbarIconDesktopComponent } from '@client/app/features/navbar/components/navbar-icon-desktop/navbar-icon-desktop.component';
import { NavbarService } from '@client/app/features/navbar/services';
import { NavLink } from '@client/app/features/navbar/models/interfaces';

@Component({
  selector: 'navbar-link-desktop',
  standalone: true,
  imports: [NavbarIconDesktopComponent],
  templateUrl: './navbar-link-desktop.component.html',
  styleUrl: './navbar-link-desktop.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarLinkDesktopComponent implements OnInit {
  @HostListener('mouseenter', ['$event'])
  public onMouseEnter(event: Event): void {
    this._loggingService.log(
      'info',
      `NavbarLinkDesktopComponent: Mouse entered link ${this._link.name}`
    );
    this._isHovered = true;
    this._updateColor();
  }

  @HostListener('mouseleave', ['$event'])
  public onMouseLeave(event: Event): void {
    this._loggingService.log(
      'info',
      `NavbarLinkDesktopComponent: Mouse leaved link ${this._link.name}`
    );
    this._isHovered = false;
    this._updateColor();
  }

  @Input({ required: true })
  set setLink(link: NavLink) {
    if (!link) return;
    this._link = link;
  }

  private readonly _loggingService: LoggingService = inject(LoggingService);
  private readonly _navbarService: NavbarService = inject(NavbarService);
  private readonly _changeDetectorRef: ChangeDetectorRef =
    inject(ChangeDetectorRef);

  // Link properties
  private _isHovered: boolean = false;
  private _currentFragment: string = '';
  private _color: string = 'var(--color-primary)';
  private _link: NavLink = {
    id: 0,
    name: '',
    fragment: '',
    icon: '',
  };

  ngOnInit(): void {
    this._navbarService.getCurrentFragment$.subscribe((fragment: string) => {
      this._currentFragment = fragment;
      this._updateColor();
      this._loggingService.log(
        'info',
        `NavbarLinkDesktopComponent: Current fragment updated to ${this._currentFragment}`
      );
    });
  }

  // Updates the color of the link based on its state
  private _updateColor(): void {
    if (this._isActive()) {
      this._color = 'var(--color-accent)';
    } else if (this._isHovered) {
      this._color = 'var(--color-dark-gray)';
    } else {
      this._color = 'var(--color-primary)';
    }
    this._changeDetectorRef.markForCheck();
  }

  private _isActive(): boolean {
    return this._currentFragment === this._link.fragment;
  }

  get getLink(): NavLink {
    return this._link;
  }

  get getColor(): string {
    return this._color;
  }

  get isActive(): boolean {
    return this._isActive();
  }

  public getNavbarIcon(): string {
    return this._link.icon;
  }

  // Navigates to the link's fragment when clicked
  public navigateToFragment(event: Event): void {
    this._navbarService.navigateToFragment(this._link.fragment, event);
  }
}
