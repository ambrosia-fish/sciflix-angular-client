/**
 * Server-side entry point for the Angular application.
 * This file sets up the bootstrap function for server-side rendering.
 * @module MainServer
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

/**
 * Bootstrap function for server-side rendering.
 * This function initializes the AppComponent with the server-specific configuration.
 * @returns {Promise<void>} A promise that resolves when the application is bootstrapped.
 */
const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;