/**
 * Main entry point for the Angular application.
 * This file bootstraps the main AppComponent with the provided configuration.
 * @module Main
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

/**
 * Bootstrap the main Angular application.
 * This function initializes the AppComponent with the provided configuration.
 * If an error occurs during bootstrapping, it will be logged to the console.
 */
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));