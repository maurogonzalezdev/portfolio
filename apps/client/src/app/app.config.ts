import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { appRoutes } from '@client/app/app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideImageKitLoader } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideImageKitLoader(
      'https://ik.imagekit.io/maurogonzalezdev/portfolio/tr:q-90'
    ),
  ],
};
