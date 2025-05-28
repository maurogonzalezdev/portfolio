import { Component, inject, Input } from '@angular/core';

import { NavbarService } from '@client/app/features/navbar/services';

@Component({
  selector: 'shared-scroll-navigator',
  standalone: true,
  templateUrl: './shared-scroll-navigator.component.html',
  styleUrl: './shared-scroll-navigator.component.css',
})
export class SharedScrollNavigatorComponent {
  @Input({ required: true })
  set setScrollTo(scrollTo: string) {
    if (!scrollTo) return;

    this._id = scrollTo.trim().toLowerCase();
    return;
  }

  private readonly _navbarService: NavbarService = inject(NavbarService);

  private _id: string = '';

  get getId(): string {
    return this._id;
  }

  // Method to navigate to the specified fragment
  public navigate(): void {
    this._navbarService.navigateToFragment(`#${this._id}`);
  }
}
