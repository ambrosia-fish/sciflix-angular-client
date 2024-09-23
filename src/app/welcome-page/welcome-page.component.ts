/**
 * Welcome Page Component for the Sci-Flix Angular application.
 * This component handles the initial page users see, providing options to login or register.
 * @module WelcomePageComponent
 */

import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';

/**
 * Component for the welcome page of the application.
 * Provides buttons for user registration and login.
 */
@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {
  /** Event emitter for successful login */
  @Output() loginSuccess = new EventEmitter<void>();

  /**
   * @param dialog - Material Dialog service for opening dialogs
   */
  constructor(public dialog: MatDialog) { }

  /**
   * Opens the user registration dialog.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * Opens the user login dialog.
   * Emits a loginSuccess event when login is successful.
   */
  openUserLoginDialog(): void {
    const dialogRef = this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });

    dialogRef.componentInstance.loginSuccess.subscribe(() => {
      this.loginSuccess.emit();
      dialogRef.close();
    });
  }
}