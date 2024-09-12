import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../services/fetch-api-data.service';

// Import necessary Material modules
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

// Import FormsModule for ngModel
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
  // Add standalone: true and import the necessary modules
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ]
})
export class UserRegistrationFormComponent {
  userData = { username: '', password: '', email: '', birthday: '' };

  private fetchApiData = inject(FetchApiDataService);
  private dialogRef = inject(MatDialogRef<UserRegistrationFormComponent>);
  private snackBar = inject(MatSnackBar);

  registerUser(): void {
    console.log('Attempting to register user with data:', this.userData);
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (result) => {
        console.log('Registration successful', result);
        this.dialogRef.close();
        this.snackBar.open('User registration successful', 'OK', {
          duration: 2000
        });
      },
      error: (error) => {
        console.error('Registration error', error);
        let errorMessage = 'Something went wrong with the registration';
        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error;
        } else if (error.error && error.error.error) {
          errorMessage = error.error.error;
        }
        this.snackBar.open(errorMessage, 'OK', {
          duration: 5000
        });
      }
    });
  }
}