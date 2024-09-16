import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules, withHashLocation  } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { importProvidersFrom } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

console.log('app.config.ts is being loaded');
console.log('Imported routes:', routes);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules),withHashLocation()),
    provideClientHydration(),
    provideHttpClient(),
    provideAnimationsAsync(),
    importProvidersFrom(
      MatButtonModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatDialogModule,
      MatSnackBarModule
    ), provideAnimationsAsync()
  ]
};

console.log('appConfig:', appConfig);