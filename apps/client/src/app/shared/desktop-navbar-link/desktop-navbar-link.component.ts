import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  inject,
  Input,
  OnInit,
} from '@angular/core';

import { DesktopNavbarIconComponent } from '@client/app/shared/desktop-navbar-icon/desktop-navbar-icon.component';
import { NavLink } from '@client/app/shared/interfaces';
import { LoggingService } from '../services/logging.service';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'shared-desktop-navbar-link',
  standalone: true,
  imports: [DesktopNavbarIconComponent],
  templateUrl: './desktop-navbar-link.component.html',
  styleUrl: './desktop-navbar-link.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopNavbarLinkComponent implements OnInit {
  private _isHovered = false;

  @HostListener('mouseenter', ['$event'])
  public onMouseEnter(event: Event): void {
    this._isHovered = true;
    this._updateColor();
  }

  @HostListener('mouseleave', ['$event'])
  public onMouseLeave(event: Event): void {
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
    });
  }

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

  public navigateToFragment(event: Event): void {
    this._navbarService.navigateToFragment(this._link.fragment, event);
  }
}
