import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { HeroContainerComponent } from '@client/app/hero/container/hero-container.component';

@Component({
  selector: 'shared-layout',
  standalone: true,
  imports: [CommonModule, HeroContainerComponent],
  template: `
    <main class="relative">
      <div class="relative lg:fixed h-dvh w-full lg:w-6/12 bg-amber-200">
        <hero-container></hero-container>
      </div>
      <div class="lg:ml-auto w-full lg:w-6/12">
        <div class="h-dvh bg-amber-600"></div>
        <div class="h-dvh bg-amber-800"></div>
      </div>
    </main>
  `,
})
export class LayoutComponent {}
