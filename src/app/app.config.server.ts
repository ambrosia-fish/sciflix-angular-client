/**
 * Server-side application configuration for Angular Universal.
 * @module AppConfigServer
 */

import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

/**
 * Server-specific configuration.
 */
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

/**
 * Merged configuration for server-side rendering.
 * Combines the main app configuration with server-specific settings.
 */
export const config = mergeApplicationConfig(appConfig, serverConfig);