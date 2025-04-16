import { CommonModule, NgOptimizedImage } from '@angular/common';

import { Component } from '@angular/core';

@Component({
  selector: 'shared-loader',
  imports: [CommonModule, NgOptimizedImage],
  template: `<div
    class="fixed w-svw h-full top-0 bg-amber-950 flex justify-center items-center"
  >
    <div class="h-4/12 w-4/12 relative">
      <img
        ngSrc="/images/loading.svg"
        alt="Loading"
        title="Loading"
        fill
        priority
        class="relative"
      />
    </div>
  </div>`,
})
export class LoaderComponent {}
