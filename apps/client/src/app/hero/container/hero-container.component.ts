import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { HeroImageComponent } from '@client/app/hero/hero-image/hero-image.component';

@Component({
  selector: 'hero-container',
  standalone: true,
  imports: [CommonModule, HeroImageComponent],
  template: `
    <section
      class="w-full h-full flex flex-col flex-nowrap items-center justify-end overflow-clip"
    >
      <hero-image></hero-image>
    </section>
  `,
})
export class HeroContainerComponent {}
