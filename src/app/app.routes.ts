import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      );
    },
  },
  {
    path: 'about',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./pages/about-page/about-page.component').then(
        (m) => m.AboutPageComponent
      );
    },
  },
  {
    path: 'projects',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./pages/projects-page/projects-page.component').then(
        (m) => m.ProjectsPageComponent
      );
    },
  },
  {
    path: '**',
    loadComponent: () => {
      return import('./pages/error-page/error-page.component').then(
        (m) => m.ErrorPageComponent
      );
    },
  },
];
