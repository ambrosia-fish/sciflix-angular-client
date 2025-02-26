import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {
  isLoading = false;

  constructor(
    public dialog: MatDialog,
    private fetchApiData: FetchApiDataService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '320px',
      maxWidth: '90vw',
      panelClass: 'mobile-friendly-dialog'
    });
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '320px',
      maxWidth: '90vw',
      panelClass: 'mobile-friendly-dialog'
    });
  }

  guestLogin(): void {
    this.isLoading = true;
    this.fetchApiData.userLogin({ username: 'Guest', password: 'GuestPassword' }).subscribe({
      next: (result) => {
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.isLoading = false;
        this.router.navigate(['movies']);
        this.snackBar.open('Logged in as guest', 'OK', { 
          duration: 2000,
          panelClass: ['success-snackbar']
        });
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open('Guest login failed', 'OK', { 
          duration: 2000,
          panelClass: ['error-snackbar']
        });
        console.error('Guest login error:', error);
      }
    });
  }
}