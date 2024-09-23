/**
 * Defines the routing configuration for the Sci-Flix Angular application.
 * @module AppRoutes
 */

import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

/**
 * Application routes.
 * Defines the mapping between URL paths and components.
 */
export const routes: Routes = [
  /** Welcome page route */
  { path: 'welcome', component: WelcomePageComponent },
  /** Movies page route */
  { path: 'movies', component: MovieCardComponent },
  /** User profile page route */
  { path: 'user-profile', component: UserProfileComponent },
  /** Default route redirects to welcome page */
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  /** Catch-all route for undefined paths, redirects to welcome page */
  { path: '**', redirectTo: 'welcome' }
];