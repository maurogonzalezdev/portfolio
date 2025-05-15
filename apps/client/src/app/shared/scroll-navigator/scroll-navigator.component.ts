import { Component, inject, Input } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';

@Component({
  selector: 'shared-scroll-navigator',
  standalone: true,
  templateUrl: './scroll-navigator.component.html',
  styleUrls: ['./scroll-navigator.component.css'],
})
export class ScrollNavigatorComponent {
  @Input({ required: true })
  set setScrollTo(scrollTo: string) {
    if (!scrollTo) return;
    this._id = scrollTo.trim().toLowerCase();
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
    });
  }
}
