import { CommonModule, DOCUMENT, Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'shared-imagotype',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './imagotype.component.html',
  styleUrl: './imagotype.component.css',
})
export class ImagotypeComponent {
  private readonly _document: Document = inject(DOCUMENT);
  private readonly _location: Location = inject(Location);

  // This method is called when the user clicks on the logo
  public reloadPage(): void {
    this._location.replaceState('/');
    this._document.location.reload();
  }
}
