import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'hero-image',
  standalone: true,
  imports: [CommonModule],
  template: `
    <img
      src="/images/hero-640w.webp"
      srcset="
        /images/hero-640w.webp   640w,
        /images/hero-768w.webp   768w,
        /images/hero-1024w.webp 1024w,
        /images/hero-1536w.webp 1536w
      "
      sizes="(min-width: 1536px) 43vw, (min-width: 1024px) 50vw, (min-width: 768px) 81vw, (min-width: 640px) 78vw, 100vw"
      alt="mauro-gonzalez.dev"
      title="mauro-gonzalez.dev"
      class="landscape:-mb-16 lg:landscape:-mb-0"
    />
  `,
})
export class HeroImageComponent {}
