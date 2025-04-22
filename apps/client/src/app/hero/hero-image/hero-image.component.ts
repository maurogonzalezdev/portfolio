import { Component, inject } from '@angular/core';

import { LoaderService } from '@client/app/shared/services/loader.service';

@Component({
  selector: 'hero-image',
  standalone: true,
  templateUrl: './hero-image.component.html',
  styleUrl: `./hero-image.component.css`,
})
export class HeroImageComponent {
  private _loaderService: LoaderService = inject(LoaderService);

  public imageLoaded(): void {
    this._loaderService.setHeroImageLoaded(true);
  }
}
