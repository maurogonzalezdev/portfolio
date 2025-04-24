import { Route } from '@angular/router';

import { LayoutComponent } from '@client/app/shared/layout/layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
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
  },
];
