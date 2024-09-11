import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Configures Zone.js change detection with event coalescing for better performance
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Sets up the router with the defined routes
    provideRouter(routes),

    // Enables client-side hydration for server-side rendered applications
    provideClientHydration(),

    // Provides the HttpClient for making HTTP requests throughout the application
    provideHttpClient()
  ]
};