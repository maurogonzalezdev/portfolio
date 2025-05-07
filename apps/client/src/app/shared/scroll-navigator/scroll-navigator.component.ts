import { Component, inject, Input } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';

import { heroArrowDownCircle } from '@ng-icons/heroicons/outline';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'shared-scroll-navigator',
  standalone: true,
  imports: [NgIcon],
  providers: [provideIcons({ heroArrowDownCircle })],
  templateUrl: './scroll-navigator.component.html',
})
export class ScrollNavigatorComponent {
  @Input({ required: true })
  set setScrollTo(scrollTo: string) {
    if (!scrollTo) return;

    this._id = scrollTo.trim().toLowerCase();
    return;
  }

  private readonly _document: Document = inject(DOCUMENT);
  private readonly _location: Location = inject(Location);

  private _id: string = '';

  get getId(): string {
    return this._id;
  }

  public navigate(): void {
    this._location.replaceState(`#${this._id}`);
    this._document.getElementById(this._id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
}
