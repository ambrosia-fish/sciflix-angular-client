/**
 * Main component of the Sci-Flix Angular application.
 * @module AppComponent
 */

import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { CommonModule } from '@angular/common';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

/**
 * Root component of the application.
 * Handles navigation and login dialog.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationBarComponent, CommonModule, UserLoginFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * The title of the application.
   * This is displayed in the application template and used in tests.
   * @type {string}
   */
  title = 'sci-flix-angular-client'
  /** Flag to determine if the current page is the welcome page */
  isWelcomePage: boolean = true;

  /**
   * @param dialog - Material Dialog service for opening dialogs
   * @param router - Angular Router for navigation
   * @param authService - Service for handling authentication
   */
  constructor(
    private dialog: MatDialog,
    private router: Router,
    public authService: AuthService
  ) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isWelcomePage = event.urlAfterRedirects === '/welcome';
    });
  }

  /**
   * Opens the login dialog.
   */
  openLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}