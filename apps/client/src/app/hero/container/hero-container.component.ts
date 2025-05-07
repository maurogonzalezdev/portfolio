import { Component } from '@angular/core';

import { HeroBackgroundComponent } from '@client/app/hero/hero-background/hero-background.component';
import { HeroImageComponent } from '@client/app/hero/hero-image/hero-image.component';
import { ImagotypeComponent } from '@client/app/shared/imagotype/imagotype.component';

@Component({
  selector: 'hero-container',
  standalone: true,
  imports: [HeroImageComponent, HeroBackgroundComponent, ImagotypeComponent],
  templateUrl: './hero-container.component.html',
})
export class HeroContainerComponent {}
