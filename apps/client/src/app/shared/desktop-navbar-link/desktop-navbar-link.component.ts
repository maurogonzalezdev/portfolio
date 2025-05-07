import { Component, HostListener, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DesktopNavbarIconComponent } from '@client/app/shared/desktop-navbar-icon/desktop-navbar-icon.component';
import { NavLink } from '@client/app/shared/interfaces';

import { heroCodeBracketSquareSolid } from '@ng-icons/heroicons/solid';
import { heroDocumentTextSolid } from '@ng-icons/heroicons/solid';
import { heroEnvelopeSolid } from '@ng-icons/heroicons/solid';
import { heroHomeSolid } from '@ng-icons/heroicons/solid';
import { heroRocketLaunchSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'shared-desktop-navbar-link',
  imports: [DesktopNavbarIconComponent],
  templateUrl: './desktop-navbar-link.component.html',
})
export class DesktopNavbarLinkComponent {
  @HostListener('mouseenter', ['$event'])
  public onHover(event: MouseEvent): void {
    this._color = 'var(--color-accent)';
  }

  @HostListener('mouseleave', ['$event'])
  public onLeave(event: MouseEvent): void {
    this._color = 'var(--color-primary)';
  }

  @Input({ required: true })
  set setLink(link: NavLink) {
    if (!link) return;

    this._link = link;
    return;
  }

  private readonly _router: Router = inject(Router);

  private _color: string = 'var(--color-primary)';
  private _link: NavLink = {
    id: 0,
    name: '',
    fragment: '',
  };

  get getLink(): NavLink {
    return this._link;
  }
  get getColor(): string {
    return this._color;
  }

  public getNavbarIcon(): string {
    if (this._link.name.toLowerCase() === 'home') {
      return heroHomeSolid;
    }
    if (this._link.name.toLowerCase() === 'projects') {
      return heroCodeBracketSquareSolid;
    }
    if (this._link.name.toLowerCase() === 'skills') {
      return heroRocketLaunchSolid;
    }
    if (this._link.name.toLowerCase() === 'contact') {
      return heroEnvelopeSolid;
    }
    if (this._link.name.toLowerCase() === 'last posts') {
      return heroDocumentTextSolid;
    }
    return '';
  }
}
