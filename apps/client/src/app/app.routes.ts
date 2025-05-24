import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: async () => {
      return import('./shared/layout/layout.component').then(
        (m) => m.LayoutComponent
      );
    },
  },
  {
    path: 'blog',
    loadComponent: async () => {
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
