import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { FetchApiDataService } from '../services/fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {
  constructor(
    public dialog: MatDialog,
    private fetchApiData: FetchApiDataService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '340px', // Increased from 280px to accommodate form content
      maxWidth: '100vw', // Ensure it doesn't exceed viewport width on mobile
      panelClass: 'dialog-responsive' // Add a class for additional styling if needed
    });
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '340px', // Increased from 280px to accommodate form content
      maxWidth: '100vw', // Ensure it doesn't exceed viewport width on mobile
      panelClass: 'dialog-responsive' // Add a class for additional styling if needed
    });
  }

  guestLogin(): void {
    this.fetchApiData.userLogin({ username: 'Guest', password: 'GuestPassword' }).subscribe({
      next: (result) => {
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.router.navigate(['movies']);
        this.snackBar.open('Logged in as guest', 'OK', { duration: 2000 });
      },
      error: (error) => {
        this.snackBar.open('Guest login failed', 'OK', { duration: 2000 });
        console.error('Guest login error:', error);
      }
    });
  }
}