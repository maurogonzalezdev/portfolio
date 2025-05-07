import { Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'shared-imagotype',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './imagotype.component.html',
})
export class ImagotypeComponent {
  private readonly _document: Document = inject(DOCUMENT);

  public reloadPage(): void {
    this._document.defaultView!.location.reload();
  }
}
