import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Import Material modules using provide functions
import { provideMatButton } from '@angular/material/button';
import { provideMatCard } from '@angular/material/card';
import { provideMatFormField } from '@angular/material/form-field';
import { provideMatInput } from '@angular/material/input';
import { provideMatDialog } from '@angular/material/dialog';
import { provideMatSnackBar } from '@angular/material/snack-bar';

// Note: FormsModule is not typically provided in app.config.ts, 
// but can be imported in component modules where needed

export const appConfig: ApplicationConfig = {
  providers: [
    // Configures Zone.js change detection with event coalescing for better performance
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Sets up the router with the defined routes
    provideRouter(routes),
    // Enables client-side hydration for server-side rendered applications
    provideClientHydration(),
    // Provides the HttpClient for making HTTP requests throughout the application
    provideHttpClient(),
    // Provides animations
    provideAnimationsAsync(),
    // Provide Material modules
    provideMatButton(),
    provideMatCard(),
    provideMatFormField(),
    provideMatInput(),
    provideMatDialog(),
    provideMatSnackBar()
  ]
};