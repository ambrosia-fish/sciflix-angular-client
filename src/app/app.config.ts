import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Import Material modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Import provideAnimations instead of provideAnimationsAsync if you encounter issues
// import { provideAnimations } from '@angular/platform-browser/animations';

import { importProvidersFrom } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    provideAnimationsAsync(),
    // If you have issues with animations, use this instead:
    // provideAnimations(),

    // Provide Material modules
    importProvidersFrom(
      MatButtonModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatDialogModule,
      MatSnackBarModule
    )
  ]
};