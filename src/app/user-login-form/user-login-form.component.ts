/**
 * User Login Form Component for the Sci-Flix Angular application.
 * This component handles the user login process.
 * @module UserLoginFormComponent
 */

import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

/**
 * Component for user login form.
 * Provides a form for users to log in to the application.
 */
@Component({
  selector: 'app-user-login-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent {
  /** Event emitter for successful login */
  @Output() loginSuccess = new EventEmitter<void>();
  
  /** Object to hold user login data */
  userData = { username: '', password: '' };

  /**
   * @param authService - Service for authentication
   * @param dialogRef - Reference to the dialog
   * @param snackBar - Service for displaying snack bar notifications
   */
  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<UserLoginFormComponent>,
    private snackBar: MatSnackBar
  ) {}

  /**
   * Attempts to log in the user with the provided credentials.
   * On success, emits a loginSuccess event, closes the dialog, and shows a success message.
   * On failure, displays an error message.
   */
  loginUser(): void {
    this.authService.login(this.userData.username, this.userData.password).subscribe({
      next: () => {
        this.snackBar.open('Login successful', 'OK', { duration: 2000 });
        this.loginSuccess.emit();
        this.dialogRef.close();
      },
      error: (error) => {
        console.error('Login error', error);
        this.snackBar.open('Login failed', 'OK', { duration: 5000 });
      }
    });
  }
}