import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    async loadComponent() {
      return import('./core/layouts/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent
      );
    },
  },
  {
    path: 'blog',
    async loadComponent() {
      return import(
        './features/blog/layouts/blog-layout/blog-layout.component'
      ).then((m) => m.BlogLayoutComponent);
    },
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
