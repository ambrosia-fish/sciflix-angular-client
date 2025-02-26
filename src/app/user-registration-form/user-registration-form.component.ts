import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../services/fetch-api-data.service';

// Import necessary Material modules
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Import FormsModule for ngModel and CommonModule for directives
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
  // Add standalone: true and import the necessary modules
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    FormsModule
  ]
})
export class UserRegistrationFormComponent implements OnInit {
  userData = { username: '', password: '', email: '', birthday: '' };
  hidePassword = true;
  isLoading = false;
  maxDate = new Date(); // For date validation
  
  private fetchApiData = inject(FetchApiDataService);
  private dialogRef = inject(MatDialogRef<UserRegistrationFormComponent>);
  private snackBar = inject(MatSnackBar);
  
  ngOnInit(): void {
    // Set max date to current date (no future birthdays)
    this.maxDate = new Date();
  }

  registerUser(): void {
    if (!this.userData.username || !this.userData.password || !this.userData.email) {
      this.snackBar.open('Please fill in all required fields', 'OK', { duration: 3000 });
      return;
    }
    
    this.isLoading = true;
    console.log('Attempting to register user with data:', this.userData);
    
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (result) => {
        console.log('Registration successful', result);
        this.isLoading = false;
        this.dialogRef.close();
        this.snackBar.open('User registration successful', 'OK', {
          duration: 2000,
          panelClass: ['success-snackbar']
        });
      },
      error: (error) => {
        console.error('Registration error', error);
        this.isLoading = false;
        let errorMessage = 'Something went wrong with the registration';
        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error;
        } else if (error.error && error.error.error) {
          errorMessage = error.error.error;
        }
        this.snackBar.open(errorMessage, 'OK', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}