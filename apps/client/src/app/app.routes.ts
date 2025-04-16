import { Route } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
