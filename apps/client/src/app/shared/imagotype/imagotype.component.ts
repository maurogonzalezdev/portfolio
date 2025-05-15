import {
  CommonModule,
  DOCUMENT,
  Location,
  NgOptimizedImage,
} from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'shared-imagotype',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './imagotype.component.html',
})
export class ImagotypeComponent {
  private readonly _document: Document = inject(DOCUMENT);
  private readonly _location: Location = inject(Location);

  private _imageUrl: string = 'imagotype_UVDs1RyLa.svg';

  get getImageUrl(): string {
    return this._imageUrl;
  }

  public reloadPage(): void {
    this._location.replaceState('/');
    this._document.location.reload();
  }
}
