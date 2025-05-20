import { Component, inject, Input } from '@angular/core';

import { NavbarService } from '@client/app/shared/services/navbar.service';

@Component({
  selector: 'shared-scroll-navigator',
  standalone: true,
  templateUrl: './scroll-navigator.component.html',
  styleUrl: './scroll-navigator.component.css',
})
export class ScrollNavigatorComponent {
  @Input({ required: true })
  set setScrollTo(scrollTo: string) {
    if (!scrollTo) return;
    this._id = scrollTo.trim().toLowerCase();
  }

  private readonly _navbarService: NavbarService = inject(NavbarService);

  private _id: string = '';

  get getId(): string {
    return this._id;
  }

  public navigate(): void {
    this._navbarService.navigateToFragment(`#${this._id}`);
  }
}
