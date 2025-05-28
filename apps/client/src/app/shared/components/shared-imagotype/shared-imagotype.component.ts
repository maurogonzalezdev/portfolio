import { Component, inject } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';

@Component({
  selector: 'shared-imagotype',
  standalone: true,
  templateUrl: './shared-imagotype.component.html',
  styleUrl: './shared-imagotype.component.css',
})
export class SharedImagotypeComponent {
  private readonly _document: Document = inject(DOCUMENT);
  private readonly _location: Location = inject(Location);

  // This method is called when the user clicks on the logo
  public reloadPage(): void {
    this._location.replaceState('/');
    this._document.location.reload();
  }
}
