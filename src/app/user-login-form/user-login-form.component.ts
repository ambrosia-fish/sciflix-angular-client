import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Add this import
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-login-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule, // Add this module
    FormsModule
  ],
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent {
  @Output() loginSuccess = new EventEmitter<void>();
  userData = { username: '', password: '' };
  hidePassword = true;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<UserLoginFormComponent>,
    private snackBar: MatSnackBar
  ) {}

  loginUser(): void {
    if (!this.userData.username || !this.userData.password) {
      this.snackBar.open('Please fill in all required fields', 'OK', { duration: 3000 });
      return;
    }

    this.isLoading = true;
    this.authService.login(this.userData.username, this.userData.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open('Login successful', 'OK', { 
          duration: 2000,
          panelClass: ['success-snackbar']
        });
        this.loginSuccess.emit();
        this.dialogRef.close();
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login error', error);
        this.snackBar.open('Login failed: ' + (error.error || 'Unknown error'), 'OK', { 
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  guestLogin(): void {
    this.isLoading = true;
    this.authService.login('Guest', 'GuestPassword').subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open('Guest login successful', 'OK', { 
          duration: 2000,
          panelClass: ['success-snackbar']
        });
        this.loginSuccess.emit();
        this.dialogRef.close();
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Guest login error', error);
        this.snackBar.open('Guest login failed', 'OK', { 
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}