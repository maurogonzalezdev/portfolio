import { Component } from '@angular/core';

import { HeroContainerComponent } from '@client/app/hero/container/hero-container.component';

@Component({
  selector: 'shared-layout',
  standalone: true,
  imports: [HeroContainerComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {}
