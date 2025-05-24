import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    async loadComponent() {
      return import('./shared/layout/layout.component').then(
        (m) => m.LayoutComponent
      );
    },
  },
  {
    path: 'blog',
    async loadComponent() {
      return import('./blog/layout/layout.component').then(
        (m) => m.LayoutComponent
      );
    },
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
